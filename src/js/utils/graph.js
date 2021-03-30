export const browseTree = (tree, fn, parent = null, parentResult = null) =>
  Promise.all(
    tree.map(async elem => {
      const result = await fn(elem, parent, parentResult);
      if (!elem.childrens) return Promise.resolve();

      return browseTree(elem.childrens, fn, elem, result);
    }),
  );
