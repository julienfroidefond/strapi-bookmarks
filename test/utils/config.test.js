import { expect, assert } from "chai";

import chrome from "sinon-chrome/extensions";
import { match } from "sinon";
import { load, save, clear, defaultConfig } from "../../src/js/utils/config";

describe("utils/config", () => {
  before(() => {
    global.chrome = chrome;
  });

  describe("#load", () => {
    before(() => {
      // Setup empty storage
      chrome.storage.sync.get.yields(defaultConfig);
    });

    after(() => {
      chrome.storage.sync.get.reset();
    });

    it("should return a Promise resolving an object", async () => {
      const promise = load();
      const result = await promise;
      expect(promise).to.be.a("promise");
      expect(result).to.be.an("object");
    });

    it("should return isConfigured=false by default", async () => {
      const result = await load();
      expect(result).to.have.property("isConfigured").that.equal(false);
    });
  });

  describe("#save", () => {
    beforeEach(() => {
      chrome.storage.sync.set.yields({});
    });

    afterEach(() => {
      chrome.storage.sync.set.reset();
    });

    it("should returns a Promise", () => {
      const result = save();
      expect(result).to.be.a("promise");
    });

    it("should ignore unknown keys", async () => {
      const result = save({ autoSyncDelay: "2000", helloUnknown: "world" });
      await result;
      expect(chrome.storage.sync.set).to.have.been.calledWithMatch(match.has("autoSyncDelay", "2000"));
      expect(chrome.storage.sync.set).to.not.have.been.calledWithMatch(match.has("helloUnknown", "world"));
    });

    it("should accept ALL valid keys", async () => {
      const validKeys = ["autoSyncDelay", "customRootName", "rootBookmarkId", "strapiJwt", "strapiUrl"];
      const config = validKeys.reduce((agg, key) => ({ ...agg, [key]: "value" }), {});
      await save(config);
      expect(chrome.storage.sync.set).to.have.been.calledWithMatch(match(config));
    });
  });

  describe("#clear", () => {
    beforeEach(() => {
      chrome.storage.sync.set.yields({});
    });

    afterEach(() => {
      chrome.storage.sync.set.reset();
    });

    it("should return a promise", () => {
      const result = clear();
      expect(result).to.be.a("promise");
    });

    it("should clear without error", async () => {
      const result = clear();
      await result;
      expect(chrome.storage.sync.set).to.have.been.calledWith(defaultConfig);
    });
  });
});
