// pages/my-fav/my-fav.js
Page({

  /**
   * 页面的初始数据
   */
  data: { // 瀑布流数据
    waterFlow: [{
      image: 'http://lencent.top/public/wanxiang/home/spu1.jpg',
      title: '显瘦中长款系带风衣',
      describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。',
      count: '888',
      delCount: '666'
    }, {
      image: 'http://lencent.top/public/wanxiang/home/spu2.jpg',
      title: '汉服女原创春夏',
      describe: '异志阁 原创情侣重工汉服[玉鸾•梵翎秋冬交领襦裙一片式齐腰襦裙',
      count: '888',
      delCount: '666'
    }, {
      image: 'http://lencent.top/public/wanxiang/home/spu3.jpg',
      title: '汉服女原创春夏',
      describe: '柔软顺滑垂坠飘逸。',
      count: '888',
      delCount: '666'
    }, {
      image: 'http://lencent.top/public/wanxiang/home/spu4.jpg',
      title: '汉服女原创春夏',
      describe: '异志阁 原创情侣重工汉服[玉鸾•梵翎秋冬交领襦裙一片式齐腰襦裙',
      count: '888',
      delCount: '666'
    }, {
      image: 'http://lencent.top/public/wanxiang/home/spu5.jpg',
      title: '汉服女原创春夏',
      describe: '异志阁 原创情侣重工汉服[玉鸾•梵翎秋冬交领襦裙一片式齐腰襦裙',
      count: '888',
      delCount: '666'
    }, {
      image: 'http://lencent.top/public/wanxiang/home/spu6.jpg',
      title: '汉服女原创春夏',
      describe: '异志阁 原创情侣重工汉服[玉鸾•梵翎秋冬交领襦裙一片式齐腰襦裙',
      count: '888',
      delCount: '666'
    }],
    active: 0,
  },

  onChange(event) {
    // wx.showToast({
    //   title: `切换到标签 ${event.detail.name}`,
    //   icon: 'none',
    // });
  },
  toShop() {
    wx.switchTab({
      url: '/pages/home/home',
      success: (result) => {

      },
      fail: () => {},
      complete: () => {}
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.lin.renderWaterFlow(this.data.waterFlow, false, () => {
      console.log('渲染成功')
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