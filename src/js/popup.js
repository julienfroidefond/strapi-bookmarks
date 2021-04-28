import {
  init,
  forceSyncClick,
  showDemo,
  signin,
  signout,
  register,
  routeToRegister,
  routeToSignin,
} from "./popup.core";

init();

document.getElementsByClassName("force-sync")[0].addEventListener("click", forceSyncClick);
document.getElementById("show-demo").addEventListener("click", showDemo);
document.getElementById("sign-in-button").addEventListener("click", signin);
document.getElementById("log-out").addEventListener("click", signout);
document.getElementById("register-button").addEventListener("click", register);
document.getElementById("register-link").addEventListener("click", routeToRegister);
document.getElementById("signin-link").addEventListener("click", routeToSignin);
