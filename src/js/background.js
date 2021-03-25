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

const ONE_HOUR = 3600000;

const browseTree = (tree, fn, parent = null, parentResult = null) =>
  Promise.all(
    tree.map(async elem => {
      const result = await fn(elem, parent, parentResult);
      if (!elem.childrens) return Promise.resolve();

      return browseTree(elem.childrens, fn, elem, result);
    }),
  );

class BookmarkSyncDaemon {
  constructor() {
    this.bootedUp = false;
    this.config = {};
    this.state = {
      lastJobUpdate: null,
      nextJobUpdate: null,
      bookmarks: null,
      error: null,
    };
    this.timeoutRef = null;
    this.rootNodeId = -1;
    this.categoriesSynchronized = [];
  }

  async boot() {
    if (this.bootedUp) return;
    this.config = await configUtils.load();
    // Attach communication channel
    chrome.extension.onConnect.addListener(port => {
      console.log("Connected '%s'...", port.name);
      port.onMessage.addListener((...args) => this.onMessage(port, ...args));
    });
    // Attach config change listener
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (changes["autoSyncDelay"] || changes["customRootName"]) {
        console.log("changing sync setup, force job restart");
        this.runJob();
      }
    });
    this.runJob();
    this.bootedUp = true;
  }

  setState(statePart) {
    this.state = { ...this.state, ...statePart };
  }

  async runJob() {
    try {
      this.config = await configUtils.load();
      if (this.timeoutRef) clearTimeout(this.timeoutRef);

      if (!this.config.isConfigured) {
        console.log("Extension not configured, waiting...");
        return;
      }

      // Fetch bookmarks
      const bookmarks = await strapiProvider.loadBookmarksTree(this.config);
      this.setState({ bookmarks });

      // Sync user bookmarks
      await bookmarkHandler.removeRoot(this.config.customRootName);
      this.rootNodeId = await bookmarkHandler.createRoot(this.config.customRootName);
      let tagsCount = 0,
        categoriesCount = 0,
        bookmarksCount = 0;
      await browseTree(bookmarks, async (item, parent, parentResult) => {
        const parentDirectoryId = parent ? parentResult : this.rootNodeId;
        switch (item.type) {
          case "directory":
            const directory = await bookmarkHandler.createDirectory(parentDirectoryId, item.name);
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
      this.setState({ stats: { categoriesCount, tagsCount, bookmarksCount } });
      console.log("synchronised in bg ! prepare next job... ");

      // Prepare next tick
      const sleepDuration = this.config.autoSyncDelay > 0 ? this.config.autoSyncDelay * ONE_HOUR : 5000;
      this.setState({
        error: null,
        lastJobUpdate: Date.now(),
        nextJobUpdate: Date.now() + sleepDuration,
      });
      waitPromise(sleepDuration, ref => (this.timeoutRef = ref)).then(() => this.runJob());
      return Promise.resolve();
    } catch (error) {
      const { message } = error;
      this.setState({ error: message });
      return Promise.resolve();
    }
  }

  async onMessage(port, message) {
    if (!message.type) {
      console.warn("Wrong message received : ", message);
      return;
    }
    console.log("[[channel message]] : %s", message.type);
    switch (message.type) {
      case ACTION_FORCE_SYNC:
        await this.runJob();
        postMessageAck(port, message);
        break;
      case ACTION_REQUEST_STATE:
        port.postMessage({
          type: ACTION_RESPONSE_STATE,
          state: this.state,
        });

        break;
      default:
        console.warn("Unhandled action : %s", message.type);
        break;
    }
  }
}

const bookmarkDaemon = new BookmarkSyncDaemon();
chrome.runtime.onInstalled.addListener(() => bookmarkDaemon.boot());
chrome.runtime.onStartup.addListener(() => bookmarkDaemon.boot());
bookmarkDaemon.boot();
