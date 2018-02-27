// pages/goods/bind.js
const app = getApp()
var config = require('../../config.js')
var util = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: ['广东省', '广州市', '海珠区'],
        customItem: '全部'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({ title: '货物绑定' })
        this.loadData()
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

    loadData: function () {
        let that = this
        wx.request({
            url: config.api.getGoodsList,
            data: {},
            success: function (res) {
                if (res.data.success) {
                    //   wx.showToast({ title: '绑定成功' })
                    console.log(res.data.data)
                    that.setData({ goodsList: res.data.data })
                } 
            }
        })

        wx.request({
            url: config.api.getAgentList,
            data: {},
            success: function (res) {
                if (res.data.success) {
                    //   wx.showToast({ title: '绑定成功' })
                    console.log(res.data.data)
                    that.setData({ agentList: res.data.data })
                } 
            }
        })
    },

    bindAgentChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            agentIndex: e.detail.value
        })
    },

    bindGoodsChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            goodsIndex: e.detail.value
        })
    },
})