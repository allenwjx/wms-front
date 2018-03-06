// pages/delivery/reciever/index.js
const regexSpecial = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
const regexProvince = /^(.*?(省|自治区))(.*?)$/;
const regex = /^(.*?[市]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
let reciever = {
  name: '',
  mobile: '',
  company: '',
  province: '',
  city: '',
  region: '',
  address: ''
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressLine: '江苏省 苏州市 工业园区',
    reciever: reciever
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '收件人' });
  },

  /**
   * 省市区
   */
  bingAddressTap: function () {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        var addressArray = [];

        function regexReciever(address, reciever) {
          var _addressArray = regex.exec(address);
          reciever.region = _addressArray[1];
          reciever.city = _addressArray[2];
          reciever.address = _addressArray[3] + "(" + res.name + ")";
          console.log(_addressArray);
        }

        if (!(addressArray = regexSpecial.exec(res.address))) {
          addressArray = regexProvince.exec(res.address);
          reciever.province = addressArray[1];
          regexReciever(addressArray[3], reciever);
        } else {
          reciever.province = addressArray[1];
          regexReciever(res.address, reciever);
        }
        that.setData({ reciever: reciever });
        that.setData({ addressLine: reciever.province + " " + reciever.city + " " + reciever.region });
      }
    })
  },

  /**
   * 省市区选择器级联
   */
  bindRegionChange: function (e) {
    reciever.province = e.detail.value[0];
    reciever.city = e.detail.value[1];
    reciever.region = e.detail.value[2];
    this.setData({
      reciever: reciever,
      addressLine: reciever.province + " " + reciever.city + " " + reciever.region
    });
  },

  /**
   * 添加寄件人
   */
  addReciever: function (e) {
    var pages = getCurrentPages();
    pages[pages.length - 2].setData({ reciever: this.data.reciever });
    wx.navigateBack();
  },

  bindNameInput: function (e) {
    reciever.name = e.detail.value;
    this.setData({
      reciever: reciever
    });
  },

  bindMobileInput: function (e) {
    reciever.mobile = e.detail.value;
    this.setData({
      reciever: reciever
    });
  },

  bindCompanyInput: function (e) {
    reciever.company = e.detail.value;
    this.setData({
      reciever: reciever
    });
  },

  bindAddressInput: function (e) {
    reciever.address = e.detail.value;
    this.setData({
      reciever: reciever
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