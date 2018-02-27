/**
 * 小程序配置文件
 */

var base = 'http://47.97.222.254:8080/wms/api';

var config = {

    // API接口
    api: {
        base,
        bind: `${base}/bind`,
        product: `${base}/data/product`,
        getGoodsList: `${base}/commodity/list`,
        getAgentList: `${base}/agent/list`,
    }
};

module.exports = config;
