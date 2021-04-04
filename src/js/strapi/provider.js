import StrapiHttpClient from "./api";

const UNDEFINED_CATEGORY_LABEL = "Undefined category";

/**
 * Load and parse bookmarks tree from strapi
 *
 * @param {object} config Current extension config
 * @returns Object with structure [{ ..., type: 'directory', childrens: [ { type: 'bookmark', title: '..' } ] }]
 */
export async function loadBookmarksTree(config) {
  // Fetch all required info
  const httpClient = new StrapiHttpClient(config);
  const tags = await httpClient.getTags();

  // Prepare data
  const undefinedCategory = { id: -1, name: UNDEFINED_CATEGORY_LABEL, type: "directory" };
  const tagsByCategoryId = tags.reduce((agg, tag) => {
    const categoryId = [tag.tags_category ? tag.tags_category.id : -1];
    const categoryTags = agg[categoryId] || [];
    categoryTags.push({
      id: tag.id,
      title: tag.name,
      type: "directory",
      childrens: tag.bookmarks.map(({ id, title, url }) => ({ id, title, url, type: "bookmark" })),
    });

    return {
      ...agg,
      [categoryId]: categoryTags,
    };
  }, {});
  const categoriesById = tags.reduce((agg, tag) => {
    const category = tag.tags_category || undefinedCategory;
    if (agg[category.id]) return agg;

    return {
      ...agg,
      [category.id]: {
        type: "directory",
        title: category.name,
        id: category.id,
        childrens: tagsByCategoryId[category.id],
      },
    };
  }, {});

  return Object.values(categoriesById);
}
