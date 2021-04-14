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
import { compareTrees, browseTree } from "./utils/graph";

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
    console.log("Connected '%s'...", port.name);
    messagePort = port;
    if (!port.onMessage.hasListener(onMessage)) {
      console.log("Register onMessage listener");
      port.onMessage.addListener(onMessage);
    }
  });
  // Run first job
  runJob();
  bootedUp = true;
}

/**
 * Set the current daemon state in memory
 *
 * @param {object} statePart - a new state to merge with exiting one (no deep merge)
 */
function setState(statePart) {
  state = { ...state, ...statePart };
}

/**
 * Fired when receiving message from ui
 *
 * @param {object} message
 */
async function onMessage(message) {
  if (!messagePort) {
    console.warn("Missing communication port !");
    return;
  }
  if (!message.type) {
    console.warn("Wrong message received : ", message);
    return;
  }
  console.log("[[channel message]] : %s", message.type);
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
      console.warn("Unhandled action : %s", message.type);
      break;
  }
}

/**
 * Main bookmarks sync job, it will load the storage config and sync bookmarks based on it.
 * It will also update daemon state & fire message to ui.
 * Warning : run periodically based on 'config.autoSyncDelay' and setTimeout strategy
 */
async function runJob() {
  try {
    console.log("== Start a sync job %d...", Date.now());
    config = await configUtils.load();
    if (timeoutRef) clearTimeout(timeoutRef);

    if (!config.isConfigured) {
      console.log("== Extension not configured, waiting...");
      return;
    }

    // Fetch bookmarks
    const backendBookmarks = await strapiProvider.loadBookmarksTree(config);
    const localBookmarks = await bookmarkHandler.loadBookmarksTreeSafe(config.rootBookmarkId);
    const hasDifferences = !compareTrees(backendBookmarks, localBookmarks, "children", (a, b) => {
      const isAFolder = a.url === undefined;
      const isBFolder = b.url === undefined;
      if (isAFolder !== isBFolder) return false;
      if ((a.title || "") !== (b.title || "")) return false;
      if (a.url !== b.url) return false;

      return true;
    });
    setState({ bookmarks: backendBookmarks });

    if (hasDifferences) {
      console.log("Found differences : sync local bookmarks...");
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
          case "directory":
            const directory = await bookmarkHandler.createDirectory(parentDirectoryId, item.title);
            if (!parent) categoriesCount++;
            else tagsCount++;
            return directory.id;
          case "bookmark":
            await bookmarkHandler.createBMark(parentDirectoryId, {
              title: item.title,
              url: item.url,
            });
            bookmarksCount++;
            return null;
        }
      });
      setState({ stats: { categoriesCount, tagsCount, bookmarksCount } });
    } else {
      console.log("No differences found, skip syncing...");
    }

    // Prepare next tick
    const sleepDuration = config.autoSyncDelay > 0 ? config.autoSyncDelay * ONE_HOUR : 5000;
    console.log("== Job done, next job in %d seconds", sleepDuration);
    setState({
      error: null,
      lastJobUpdate: Date.now(),
      nextJobUpdate: Date.now() + sleepDuration,
    });
    waitPromise(sleepDuration, ref => (timeoutRef = ref)).then(() => runJob());
    return Promise.resolve();
  } catch (error) {
    const { message } = error;
    console.error(error);
    setState({ error: message });
    return Promise.resolve();
  }
}

chrome.runtime.onInstalled.addListener(() => bootDaemon());
console.log("background.js loaded");
bootDaemon();
