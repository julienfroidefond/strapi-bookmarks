import $ from "jquery";

import "../img/screenshot.jpg";
import "../css/popup.css";
import firebaseHandler from "./firebase";
import initData from "./initData";

let rootBookmarkName = "xp client";

chrome.storage.local.get(["customRootBookmarkName"], result => {
  const rootName = result.customRootBookmarkName;
  if (rootName) rootBookmarkName = rootName;
});

var port = chrome.extension.connect({
  name: "Bookmarks Communication",
});

const checkItems = selectedTags => {
  $(".tag").removeClass("checked");
  for (let i in selectedTags) {
    $("[data-id=" + i + "]").addClass("checked");
  }
};

const parseMenu = (rootDomNode, menu) => {
  for (let i in menu) {
    const item = menu[i];
    if (!item.parentId)
      $(rootDomNode).append(
        `<span class="badge tag" data-id="${item.id}">${item.title}</span>`,
      );
  }
  $(rootDomNode)
    .find(".tag")
    .each((index, element) => {
      $(element).click(e => {
        e.preventDefault();
        const id = $(e.target).attr("data-id");
        const label = $(e.target).text();
        //Remind preferences
        chrome.storage.local.get(["selectedTags"], result => {
          let selectedTags = result.selectedTags || {};
          if (selectedTags[id]) {
            //removeBookmarks(id);
            delete selectedTags[id];
          } else {
            //createBookmarks(id);
            selectedTags = { ...selectedTags, [id]: label };
          }
          console.log("selectedTags", selectedTags);
          chrome.storage.local.set({ selectedTags });
          checkItems(selectedTags);

          port.postMessage({ event: "syncBookmarks" });
        });
      });
    });
};

//reset ::: chrome.storage.local.set({ selectedTags: {} });
// const menu = $("#menu-tags");
// parseMenu(menu, links);
// chrome.storage.local.get(["selectedTags"], result => {
//   const selectedTags = result.selectedTags || {};
//   checkItems(selectedTags);
// });
let timeout = null;
$(document).ready(() => {
  chrome.storage.local.get(["customRootBookmarkName"], result => {
    const rootName = result.customRootBookmarkName;
    if (rootName) $("#custom-root-name").val(rootName);
  });
  $("#custom-root-name").keydown(e => {
    clearTimeout(timeout);

    timeout = setTimeout(function () {
      chrome.storage.local.set(
        {
          customRootBookmarkName: $(e.currentTarget).val(),
        },
        () => port.postMessage({ event: "updateRootBookmarkName" }),
      );
    }, 1000);
  });
});

firebaseHandler.getBookmarks(linksFromStorage => {
  const menu = $("#menu-tags");
  console.log(linksFromStorage);
  parseMenu(menu, linksFromStorage);
  chrome.storage.local.get(["selectedTags"], result => {
    const selectedTags = result.selectedTags || {};
    checkItems(selectedTags);
  });

  //Trying to check already present items
  chrome.bookmarks.search({ title: rootBookmarkName }, rootNodes => {
    const rootNode = rootNodes[0];
    for (let i in linksFromStorage) {
      const item = linksFromStorage[i];
      chrome.bookmarks.search({ title: item.title }, searches => {
        const search = searches[0];
        if (search) {
          chrome.storage.local.get(["selectedTags"], result => {
            let selectedTags = result.selectedTags || {};
            if (search.parentId === rootNode.id && !selectedTags[i]) {
              console.log("force selection", search);
              $("[data-id=" + item.id + "]").addClass("checked");
              selectedTags = {
                ...selectedTags,
                [item.id]: search.title,
              };
              chrome.storage.local.set({
                selectedTags,
              });
            }
          });
        }
      });
    }
  });
  port.postMessage({ event: "syncBookmarks" });

  $(".all-badges").click(e => {
    chrome.storage.local.get(["selectedTags"], result => {
      if (
        !result.selectedTags ||
        Object.keys(result.selectedTags).length == 0
      ) {
        let selectedTags = {};
        for (let i in linksFromStorage) {
          const item = linksFromStorage[i];
          const label = item.title;
          //Remind preferences
          selectedTags = {
            ...selectedTags,
            [item.id]: label,
          };
        }
        chrome.storage.local.set({
          selectedTags,
        });
        $(".tag").addClass("checked");
      } else {
        chrome.storage.local.set({ selectedTags: {} });
        $(".tag").removeClass("checked");
      }
      port.postMessage({ event: "syncBookmarks" });
    });
    port.postMessage({ event: "syncBookmarks" });
  });

  $(".push").click(() => {
    firebaseHandler.setBookmarks(initData);
    port.postMessage({ event: "syncBookmarks" });
  });
  $("#show-submit").click(e => {
    $("#submit-form").show();
    $(e.target).hide();
  });
  $("#submit-form").submit(e => {
    e.preventDefault();
    firebaseHandler.sendSuggestion(
      {
        title: $("#title").val(),
        url: $("#url").val(),
      },
      hasBeenSent => {
        $("#submit-form").html(
          hasBeenSent
            ? "<p>Thank you ! Suggestion registered</p>"
            : "<p>Suggestion already present in db</p>",
        );
      },
    );
  });
});
