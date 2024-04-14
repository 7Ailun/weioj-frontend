const { defineConfig } = require("@vue/cli-service");
const { resolve } = require("path");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    config.plugin("monaco").use(new MonacoWebpackPlugin());
  },
  configureWebpack: {
    // 👇🏻 这个配置
    resolve: {
      symlinks: false,
      alias: {
        vue: resolve("./node_modules/vue"),
      },
    },
  },
});
