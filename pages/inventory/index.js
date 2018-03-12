// pages/inventory/index.js
var config = require('../../config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchHints: [],
    inputShowed: false,
    inputVal: "",
    inventoryList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.queryInventory();

  },
  queryInventory: function () {
    var self = this;
    wx.request({
      url: config.api.inventory + '/list',
      method: "GET",
      // data: {
      //   name: name
      // },
      success: function (response) {
        console.log(response.data);
        if (response.data.success) {
          if (response.data.data){
            var inventoryList = JSON.stringify(response.data.data);
            self.setData({ inventoryList: inventoryList });
          } else {
            self.setData({ inventoryList: [] });
          }
        } else {
          console.log(response.data);
          // wx.navigateTo({
          //   url: '../message/fail?msg=' + response.data.errorMessage
          // })
        }
      },
      fail: function (e) {
        console.log(e);
        wx.navigateTo({
          url: '../message/fail?msg=获取库存数据失败.'
        });
      }
    });
  },
  
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.queryInventory(e.detail.value);
  },
  /**
   * 点击查询提示的条目
   */
  tapHint: function (e) {
    console.log(e);
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

  }
})