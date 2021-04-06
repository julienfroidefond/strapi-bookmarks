import StrapiHttpClient from "./api";

const UNDEFINED_CATEGORY_LABEL = "Undefined category";

const mapServerFolder = folder => {
  const { id, name, bookmarks, children } = folder;
  let childrens = [];
  childrens = bookmarks.map(bookmark => ({ id: bookmark.id, itle: bookmark.title, url: bookmark.url }));
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
