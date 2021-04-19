import { expect } from "chai";
import chrome from "sinon-chrome/extensions";
import bookmarkHandler from "../src/js/bookmarkHandler";

const DEFAULT_ROOT_NAME = "My root folder";
const FOLDER_ID_EXISTING = "12345678-existing";
const FOLDER_ID_CREATED = "12345678-created";

describe("bookmarkHandler", () => {
  let backupChrome;
  before(() => {
    backupChrome = global.chrome;
    global.chrome = chrome;
  });

  after(() => {
    chrome.flush();
    global.chrome = backupChrome;
  });

  describe("#getOrCreateRoot", () => {
    beforeEach(() => {
      chrome.flush();
      chrome.bookmarks.get.yields([{ id: FOLDER_ID_EXISTING }]);
      chrome.bookmarks.create.yields({ id: FOLDER_ID_CREATED });
    });

    afterEach(() => {
      chrome.reset();
    });

    it("should return right folder from given rootBookmarkId when it exists", async () => {
      const result = await bookmarkHandler.getOrCreateRoot(FOLDER_ID_EXISTING, DEFAULT_ROOT_NAME);
      expect(result).to.equal(FOLDER_ID_EXISTING);
    });

    it("should return a new folder if no rootbookmarkId provided", async () => {
      const result = await bookmarkHandler.getOrCreateRoot(null, DEFAULT_ROOT_NAME);
      expect(result).to.equal(FOLDER_ID_CREATED);
    });

    it("should return a new folder if provided rootbookmarkId cannot be resolved", async () => {
      chrome.bookmarks.get.yields([]);
      const result = await bookmarkHandler.getOrCreateRoot(FOLDER_ID_EXISTING, DEFAULT_ROOT_NAME);
      expect(result).to.equal(FOLDER_ID_CREATED);
    });
  });
});
