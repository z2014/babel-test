const Koa = require("koa");
const path = require("path");
const { env, ENV } = plug("config");
const app = new Koa();
const router = require("./router");
const render = require("koa-art-template");
const { isTST, report } = require("./middleWares");

app
  .use(isTST)
  .use(report)
  .use(router.routes())
  .use(router.allowedMethods());

render(app, {
  root: path.resolve(__dirname, "./view"),
  extname: ".html",
  debug: env !== ENV.PRODUCTION,
  minimize: false
});

module.exports = app;
