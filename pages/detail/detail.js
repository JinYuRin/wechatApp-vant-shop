// pages/detail/detail.js
import {Fence} from "../../components/models/fence";
import {Spu} from "../../models/spu";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        spu: Object,
        showRealm: false,
        isBuy: true
    },
    linTap(event) {
        console.log(event.detail.select)
        event.detail.select = !event.detail.select
    },
    onAddtoCart() {
        this.setData({
            showRealm: true,
            isBuy: false
        })
    },
    onGotoHome() {
        console.log("ok")
        wx.switchTab({
            url: '/pages/home/home'//根目录/home/home
        })
    },
    onGotoCart() {
        wx.switchTab({
            url: '/pages/cart/cart'//根目录/home/home
        })
    },
    onBuy() {
        this.setData({
            showRealm: true,
            isBuy: true
        })
        console.log(this.data.isBuy)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const pid = options.pid
        const spu = await Spu.getDetail(pid)
        console.log(spu)
        this.setData({
            spu,
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    }
    ,

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    }
    ,

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    }
    ,

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
