import "../img/xpclient-16.png";
import "../img/xpclient-48.png";
import "../img/xpclient-128.png";

import firebaseHandler from "./firebase";

let links;
let currentIdMappings = {};
let rootBookmarkName = "xp client";
let nodeChangedToSync = [];

const syncRootBookmarkName = () => {
  chrome.storage.local.get(["customRootBookmarkName"], result => {
    const rootName = result.customRootBookmarkName;
    if (rootName) rootBookmarkName = rootName;
  });
};
syncRootBookmarkName();

/**
 * Syncing the tags selected
 */
const syncByPreferences = () => {
  chrome.storage.local.get(["currentIdMappings"], settings => {
    currentIdMappings = settings.currentIdMappings || {};
    syncBookmarks();
    updateBookmarks();
  });
};

/**
 * Connect to popup and launch the sync by pref
 */
chrome.extension.onConnect.addListener(function (port) {
  console.log("Connected .....");
  port.onMessage.addListener(function (msg) {
    if (msg.event === "syncBookmarks") {
      console.log("syncBookmarks");
      syncByPreferences();
    } else if (msg.event == "updateRootBookmarkName") {
      syncRootBookmarkName();
    }
  });
});

/**
 * Recursively check links for changes
 * @param {array} linksInMemory Old links
 * @param {array} linksFromStorage New links
 */
const detectChildrenChanges = (linksInMemory, linksFromStorage) => {
  if (linksInMemory.length !== linksFromStorage.length) return true;
  for (let i in linksFromStorage) {
    const linkFromStorage = linksFromStorage[i];
    const link = linksInMemory[i];
    if (!link) return true;
    if (link) {
      if (
        linkFromStorage.title !== link.title ||
        linkFromStorage.url !== link.url ||
        linkFromStorage.id !== link.id
      ) {
        return true;
      }
      if (linkFromStorage.children)
        return detectChildrenChanges(link.children, linkFromStorage.children);
    }
  }
  return false;
};

/**
 * Detect if a change has been made
 * @param {array} linksInMemory Old links
 * @param {array} linksFromStorage New links
 */
const detectChanges = (linksInMemory, linksFromStorage) => {
  //TODO : Before to set the new links; we must compare it to detect changes. And in case of changes, we update the right rootnode
  const rootNodeChanged = [];
  if (linksInMemory) {
    for (let i in linksFromStorage) {
      const linkFromStorage = linksFromStorage[i];
      const link = linksInMemory[i];
      const hasChange = detectChildrenChanges([link], [linkFromStorage]);
      if (hasChange) rootNodeChanged.push(linkFromStorage);
    }
  }
  return rootNodeChanged;
};

/**
 * Sync datas from firebase
 */
firebaseHandler.getBookmarks(linksFromStorage => {
  nodeChangedToSync = detectChanges(links, linksFromStorage);

  links = linksFromStorage;

  //Trying to reconstruct idMappings
  chrome.bookmarks.search({ title: rootBookmarkName }, rootNodes => {
    const rootNode = rootNodes[0];
    for (let i in links) {
      const item = links[i];
      chrome.bookmarks.search({ title: item.title }, searches => {
        const search = searches[0];
        if (search) {
          chrome.storage.local.get(["currentIdMappings"], result => {
            let currentIdMappings = result.currentIdMappings || {};
            if (
              search.parentId === rootNode.id &&
              !currentIdMappings[item.id]
            ) {
              console.log("force selection", search);
              currentIdMappings = {
                ...currentIdMappings,
                [item.id]: search.id,
              };
              chrome.storage.local.set({
                currentIdMappings,
              });
            }
          });
        }
      });
    }
  });

  syncByPreferences();
});

/**
 * Determine if is a tag. If is a root node; it is a tag.
 * @param {string} id
 */
const isATag = id => {
  for (let i in links) {
    const link = links[i];
    if (id === link.id) {
      return true;
    }
  }
  return false;
};

/**
 * Get a bookmark by id
 * @param {string} id
 */
const getBookmarkById = id => {
  for (let i in links) {
    if (links[i].id === id) return links[i];
  }
};

/**
 * Creating the root bookmark. "xp client"
 * @param {array} selectedTags
 * @param {function} callback
 */
const createRootBookmarkNode = (selectedTags, callback) => {
  // if (Object.keys(selectedTags).length > 0) {
  chrome.storage.local.get(["rootBookmarkId"], result => {
    // if (result.rootBookmarkId) {
    //   callback(result.rootBookmarkId);
    // } else {
    chrome.bookmarks.search({ title: rootBookmarkName, url: null }, res => {
      const rootNode = res[0];
      if (res.length > 0) {
        callback(rootNode.id);
      } else {
        chrome.bookmarks.create(
          {
            parentId: "1",
            title: rootBookmarkName,
            index: 0,
          },
          rootNode => {
            console.log("root bookmark created =>", rootNode.id);
            //register id
            chrome.storage.local.set({
              rootBookmarkId: rootNode.id,
            });
            callback(rootNode.id);
          },
        );
      }
    });
    // }
  });
  // }
};

/**
 * Check the existence of a sub root bookmark. This exists for avoiding recreating on sync.
 * But on the other side if a link is on root, no way it is in a sub cat.
 * @param {*} bookmark
 * @param {*} cb
 */
