/**
 * 小程序配置文件
 */
// var base = 'http://47.97.222.254:8080/wms/api';
var base = 'http://127.0.0.1:8080/wms/api';

var config = {
  // API接口
  api: {
    base,
    product: `${base}/data/product`,
    expressList: `${base}/data/express`,
    getGoodsList: `${base}/commodity/list`,
    getGoodsFilterList: `${base}/commodity/filterList`,
    getAgentList: `${base}/agent/list`,
    getAgentFilterList: `${base}/agent/filterList`,
    getManufacturerList: `${base}/manufacturer/list`,
    options: `${base}/opt/enum`,
    address: `${base}/address`,
    defaultAddress: `${base}/address/default`,
    addressList: `${base}/address/list`,
    setDefaultAddress: `${base}/address/setDefault`,
    updateAddress: `${base}/address/update`,
    userLogin: `${base}/user/front/login`,
    userRegiste: `${base}/user/front/registe`,
  }
};

module.exports = config;
