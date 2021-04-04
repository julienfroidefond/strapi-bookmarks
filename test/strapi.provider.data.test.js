export const classicalTags = [
  {
    id: 1,
    name: "T1",
    tags_category: {
      id: 1,
      name: "directory 1",
      tags: ["string"],
      isExpanded: true,
    },
    isExpanded: false,
    bookmarks: [
      {
        id: 1,
        title: "B1",
        url: "http://B1.fr",
        description: null,
      },
    ],
  },
  {
    id: 2,
    name: "T2",
    tags_category: {
      id: 1,
      name: "directory 1",
      tags: ["string"],
      isExpanded: true,
    },
    isExpanded: false,
    bookmarks: [
      {
        id: 2,
        title: "B2",
        url: "http://B2.fez",
        description: null,
      },
    ],
  },
  {
    id: 3,
    name: "T3",
    tags_category: null,
    isExpanded: false,
    bookmarks: [
      {
        id: 3,
        title: "B3",
        url: "http://B3.fre",
        description: null,
      },
    ],
  },
];

export const classicalTagsExpectedResult = [
  {
    type: "directory",
    title: "directory 1",
    id: 1,
    childrens: [
      {
        id: 1,
        title: "T1",
        type: "directory",
        childrens: [{ id: 1, title: "B1", url: "http://B1.fr", type: "bookmark" }],
      },
      {
        id: 2,
        title: "T2",
        type: "directory",
        childrens: [{ id: 2, title: "B2", url: "http://B2.fez", type: "bookmark" }],
      },
    ],
  },
  {
    type: "directory",
    id: -1,
    title: undefined,
    childrens: [
      {
        id: 3,
        title: "T3",
        type: "directory",
        childrens: [{ id: 3, title: "B3", url: "http://B3.fre", type: "bookmark" }],
      },
    ],
  },
];
