import $ from "jquery";
import { init, forceSyncClick, openOptionTab } from "./popup.core";

init();

$(".force-sync").on("click", forceSyncClick);
$(".btn-open-options").on("click", openOptionTab);
