import StrapiHttpClient from "./api";

const UNDEFINED_CATEGORY_LABEL = "Undefined category";

/**
 * Mapping a folder to a chrome directory with bookmarks
 * @param {Object} folder folder from the server
 * @returns
 */
const mapServerFolder = folder => {
  const { id, name, bookmarks, children } = folder;
  let childrens = [];
  childrens = bookmarks.map(bookmark => ({
    id: bookmark.id,
    title: bookmark.title,
    url: bookmark.url,
    type: "bookmark",
  }));
  let childrenMapped = children.map(mapServerFolder);
  childrens.push(...childrenMapped);
  return {
    id,
    type: "directory",
    title: name,
    childrens,
  };
};

/**
 * Load and parse bookmarks tree from strapi
 *
 * @param {object} config Current extension config
 * @returns Object with structure [{ ..., type: 'directory', childrens: [ { type: 'bookmark', title: '..' } ] }]
 */
export async function loadBookmarksTree(config) {
  // Fetch all required info
  const httpClient = new StrapiHttpClient(config);
  const foldersTree = await httpClient.getFoldersTree();

  return foldersTree.map(mapServerFolder);
}
