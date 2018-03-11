import wxValidate from 'utils/wxValidate'
import config from 'config'

//app.js
App({
  data: {},
  onLaunch: function (options) {
      var that = this;
      //发送 res.code 到后台换取 openId, sessionKey, unionId
      wx.login({
          success: function (res) {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              wx.request({
                  url: config.api.userLogin,
                  data: {
                      jsCode: res.code
                  },
                  success: function (res) {
                      console.log('userLogin:', res.data.data);
                      wx.setStorageSync('user', res.data.data.userVO);
                      wx.setStorageSync('sessionId', res.data.data.id);
                  },
                  fail: function (e) {
                      console.log('error:', e);
                  }
              })
          }
      });
  },

  onLaunch1: function (options) {
    var that = this;
    // 登录
    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            wx.setStorageSync('userInfo', res.userInfo)
            that.globalData.userInfo = res.userInfo;
            var gender = res.userInfo.gender //性别 0：未知、1：男、2：女
          }
        })
      },
      fail: function () {
        //登录态过期
        wx.login({
          success: function (res) {
            console.log('login', res);
            wx.getUserInfo({
              success: function (res) {
                console.log(res)
                wx.setStorageSync('userInfo', res.userInfo)
                that.globalData.userInfo = res.userInfo;
              }
            })
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            // wx.request({
            //     url: config.service.getUserInfo,
            //     data: {
            //         js_code: res.code
            //     },
            //     success: function (res) {
            //         console.log('iotSessionKey:', res);
            //         wx.setStorageSync('user', res.data.extendObject)
            //     },
            //     fail: function (e) {
            //         console.log('error:', e);
            //     }
            // })
          }
        })
      }
    })
  },

  wxValidate: (rules, messages) => new wxValidate(rules, messages),

  onShow: function (options) {
    
  },

  onHide: function () {

  },

  globalData: {
    userInfo: null,
    user: null,
    sessionId: null
  }
})