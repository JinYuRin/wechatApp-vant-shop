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
        // let cartList = wx.getStorageSync('cartList') || []
        // if (!cartList.length) {
        let cartList = [{
            shopName: '卡辑旗舰店',
            hasCoupon: true,
            // get allChecked() {
            //     // 只要找到一个good是false就是allChecked为false
            //     // let flag = !this.goods.find(good => !good.checked)
            //     // flag为false就代表能找到未选择的good,
            //     // console.log(this.goods.find(good => good.checked));
            //     return !this.goods.find(good => !good.checked)
            //     // return false
            // },
            // set allChecked(value) {
            //     console.log(value);
            //     this.goods.forEach(good => {
            //         good.checked = value
            //     })
            // },
            goods: [{
                checked: true,
                name: '卡辑汉服女仙气古装齐腰原创齐胸襦裙成人古风女生六米学生夏季薄款 含娇齐腰汉服3米（上襦+吊带+下裙+大袖衫） M',
                desc: '含娇齐腰汉服3米（上襦+吊带+下裙+大袖衫），M',
                img: './img/cart-1.jpg',
                tags: ['白条3期免息'],
                price: 198.00,
                count: 1
            }]
        }, {
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
            }, {
                checked: true,
                name: '卡辑汉服女仙气古装齐腰原创齐胸襦裙成人古风女生六米学生夏季薄款 含娇齐腰汉服3米（上襦+吊带+下裙+大袖衫） M',
                desc: '含娇齐腰汉服3米（上襦+吊带+下裙+大袖衫），M',
                img: './img/cart-1.jpg',
                tags: ['白条3期免息'],
                price: 198.00,
                count: 1
            }]
        }]
        // console.log('初始值', cartList);
        // // 原来是this.setData,JSON以及setStorageSync的操作全部都会丢失原来的对象内的getset
        // console.log('尝试使用Json后的值', JSON.parse(JSON.stringify(cartList)));
        // 我怀疑是setStorageSync的影响
        // wx.setStorageSync('cartList', cartList)
        // }
        this.globalData.cartList = cartList


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
    // 全局变量相当于vue里面的vuex
    globalData: {
        userInfo: null,
    }
})