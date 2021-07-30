Page({
    openActionSheet() {
        this.setData({
            show: true
        });
    },
    change(e) {
        this.setData({
            currentSwiper: e.detail.current + 1
        })
    },
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