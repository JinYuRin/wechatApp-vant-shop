const {
    cartList
} = getApp().globalData
Page({
    // 底部操作条图标
    onClickIcon() {
        wx.switchTab({
            url: '/pages/cart/cart',
        })
    },
    // 底部操作条按钮
    /* 
        加入购物车需要添加动作面板并进行sku的选择操作再加入购物车
        !这里就先省略了
    */
    addToCart() {
        // !这里考虑用到了作用域链
        // console.log(cartList[0].goods[0].count);
        cartList[0].goods[0].count += 1
        console.log(cartList);
        // console.log(cartList[0].goods[0].count);
        wx.showToast({
            title: '加入购物车成功',
            icon: 'none',
            duration: 2000
        })
    },
    /* 
    立即购买
    */
    buy() {
        wx.navigateTo({
            url: '/pages/order-comfirm/order-comfirm'
        })
    },
    // 打开动作面板
    openActionSheet() {
        this.setData({
            show: true
        });
    },
    // 
    change(e) {
        this.setData({
            currentSwiper: e.detail.current + 1
        })
    },
    // 关闭动作面板
    onClose() {
        this.setData({
            show: false
        });
    },
    onSelect(event) {
        console.log(event.detail);
    },
    data: {
        show: false,
        actions: [{
                name: '选项',
            },
            {
                name: '选项',
            },
            {
                name: '选项',
                subname: '描述信息',
                openType: 'share',
            },
        ],
        currentSwiper: 1,
        // banner轮播图
        swiperList: [{
            id: 0,
            src: 'http://lencent.top/public/wanxiang/spu-detail/1.jpg'
        }, {
            id: 1,
            src: 'http://lencent.top/public/wanxiang/spu-detail/2.jpg'
        }, {
            id: 2,
            src: 'http://lencent.top/public/wanxiang/spu-detail/3.jpg'
        }, {
            id: 3,
            src: 'http://lencent.top/public/wanxiang/spu-detail/4.jpg'
        }, {
            id: 4,
            src: 'http://lencent.top/public/wanxiang/spu-detail/5.jpg'
        }, {
            id: 5,
            src: 'http://lencent.top/public/wanxiang/spu-detail/6.jpg'
        }, ],
    }
})