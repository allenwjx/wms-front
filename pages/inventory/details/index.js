// pages/inventory/details/index.js
import config from '../../../config'
import utils from '../../../utils/util'
import req from '../../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {},
    price: {},
    paymentType: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let order = JSON.parse(options.order);
    this.setData({
      orderInfo: order
    });
    // 计算订单价格
    this.queryPrice();
    // 判断当前登录用户的支付方式。
    let user = wx.getStorageSync('user');
    if (user.paymentType != 'ONLINE') {
      this.setData({
        paymentType: 1
      });
    }
  },
  /**
   * 查询订单价格。
   */
  queryPrice: function() {
    let self = this;
    let order = self.data.orderInfo;
    req.get(config.api.order + '/calculate', 
      { 
        province: order.receiverProvince, 
        commodityId: order.inventoryId,
        expressType: order.expressType,
        commodityQuantity: order.commodityQuanity
      })
      .then(res => res.data)
      .then(data => {
        if (data.success) {
          let result = data.data;
          let price = {
            firstPrice: result.firstPriceRmb,
            additionalPrice: result.additionalPriceRmb,
            total: result.totalRmb
          };
          self.setData({
            price: price
          });
        }
      });
  },
  /**
   * 如果是线上支付，则进行下单并跳转到支付页面
   */
  payment: function(e) {

  },
  /**
   * 如果是线下，直接跳转到下单成功页面。
   */
  submitOrder: function(e) {
    let self = this;
    self.data.orderInfo.firstWeightPrice = parseInt(self.data.price.firstPrice * 100);
    self.data.orderInfo.additionalWeightPrice = parseInt(self.data.price.additionalPrice * 100);
    self.data.orderInfo.totalPrice = parseInt(self.data.price.total * 100);
    req.get(config.api.order + '/create',
      self.data.orderInfo
    )
      .then(res => res.data)
      .then(data => {
        if (data.success) {
          let result = data.data;
          wx.navigateTo({
            url: '/pages/inventory/success/index?type=order'
          })
        }
      });
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