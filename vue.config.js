//vue.config.js
const fs = require(`fs`);

module.exports = {
  chainWebpack: config => {
    config.plugin(`html`).tap(args => {
      args[0].title = `STEM Discord`;
      return args;
    });
  },
  devServer: {
    port: 8443,
    https: process.env.PROD ? false : {
      key: fs.readFileSync(`./local/key.pem`),
      cert: fs.readFileSync(`./local/cert.pem`)},
    public: `https://localhost:8443`,
  },
  pluginOptions: {
    express: {
      shouldServeApp: true,
      serverDir: `./srv`,
    },
  },
};
