//vue.config.js
const fs = require(`fs`);

module.exports = {
  chainWebpack: config => {
    // https://github.com/vuejs/vue-next/issues/1414#issuecomment-648998826
    // this shit doesnt work
    // config.module
    //   .rule(`vue`)
    //   .use(`vue-loader`)
    //   .loader(`vue-loader`)
    //   .tap(options => {
    //     options.compilerOptions = {
    //       ...options.compilerOptions,
    //       isCustomElement: tag => /^ion-/.test(tag),
    //     };
    //     return options;
    //   });
    config.plugin(`html`).tap(args => {
      args[0].title = `STEM Discord`;
      return args;
    });
  },
  devServer: {
    port: 3000,
    https: (process.env.NO_HTTPS || process.env.PROD) ? false : {
      key: fs.readFileSync(`./local/key.pem`),
      cert: fs.readFileSync(`./local/cert.pem`)},
    public: `http${process.env.NO_HTTPS ? `` : `s`}://localhost:3000`,
  },
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: `./srv`,
    },
  },
};
