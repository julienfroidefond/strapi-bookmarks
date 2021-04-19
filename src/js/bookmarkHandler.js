const { log } = console;

const createRoot = rootBookmarkName =>
  new Promise(resolve => {
    chrome.bookmarks.create(
      {
        parentId: "1",
        title: rootBookmarkName,
        index: 0,
      },
      rootNode => {
        log("root bookmark created =>", rootNode.id);
        // register id
        chrome.storage.local.set({
          rootBookmarkId: rootNode.id,
        });
        resolve(rootNode.id);
      },
    );
  });

/**
 * Return the bookmark/folder from its id
 *
 * @param {string} bookmarkId The folder or bookmark id to retreive
 * @returns {Promise} The resolved bookmark node
 */
const getById = bookmarkId =>
  new Promise(resolve => {
    chrome.bookmarks.get(bookmarkId, bookmarks => {
      if (!bookmarks || bookmarks.length === 0) {
        return resolve(null);
      }
      return resolve(bookmarks[0].id);
    });
  });

/**
 * Get or create a root folder from its id
 *
 * @param {string} rootBookmarkId The folder id to retreive
 * @param {string} rootBookmarkName The folder name to use if creation needed
 *
 * @returns {Promise} The resolved bookmark folder (found or created)
 */
const getOrCreateRoot = async (rootBookmarkId, rootBookmarkName) => {
  if (!rootBookmarkId) {
    return createRoot(rootBookmarkName);
  }
  const rootId = await getById(rootBookmarkId);
  if (rootId) return rootId;
  return createRoot(rootBookmarkName);
};

const createDirectory = (parentNodeId, title) =>
  new Promise(resolve => {
    chrome.bookmarks.create(
      {
        parentId: parentNodeId.toString(),
        title,
      },
      bMark => {
        // console.log("directory created =>", bMark.id);
        resolve(bMark);
      },
    );
  });

const createBMark = (directoryId, bookmark) =>
  new Promise(resolve => {
    chrome.bookmarks.create(
      {
        parentId: directoryId.toString(),
        title: bookmark.title,
        url: bookmark.url,
      },
      bMark => {
        // console.log("bookmark created =>", bMark.id, bookmark);
        resolve(bMark);
      },
    );
  });

const removeRoot = rootBookmarkName =>
  new Promise(resolve => {
    chrome.bookmarks.search({ title: rootBookmarkName }, rootNodes => {
      const rootNode = rootNodes[0];
      if (rootNode) chrome.bookmarks.removeTree(rootNode.id);
      resolve();
    });
  });

const removeTree = bookmarkId => new Promise(resolve => chrome.bookmarks.removeTree(bookmarkId, resolve));

const removeChildrens = bookmarkId =>
  new Promise((resolve, reject) => {
    chrome.bookmarks.getChildren(bookmarkId, childrens => {
      if (!childrens) return Promise.resolve([]);
      return Promise.all(childrens.map(element => removeTree(element.id)))
        .then(resolve)
        .catch(reject);
    });
  });

const loadBookmarksTreeSafe = rootId =>
  new Promise(resolve => {
    if (!rootId) return resolve([]);
    return chrome.bookmarks.getSubTree(rootId, results => {
      if (!results || results.length === 0) return resolve([]);
      return resolve(results[0].children);
    });
  });

export default {
  createBMark,
  createDirectory,
  createRoot,
  getById,
  getOrCreateRoot,
  removeChildrens,
  removeRoot,
  loadBookmarksTreeSafe,
};
