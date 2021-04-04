import StrapiHttpClient from "../src/js/strapi/api";
import { loadBookmarksTree } from "../src/js/strapi/provider";
import { assert } from "chai";
import sinon from "sinon";
import { classicalTags, classicalTagsExpectedResult } from "./strapi.provider.data.test";

describe("StrapiProvider", () => {
  describe("#loadBookmarksTree()", () => {
    before(() => {
      sinon.stub(StrapiHttpClient.prototype, "getTags").returns(classicalTags);
    });

    it("should loadBookmarksTree without error", async () => {
      const bookmarks = await loadBookmarksTree();
      assert.deepEqual(bookmarks, classicalTagsExpectedResult);
    });
  });
});
