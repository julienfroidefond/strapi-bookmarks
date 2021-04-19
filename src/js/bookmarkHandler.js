import * as configUtils from "./utils/config";

const { log } = console;
let config = {};

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

const getById = bookmarkId =>
  new Promise(resolve =>
    chrome.bookmarks.get(bookmarkId, bookmarks => {
      if (!bookmarks || bookmarks.length === 0) {
        return resolve(null);
      }
      return resolve(bookmarks[0].id);
    }),
  );

const getOrCreateRoot = (rootBookmarkId, rootBookmarkName) =>
  new Promise(async resolve => {
    if (!rootBookmarkId) {
      resolve(await createRoot(rootBookmarkName));
    }
    const rootId = await getById(rootBookmarkId);
    if (rootId) resolve(rootId);
    resolve(await createRoot(rootBookmarkName));
  });

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

const getRoot = () =>
  new Promise(async resolve => {
    config = await configUtils.load();
    chrome.bookmarks.search({ title: config.rootBookmarkName }, rootNodes => {
      const rootNode = rootNodes[0];
      resolve(rootNode);
    });
  });

const categoriesCount = () =>
  getRoot().then(
    rootNode =>
      new Promise((resolve, reject) => {
        if (!rootNode) return reject(new Error("Cannot found root directory"));
        return chrome.bookmarks.getChildren(rootNode.id, treeNode => {
          resolve(treeNode ? treeNode.length : 0);
        });
      }),
  );

const bookmarksCount = () =>
  getRoot().then(
    rootNode =>
      new Promise(resolve => {
        chrome.bookmarks.getSubTree(rootNode.id, treeNode => {
          let count = 0;
          if (treeNode) {
            const categories = treeNode[0].children;
            categories.forEach(category => {
              category.children.forEach(tagChild => {
                count += tagChild.children.length;
              });
            });
          }
          resolve(count);
        });
      }),
  );

const loadBookmarksTreeSafe = rootId =>
  new Promise(resolve => {
    if (!rootId) return resolve([]);
    return chrome.bookmarks.getSubTree(rootId, results => {
      if (!results || results.length === 0) return resolve([]);
      return resolve(results[0].children);
    });
  });

export default {
  bookmarksCount,
  categoriesCount,
  createBMark,
  createDirectory,
  createRoot,
  getById,
  getOrCreateRoot,
  removeChildrens,
  removeRoot,
  loadBookmarksTreeSafe,
};
