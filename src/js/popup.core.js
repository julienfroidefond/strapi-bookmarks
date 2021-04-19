import * as configUtils from "./utils/config";
import {
  postMessageAndWaitAck,
  postMessageAndWaitFor,
  ACTION_FORCE_SYNC,
  ACTION_REQUEST_STATE,
  ACTION_RESPONSE_STATE,
} from "./utils/actions";
import { waitPromise } from "./utils/time";
import StrapiHttpClient from "./strapi/api";
import { hideById, showById, setHtmlById, toggleDisableById } from "./utils/dom";

const channelDaemonPort = chrome.extension.connect({ name: "channel-sync-daemon" });
const getState = async () => {
  const actionReqState = { type: ACTION_REQUEST_STATE };
  const actionResState = await postMessageAndWaitFor(channelDaemonPort, actionReqState, {
    actionType: ACTION_RESPONSE_STATE,
    timeout: 1000,
  });
  return actionResState.state;
};
/**
 * Render bookmark stats from daemon
 */
const renderBookmarksStats = state => {
  if (!state || !state.stats) return;
  const {
    stats: { categoriesCount, bookmarksCount },
  } = state;
  setHtmlById("synced-tags-categories-count", categoriesCount);
  setHtmlById("synced-bookmarks-count", bookmarksCount);
};
/**
 * Handling the http errors
 * @param {String} error The error from Request / fetch
 * @returns
 */
const handleError = error => {
  showById("warning-tags");
  hideById("sync-section");
  setHtmlById("error-message", error);
};

/**
 * Clean displayed errors
 */
const cleanError = () => {
  hideById("warning-tags");
  showById("sync-section");
  setHtmlById("error-message", "");
};

export const init = async () => {
  // Fetch data
  const config = await configUtils.load();
  let tags = [];
  let categories = [];
  let bookmarksCount = 0;
  let tagsCategoriesCount = 0;
  let tagsCount = 0;
  showById("global-loader");
  toggleDisableById("force-sync", !config.isConfigured);
  if (config.isConfigured) {
    const httpClient = new StrapiHttpClient(config);
    try {
      [tags, categories, bookmarksCount, tagsCategoriesCount, tagsCount] = await Promise.all([
        httpClient.getTags(),
        httpClient.getTagsCategories(),
        httpClient.getBookmarksCount(),
        httpClient.getTagsCategoriesCount(),
        httpClient.getTagsCount(),
      ]);
      cleanError();
    } catch (error) {
      handleError(error);
    }
  }
  hideById("global-loader");

  // Render "Datas"
  const tagsMenu = document.getElementById("menu-tags-strapi");
  tags.forEach(item => {
    if (item.bookmarks.length > 0)
      tagsMenu.innerHTML += `<span class="badge tag" data-st-id="${item.id}">${item.name} (${item.bookmarks.length})</span>`;
  });

  const categoriesMenu = document.getElementById("menu-tags-categories-strapi");
  categories.forEach(item => {
    categoriesMenu.innerHTML += `<span class="badge tag" data-st-id="${item.id}">${item.name} (${item.tags.length})</span>`;
  });

  // Render "Server infos"
  setHtmlById("bookmarks-count", bookmarksCount);
  setHtmlById("tags-count", tagsCount);
  setHtmlById("tags-categories-count", tagsCategoriesCount);

  // Render Daemon state
  const state = await getState();
  if (state.error) {
    handleError(state.error);
  }

  renderBookmarksStats(state);
  if (!config.isConfigured) {
    document.getElementById("onboarding").classList.remove("hidden");
  }
};

export const forceSyncClick = async e => {
  e.target.innerText = "Synchronizing...";
  const action = { type: ACTION_FORCE_SYNC };
  const syncActionPromise = postMessageAndWaitAck(channelDaemonPort, action);
  await Promise.all([waitPromise(1000), syncActionPromise]);
  const state = await getState();
  renderBookmarksStats(state);
  e.target.innerText = "Synchronize now";
};

export const openOptionTab = () => {
  chrome.tabs.create({ url: `chrome://extensions/?options=${chrome.runtime.id}` });
};
