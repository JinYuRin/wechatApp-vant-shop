Page({


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(wx.getSystemInfoSync().statusBarHeight);
        this.setData({
            statusBarHeight: wx.getSystemInfoSync().statusBarHeight
        })
    },
})