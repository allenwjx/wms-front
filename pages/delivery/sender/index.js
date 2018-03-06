// pages/delivery/sender/index.js
const regexSpecial = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
const regexProvince = /^(.*?(省|自治区))(.*?)$/;
const regex = /^(.*?[市]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
let sender = {
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
    sender: sender
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '寄件人' });
  },

  /**
   * 省市区
   */
  bingAddressTap: function () {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        var addressArray = [];
        

        function regexSender(address, sender) {
          var _addressArray = regex.exec(address);
          sender.region = _addressArray[1];
          sender.city = _addressArray[2];
          sender.address = _addressArray[3] + "(" + res.name + ")";
          console.log(_addressArray);
        }

        if (!(addressArray = regexSpecial.exec(res.address))) {
          addressArray = regexProvince.exec(res.address);
          sender.province = addressArray[1];
          regexSender(addressArray[3], sender);
        } else {
          sender.province = addressArray[1];
          regexSender(res.address, sender);
        }
        that.setData({ sender: sender });
        that.setData({ addressLine: sender.province + " " + sender.city + " " + sender.region });
      }
    })
  },

  /**
   * 省市区选择器级联
   */
  bindRegionChange: function (e) {
    sender.province = e.detail.value[0];
    sender.city = e.detail.value[1];
    sender.region = e.detail.value[2];
    this.setData({
      sender: sender,
      addressLine: sender.province + " " + sender.city + " " + sender.region
    });
  },

  /**
   * 添加寄件人
   */
  addSender: function (e) {
    var pages = getCurrentPages();
    pages[pages.length - 2].setData({ sender: this.data.sender });
    wx.navigateBack();
  },

  bindNameInput: function (e) {
    sender.name = e.detail.value;
    this.setData({
      sender: sender
    });
  },

  bindMobileInput: function (e) {
    sender.mobile = e.detail.value;
    this.setData({
      sender: sender
    });
  },

  bindCompanyInput: function (e) {
    sender.company = e.detail.value;
    this.setData({
      sender: sender
    });
  },

  bindAddressInput: function (e) {
    sender.address = e.detail.value;
    this.setData({
      sender: sender
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