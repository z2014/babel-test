const { shouldExecuteReport, isProductionEnv } = require("../utils");
const {
  requestStartPvReport,
  requestEndPvReport,
  nodeTimeReport
} = require("../services/gxtReport");

module.exports = async (ctx, next) => {
  const startTime = Date.now();
  const isTST = ctx.isTST;
  const debugReportEnable = ctx.req.query.debugReport === "1";
  const isProduction = isProductionEnv();
  if (shouldExecuteReport(isTST, debugReportEnable, isProduction)) {
    requestStartPvReport();
    await next();
    requestEndPvReport();
    const endTime = Date.now();
    nodeTimeReport(endTime - startTime);
  } else {
    await next();
  }
};
