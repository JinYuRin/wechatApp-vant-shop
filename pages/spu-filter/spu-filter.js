Page({

    data: {
        show: false,
        // focus: true
        key: '',
        option1: [{
                text: '综合',
                value: 0
            },
            {
                text: '最新上架',
                value: 1
            },
            {
                text: '评价最多',
                value: 2
            },
        ],
        option2: [{
                text: '默认排序',
                value: 'a'
            },
            {
                text: '好评排序',
                value: 'b'
            },
            {
                text: '销量排序',
                value: 'c'
            },
        ],
        value1: 0,
        value2: 'a',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    // 通过 selectComponent(id) 可访问。
    onLoad: function (options) {
        console.log(options.key);
        console.log(wx.getSystemInfoSync().statusBarHeight);
        this.setData({
            statusBarHeight: wx.getSystemInfoSync().statusBarHeight
        })
        this.setData({
            // focus: true,
            key: options.key
        })
    },
    toSpuDetail() {
        console.log('正在跳转，请注意把page页面加到app.json去');
        wx.navigateTo({
            url: '/pages/spu-detail/spu-detail'
        })
    },
    back() {
        wx.navigateBack({
            delta: 1,
        })
    },
    // 打开动作面板
    openActionSheet() {
        this.setData({
            show: true
        });
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
})