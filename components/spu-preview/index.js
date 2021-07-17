// components/spu-preview/index.js
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
        tags: Array
    },
    observers: {
        data: function (data) {//监听data属性
            if (!data) {
                return
            }
            if (!data.tags) {
                return
            }
            const tags = data.tags.split('$')
            //用指定的字符分割字符串，若该字符无则只剩下一个元素
            this.setData({
                tags
            })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onImgLoad(event){
            console.log(event)
            const {width,height}=event.detail//解构赋值
            // console.log(width,height)
            // w/h=340/x,
            this.setData({//设置好高宽
                w:340,
                h:340/width*height
            })
        },
        onItemTaq(event){
            const pid=event.currentTarget.dataset.pid//从当前目标中设置的属性提取出id
            wx.navigateTo({
                url:`/pages/detail/detail?pid=${pid}`
                //模板字符串的用法
            })
        }
    }
})
