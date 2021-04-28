import { assert, expect } from "chai";
import StrapiHttpClient from "../../src/js/strapi/api";
import { strapiConfig } from "./data.test";

const spy = {};
const mockReturnRequestObject = { field1: "valueMocked" };

const standardMockAndTest = async (functionName, urlResult) => {
  const httpClient = new StrapiHttpClient(strapiConfig);
  const mockFetch = await httpClient[functionName]();
  assert.deepEqual(spy.url, `http://mock.test/${urlResult}`);
  assert.deepEqual(mockFetch, mockReturnRequestObject);
};

describe("strapi/api", () => {
  before(() => {
    global.fetch = (url, config) => {
      spy.url = url;
      spy.config = config;
      return new Promise(resolve => {
        resolve({ ok: true, json: () => new Promise(res => res(mockReturnRequestObject)) });
      });
    };
    global.FormData = class FormData {
      set(key, val) {
        this[key] = val;
      }
    };
  });
  describe("#fetchStrapi()", () => {
    it("should fetchStrapi without error", async () => {
      const httpClient = new StrapiHttpClient(strapiConfig);
      const mockFetch = await httpClient.fetchStrapi("fetchMock");
      assert.deepEqual(spy, {
        url: "http://mock.test/fetchMock",
        config: { method: "GET", headers: { Authorization: "Bearer jwtMock" } },
      });
      assert.deepEqual(mockFetch, mockReturnRequestObject);
    });
  });
  describe("standardGetters", () => {
    it("should getBookmarks without error", async () => {
      await standardMockAndTest("getBookmarks", "bookmarks");
    });
    it("should getBookmarksCount without error", async () => {
      await standardMockAndTest("getBookmarksCount", "bookmarks/count");
    });
    it("should getTags without error", async () => {
      await standardMockAndTest("getTags", "tags?_sort=name:ASC");
    });
    it("should getTagsCount without error", async () => {
      await standardMockAndTest("getTagsCount", "tags/count");
    });
    it("should getTagsCategories without error", async () => {
      await standardMockAndTest("getTagsCategories", "tags-categories?_sort=name:ASC");
    });
    it("should getTagsCategoriesCount without error", async () => {
      await standardMockAndTest("getTagsCategoriesCount", "tags-categories/count");
    });
  });
  describe("#auth()", () => {
    it("should auth without error", async () => {
      const httpClient = new StrapiHttpClient(strapiConfig);
      const login = "jfroidefond";
      const pwd = "123456789";
      const mockForm = new FormData();
      mockForm.set("identity", login);
      mockForm.set("password", pwd);

      await httpClient.auth(login, pwd);
      assert.deepEqual(spy.url, "http://mock.test/auth/local");
      assert.deepEqual(spy.config, { method: "POST", body: { identifier: login, password: pwd } });
    });

    it("should fail without login or empty", async () => {
      const httpClient = new StrapiHttpClient(strapiConfig);
      const login = "";
      const pwd = "123456789";
      const mockForm = new FormData();
      mockForm.set("identity", login);
      mockForm.set("password", pwd);

      expect(() => httpClient.auth(login, pwd)).to.throw();
    });
  });
  describe("#getFoldersTree()", () => {
    it("should getFoldersTree no tags filter without error", async () => {
      await standardMockAndTest("getFoldersTree", "folders/tree?no_empty_folders=true");
    });
    it("should getFoldersTree with tags filtering without error", async () => {
      const httpClient = new StrapiHttpClient(strapiConfig);
      await httpClient.getFoldersTree([1, 2]);
      assert.deepEqual(spy.url, "http://mock.test/folders/tree?tag_id_in=1,2&no_empty_folders=true");
    });
    it("should getFoldersTree empty tags without error", async () => {
      const httpClient = new StrapiHttpClient(strapiConfig);
      await httpClient.getFoldersTree([]);
      assert.equal(spy.url, "http://mock.test/folders/tree?no_empty_folders=true");
    });
  });
  describe("constructor", () => {
    it("should throw with no config", async () => {
      expect(() => new StrapiHttpClient()).to.throw();
    });
  });
});
