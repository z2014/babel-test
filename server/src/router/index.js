const Router = require("koa-router");
const router = new Router();
const helloController = require("../controllers/hello");

module.exports = router.get("/", helloController);
