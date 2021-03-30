import $ from "jquery";

// import "../img/strapi-bookmarks-16.png";
import "../img/strapi-bookmarks-48.png";
// import "../img/strapi-bookmarks-128.png";
import "../img/screenshot.jpg";
import "../css/popup.css";
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
  $("#synced-tags-categories-count").html(categoriesCount);
  $("#synced-bookmarks-count").html(bookmarksCount);
};
/**
 * Handling the http errors
 * @param {String} error The error from Request / fetch
 * @returns
 */
const handleError = error => {
  $("#warning-tags").show();
  $("#sync-section").hide();
  $("#error-message").html(error);
};

/**
 * Clean displayed errors
 */
const cleanError = () => {
  $("#warning-tags").hide();
  $("#sync-section").show();
  $("#error-message").html("");
};

(async () => {
  // Fetch data
  const config = await configUtils.load();
  const httpClient = new StrapiHttpClient(config);
  let tags = [],
    categories = [],
    bookmarksCount = 0,
    tagsCategoriesCount = 0,
    tagsCount = 0;
  $(".loader").show();
  $(".force-sync").attr("disabled", !config.isConfigured);
  if (config.isConfigured) {
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
  $(".loader").hide();

  // Render "Datas"
  const tagsMenu = $("#menu-tags-strapi");
  for (var i in tags) {
    const item = tags[i];
    if (item.bookmarks.length > 0)
      tagsMenu.append(
        `<span class="badge tag" data-st-id="${item.id}">${item.name} (${item.bookmarks.length})</span>`,
      );
  }
  const categoriesMenu = $("#menu-tags-categories-strapi");
  for (var i in categories) {
    const item = categories[i];
    categoriesMenu.append(
      `<span class="badge tag" data-st-id="${item.id}">${item.name} (${item.tags.length})</span>`,
    );
  }

  // Render "Server infos"
  $("#bookmarks-count").html(bookmarksCount);
  $("#tags-count").html(tagsCount);
  $("#tags-categories-count").html(tagsCategoriesCount);

  // Render Daemon state
  const state = await getState();
  if (state.error) {
    handleError(state.error.message);
  }

  renderBookmarksStats(state);
  if (!config.isConfigured) {
    $("#onboarding").removeClass("hidden");
  }
})();

/**
 * Sync click
 */
$(".force-sync").on("click", async e => {
  e.target.innerText = "Synchronizing...";
  const action = { type: ACTION_FORCE_SYNC };
  const syncActionPromise = postMessageAndWaitAck(channelDaemonPort, action);
  await Promise.all([waitPromise(1000), syncActionPromise]);
  const state = await getState();
  renderBookmarksStats(state);
  e.target.innerText = "Synchronize now";
});
$(".btn-open-options").on("click", e => {
  chrome.tabs.create({ url: `chrome://extensions/?options=${chrome.runtime.id}` });
});
