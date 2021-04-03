import { compareTrees } from "../../src/js/utils/graph";
import { expect, assert } from "chai";

import chrome from "sinon-chrome/extensions";
import { match } from "sinon";


describe("utils/graph", () => {
  describe("#compareTrees", () => {

    const baseTree = [
      { title: "toto", foo: "bar" },
      { title: "tata", children: [
        { title: "toto" },
        { title: "toto", foo: "bar" },
        { title: "hey", children: [
          { title: "toto", foo: "bar" },
        ]},
        { foo: "bar" },
      ]}
    ];
    const wrongTreeMissingNode = [
      { title: "toto", foo: "bar" },
      { title: "tata", children: [
        { title: "toto" },
        { title: "toto", foo: "bar" },
        { title: "hey", children: []},
        { foo: "bar" },
      ]}
    ];
    const wrongTreeDifferentNode = [
      { title: "toto", foo: "bar" },
      { title: "tata", children: [
        { title: "TOOOOTOOOO" },
        { title: "toto", foo: "bar" },
        { title: "hey", children: [
          { title: "toto", foo: "bar" },
        ]},
        { foo: "bar" },
      ]}
    ];
    const titleCompareFn = (a, b) => a.title === b.title;

    it("should returns true when comparing 2 same tree (same refs)", () => {
      const result = compareTrees(baseTree, baseTree, "children", titleCompareFn);
      expect(result).to.be.true;
    });

    it("should returns true when comparing 2 same tree (different refs)", () => {
      const cloneBaseTree = JSON.parse(JSON.stringify(baseTree));
      const result = compareTrees(baseTree, cloneBaseTree, "children", titleCompareFn);
      expect(result).to.be.true;
    });

    it("should returns false when a node is missing", () => {
      const result = compareTrees(baseTree, wrongTreeMissingNode, "children", titleCompareFn);
      expect(result).to.be.false;
    });

    it("should returns false when a node is different", () => {
      const result = compareTrees(baseTree, wrongTreeDifferentNode, "children", titleCompareFn);
      expect(result).to.be.false;
    });
  })
});
