import StrapiHttpClient from "./api";

/**
 * Mapping a folder to a chrome directory with bookmarks
 * @param {Object} folder folder from the server
 * @returns
 */
const mapServerFolder = folder => {
  const { id, name, bookmarks, children } = folder;
  let childrensBookmarks = [];
  const childrensFolders = [];

  const childrenMapped = children ? children.map(mapServerFolder) : [];
  childrensFolders.push(...childrenMapped);

  childrensBookmarks = bookmarks.map(bookmark => ({
    id: bookmark.id,
    title: bookmark.title,
    url: bookmark.url,
    type: "bookmark",
  }));

  return {
    id,
    type: "directory",
    title: name,
    children: [...childrensFolders, ...childrensBookmarks],
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

export default {};
