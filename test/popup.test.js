import { JSDOM } from "jsdom";
import chrome from "sinon-chrome/extensions";
import sinon from "sinon";
import { readFileSync } from "fs";
import path from "path";
import * as configUtils from "../src/js/utils/config";
import * as actionUtils from "../src/js/utils/actions";
import { assert } from "chai";

var jsonPath = path.join(__dirname, "..", "src", "popup.html");
var jsonString = readFileSync(jsonPath, "utf8");

const dom = new JSDOM(jsonString);

sinon.stub(configUtils, "load").returns({ isConfigured: false });
sinon.stub(actionUtils, "postMessageAndWaitAck").returns(() => {});
sinon.stub(actionUtils, "postMessageAndWaitFor").returns({
  state: {
    error: "Error message",
  },
});

describe("popup.js", () => {
  before(function () {
    chrome.extension.connect = () => {};
    global.chrome = chrome;
    global.window = dom.window;
  });

  describe("init()", () => {
    it("should be in error", async () => {
      const { init } = require("../src/js/popup.core");

      await init();
      const forceSyncDomDisabledAttr = global.window.document
        .getElementsByClassName("force-sync")[0]
        .getAttribute("disabled");

      assert(forceSyncDomDisabledAttr === "disabled", "Force sync is disabled");
    });
  });
});