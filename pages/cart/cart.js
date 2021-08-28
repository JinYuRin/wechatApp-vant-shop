// pages/cart/cart.js
// let appInst = getApp();
// const {
//   cartList
// } = getApp().globalData
// console.log(cartList);
Component({

  // !接下来要完成选中购物车的商品进行计算价格的逻辑
  /**
   * 页面的初始数据
   */
  data: {
    // checked: true,
    imageURL: '/img/cart-1.jpg',
    /*  */
    cartList: [],
    /* 总价 */
    totalPrice: 0,
    // 全选按钮
    allChecked: false,
    // 商店的全选按钮
    shopChecked: []
    // 如何解决这种把get set丢掉的傻逼行为呢
    // test: {
    //   b: 0,
    //   get a() {
    //     return this.b
    //   },
    //   set a(a) {
    //     console.log(this);
    //   }
    // }
  },
  // !我他妈的真是天才,一眼就看出来Page构造器不包含observers,以后有问题先读下文档
  // 数据监听器支持监听属性或内部数据的变化，可以同时监听多个。一次 setData 最多触发每个监听器一次。
  observers: {
    'cartList': function (cartList) {
      // 数据监听器监听的是 setData 涉及到的数据字段，即使这些数据字段的值没有发生变化，数据监听器依然会被触发。
      // console.log(cartList);
      // *重新计算totalPrice和shopChecked
      let totalPrice = 0;
      let {
        shopChecked
      } = this.data
      cartList.forEach((shop, index) => {
        // 沃日，只能在这里get了，小程序的什么废物机制,getset都丢了
        shopChecked[index] = !shop.goods.find(good => !good.checked)
        // console.log(shopChecked[index]);
        // console.log(shop);
        shop.goods.forEach(good => {
          if (good.checked) {
            totalPrice += good.price * good.count
          }
        })
      })
      // *重新计算allChecked
      // 去寻找一个shop,这个shop里面存在没有checked到的good,找到就说明并未全选
      let allChecked = false
      allChecked = !cartList.find(shop => shop.goods.find(good => !good.checked))
      // console.log(allChecked)
      // ?cartList的监听函数里还得计算allChecked
      // 还需写一个allChecked的点击函数后把cartList里面全部good重新计算checked
      // *无需担心shopChecked,他将在cartList的监听函数里被计算
      this.setData({
        totalPrice,
        shopChecked,
        allChecked
      })
    }
  },

  methods: {
    /*更改商品的数量  */
    changeCount(event) {
      let {
        target
      } = event.currentTarget.dataset
      let count = event.detail
      let {
        cartList
      } = this.data
      cartList[target[0]].goods[target[1]].count = count
      // console.log(event.detail, info);
      this.setData({
        cartList
      })
    },
    /* 
    点击全选后不应该是将allChecked改变
    而是通过改变cartList的所有good的状态,利用cartList监听函数来改变allChecked和shopChecked和totalPrice
    */
    checkAll(event) {
      let checkAll = event.detail
      let {
        cartList
      } = this.data
      cartList.forEach((shop, index) => {
        shop.goods.forEach(good => {
          good.checked = checkAll
        })
      })
      this.setData({
        cartList
      })
    },
    // 点击商店的check
    checkShop(event) {
      let shopId = event.currentTarget.dataset.shopid
      let {
        shopChecked,
        cartList
      } = this.data
      // 店铺的全选状态将会在cartList的监听函数里被重新计算
      // 在这里抓到店铺的全选状态
      // shopChecked[shopId] = !shopChecked[shopId]
      cartList[shopId].goods.forEach(good => {
        good.checked = !shopChecked[shopId]
      })
      this.setData({
        // shopChecked,
        cartList
      })
    },
    // 点击单个商品的check
    checkedItem(event) {
      // console.log(event.currentTarget.dataset.info);
      // info按道理来讲应该使用对象来传参的，但是莫名其妙的出问题啊
      let {
        target
      } = event.currentTarget.dataset
      let {
        cartList
      } = this.data
      cartList[target[0]].goods[target[1]].checked = !cartList[target[0]].goods[target[1]].checked
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
      const {
        cartList
      } = getApp().globalData
      // console.log(cartList);
      // let cartList = wx.getStorageSync('cartList') || []
      // this.setData({
      //   cartList
      // })
      // console.log('原始值', cartList);
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
      // console.log('setData后', this.data.cartList);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     * onShow显示后要抓到新的cartList数据才行
     */
    onShow: function () {
      // 暂时先调用onLoad顶住个肚
      this.onLoad()
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