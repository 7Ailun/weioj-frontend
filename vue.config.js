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
  /*  chainWebpack: (config) => {
      config.plugin("html").tap((args) => {
        args[0].title = "艾伦OJ判题平台";
        return args;
      });
    },*/
});
