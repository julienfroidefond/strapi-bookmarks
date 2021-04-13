/**
 * Browse through a tree and apply a given function on each of its nodes
 *
 * @param {array} tree The tree to dif
 * @param {function} fn The function to apply on each node
 * @param {object} parent The parent of current tree level
 * @param {*} parentResult The result of the function applied to the current parent
 *
 * @returns {Promise} A promise resolved when the tree has been fully digged
 */
export const browseTree = (tree, fn, parent = null, parentResult = null) =>
  Promise.all(
    tree.map(async elem => {
      const result = await fn(elem, parent, parentResult);
      if (!elem.childrens) return Promise.resolve();

      return browseTree(elem.childrens, fn, elem, result);
    }),
  );

/**
 * Compare trees to define if there are equal or not
 *
 * @param {array} treeA First tree to compare
 * @param {array} treeB Second tree to compare
 * @param {string} childrenKey The node key containing childrens
 * @param {function} compareFn Predicate to compare nodes, should return true if nodes are equal
 *
 * @returns {boolean} Return true if trees are equal based on the given predicate
 */
export const compareTrees = (treeA, treeB, childrenKey, compareFn) => {
  let result = true;
  for (const i in treeA) {
    // Node = differents
    if (!treeA[i] || !treeB[i] || !compareFn(treeA[i], treeB[i])) {
      return false;
    }
    if (treeA[i][childrenKey] && treeB[i][childrenKey]) {
      // Node = same + children presence different
      if (
        (!treeA[i][childrenKey] && treeB[i][childrenKey]) ||
        (treeA[i][childrenKey] && !treeB[i][childrenKey])
      )
        return false;
      // Deep compare
      if (!compareTrees(treeA[i][childrenKey], treeB[i][childrenKey], childrenKey, compareFn)) return false;
    }
  }
  return result;
};
