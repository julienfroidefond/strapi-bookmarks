module.exports = {
  env: {
    webextensions: true,
    browser: true,
    es2021: true,
    mocha: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
  ignorePatterns: ["utils/", "webpack.config.js", "build/"],
};
