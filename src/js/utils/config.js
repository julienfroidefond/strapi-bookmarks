const DEFAULT_ROOT_BOOKMARK_NAME = "Strapi bookmarks";
const DEFAULT_STRAPI_URL = "https://bookmarks-cms.herokuapp.com/"; // TODO : fix defaults
const DEFAULT_STRAPI_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE1OTgxODU5LCJleHAiOjE2MTg1NzM4NTl9.06YN9zo3e5sg9zmuuRj-UvmoabMHLClcK1jpb6iKlH4";
const DEFAULT_AUTO_SYNC_DELAY = 1;

const defaultConfig = {
  strapiUrl: DEFAULT_STRAPI_URL,
  strapiJwt: DEFAULT_STRAPI_JWT,
  customRootName: DEFAULT_ROOT_BOOKMARK_NAME,
  autoSyncDelay: DEFAULT_AUTO_SYNC_DELAY,
  isConfigured: false,
  rootBookmarkId: null,
};

export const load = (defaultValues = defaultConfig) =>
  new Promise(resolve => {
    chrome.storage.sync.get(defaultValues, result => {
      const filledWithDefaultValues = Object.keys(result).reduce((agg, curr) => {
        agg[curr] = result[curr] || defaultConfig[curr];
        return agg;
      }, {});
      resolve(filledWithDefaultValues);
    });
  });

export const save = data =>
  new Promise(resolve => {
    const {
      autoSyncDelay,
      customRootName,
      rootBookmarkId,
      strapiJwt,
      strapiUrl,
    } = data;
    chrome.storage.sync.set(
      {
        autoSyncDelay,
        customRootName,
        isConfigured: true,
        rootBookmarkId,
        strapiJwt,
        strapiUrl,
      },
      resolve,
    );
  });

export const clear = () => new Promise(resolve => chrome.storage.sync.set(defaultConfig, resolve));
