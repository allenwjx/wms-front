import config from '../config'

class Express {
  constructor() {
  }

  /**
   * 获取快递公司列表 
   */
  listExpresses() {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: config.api.options + '/ExpressTypeEnum',
        success: function (response) {
          if (response.data.success) {
            let expresses = response.data.data;
            resolve(expresses);
          }
        }
      });
    });
  }
}
export {Express};