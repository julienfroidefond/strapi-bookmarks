import { init, forceSyncClick, openOptionTab } from "./popup.core";

init();

document.getElementsByClassName("force-sync")[0].addEventListener("click", forceSyncClick);
document.getElementsByClassName("btn-open-options")[0].addEventListener("click", openOptionTab);
