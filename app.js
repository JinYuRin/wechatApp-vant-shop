//app.js
/**
 * "onReachBottomDistance\t"????
 */
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 利用本地存储能力模拟获取后台数据
        let cartList = wx.getStorageSync('cartList') || []
        if (!cartList.length) {
            cartList = [{
                shopName: '卡辑旗舰店',
                hasCoupon: true,
                goods: [{
                    checked: true,
                    name: '卡辑汉服女仙气古装齐腰原创齐胸襦裙成人古风女生六米学生夏季薄款 含娇齐腰汉服3米（上襦+吊带+下裙+大袖衫） M',
                    desc: '含娇齐腰汉服3米（上襦+吊带+下裙+大袖衫），M',
                    img: './img/cart-1.jpg',
                    tags: ['白条3期免息'],
                    price: 198.00,
                    count: 1
                }]
            }]
            wx.setStorageSync('cartList', cartList)
        }

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null
    }
})