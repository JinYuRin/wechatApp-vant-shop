// pages/cart/cart.js
Page({

  // !接下来要完成选中购物车的商品进行计算价格的逻辑
  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    imageURL: '/img/cart-1.jpg',
    cartList: []
  },

  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取后台数据,这里模拟从缓存获取

    // 利用本地存储能力模拟获取后台数据
    let cartList = wx.getStorageSync('cartList') || []
    // this.setData({
    //   cartList
    // })
    console.log(cartList);
    // 居然无法在三元里使用??
    cartList.length ?
      this.setData({
        cartList
      }) :
      wx.showToast({
        title: '购物车是空的',
        icon: 'none',
        duration: 2000
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