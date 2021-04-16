import {
  ACTION_FORCE_SYNC,
  ACTION_REQUEST_STATE,
  ACTION_RESPONSE_STATE,
  postMessageAck,
} from "./utils/actions";
import { waitPromise } from "./utils/time";
import bookmarkHandler from "./bookmarkHandler";
import * as configUtils from "./utils/config";
import * as strapiProvider from "./strapi/provider";
import { browseTree, compareBookmarkTress } from "./utils/graph";

const { log, warn, error: logError } = console;

const ONE_HOUR = 3600000;

let bootedUp = false;
let config = {};
let state = {
  lastJobUpdate: null,
  nextJobUpdate: null,
  bookmarks: null,
  error: null,
};
let timeoutRef = null;
let messagePort = null;

/**
 * Set the current daemon state in memory
 *
 * @param {object} statePart - a new state to merge with exiting one (no deep merge)
 */
function setState(statePart) {
  state = { ...state, ...statePart };
}

/**
 * Main bookmarks sync job, it will load the storage config and sync bookmarks based on it.
 * It will also update daemon state & fire message to ui.
 * Warning : run periodically based on 'config.autoSyncDelay' and setTimeout strategy
 */
async function runJob() {
  try {
    log("== Start a sync job %d...", Date.now());
    config = await configUtils.load();
    if (timeoutRef) clearTimeout(timeoutRef);

    if (!config.isConfigured) {
      log("== Extension not configured, waiting...");
      return;
    }

    // Fetch bookmarks
    const backendBookmarks = await strapiProvider.loadBookmarksTree(config);
    const localBookmarks = await bookmarkHandler.loadBookmarksTreeSafe(config.rootBookmarkId);

    const hasDifferences = !compareBookmarkTress(backendBookmarks, localBookmarks);
    setState({ bookmarks: backendBookmarks });

    if (hasDifferences) {
      log("Found differences : sync local bookmarks...");
      // Sync user bookmarks
      const rootBookmarkId = await bookmarkHandler.getOrCreateRoot(
        config.rootBookmarkId,
        config.customRootName,
      );
      await configUtils.save({ rootBookmarkId });
      await bookmarkHandler.removeChildrens(rootBookmarkId);

      let tagsCount = 0;
      let categoriesCount = 0;
      let bookmarksCount = 0;
      await browseTree(backendBookmarks, async (item, parent, parentResult) => {
        const parentDirectoryId = parent ? parentResult : rootBookmarkId;
        switch (item.type) {
          case "directory": {
            const directory = await bookmarkHandler.createDirectory(parentDirectoryId, item.title);
            if (!parent) categoriesCount += 1;
            else tagsCount += 1;
            return directory.id;
          }
          case "bookmark": {
            await bookmarkHandler.createBMark(parentDirectoryId, {
              title: item.title,
              url: item.url,
            });
            bookmarksCount += 1;
            return null;
          }
          default:
            return null;
        }
      });
      setState({ stats: { categoriesCount, tagsCount, bookmarksCount } });
    } else {
      log("No differences found, skip syncing...");
    }

    // Prepare next tick
    const sleepDuration = config.autoSyncDelay > 0 ? config.autoSyncDelay * ONE_HOUR : 5000;
    log("== Job done, next job in %d seconds", sleepDuration);
    setState({
      error: null,
      lastJobUpdate: Date.now(),
      nextJobUpdate: Date.now() + sleepDuration,
    });
    waitPromise(sleepDuration, ref => {
      timeoutRef = ref;
    }).then(() => runJob());
    Promise.resolve();
  } catch (error) {
    const { message } = error;
    logError(error);
    setState({ error: message });
    Promise.resolve();
  }
}

/**
 * Fired when receiving message from ui
 *
 * @param {object} message
 */
async function onMessage(message) {
  if (!messagePort) {
    warn("Missing communication port !");
    return;
  }
  if (!message.type) {
    warn("Wrong message received : ", message);
    return;
  }
  log("[[channel message]] : %s", message.type);
  switch (message.type) {
    case ACTION_FORCE_SYNC:
      await runJob();
      postMessageAck(messagePort, message);
      break;
    case ACTION_REQUEST_STATE:
      messagePort.postMessage({
        type: ACTION_RESPONSE_STATE,
        state,
      });

      break;
    default:
      warn("Unhandled action : %s", message.type);
      break;
  }
}

/**
 * Boot the daemon :
 * - load config from storage
 * - init com channel with ui
 * - run first job
 */
async function bootDaemon() {
  if (bootedUp) return;
  config = await configUtils.load();
  // Attach communication channel
  chrome.extension.onConnect.addListener(port => {
    log("Connected '%s'...", port.name);
    messagePort = port;
    if (!port.onMessage.hasListener(onMessage)) {
      log("Register onMessage listener");
      port.onMessage.addListener(onMessage);
    }
  });
  // Run first job
  runJob();
  bootedUp = true;
}

chrome.runtime.onInstalled.addListener(() => bootDaemon());
log("background.js loaded");
bootDaemon();
