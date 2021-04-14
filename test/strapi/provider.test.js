import { assert } from "chai";
import sinon from "sinon";
import StrapiHttpClient from "../../src/js/strapi/api";
import { loadBookmarksTree } from "../../src/js/strapi/provider";
import { classicalFoldersExpectedResult, classicalFolders, strapiConfig } from "./data.test";

describe("strapi/provider", () => {
  describe("#loadBookmarksTree()", () => {
    before(() => {
      sinon.stub(StrapiHttpClient.prototype, "getFoldersTree").returns(classicalFolders);
    });

    it("should loadBookmarksTree without error", async () => {
      const bookmarks = await loadBookmarksTree(strapiConfig);
      // console.log(JSON.stringify(bookmarks));
      assert.deepEqual(bookmarks, classicalFoldersExpectedResult);
    });
  });
});
