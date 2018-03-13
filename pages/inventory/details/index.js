// pages/inventory/details/index.js
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
    // TODO 计算订单价格
    let order = JSON.parse(options.order);
    this.setData({
      orderInfo: order
    });
  },

  queryPrice: function() {
    let self = this;
    let order = self.data.orderInfo;
    req.get(config.api.order + '/calculate', 
      { 
        province: order.receiverProvince, 
        commodityId: order.commodityId,
        commodityQuantity: order.commodityQuanity
      })
      .then(res => res.data)
      .then(data => {
        if (data.success) {
          self.setData({ commodityInventory: data.data });
          self.data.orderInfo.commodityId = data.data.commodityId;
          self.data.orderInfo.inventory = data.data;
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