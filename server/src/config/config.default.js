module.exports = {
  appid: "1234",
  appkey: "12345",
  httpAddress: "0.0.0.0",
  httpPort: 8080,
  l5api: {
    // 项目用到的 l5，该字段被 TSW 识别，项目部署后，访问 ip:port/l5，既可以随意更改测试环境 l5 指向
    xxx: {
      modid: 6666666,
      cmd: 8888888
    }
  },
  appName: "BabelTest"
};
