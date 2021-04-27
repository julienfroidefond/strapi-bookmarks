import { init, forceSyncClick, openOptionTab, showDemo, signin, signout } from "./popup.core";

init();

document.getElementsByClassName("force-sync")[0].addEventListener("click", forceSyncClick);
document.getElementsByClassName("btn-open-options")[0].addEventListener("click", openOptionTab);
document.getElementById("show-demo").addEventListener("click", showDemo);
document.getElementById("sign-in-button").addEventListener("click", signin);
document.getElementById("log-out").addEventListener("click", signout);
