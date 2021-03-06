# Strapi bookmarks

[![Publish on chrome store](https://github.com/julienfroidefond/strapi-bookmarks/actions/workflows/release.yml/badge.svg)](https://github.com/julienfroidefond/strapi-bookmarks/actions/workflows/release.yml) ![Lines](https://img.shields.io/badge/Coverage-17.21%25-red.svg)

![screenshot](./src/img/ChromeStore/Strapi-Bookmarks-Extension-DarkBlue.png)

## Intro

This extension synchronize with a Strapi server. Cf cf https://github.com/julienfroidefond/bookmarks-cms for the server configured and good to ship.

![screenshot](./src/img/ChromeStore/screenshot.jpg)

![screenshot](./src/img/screenshot.jpg)

## Building for chrome

```
yarn
yarn build
```

After that, you will get in the `build` folder the files to put in chrome extension. Note : it gerates also the zip to ship on chroms web store.

## Starting developpment

### Start a strapi local server

- clone the repo at `https://github.com/julienfroidefond/bookmarks-cms`

```
yarn
yarn start
```

### Start the dev server

```
yarn
yarn start
```

Hot reloading for development, but step building is required.

### Attach the extension

- Open the Extension Management page by navigating to chrome://extensions.
- Remove existing xp-client-links extension
- Enable Developer Mode by clicking the toggle switch next to Developer mode.
- Click the "Load unpacked" button and select the extension directory.
- Select the build folder of your project

![Load Extension](docs/readme-chrome-extensions.webp "Enable developer mode & load unpacked extension")

That's it, when you edit your code, to be sure to see last update on your chrome, use the "reload extension" button on chrome://extensions.
