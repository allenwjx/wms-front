import config from '../../../config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edit: true,
    selectedAddrId: 0,
    addressType: '',
    addresses: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type == 'SENDER') {
      wx.setNavigationBarTitle({ title: '我的地址' });
    } else {
      wx.setNavigationBarTitle({ title: '收件人地址' });
    }

    if (options.edit == 'true') {
      this.setData({
        edit: true
      });
    } else {
      this.setData({
        edit: false
      });
    }

    this.setData({
      addressType: options.type
    });

    if (options.id) {
      this.setData({
        selectedAddrId: options.id
      });
    }

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
    this.listAddresses();
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

  /**
   * 加载该用户的发件地址，或收件地址
   */
  listAddresses: function () {
    let _this = this;
    wx.request({
      url: config.api.addressList + '/' + this.data.addressType,
      success: function (response) {
        if (response.data.success) {
          let addressModels = response.data.data;
          let addresses = [];
          let defaultAddresses = [];
          let otherAddresses = [];
          for (let i = 0; i < addressModels.length; i++) {
            var address = {
              id: addressModels[i].id,
              name: addressModels[i].name,
              mobile: addressModels[i].tel,
              company: addressModels[i].company,
              province: addressModels[i].province,
              city: addressModels[i].city,
              region: addressModels[i].region,
              address: addressModels[i].detail,
              defaultSetting: addressModels[i].defaultSetting
            };
            if (address.defaultSetting) {
              defaultAddresses.push(address);
            } else {
              otherAddresses.push(address);
            }
          }
          for (let i = 0; i < defaultAddresses.length; i++) {
            addresses.push(defaultAddresses[i]);
          }
          for (let i = 0; i < otherAddresses.length; i++) {
            addresses.push(otherAddresses[i]);
          }
          _this.setData({ addresses: addresses });
        }
      }
    });
  },

  /**
   * 设置默认地址
   */
  setDefaultAddress: function (e) {
    let _this = this;
    let id = e.currentTarget.dataset.id;
    wx.request({
      method: 'POST',
      url: config.api.setDefaultAddress + '/' + id + '/' + this.data.addressType,
      success: function (response) {
        if (response.data.success) {
          _this.listAddresses();
        }
      }
    });
  },

  /**
   * 编辑地址
   */
  editAddress: function (e) {
    let _this = this;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/personal/addr/edit?type=' + this.data.addressType + '&id=' + id
    });
  },

  /**
   * 选择地址
   */
  selectAddress: function (e) {
    let id = e.currentTarget.dataset.id;
    var pages = getCurrentPages();
    for (let i = 0; i < this.data.addresses.length; i++) {
      if (id == this.data.addresses[i].id) {
        pages[pages.length - 2].setData({ sender: this.data.addresses[i] });
      }
    }
    wx.navigateBack();
  },

  /**
  * 新建地址
  */
  createAddress: function () {
    wx.navigateTo({
      url: '/pages/personal/addr/edit?create=CREATE&type=' + this.data.addressType + '&id=' + 0
    });
  },
})