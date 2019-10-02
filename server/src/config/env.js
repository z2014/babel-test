const fs = require("fs");
const envDir = "/usr/local/services/";

let getConstFromLocalFile = filename => {
  let value = null;
  const filePath = `${envDir}${filename}`;

  if (fs.existsSync(filePath)) {
    value = fs.readFileSync(filePath, "utf8").trim();
  }

  return value;
};

const ENV = {
  DEVELOPMENT: "development",
  TESTING: "test",
  PRE_RELEASE: "prerelease",
  PRODUCTION: "prod"
};

let env;
let location;

// docker 从环境变量里读取
const envFromProcess = process.env.XJ_ENV;
const locationFromProcess = process.env.XJ_LOCATION;

if (envFromProcess === ENV.TESTING) {
  env = envFromProcess;
  location = locationFromProcess;
} else {
  // idc 机器从织云配置文件获取
  env = getConstFromLocalFile("env");
  location = getConstFromLocalFile("location");
}

exports.env = env || ENV.DEVELOPMENT;
exports.location = location || "UNKNOWN";
exports.ENV = ENV;
