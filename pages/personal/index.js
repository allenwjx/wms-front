const app = getApp()
var config = require('../../config.js')
var util = require('../../utils/util.js')
import req from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的' })
    this.setData({ userInfo: app.globalData.userInfo })
  },

  /**
   * 扫描商品上的二维码
   */
  doScan: function () {
    let that = this;
    wx.scanCode({
      success: (response) => {
        // 获取绑定商品信息
        let url = response.result.split('?')[0] + '?action=view';
        let commodityId = util.getUrlParam(response.result, 'commodityId');
        let serialNo = util.getUrlParam(response.result, 'serialNo');
        let param = {
          commodityId: commodityId,
          serialNo: serialNo
        };
        req.get(url, param).then(res => res.data).then(result => {
          if (result.success) {
            var shipRecordDetails = JSON.stringify(result.data);
            wx.navigateTo({ url: './check/index?shipRecordDetails=' + shipRecordDetails });
          } else {
            wx.navigateTo({ url: '../message/fail?msg=' + data.errorMessage });
          }
        });
      }
    });
  }
})