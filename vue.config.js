//vue.config.js
module.exports = {
  chainWebpack: config => {
    config.plugin(`html`).tap(args => {
      args[0].title = `STEM Discord`;
      return args;
    });
  },

  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: `./srv`,
    },
  },
};
