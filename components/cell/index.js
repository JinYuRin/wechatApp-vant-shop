// components/cell/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cell:Object,//为什么我要在点击事件里获取呢，不能直接在cell对象里面获取吗
    x:Number,
    y:Number
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
    onTap(event){
      this.triggerEvent('celltap',{//数据回传父组件
        cell:this.properties.cell,//不能直接this.cell??,这和vue不同，但都是事件名和参数的组合
        x:this.properties.x,
        y:this.properties.y
      },{
        bubbles:true,//冒泡
        composed:true//跨越组件边界
      })
    }
  }
})
