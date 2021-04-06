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
    title: "Undefined category",
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

export const classicalFolders = [
  {
    id: 1,
    name: "A",
    parent: null,
    created_at: "2021-04-02T20:52:42.989Z",
    updated_at: "2021-04-02T21:16:15.966Z",
    bookmarks: [
      {
        id: 1,
        title: "B1",
        url: "http://dzad.fr",
        description: null,
        created_at: "2021-04-02T20:51:22.590Z",
        updated_at: "2021-04-02T21:15:26.871Z",
      },
    ],
    children: [
      {
        id: 2,
        name: "B",
        parent: {
          id: 1,
          name: "A",
          parent: null,
          created_at: "2021-04-02T20:52:42.989Z",
          updated_at: "2021-04-02T21:16:15.966Z",
        },
        created_at: "2021-04-02T20:52:52.566Z",
        updated_at: "2021-04-02T21:16:25.494Z",
        bookmarks: [
          {
            id: 2,
            title: "B2",
            url: "http://fezfzefz.fez",
            description: null,
            created_at: "2021-04-02T20:52:15.527Z",
            updated_at: "2021-04-02T21:15:35.603Z",
          },
          {
            id: 3,
            title: "B3",
            url: "http://dadazdaf.fre",
            description: null,
            created_at: "2021-04-02T20:52:30.298Z",
            updated_at: "2021-04-02T21:15:42.543Z",
          },
        ],
        children: [
          {
            id: 4,
            name: "D",
            parent: {
              id: 2,
              name: "B",
              parent: 1,
              created_at: "2021-04-02T20:52:52.566Z",
              updated_at: "2021-04-02T21:16:25.494Z",
            },
            created_at: "2021-04-02T20:53:21.341Z",
            updated_at: "2021-04-02T21:16:36.852Z",
            bookmarks: [
              {
                id: 2,
                title: "B2",
                url: "http://fezfzefz.fez",
                description: null,
                created_at: "2021-04-02T20:52:15.527Z",
                updated_at: "2021-04-02T21:15:35.603Z",
              },
            ],
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "C",
    parent: null,
    created_at: "2021-04-02T20:53:03.600Z",
    updated_at: "2021-04-02T21:16:31.834Z",
    bookmarks: [
      {
        id: 2,
        title: "B2",
        url: "http://fezfzefz.fez",
        description: null,
        created_at: "2021-04-02T20:52:15.527Z",
        updated_at: "2021-04-02T21:15:35.603Z",
      },
    ],
    children: [],
  },
];

export const classicalFoldersExpectedResult = [
  {
    id: 1,
    type: "directory",
    title: "A",
    childrens: [
      { id: 1, title: "B1", url: "http://dzad.fr", type: "bookmark" },
      {
        id: 2,
        type: "directory",
        title: "B",
        childrens: [
          { id: 2, title: "B2", url: "http://fezfzefz.fez", type: "bookmark" },
          { id: 3, title: "B3", url: "http://dadazdaf.fre", type: "bookmark" },
          {
            id: 4,
            type: "directory",
            title: "D",
            childrens: [{ id: 2, title: "B2", url: "http://fezfzefz.fez", type: "bookmark" }],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    type: "directory",
    title: "C",
    childrens: [{ id: 2, title: "B2", url: "http://fezfzefz.fez", type: "bookmark" }],
  },
];

export const strapiConfig = { strapiUrl: "http://mock.test/", strapiJwt: "jwtMock" };
