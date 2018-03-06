/**
 * 小程序配置文件
 */
var base = 'http://47.97.222.254:8080/wms/api';

var config = {
  // API接口
  api: {
    base,
    product: `${base}/data/product`,
    getGoodsList: `${base}/commodity/list`,
    getGoodsFilterList: `${base}/commodity/filterList`,
    getAgentList: `${base}/agent/list`,
    getAgentFilterList: `${base}/agent/filterList`,
    getManufacturerList: `${base}/manufacturer/list`,
  }
};

module.exports = config;
