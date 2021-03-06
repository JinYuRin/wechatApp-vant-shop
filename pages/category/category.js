// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [{
        src: 'http://lencent.top/public/wanxiang/home/cate1.jpg',
        title: '空调'
      },
      {
        src: 'http://lencent.top/public/wanxiang/home/cate2.png',
        title: '手机'
      },
      {
        src: 'http://lencent.top/public/wanxiang/home/cate3.jpg',
        title: '加湿器'
      },
      {
        src: 'http://lencent.top/public/wanxiang/home/cate3.jpg',
        title: '加湿器'
      }
    ],
  },
  // 进入商品过滤页面
  toSpuFilter() {
    // key应该可以做成一个数组！！！
    wx.navigateTo({
      url: '/pages/spu-filter/spu-filter?key=空调'
    })
  },
  searchFocus() {
    this.toSpuFilter()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getSystemInfoSync().statusBarHeight);
    this.setData({
      statusBarHeight: wx.getSystemInfoSync().statusBarHeight
    })
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

  }
})