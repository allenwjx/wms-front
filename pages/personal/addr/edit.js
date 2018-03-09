import utils from '../../../utils/util'
import config from '../../../config'

const regexSpecial = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;
const regexProvince = /^(.*?(省|自治区))(.*?)$/;
const regex = /^(.*?[市]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;

let address = {
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
    errorMsg: '',
    create: false,
    addressType: '',
    address: address
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type == 'SENDER') {
      wx.setNavigationBarTitle({ title: '寄件人地址' });
    } else {
      wx.setNavigationBarTitle({ title: '收件人地址' });
    }

    if (options.create == 'CREATE') {
      // 设置是否创建地址
      this.setData({
        create: true
      });
    }

    // 设置地址类型
    this.setData({
      addressType: options.type
    });
    // 加载地址数据
    this.loadAddress(options.id);
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

  /**
   * 加载地址
   */
  loadAddress: function (id) {
    let _this = this;
    wx.request({
      url: config.api.address + '/' + id,
      method: "GET",
      success: function (response) {
        if (response.data.success) {
          let addr = response.data.data;
          address.id = addr.id;
          address.name = addr.name;
          address.mobile = addr.tel;
          address.company = addr.company;
          address.province = addr.province;
          address.city = addr.city;
          address.region = addr.region;
          address.address = addr.detail;
          address.addressType = addr.addressType;
          address.defaultSetting = addr.defaultSetting;
          _this.setData({
            address: address
          });
        }
      },
      fail: function (e) {
        console(e);
      }
    });
  },

  /**
   * 更新地址信息
   */
  updateAddress: function (e) {
    var _this = this;
    if (!this.data.address.name) {
      utils.popError(this, '请填写姓名');
      return;
    }
    if (!this.data.address.mobile) {
      utils.popError(this, '请填写联系方式');
      return;
    }
    if (!this.data.address.address || !this.data.address.province || !this.data.address.city || !this.data.address.region) {
      utils.popError(this, '请填地址');
      return;
    }
    // 更新寄件人信息
    wx.request({
      url: config.api.updateAddress,
      method: "POST",
      data: {
        id: this.data.address.id,
        name: this.data.address.name,
        tel: this.data.address.mobile,
        province: this.data.address.province,
        city: this.data.address.city,
        region: this.data.address.region,
        detail: this.data.address.address,
        company: this.data.address.company,
        addressType: this.data.address.addressType,
        defaultSetting: this.data.address.defaultSetting
      },
      success: function (response) {
        if (response.data.success) {
          wx.navigateBack();
        } else {
          console.log(response.data.errorMessage)
          wx.showToast({ title: '更新失败' });
        }
      },
      fail: function (e) {
        console.log(e)
        wx.navigateTo({
          url: '/page/message/fail?msg=更新地址信息错误'
        });
      }
    });
  },

  /**
   * 新建地址
   */
  createAddress: function () {
    var _this = this;
    if (!this.data.address.name) {
      utils.popError(this, '请填写姓名');
      return;
    }
    if (!this.data.address.mobile) {
      utils.popError(this, '请填写联系方式');
      return;
    }
    if (!this.data.address.address || !this.data.address.province || !this.data.address.city || !this.data.address.region) {
      utils.popError(this, '请填写地址');
      return;
    }

    // 添加新寄件人
    wx.request({
      url: config.api.address,
      method: "POST",
      data: {
        name: this.data.address.name,
        tel: this.data.address.mobile,
        province: this.data.address.province,
        city: this.data.address.city,
        region: this.data.address.region,
        detail: this.data.address.address,
        company: this.data.address.company,
        addressType: _this.data.addressType,
        defaultSetting: false
      },
      success: function (response) {
        if (response.data.success) {
          wx.navigateBack();
        } else {
          console.log(response.data.errorMessage);
          wx.showToast({
            title: '添加失败',
          })
        }
      },
      fail: function (e) {
        console.log(e);
        wx.showToast({
          title: '添加失败',
        })
      }
    });
  },

  /**
   * 省市区
   */
  bingAddressTap: function () {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        var addressArray = [];
        function regexSender(addr, address) {
          var _addressArray = regex.exec(addr);
          address.region = _addressArray[1];
          address.city = _addressArray[2];
          address.address = _addressArray[3] + "(" + res.name + ")";
        }

        if (!(addressArray = regexSpecial.exec(res.address))) {
          addressArray = regexProvince.exec(res.address);
          address.province = addressArray[1];
          regexSender(addressArray[3], address);
        } else {
          address.province = addressArray[1];
          regexSender(res.address, address);
        }
        that.setData({ address: address });
      }
    })
  },

  /**
   * 省市区选择器级联
   */
  bindRegionChange: function (e) {
    address.province = e.detail.value[0];
    address.city = e.detail.value[1];
    address.region = e.detail.value[2];
    this.setData({
      address: address
    });
  },

  bindNameInput: function (e) {
    address.name = e.detail.value;
    this.setData({
      address: address
    });
  },

  bindMobileInput: function (e) {
    address.mobile = e.detail.value;
    this.setData({
      address: address
    });
  },

  bindCompanyInput: function (e) {
    address.company = e.detail.value;
    this.setData({
      address: address
    });
  },

  bindAddressInput: function (e) {
    address.address = e.detail.value;
    this.setData({
      address: address
    });
  }
})