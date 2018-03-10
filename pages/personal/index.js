// pages/me/index.js
const app = getApp()
var config = require('../../config.js')
var util = require('../../utils/util.js')

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
        wx.request({
          url: response.result.split('?')[0] + '?action=view',
          method: "GET",
          data: {
            commodityId: util.getUrlParam(response.result, 'commodityId'),
            serialNo: util.getUrlParam(response.result, 'serialNo')
          },
          success: function (response) {
            if (response.data.success) {
              var shipRecordDetails = JSON.stringify(response.data.data);
              wx.navigateTo({
                url: './check/index?shipRecordDetails=' + shipRecordDetails
              })
            } else {
              wx.navigateTo({
                url: '../message/fail?msg=' + response.data.errorMessage
              })
            }
          },
          fail: function (e) {
            console.log(e);
            wx.navigateTo({
              url: '../message/fail?msg=扫码验真失败'
            });
          }
        });
      }
    });
  }
})