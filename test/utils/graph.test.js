import { expect } from "chai";
import { compareTrees, compareBookmarkTress } from "../../src/js/utils/graph";
import { backendBookmarks, localBookmarks, singletonBookmark } from "./fixtures";

describe("utils/graph", () => {
  describe("#compareTrees", () => {
    const baseTree = [
      { title: "toto", foo: "bar" },
      {
        title: "tata",
        children: [
          { title: "toto" },
          { title: "toto", foo: "bar" },
          { title: "hey", children: [{ title: "toto", foo: "bar" }] },
          { foo: "bar" },
        ],
      },
    ];
    const wrongTreeMissingNode = [
      { title: "toto", foo: "bar" },
      {
        title: "tata",
        children: [
          { title: "toto" },
          { title: "toto", foo: "bar" },
          { title: "hey", children: [] },
          { foo: "bar" },
        ],
      },
    ];
    const wrongTreeDifferentNode = [
      { title: "toto", foo: "bar" },
      {
        title: "tata",
        children: [
          { title: "TOOOOTOOOO" },
          { title: "toto", foo: "bar" },
          { title: "hey", children: [{ title: "toto", foo: "bar" }] },
          { foo: "bar" },
        ],
      },
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

    it("should returns false when root item count are different", () => {
      const result = compareTrees(baseTree, [...baseTree, ...baseTree], "children", titleCompareFn);
      expect(result).to.be.false;
    });
  });

  describe("#compareBookmarkTrees", () => {
    it("should returns true when comparing 2 same tree (real dataset)", () => {
      const result = compareBookmarkTress(backendBookmarks, localBookmarks);
      expect(result).to.be.true;
    });

    it("should returns true if urls only differ on last '/'", () => {
      const treeA = singletonBookmark;
      const treeB = { ...treeA, url: `${treeA.url  }/` }
      const result = compareBookmarkTress([treeA], [treeB]);
      expect(result).to.be.true;
    });

    it("should returns false when title are different", () => {
      const treeA = singletonBookmark;
      const treeB = { ...treeA, title: 'Toto' }
      const result = compareBookmarkTress([treeA], [treeB]);
      expect(result).to.be.false;
    });

    it("should returns false when url are different", () => {
      const treeA = singletonBookmark;
      const treeB = { ...treeA, url: 'https://www.example.com' }
      const result = compareBookmarkTress([treeA], [treeB]);
      expect(result).to.be.false;
    });

    it("should returns false when root item count are different", () => {
      const treeA = singletonBookmark;
      const result = compareBookmarkTress([treeA], [treeA, treeA]);
      expect(result).to.be.false;
    });

    it("should returns false when children are different", () => {
      const treeA = { title: 'Folder A', children: [singletonBookmark] }
      const treeB = { title: 'Folder A', children: [singletonBookmark, singletonBookmark] }
      const result = compareBookmarkTress([treeA], [treeB]);
      expect(result).to.be.false;
    });

    it("should returns false when node type are different (bookmark vs folder)", () => {
      const treeA = singletonBookmark;
      const treeB = { ...treeA, url: undefined, children: [treeA] }
      const result = compareBookmarkTress([treeA], [treeB]);
      expect(result).to.be.false;
    });
  });
});
