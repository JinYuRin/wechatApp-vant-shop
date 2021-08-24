// pages/cart/cart.js
Component({

  // !接下来要完成选中购物车的商品进行计算价格的逻辑
  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    imageURL: '/img/cart-1.jpg',
    cartList: []
  },
  // !我他妈的真是天才,一眼就看出来Page构造器不包含observers,以后有问题先读下文档
  // 数据监听器支持监听属性或内部数据的变化，可以同时监听多个。一次 setData 最多触发每个监听器一次。
  observers: {
    'cartList': function (cartList) {
      // 数据监听器监听的是 setData 涉及到的数据字段，即使这些数据字段的值没有发生变化，数据监听器依然会被触发。
      console.log(cartList);
    }
  },

  methods: {
    onChange() {
      this.setData({
        checked: !this.data.checked
      })
    },
    checkedItem(event) {
      // console.log(event.currentTarget.dataset.info);
      // info按道理来讲应该使用对象来传参的，但是莫名其妙的出问题啊
      let info = event.currentTarget.dataset.info
      let cartList = this.data.cartList
      cartList[info[0]].goods[info[1]].checked = !cartList[info[0]].goods[info[1]].checked
      this.setData({
        cartList
      })
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
  },
})