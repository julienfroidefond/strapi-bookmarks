## [3.0.4](https://github.com/julienfroidefond/strapi-bookmarks/compare/v3.0.3...v3.0.4) (2021-04-20)


### Bug Fixes

* **bookmarkhandler:** config was not set ([2cf484e](https://github.com/julienfroidefond/strapi-bookmarks/commit/2cf484eb9c7d66fe3b542b177384cdfd5d163e0f))



## [3.0.3](https://github.com/julienfroidefond/strapi-bookmarks/compare/v3.0.2...v3.0.3) (2021-04-15)


### Bug Fixes

* **comparetree:** handle '/' difference on bookmark compare algo (tree) ([51791c7](https://github.com/julienfroidefond/strapi-bookmarks/commit/51791c7d6255540df941ad38a74c65dc417f627a)), closes [#87](https://github.com/julienfroidefond/strapi-bookmarks/issues/87)
* **tree:** resolves tree diff not working ([491cad5](https://github.com/julienfroidefond/strapi-bookmarks/commit/491cad5d443d963f7474241043eb5ac5972b7692)), closes [#85](https://github.com/julienfroidefond/strapi-bookmarks/issues/85)



## [3.0.2](https://github.com/julienfroidefond/strapi-bookmarks/compare/v3.0.1...v3.0.2) (2021-04-07)


### Bug Fixes

* **ui:** bad js on hide / show DOM elt ([5a07b91](https://github.com/julienfroidefond/strapi-bookmarks/commit/5a07b9147540a94a5eb6ffe4b8b8299a08987c20)), closes [#74](https://github.com/julienfroidefond/strapi-bookmarks/issues/74)



## [3.0.1](https://github.com/julienfroidefond/strapi-bookmarks/compare/v3.0.0...v3.0.1) (2021-04-07)


### Bug Fixes

* **strapiprovider:** bug when no children ([a7a789b](https://github.com/julienfroidefond/strapi-bookmarks/commit/a7a789bcf0517b7cfcd4cd7a0836d5c3e30f09f1))



# [3.0.0](https://github.com/julienfroidefond/strapi-bookmarks/compare/v2.3.2...v3.0.0) (2021-04-06)


### Bug Fixes

* **strapiapi:** handling no tags filtering ([f9d3cca](https://github.com/julienfroidefond/strapi-bookmarks/commit/f9d3ccacc65fc3a3ddcd09584c9cf429f77e498b)), closes [#39](https://github.com/julienfroidefond/strapi-bookmarks/issues/39)
* **strapiprovider:** missing type on bookmarks ([d33b335](https://github.com/julienfroidefond/strapi-bookmarks/commit/d33b33502019f44b9e302b96f7ff1854848d6973))
* **strapiprovider:** undefined category with no labels ([c233427](https://github.com/julienfroidefond/strapi-bookmarks/commit/c2334277920fac8e7deff06f9b7b40b80b2ce7b4)), closes [#62](https://github.com/julienfroidefond/strapi-bookmarks/issues/62)


### Documentation

* **readme:** removing roadmap ([7d5f17a](https://github.com/julienfroidefond/strapi-bookmarks/commit/7d5f17a46a9ca8fbef6e754cbbb49d9b050bb380))


### Features

* **strapiapi:** adding getFoldersTree ([e76d2e1](https://github.com/julienfroidefond/strapi-bookmarks/commit/e76d2e142a7811d13676e5499f1292f507f41c9f)), closes [#39](https://github.com/julienfroidefond/strapi-bookmarks/issues/39)
* **strapiprovider:** first attempt of folders consumption ([4190050](https://github.com/julienfroidefond/strapi-bookmarks/commit/419005078e6b43dc16a0a59fcaa59566d4434675))
* **strapiprovider:** folders handling ([be94e8f](https://github.com/julienfroidefond/strapi-bookmarks/commit/be94e8ff24a2a8165da85e7d44dc56c3a33d7827)), closes [#39](https://github.com/julienfroidefond/strapi-bookmarks/issues/39)
* **sync:** compare local & server tree to skip bookmarks sync when no diff found ([ce6f129](https://github.com/julienfroidefond/strapi-bookmarks/commit/ce6f1294de643b0e52532545905e0a76738a084f))


### BREAKING CHANGES

* **readme:** Before, we scrapped tag categories for folders; and now we moved to the new model
'folders'



