import wxValidate from 'utils/wxValidate'
import config from 'config'
import req from 'utils/request'

//app.js
App({
  data: {},

  globalData: {
    user: null,
  },

  onLaunch: function (options) {
    this.checkSession();
    this.configReq();
  },

  configReq() {
    let _this = this;
    req.baseUrl(config.api.base)
      .interceptor(res => {
        switch (res.data.errorCode) {
          case '-2001':
            wx.showToast({
              icon: 'loading',
              title: '重新登录',
            })
            _this.login()
            return false;
          case null:
          case '':
            return true;
          default:
            wx.showToast({
              title: '操作失败',
            })
            return false;
        }
      })
  },

  /**
   * 获取用户ID
   */
  getUserId: function () {
    if (this.globalData.user) {
      if (this.globalData.user.userId) {
        return this.globalData.user.userId
      }
    }
    let user = wx.getStorageSync("user");
    return user.userId;
  },

  /**
   * 获取微信用户open id
   */
  getOpenId: function () {
    if (this.globalData.user) {
      if (this.globalData.user.openId) {
        return this.globalData.user.openId
      }
    }
    let user = wx.getStorageSync("user");
    return user.openId;
  },

  /**
   * 获取用户会话ID
   */
  getSessionId: function () {
    if (this.globalData.user) {
      if (this.globalData.user.token) {
        return this.globalData.user.token
      }
    }
    let user = wx.getStorageSync("user");
    return user.token;
  },

  /**
   * 用户会话检查
   */
  checkSession: function () {
    // userDetail
    let _this = this;
    wx.checkSession({
      success: function () {
        wx.getUserInfo({
          success: function (res) {
            let rawUserInfo = JSON.parse(res.rawData);
            wx.setStorageSync('wxuser', rawUserInfo);
            _this.login();
          }
        })
      },
      fail: function () {
        // 重新触发后台换取微信用户最新信息，并重新创建session
        _this.login();
      }
    })
  },

  /**
   * 微信用户登录
   */
  login: function () {
    let _this = this;
    wx.login({
      success: function (res) {
        let jsCodeResponse = res;
        // 获取用户信息
        _this.doGetUserInfoAndBGLogin(jsCodeResponse.code);
      }
    });
  },

  /**
   * 获取用户信息
   */
  doGetUserInfoAndBGLogin: function (jsCode) {
    let _this = this;
    wx.getUserInfo({
      success: function (res) {
        let rawUserInfo = JSON.parse(res.rawData);
        _this.doBGLogin(jsCode, rawUserInfo.nickName);
        wx.setStorageSync('wxuser', rawUserInfo);
      }
    })
  },

  /**
   * 系统后台登录
   */
  doBGLogin: function (jsCode, nickName) {
    let _this = this;
    wx.request({
      url: config.api.userLogin,
      data: {
        jsCode: jsCode,
        nickName: nickName
      },
      success: function (res) {
        if (res.data.success) {
          _this.globalData.user = res.data.data;
          wx.setStorageSync('user', res.data.data);
          wx.setStorageSync('token', res.data.data.token);
          req.token(res.data.data.token);
        } else {
          console.log('用户登录失败：' + res.data.errorMessage);
        }
      },
      fail: function (e) {
        console.log('error:', e);
      }
    })
  },

  wxValidate: (rules, messages) => new wxValidate(rules, messages)
})