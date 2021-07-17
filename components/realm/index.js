// components/realm/index.js
import {Fence} from "../models/fence";
import {FenceGroup} from "../models/fence-group";
import {Judger} from "../models/judger";
import {Spu} from "../../models/spu";
import {Cell} from "../models/cell";
import {Cart} from "../../models/cart";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object,
        isBuy:Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        fences: [],
        judger: Object,
        previewImg: String,
        title: String,
        stock: Number,
        currentValues: String,
        missingKeys: String,
        currentCount:Cart.SKU_MIN_COUNT,
    },
    // lifetimes: {
    //     attached() {
    //     }//用组件的生命周期函数钩子处理接受数据是不合适的，使用监视器比较合理
    // },
    observers: {
        spu: function (spu) {
            if (!spu) {
                return
            }//请求数据后放进业务模型里，把实际的组件业务模型和发请求的模型分开
            //paging是因为需要封装重复提供其他业务使用才包含请求数据
            /**
             * 设立无规格商品的操作
             */
            if (Spu.isNoSpec(spu)) {
                this.processNoSpec(spu)
            } else {
                this.processHasSpec(spu)
            }

            // else {可以不用写else写return即可

        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        processHasSpec(spu) {
            /**
             * 以下为有规格的操作
             * FenceGroup从spu中初始化了skuList
             * 从而
             * @type {FenceGroup}
             */
            const fenceGroup = new FenceGroup(spu)
            fenceGroup.initFences()
            /**
             * Judger是判定所有cell的status的沟通类
             * 为了判断状态构造时就已经初始化了pathDict
             * 同时也初始化了默认Sku
             * @type {Judger}
             */
            const judger = new Judger(fenceGroup)
            this.data.judger = judger
            this.setData({
                skuPending: this.data.judger.skuPending,
            })
            const defaultSku = fenceGroup.getDefaultSku()
            if (defaultSku) {
                this.bindSkuData(defaultSku)
                this.setStockStatus(this.data.stock,this.data.currentCount)
            } else {
                this.bindSpuData()
            }
            /**
             * 初次渲染本页面的规格矩阵
             */
            this.bindFenceGroupData(fenceGroup)
            this.bindTipData()
        },
        processNoSpec(spu) {
            this.setData({
                noSpec: true
            })
            this.bindSkuData(spu.sku_list[0])
            this.setStockStatus(this.data.stock,this.data.currentCount)
        },
        bindSpuData() {
            const spu = this.properties.spu
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price,
                discountPrice: spu.discount_price
            })
            this.bindSkuIntact()
        },
        bindSkuData(sku) {
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discountPrice: sku.discount_price,
                stock: sku.stock
            })
        },
        bindSkuIntact(){
          this.setData({
              skuIntact: this.data.judger.isSkuIntact()
          })
        },
        /**
         * 将本方法独立，可读性强
         * @param fenceGroup
         */
        bindFenceGroupData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences,
            })
        },
        bindTipData() {
            this.setData({
                skuIntact: this.data.judger.isSkuIntact(),
                currentValues: this.data.judger.getCurrentValues().join(','),
                missingKeys: this.data.judger.getMissingKeys().join(',')
            })


        },
        setStockStatus(stock,currentCount){
            this.setData({
                outStock:this.isOutOfStock(stock, currentCount)
            })
        },
        isOutOfStock(stock, currentCount) {
            return stock < currentCount
        },
        onSelectCount(event){
            const currentCount=event.detail.count
            console.log(currentCount)
            this.data.currentCount=currentCount
            //如果不是数据渲染就可以使用直接复制不是setData
            //如果是完整sku才继续更换缺货状态，否则会继续根据未改变的stock继续切换状态
            if (this.data.noSpec){
                this.setStockStatus(this.data.stock,currentCount)
                return
            }
            if (this.data.judger.isSkuIntact()){
                this.setStockStatus(this.data.stock,currentCount)
            }
        },
        /**
         * 本方法是点击事件的回调函数
         * judger._judge(cell,x,y)重新计算所有的cell的状态
         * 重新绑定的fences数据是judger的fences
         * @param event
         */
        onCellTap(event) {
            // console.log(event)
            const data = event.detail.cell
            const x = event.detail.x
            const y = event.detail.y
            const cell = new Cell(data.spec)
            cell.status = data.status
            const judger = this.data.judger
            judger.judge(cell, x, y)
            const skuIntact = judger.isSkuIntact()
            if (skuIntact) {
                const currentSku = judger.getDeterminateSku()
                this.bindSkuData(currentSku)
                console.log(currentSku.stock)
                this.setStockStatus(currentSku.stock,this.data.currentCount)
            }
            this.bindTipData()
            this.bindFenceGroupData(judger.fenceGroup)
        }

    }
})
