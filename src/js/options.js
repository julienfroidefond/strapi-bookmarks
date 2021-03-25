import "../css/options.css";

import $ from "jquery";
import * as configUtils from "./utils/config";
import { waitPromise } from "./utils/time";
import { ACTION_FORCE_SYNC } from "./utils/actions";

async function onConfigSaved(e) {
  const port = chrome.extension.connect({ name: "channel-sync-daemon" });
  const action = { type: ACTION_FORCE_SYNC };
  port.postMessage(action);
  const previousText = e.target.innerText;
  e.target.innerText = "✓ saved.";
  await waitPromise(750);
  e.target.innerText = previousText;
}

// Saves options to chrome.storage
async function saveOptions(e) {
  const strapiUrl = $("#strapi-url").val();
  const strapiJwt = $("#strapi-jwt").val();
  const customRootName = $("#custom-root-name").val();
  const autoSyncDelay = $("#auto-sync-delay").val();
  const newConfig = {
    strapiUrl,
    strapiJwt,
    customRootName,
    autoSyncDelay,
  };

  await configUtils.save(newConfig);
  await onConfigSaved(e);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
async function displayOptions() {
  const config = await configUtils.load({
    strapiUrl: "",
    strapiJwt: "",
    customRootName: "",
    autoSyncDelay: 1,
  });
  $("#strapi-jwt").val(config.strapiJwt);
  $("#strapi-url").val(config.strapiUrl);
  $("#custom-root-name").val(config.customRootName);
  $("#auto-sync-delay").val(config.autoSyncDelay);
}

async function restoreOptions(e) {
  await configUtils.clear();
  await displayOptions();
  await onConfigSaved(e);
}

document.addEventListener("DOMContentLoaded", displayOptions);
document.getElementById("save").addEventListener("click", saveOptions);
document.getElementById("restore").addEventListener("click", restoreOptions);
