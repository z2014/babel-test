module.exports = async (ctx, next) => {
  const headers = ctx.req.headers;
  const tstUAReg = /Tencent_Security_Team/;
  const tstHeaderReg = /TST\(Tencent Security Team\)/;
  ctx.isTST =
    tstUAReg.test(headers["user-agent"]) ||
    tstHeaderReg.test(headers["Tencent-Leakscan"]);
  await next();
};
