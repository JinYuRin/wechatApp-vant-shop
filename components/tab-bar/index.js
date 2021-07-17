// components/tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGotoHome(event){
      this.triggerEvent("GotoHome")
    },
    onGotoCart(event){
      this.triggerEvent("GotoCart")
    },
    onAddToCart(event){
      this.triggerEvent("AddtoCart")

    },
    onBuy(event){
      this.triggerEvent("Buy")

    }

  }
})
