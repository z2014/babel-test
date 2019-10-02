const hello = require("../services/hello");

module.exports = async ctx => {
  hello(ctx);
};
