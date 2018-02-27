// pages/bind/index.js
const app = getApp()
var config = require('../../config.js')
var util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({ title: '关联' })
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

    submit: function (e) {
        var that = this;
        if (e.detail.value.code == null || e.detail.value.code.trim() == '') {
            wx.showToast({
                title: '请填写授权码',
                image: '/images/warning.png',
            })
            return false;
        }
        if (e.detail.value.mobile == null || e.detail.value.mobile.trim() == '') {
            wx.showToast({
                title: '请填写手机号',
                image: '/images/warning.png',
            })
            return false;
        }
        var data = {};
        //   data.session_key = wx.getStorageSync('sessionKey');
        data.code = encodeURI(e.detail.value.code);
        data.mobile = encodeURI(e.detail.value.mobile);

        wx.request({
            url: config.api.product,
            data: data,
            success: function (res) {
                if (res.data.result == '1') {
                    wx.showToast({ title: '绑定成功' })
                    setTimeout(function () {
                        wx.navigateTo({
                            url: '/pages/index/index',
                            success: function (res) { },
                            fail: function (res) { },
                            complete: function (res) { },
                        })
                    }, 1500);
                } else {
                    wx.showToast({
                        title: '关联失败',
                        image: '/images/wrong.png',
                    })
                }
            },
            fail: function (e) {
                console.log('error', e);
            }
        })
    }
})