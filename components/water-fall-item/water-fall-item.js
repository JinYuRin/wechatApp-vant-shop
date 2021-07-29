Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
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
    // 关于页面跳转的问题最好传递事件留给页面自己处理，这里可以使用冒泡和跨越组件边界来传递给祖先组件或页面
    toSpuDetail() {
      this.triggerEvent('toSpuDetail', {}, {
        bubbles: true, //冒泡
        composed: true //跨越组件边界
      })
    }
  }
})