export const showById = eltId => {
  document.getElementById(eltId).classList.display = "block";
};

export const hideById = eltId => {
  document.getElementById(eltId).classList.display = "none";
};

export const setHtmlById = (eltId, html) => {
  document.getElementById(eltId).innerHTML = html;
};
