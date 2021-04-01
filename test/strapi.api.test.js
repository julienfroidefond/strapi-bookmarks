import StrapiHttpClient from "../src/js/strapi/api";
import { assert } from "chai";

const spy = { req: null };

const mockReturnRequestObject = { field1: "valueMocked" };

let paramValue = "";
const getHttpClient = isClientMocked => {
  const client = new StrapiHttpClient({ strapiUrl: "http://mock.test/", strapiJwt: "jwtMock" });
  if (!isClientMocked) return client;
  client.fetchStrapi = p => {
    paramValue = p;
    return new Promise(resolve => resolve(mockReturnRequestObject));
  };
  return client;
};

describe("StrapiHttpClient", () => {
  describe("#fetchStrapi()", () => {
    before(function () {
      const MockHeaders = class Headers {
        constructor() {}
        append(key, value) {
          spy.headerKey = key;
          spy.headerValue = value;
        }
      };
      const MockRequest = class Request {
        constructor(req) {
          spy.req = req;
        }
      };
      global.Request = MockRequest;
      global.Headers = MockHeaders;
      global.fetch = () =>
        new Promise(resolve => {
          resolve({ ok: true, json: () => mockReturnRequestObject });
        });
    });
    it("should fetchStrapi without error", async () => {
      const httpClient = getHttpClient(false);
      const mockFetch = await httpClient.fetchStrapi("fetchMock");
      assert.deepEqual(spy, {
        req: "http://mock.test/fetchMock",
        headerKey: "Authorization",
        headerValue: "Bearer jwtMock",
      });
      assert.deepEqual(mockFetch, mockReturnRequestObject);
    });
  });
  describe("#getBookmarks()", () => {
    it("should getBookmarks without error", async () => {
      const httpClient = getHttpClient(true);
      const mockFetch = await httpClient.getBookmarks();
      assert.deepEqual(mockFetch, mockReturnRequestObject);
      assert.equal(paramValue, "bookmarks");
    });
  });
  describe("#getBookmarksCount()", () => {
    it("should getBookmarksCount without error", async () => {
      const httpClient = getHttpClient(true);
      const mockFetch = await httpClient.getBookmarksCount();
      assert.deepEqual(mockFetch, mockReturnRequestObject);
      assert.equal(paramValue, "bookmarks/count");
    });
  });
  describe("#getTags()", () => {
    it("should getTags without error", async () => {
      const httpClient = getHttpClient(true);
      const mockFetch = await httpClient.getTags();
      assert.deepEqual(mockFetch, mockReturnRequestObject);
      assert.equal(paramValue, "tags?_sort=name:ASC");
    });
  });
  describe("#getTagsCount()", () => {
    it("should getTagsCount without error", async () => {
      const httpClient = getHttpClient(true);
      const mockFetch = await httpClient.getTagsCount();
      assert.deepEqual(mockFetch, mockReturnRequestObject);
      assert.equal(paramValue, "tags/count");
    });
  });
  describe("#getTagsCategories()", () => {
    it("should getTagsCategories without error", async () => {
      const httpClient = getHttpClient(true);
      const mockFetch = await httpClient.getTagsCategories();
      assert.deepEqual(mockFetch, mockReturnRequestObject);
      assert.equal(paramValue, "tags-categories?_sort=name:ASC");
    });
  });
  describe("#getTagsCategoriesCount()", () => {
    it("should getTagsCategoriesCount without error", async () => {
      const httpClient = getHttpClient(true);
      const mockFetch = await httpClient.getTagsCategoriesCount();
      assert.deepEqual(mockFetch, mockReturnRequestObject);
      assert.equal(paramValue, "tags-categories/count");
    });
  });
});
