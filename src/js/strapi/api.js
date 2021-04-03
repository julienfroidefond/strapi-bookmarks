export default class StrapiHttpClient {
  constructor(config) {
    if (config) {
      this.routeBase = config.strapiUrl;
      this.jwt = config.strapiJwt;
    }
  }

  fetchStrapi(path) {
    const headers = new Headers();
    headers.append("Authorization", "Bearer " + this.jwt);
    return fetch(
      new Request(this.routeBase + path, {
        method: "GET",
        headers,
      }),
    ).then(response => {
      if (!response.ok) throw new Error("Fail to fetch Strapi server");
      return response.json();
    });
  }

  getFoldersTree(tagIds) {
    return this.fetchStrapi(`folders/tree?tag_id_in=${tagIds.reduce((acc, val) => `${acc},${val.toString()}`)}&no_empty_folders=true`);
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
