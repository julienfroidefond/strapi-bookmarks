import { assert } from "chai";

import chrome from "sinon-chrome/extensions";
import { waitPromise } from "../src/js/utils/time";

describe("Time", () => {
  before(() => {
    global.chrome = chrome;
  });

  describe("#load()", () => {
    it("should wait 200ms without error", async () => {
      await waitPromise(200);
      // assert todo
    });
  });
});
