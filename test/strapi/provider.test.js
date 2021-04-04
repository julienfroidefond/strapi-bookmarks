import StrapiHttpClient from "../../src/js/strapi/api";
import { loadBookmarksTree } from "../../src/js/strapi/provider";
import { assert } from "chai";
import sinon from "sinon";
import { classicalTags, classicalTagsExpectedResult, strapiConfig } from "./data.test";

describe("strapi/provider", () => {
  describe("#loadBookmarksTree()", () => {
    before(() => {
      sinon.stub(StrapiHttpClient.prototype, "getTags").returns(classicalTags);
    });

    it("should loadBookmarksTree without error", async () => {
      const bookmarks = await loadBookmarksTree(strapiConfig);
      assert.deepEqual(bookmarks, classicalTagsExpectedResult);
    });
  });
});
