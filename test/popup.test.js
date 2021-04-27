import { JSDOM } from "jsdom";
import chrome from "sinon-chrome/extensions";
import sinon from "sinon";
import { readFileSync } from "fs";
import path from "path";
import { assert } from "chai";
import * as configUtils from "../src/js/utils/config";
import * as actionUtils from "../src/js/utils/actions";

const jsonPath = path.join(__dirname, "..", "src", "popup.html");
const jsonString = readFileSync(jsonPath, "utf8");

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
    it("should route on signin", async () => {
      // eslint-disable-next-line global-require
      const { init } = require("../src/js/popup.core");

      await init();

      const bodyClasses = global.document.getElementById("root").classList.value;

      assert(bodyClasses === "route-signin", "first route should be sign in");
    });
  });
});
