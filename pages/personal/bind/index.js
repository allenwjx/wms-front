// pages/goods/bind.js
const app = getApp()
var config = require('../../../config.js')
var util = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    customItem: '全部'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '货物绑定' })
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  loadData: function () {
    let that = this
    wx.request({
      url: config.api.getGoodsList,
      data: {},
      success: function (res) {
        if (res.data.success) {
          that.setData({ goodsList: res.data.data })
        }
      }
    })

    wx.request({
      url: config.api.getManufacturerList,
      data: {},
      success: function (res) {
        if (res.data.success) {
          that.setData({ manufacturerList: res.data.data })
        }
      }
    })
  },

  bindAgentChange: function (e) {
    let that = this;
    that.setData({
      agentIndex: e.detail.value,
      agentId: that.data.agentList[e.detail.value].id
    })
  },

  bindGoodsChange: function (e) {
    let that = this;
    that.setData({
      goodsIndex: e.detail.value,
      bindCommodityId: that.data.goodsList[e.detail.value].id
    })
  },

  bindManufacturerChange: function (e) {
    let that = this;
    that.setData({
      manufacturerIndex: e.detail.value
    })

    wx.request({
      url: config.api.getGoodsFilterList,
      data: { manufacturerId: that.data.manufacturerList[e.detail.value].id },
      success: function (res) {
        if (res.data.success) {
          that.setData({ goodsList: res.data.data })
        }
      }
    })
  },

  searchAgent: function () {
    wx.navigateTo({
      url: './agent/index'
    })
  },

  doScan: function () {
    let that = this;
    wx.scanCode({
      success: (res) => {
        console.log(res)
        wx.request({
          url: res.result.split('?')[0] + '?action=bind',
          method: "POST",
          data: {
            commodityId: util.getUrlParam(res.result, 'commodityId'),
            serialNo: util.getUrlParam(res.result, 'serialNo'),
            bindCommodityId: that.data.bindCommodityId,
            agentId: that.data.agent.id
          },
          success: function (res) {
            console.log(res)
            if (res.data.success) {
              wx.showToast({ title: '绑定成功' })
            }
          },
          fail: function (e) {
            console.log(e)
          }
        })
      }
    })
  }
})