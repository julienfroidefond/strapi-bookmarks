export const showById = eltId => {
  document.getElementById(eltId).classList.display = "block";
};

export const hideById = eltId => {
  document.getElementById(eltId).classList.display = "none";
};

export const setHtmlById = (eltId, html) => {
  document.getElementById(eltId).innerHTML = html;
};

export const toggleDisableById = (eltId, enable) => {
  if (enable) document.getElementById(eltId).setAttribute("disabled", "disabled");
  else document.getElementById(eltId).removeAttribute("disabled");
};