const bookmarkExistsOnRoot = (bookmark, cb) => {
  chrome.bookmarks.search({ title: rootBookmarkName }, rootNodes => {
    const rootNode = rootNodes[0];
    chrome.bookmarks.search({ title: bookmark.title }, searches => {
      const res = searches[0];
      if (res && res.parentId === rootNode.id) {
        console.log("bookmark avoided =>", res.id, bookmark.id);
        cb(true);
      } else {
        cb(false);
      }
    });
  });
};

/**
 * Recursive function to create bookmarks and subsequent childs.
 * @param {string} rootNodeId
 * @param {Array} bookmarks
 */
const createSubBookMarks = (rootNodeId, bookmarks) => {
  for (let i in bookmarks) {
    const bookmark = bookmarks[i];
    //check if already exists by name / url + parentId = root
    bookmarkExistsOnRoot(bookmark, exists => {
      if (!exists)
        chrome.bookmarks.create(
          {
            parentId: rootNodeId.toString(),
            title: bookmark.title,
            url: bookmark.url,
          },
          bMark => {
            console.log("bookmark created =>", bMark.id, bookmark.id);
            if (isATag(bookmark.id)) currentIdMappings[bookmark.id] = bMark.id;
            chrome.storage.local.set({ currentIdMappings });
            if (bookmark.children && bMark)
              createSubBookMarks(bMark.id, bookmark.children);
          },
        );
    });
  }
};

/**
 * Ensure to delete a sub root node even if a async has come
 * @param {*} bookmark
 * @param {*} cb
 */
const getNodeToDelete = (bookmark, cb) => {
  chrome.bookmarks.search({ title: rootBookmarkName }, rootNodes => {
    const rootNode = rootNodes[0];
    chrome.bookmarks.search({ title: bookmark.title }, searches => {
      for (let i in searches) {
        const search = searches[i];
        if (search.parentId === rootNode.id) cb(search);
      }
    });
  });
};

/**
 * Remove e bookmark by id
 * @param {string} bookmarkIdTodel
 */
const removeBookmarks = bookmarkIdTodel => {
  const bookmarkId = currentIdMappings[bookmarkIdTodel];
  if (bookmarkId) {
    getNodeToDelete(getBookmarkById(bookmarkIdTodel), res => {
      if (res) chrome.bookmarks.removeTree(res.id);
    });
    chrome.bookmarks.removeTree(bookmarkId);
    delete currentIdMappings[bookmarkIdTodel];
    chrome.storage.local.set({ currentIdMappings });
    console.log("bookmark deleted =>", bookmarkId, bookmarkIdTodel);
  }
};

/**
 * Doing all the synchronization job
 */
const syncBookmarks = () => {
  chrome.storage.local.get(["selectedTags"], result => {
    const selectedTags = result.selectedTags || {};
    // console.log("currentIdMappings", currentIdMappings);
    // console.log("selectedTags", selectedTags);
    createRootBookmarkNode(selectedTags, rootNodeId => {
      //Here we just create if root node is not in scope; we have to update if firebase has change.
      for (let i in links) {
        const link = links[i];
        if (selectedTags[link.id]) {
          //has to be : To create if is not already done
          if (!currentIdMappings[link.id]) {
            createSubBookMarks(rootNodeId, { [link.id]: link });
          } else {
            //TODO : update if needed ?
          }
        } else {
          //To delete if already added
          if (currentIdMappings[link.id]) {
            removeBookmarks(link.id);
          }
        }
      }
    });
  });
};

/**
 * Update bookmarks
 */
const updateBookmarks = () => {
  if (nodeChangedToSync.length > 0) {
    for (let i in nodeChangedToSync) {
      const node = nodeChangedToSync[i];
      removeBookmarks(node.id);
    }
    createRootBookmarkNode(null, rootNodeId => {
      //Here we just create if root node is not in scope; we have to update if firebase has change.
      for (let i in nodeChangedToSync) {
        const node = nodeChangedToSync[i];
        createSubBookMarks(rootNodeId, { [node.id]: node });
      }
    });
  }
  nodeChangedToSync = [];
};

/**
 * Find the user by the email : check existence
 * @param {array} users Users
 * @param {string} email Email of user
 */
const findUserByEmail = (users, email) => {
  if (!email) return { user: null, position: null };
  for (let i in users) {
    const user = users[i];
    if (user.email === email) {
      return { user, position: i };
    }
  }
  return { user: null, position: null };
};

/**
 * Log in frebase the users by chrome instance id
 */
const logUserByInstanceId = () => {
  //Log user by instanceId
  firebaseHandler.getUsers(users => {
    chrome.instanceID.getID(instanceId => {
      chrome.identity.getProfileUserInfo(userProfileInfo => {
        const { email, id } = userProfileInfo;
        const { user, position } = findUserByEmail(users, email);
        if (!user) {
          const createdAt = new Date();
          users.push({
            lastInstanceId: instanceId,
            email,
            id,
            createdAt,
          });
        } else {
          if (email !== "" && id !== "")
            users[position] = {
              ...users[position],
              lastInstanceId: instanceId,
              email,
              id,
            };

          const updatedAt = new Date();
          users[position] = { ...users[position], updatedAt };
        }
        firebaseHandler.setUsers(users);
      });
    });
  });
};

chrome.runtime.onInstalled.addListener(() => {
  logUserByInstanceId();
  createRootBookmarkNode(null, () => {});
});

//reset prefs :::
// const reset = () => {
//   currentIdMappings = {};
//   chrome.storage.local.set({ currentIdMappings });
// }();
