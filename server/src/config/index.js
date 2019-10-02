const defaultConfig = require("./config.default");
const devConfig = require("./config.development");
const testConfig = require("./config.testing");
const productConfig = require("./config.production");
const { env, ENV } = require("./env");
const logger = plug("logger");

let config;

switch (env) {
  case ENV.PRODUCTION: {
    config = {
      ...defaultConfig,
      ...productConfig
    };
    break;
  }
  case ENV.PRE_RELEASE: {
    config = {
      ...defaultConfig,
      ...productConfig,
      isTest: true
    };
    break;
  }
  case ENV.TESTING: {
    config = {
      ...defaultConfig,
      ...testConfig
    };
    break;
  }
  case ENV.DEVELOPMENT: {
    config = {
      ...defaultConfig,
      ...devConfig
    };
    break;
  }
}

config.router = {
  name: function(req) {
    // tsw 提供的 name 方法
    if (req.query && req.query.tswuid) {
      // 染色 uid
      const { tswuid } = req.query;
      logger.setKey(tswuid);
    }

    // mod_act，logger 中会用到，截取 pathname 前两级路径
    const modAct = req.REQUEST.pathname
      .slice(1)
      .split("/")
      .filter(item => {
        return item !== "";
      })
      .slice(0, 2)
      .join("/");
    return modAct === "" ? "/" : modAct;
  },
  find: function(name, req, res) {
    // tsw 提供的路由 find 方法，直接转向 app
    return require("../app");
  }
};

module.exports = {
  ...config,
  env,
  ENV,
  GXT: {
    GXT_BID: "b_sng_gdt_es_attr", // 观星台在 TDBank 的 BID
    GXT_TID: "gdt_fe" // 观星台在 TDBank 的 TID
  }
};
