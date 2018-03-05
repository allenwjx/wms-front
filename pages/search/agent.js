const app = getApp()
var config = require('../../config.js')
var util = require('../../utils/util.js')

Page({
    data: {
        inputShowed: false,
        inputVal: "",
        agentList:[]
    },

    onLoad: function (options) {
        wx.setNavigationBarTitle({ title: '搜索代理人' })
    },

    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        let that = this;
        that.setData({
            inputVal: e.detail.value
        });
        console.log(that.data.inputVal)
        wx.request({
            url: config.api.getAgentFilterList,
            data: { condition: that.data.inputVal},
            success: function (res) {
                if (res.data.success) {
                    console.log(res.data.data)
                    that.setData({ agentList: res.data.data })
                }
            }
        })

    },

    //选择代理人
    chooseAgent: function (e) {
        //获取当前页面
        var $data = e.currentTarget.dataset; 
        var pages = getCurrentPages();
        pages[pages.length - 2].setData({ agent: $data.item});
        wx.navigateBack()
    }
});
