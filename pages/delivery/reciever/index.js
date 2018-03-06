// pages/delivery/reciever/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressLine: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({ title: '新增收件人' });
  },

  /**
   * 省市区
   */
  bingAddressTap: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
        var REGION_PROVINCE = [];
        var addressBean = {
          REGION_PROVINCE: null,
          REGION_COUNTRY: null,
          REGION_CITY: null,
          ADDRESS: null
        };

        function regexAddressBean(address, addressBean) {
          regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;
          var addxress = regex.exec(address);
          addressBean.REGION_CITY = addxress[1];
          regexRegion(addxress[3], addressBean);
          console.log(addxress);
        }

        function regexRegion(address, addressBean) {
          regex = /^(.*?[区县])(.*?)$/g;
          var addxress = regex.exec(address);
          addressBean.REGION_COUNTRY = addxress[1];
          addressBean.ADDRESS = addxress[2] + "(" + res.name + ")";
          console.log(addxress);
        }

        if (!(REGION_PROVINCE = regex.exec(res.address))) {
          regex = /^(.*?(省|自治区))(.*?)$/;
          REGION_PROVINCE = regex.exec(res.address);
          addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
          regexAddressBean(REGION_PROVINCE[3], addressBean);
        } else {
          addressBean.REGION_PROVINCE = REGION_PROVINCE[1];
          regexAddressBean(res.address, addressBean);
        }
        that.setData(addressBean);
        that.setData({ addressLine: addressBean.REGION_PROVINCE + " " + addressBean.REGION_CITY + " " + addressBean.REGION_COUNTRY });
      }
    })
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