import { load, save, clear, defaultConfig } from "../src/js/utils/config";
import { assert } from "chai";

const spy = { req: null };

const mockedChrome = {
  storage: {
    sync: {
      get: (a, cb) => {
        cb(this.config || null);
      },
      set: (config, cb) => {
        this.config = config;
        cb(this.config);
      },
    },
  },
};

describe("config", () => {
  before(function () {
    global.chrome = mockedChrome;
  });
  it("should load without error", async () => {
    const conf = await load();
    assert.deepEqual(conf, { isConfigured: false });
  });
  it("should save without error", async () => {
    const conf = await save({ autoSyncDelay: "2000", customRootName: "customRootName" });
    assert.deepEqual(conf, {
      autoSyncDelay: "2000",
      customRootName: "customRootName",
      isConfigured: true,
      rootBookmarkId: undefined,
      strapiJwt: undefined,
      strapiUrl: undefined,
    });
  });

  it("should clear without error", async () => {
    const conf = await clear();
    assert.deepEqual(conf, defaultConfig);
  });
});
