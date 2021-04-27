import "../css/options.css";

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

async function saveOptions(e) {
  const customRootName = document.getElementById("custom-root-name").value;
  const autoSyncDelay = document.getElementById("auto-sync-delay").value;

  const newConfig = {
    customRootName,
    autoSyncDelay,
  };

  await configUtils.save(newConfig);
  await onConfigSaved(e);
}

async function displayOptions() {
  const config = await configUtils.load({
    customRootName: "",
    autoSyncDelay: 1,
  });

  document.getElementById("custom-root-name").value = config.customRootName;
  document.getElementById("auto-sync-delay").value = config.autoSyncDelay;
}

async function restoreOptions(e) {
  await configUtils.clear();
  await displayOptions();
  await onConfigSaved(e);
}

document.addEventListener("DOMContentLoaded", displayOptions);
document.getElementById("save").addEventListener("click", saveOptions);
document.getElementById("restore").addEventListener("click", restoreOptions);
