// components/counter/index.js
import {Cart} from "../../models/cart";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        count: {
            type: Number,
            value: Cart.SKU_MIN_COUNT
        },
        min: {
            type: Number,
            value: Cart.SKU_MIN_COUNT
        },
        max: {
            type: Number,
            value: Cart.SKU_MAX_COUNT
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
      onOverStep(event){
        const minOrmaxOut=event.detail.type
        if(minOrmaxOut=='overflow_max'){
          wx.showToast({
            icon:"none",
            duration:3000,
            title:"超出最大数量"
          })
        }
        if(minOrmaxOut=='overflow_min'){
          wx.showToast({
            icon:"none",
            duration:3000,
            title:`至少要购买${Cart.SKU_MIN_COUNT}件`
          })
        }
      }
    }
})
