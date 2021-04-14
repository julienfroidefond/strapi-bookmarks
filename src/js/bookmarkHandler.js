const createRoot = rootBookmarkName =>
  new Promise(resolve => {
    chrome.bookmarks.create(
      {
        parentId: "1",
        title: rootBookmarkName,
        index: 0,
      },
      rootNode => {
        console.log("root bookmark created =>", rootNode.id);
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
      resolve(bookmarks[0].id);
    }),
  );

const getOrCreateRoot = (rootBookmarkId, rootBookmarkName) =>
  new Promise(async resolve => {
    if (!rootBookmarkId) {
      return resolve(await createRoot(rootBookmarkName));
    }
    const rootId = await getById(rootBookmarkId);
    if (rootId) return resolve(rootId);
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
      Promise.all(childrens.map(element => removeTree(element.id)))
        .then(resolve)
        .catch(reject);
    });
  });

const getRoot = () =>
  new Promise(resolve => {
    chrome.bookmarks.search({ title: config.rootBookmarkName }, rootNodes => {
      const rootNode = rootNodes[0];
      resolve(rootNode);
    });
  });

const categoriesCount = () =>
  getRoot().then(
    rootNode =>
      new Promise((resolve, reject) => {
        if (!rootNode) return reject("Cannot found root directory");
        chrome.bookmarks.getChildren(rootNode.id, treeNode => {
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
            for (const i in categories) {
              const category = categories[i];
              for (const j in category.children) {
                const tagChild = category.children[j];
                count += tagChild.children.length;
              }
            }
          }
          resolve(count);
        });
      }),
  );

const loadBookmarksTreeSafe = rootId =>
  new Promise(resolve => {
    if (!rootId) return resolve([]);
    chrome.bookmarks.getSubTree(rootId, results => {
      if (!results || results.length == 0) return resolve([]);
      resolve(results[0].children);
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
