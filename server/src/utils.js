const { env, ENV } = plug("config");

exports.isProductionEnv = () => {
  return env === ENV.PRODUCTION;
};

exports.shouldExecuteReport = (isTST, debugReportEnable, isProduction) => {
  let shouldExecuteReport = false;
  if (!isTST && (isProduction || debugReportEnable)) {
    shouldExecuteReport = true;
  }
  return shouldExecuteReport;
};

exports.jsonResponse = (ctx, status, data) => {
    ctx.status = status;
    ctx.set('Content-Type', 'application/json');
    ctx.body = JSON.stringify(data);
};
