export default class StrapiHttpClient {
  constructor(config) {
    if (!config) throw new Error("Strapi client could not be invoked without a configuration");

    this.routeBase = config.strapiUrl;
    this.jwt = config.strapiJwt;
  }

  fetchStrapi(path) {
    return fetch(this.routeBase + path, {
      method: "GET",
      headers: { Authorization: `Bearer ${this.jwt}` },
    }).then(response => {
      if (!response.ok) throw new Error("Fail to fetch Strapi server");
      return response.json();
    });
  }

  getFoldersTree(tagIds) {
    if (tagIds && tagIds.length > 0) {
      return this.fetchStrapi(
        `folders/tree?tag_id_in=${tagIds.reduce(
          (acc, val) => `${acc},${val.toString()}`,
        )}&no_empty_folders=true`,
      );
    }
    return this.fetchStrapi(`folders/tree?no_empty_folders=true`);
  }

  getBookmarks() {
    return this.fetchStrapi("bookmarks");
  }

  getBookmarksCount() {
    return this.fetchStrapi("bookmarks/count");
  }

  getTags() {
    return this.fetchStrapi("tags?_sort=name:ASC");
  }

  getTagsCount() {
    return this.fetchStrapi("tags/count");
  }

  getTagsCategories() {
    return this.fetchStrapi("tags-categories?_sort=name:ASC");
  }

  getTagsCategoriesCount() {
    return this.fetchStrapi("tags-categories/count");
  }
}
