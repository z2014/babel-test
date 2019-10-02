const tdbank = plug("api/tdbank");
const queryString = require("querystring");
const { GXT, appName } = plug("config");

const gxtReport = data => {
  const tdBankData = queryString.stringify(data);
  tdbank.send(GXT.GXT_BID, GXT.GXT_TID, tdBankData);
};

exports.requestStartPvReport = () => {
  gxtReport({
    attr: `${appName}_node`,
    val: 1,
    count: 1
  });
};

exports.requestEndPvReport = () => {
  gxtReport({
    attr: `${appName}_node_end`,
    val: 1,
    count: 1
  });
};

exports.nodeTimeReport = time => {
  gxtReport({
    attr: `${appName}_node_time`,
    val: time,
    count: 1
  });
};
