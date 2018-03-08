// pages/personal/addr/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresses: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '我的地址' });
    let addresses = this.listAddresses();
    this.setData({ addresses: addresses });
  },

  /**
   * 加载该用户的发件地址
   */
  listAddresses: function () {
    let address1 = {
      name: '王俊翔',
      mobile: '18662586251',
      company: '同程旅游',
      province: '江苏省',
      city: '苏州市',
      region: '工业园区',
      address: '什么路',
      defaultSetting: true
    };
    let address2 = {
      name: '刘剑锋',
      mobile: '13711112222',
      company: '卓尔航货运',
      province: '上海市',
      city: '上海市',
      region: '闵行区',
      address: '三叉路',
      defaultSetting: false
    };
    var addresses = [];
    addresses.push(address1);
    addresses.push(address2);
    return addresses;
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