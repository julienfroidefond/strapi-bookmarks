const handleResponse = response =>
  response.json().then(json => {
    if (!response.ok) {
      let status;
      if (Array.isArray(json.message)) {
        json.message.forEach(mes => {
          mes.messages.forEach(text => {
            status = `${status}${text.id} : ${text.message}<br />`;
          });
        });
      } else {
        status = json.message ? json.message : json;
      }
      return Promise.reject(status);
    }
    return json;
  });

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
    }).then(handleResponse);
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

  auth(login, password) {
    if (!login || !password)
      throw new Error("Trying to authenticate without login or password. This is not possible.");
    const authForm = new FormData();
    authForm.set("identifier", login);
    authForm.set("password", password);

    return fetch(`${this.routeBase}auth/local`, {
      method: "POST",
      body: authForm,
    }).then(handleResponse);
  }
}
