import config from '../../config'
import utils from '../../utils/util'
import resource from '../../utils/resource'

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
    commodityTypes: resource.commodityTypes,
    commodity: {},
    showModalStatus: false,
    animationData: null,
    expresses: [],
    express: '',
    sender: null,
    reciever: null,
    errorMsg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.setNavigationBarTitle({ title: '寄快递' });

    // 获取默认发件人
    this.setData({
      sender: {
        name: '王俊翔',
        mobile: '18662586251',
        company: '同程旅游',
        province: '江苏省',
        city: '苏州市',
        region: '工业园区',
        address: '中海国际社区六区15幢703室'
      }
    });

    // 获取快递公司
    wx.request({
      url: config.api.options + '/ExpressTypeEnum',
      success: function (response) {
        if (response.data.success) {
          let expresses = response.data.data;
          _this.setData({ expresses: expresses });
          for (let i = 0, len = expresses.length; i < len; ++i) {
            if (expresses[i].checked) {
              _this.setData({ express: expresses[i] });
            }
          }
        }
      }
    });
  },

  /**
   * 跳转到添加寄件人列表
   */
  navigateToSender: function (event) {
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
  },

  /**
   * 跳转到寄件人列表页
   */
  navigateToSenders: function (event) {
    // TODO 跳转到寄件人列表页
  },

  /**
   * 省市区地区选择器
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
      reciever: reciever
    });
  },

  /**
   * 获取选择的商品类型
   */
  selectCommodity: function (e) {
    var $data = e.currentTarget.dataset;
    this.setData({
      commodity: $data
    });
    this.hideModal();
  },

  /**
   * 更换快递公司
   */
  expressChange: function (e) {
    let expresses = this.data.expresses;
    for (let i = 0, len = expresses.length; i < len; ++i) {
      expresses[i].checked = expresses[i].value == e.detail.value;
      if (expresses[i].checked) {
        this.setData({ express: expresses[i] });
      }
    }
    this.setData({
      expresses: expresses
    });
  },

  /**
   * 提交快递申请
   */
  book: function (e) {
    if (!this.data.reciever.name) {
      utils.popError(this, '请填写收件人');
      return;
    }
    if (!this.data.reciever.mobile) {
      utils.popError(this, '请填写收件人联系方式');
      return;
    }
    if (!this.data.reciever.address || !this.data.reciever.province || !this.data.reciever.city || !this.data.reciever.region) {
      utils.popError(this, '请填写收件地址');
      return;
    }
    console.log(this.data.express);
    console.log(this.data.reciever);
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

  },

  showModal: function () {
    utils.showModal(this);
  },

  hideModal: function () {
    utils.hideModal(this);
  }
})