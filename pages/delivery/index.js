// pages/send/index.js
let initSender = { name: '姓名', city: '城市', addr: '发件地址'};
let reciverSender = { name: '姓名', city: '城市', addr: '发件地址' };
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sender: initSender,
    reciever: reciverSender
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({ title: '寄快递' })
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

  addPoster: function(event) {
    let posterType = event.currentTarget.dataset.type;
    if (posterType == 1) {
      wx.navigateTo({
        url: './sender/index'
      });
    } else {
      wx.navigateTo({
        url: './reciever/index'
      });
    }
    
  }
})