const DEFAULT_ROOT_BOOKMARK_NAME = "Strapi bookmarks";
const DEFAULT_STRAPI_URL = "https://bookmarks-cms.herokuapp.com/"; // TODO : fix defaults
const DEFAULT_STRAPI_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE1OTgxODU5LCJleHAiOjE2MTg1NzM4NTl9.06YN9zo3e5sg9zmuuRj-UvmoabMHLClcK1jpb6iKlH4";
const DEFAULT_AUTO_SYNC_DELAY = 1;

export const defaultConfig = {
  strapiUrl: DEFAULT_STRAPI_URL,
  strapiJwt: DEFAULT_STRAPI_JWT,
  customRootName: DEFAULT_ROOT_BOOKMARK_NAME,
  autoSyncDelay: DEFAULT_AUTO_SYNC_DELAY,
  isConfigured: false,
  rootBookmarkId: null,
};

/**
 * Load configuration from chrome storage
 *
 * @param {object} defaultValues to merge with existing ones
 *
 * @returns {Promise} Promise resolving the last persisted configuration
 */
export const load = (defaultValues = defaultConfig) =>
  new Promise(resolve => {
    chrome.storage.sync.get(defaultValues, result => {
      const filledWithDefaultValues = Object.keys(result).reduce((agg, curr) => {
        const aggregat = agg;
        aggregat[curr] = result[curr] || defaultConfig[curr];
        return aggregat;
      }, {});
      resolve(filledWithDefaultValues);
    });
  });

/**
 * Persist configuration to chrome storage
 *
 * Note: will auto set isConfigured=true
 *
 * @param {object} config - the config object to save
 * @param {number} [config.autoSyncDelay] - delay between sync job in ms
 * @param {string} [config.customRootName] - root bookmark folder
 * @param {} [config.rootBookmarkId] - last root bookmark folder id (chrome id)
 * @param {} [config.strapiJwt] - strapi server jwt
 * @param {} [config.strapiUrl] - strapi server url
 *
 * @returns {Promise} Promise resolved when config is saved
 */
export const save = config =>
  new Promise(resolve => {
    const { autoSyncDelay, customRootName, rootBookmarkId, strapiJwt, strapiUrl } = config;
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
