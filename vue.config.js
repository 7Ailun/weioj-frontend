const { defineConfig } = require("@vue/cli-service");
const { resolve } = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
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
