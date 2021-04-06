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

const sandbox = sinon.createSandbox();
const dom = new JSDOM(jsonString);

describe("popup.js", () => {
  before(() => {
    chrome.extension.connect = () => {};
    global.chrome = chrome;
    global.document = dom.window.document;

    sandbox.stub(configUtils, "load").returns({ isConfigured: false });
    sandbox.stub(actionUtils, "postMessageAndWaitAck").returns(() => {});
    sandbox.stub(actionUtils, "postMessageAndWaitFor").returns({
      state: {
        error: "Error message",
      },
    });
  });

  after(() => {
    sandbox.restore();
  });

  describe("init()", () => {
    it("should be in error", async () => {
      const { init } = require("../src/js/popup.core");

      await init();

      const forceSyncDomDisabledAttr = global.document.getElementById("force-sync").getAttribute("disabled");

      assert(forceSyncDomDisabledAttr === "disabled", "Force sync should be disabled");
    });
  });
});
