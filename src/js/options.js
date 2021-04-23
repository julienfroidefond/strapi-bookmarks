import "../css/options.css";

import * as configUtils from "./utils/config";
import { waitPromise } from "./utils/time";
import { ACTION_FORCE_SYNC } from "./utils/actions";
import StrapiHttpClient from "./strapi/api";

async function onConfigSaved(e, status) {
  const port = chrome.extension.connect({ name: "channel-sync-daemon" });
  const action = { type: ACTION_FORCE_SYNC };
  port.postMessage(action);
  const previousText = e.target.innerText;
  e.target.innerText = "✓ saved.";
  await waitPromise(750);
  e.target.innerText = previousText;

  document.getElementById("status").innerText = status;
  await waitPromise(2000);
  document.getElementById("status").innerText = "";
}

async function saveOptions(e) {
  const strapiUrl = document.getElementById("strapi-url").value;
  const customRootName = document.getElementById("custom-root-name").value;
  const autoSyncDelay = document.getElementById("auto-sync-delay").value;
  const login = document.getElementById("login").value;
  const password = document.getElementById("password").value;
  const httpClient = new StrapiHttpClient({
    strapiUrl,
    autoSyncDelay,
  });

  const config = await configUtils.load({ strapiJwt: "" });

  let { strapiJwt } = config;
  let status = "";
  if (password && password !== "" && login && login !== "") {
    const auth = await httpClient.auth(login, password);
    if (auth.jwt && auth.jwt !== "") {
      strapiJwt = auth.jwt;
      status = `Setting up new token : ${strapiJwt}`;
    }
  }

  const newConfig = {
    strapiUrl,
    strapiJwt,
    customRootName,
    autoSyncDelay,
    login,
    password,
  };

  await configUtils.save(newConfig);
  await onConfigSaved(e, status);
}

async function displayOptions() {
  const config = await configUtils.load({
    strapiUrl: "",
    customRootName: "",
    autoSyncDelay: 1,
    login: "",
    password: "",
  });

  document.getElementById("strapi-url").value = config.strapiUrl;
  document.getElementById("custom-root-name").value = config.customRootName;
  document.getElementById("auto-sync-delay").value = config.autoSyncDelay;
  document.getElementById("password").value = config.password;
  document.getElementById("login").value = config.login;
}

async function restoreOptions(e) {
  await configUtils.clear();
  await displayOptions();
  await onConfigSaved(e);
}

document.addEventListener("DOMContentLoaded", displayOptions);
document.getElementById("save").addEventListener("click", saveOptions);
document.getElementById("restore").addEventListener("click", restoreOptions);
