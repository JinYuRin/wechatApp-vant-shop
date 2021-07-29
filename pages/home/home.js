// pages/home/home.js
// import {
//     Theme
// } from "../../models/theme";
// import {
//     Banner
// } from "../../models/banner";
// import {
//     Category
// } from "../../models/category";
// import {
//     Activity
// } from "../../models/activity";
// import {
//     SpuPaging
// } from "../../models/spu-paging";

Page({ //其实page就是一个对象，里面包含属性和方法

    /**
     * 页面的初始数据
     */
    data: {
        // 瀑布流数据
        waterFlow: [{
            image: 'http://lencent.top/public/wanxiang/home/spu1.jpg',
            title: '显瘦中长款系带风衣',
            describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。',
            count: '888',
            delCount: '666'
        }, {
            image: 'http://lencent.top/public/wanxiang/home/spu2.jpg',
            title: '汉服女原创春夏',
            describe: '异志阁 原创情侣重工汉服[玉鸾•梵翎秋冬交领襦裙一片式齐腰襦裙',
            count: '888',
            delCount: '666'
        }, {
            image: 'http://lencent.top/public/wanxiang/home/spu3.jpg',
            title: '汉服女原创春夏',
            describe: '柔软顺滑垂坠飘逸。',
            count: '888',
            delCount: '666'
        }, {
            image: 'http://lencent.top/public/wanxiang/home/spu4.jpg',
            title: '汉服女原创春夏',
            describe: '异志阁 原创情侣重工汉服[玉鸾•梵翎秋冬交领襦裙一片式齐腰襦裙',
            count: '888',
            delCount: '666'
        }, {
            image: 'http://lencent.top/public/wanxiang/home/spu5.jpg',
            title: '汉服女原创春夏',
            describe: '异志阁 原创情侣重工汉服[玉鸾•梵翎秋冬交领襦裙一片式齐腰襦裙',
            count: '888',
            delCount: '666'
        }, {
            image: 'http://lencent.top/public/wanxiang/home/spu6.jpg',
            title: '汉服女原创春夏',
            describe: '异志阁 原创情侣重工汉服[玉鸾•梵翎秋冬交领襦裙一片式齐腰襦裙',
            count: '888',
            delCount: '666'
        }],
        // banner轮播图
        swiperList: [{
            id: 0,
            src: 'http://lencent.top/public/wanxiang/home/banner2.jpg'
        }, {
            id: 1,
            src: 'http://lencent.top/public/wanxiang/home/banner1.jpg'
        }, {
            id: 2,
            src: 'http://lencent.top/public/wanxiang/home/banner3.jpg'
        }, {
            id: 3,
            src: 'http://lencent.top/public/wanxiang/home/banner4.jpg'
        }, {
            id: 4,
            src: 'http://lencent.top/public/wanxiang/home/banner5.jpg'
        }, ],
        // 宫格
        grids: [{
                src: 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/1.png',
                title: '新品发布'
            },
            {
                src: 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/2.png',
                title: '商城众筹'
            },
            {
                src: 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/3.png',
                title: '以旧换新'
            },
            {
                src: 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/4.png',
                title: '一分换团'
            },
            {
                src: 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/5.png',
                title: '超值特卖'
            },
            {
                src: 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/6.png',
                title: '商城秒杀'
            },
            {
                src: 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/7.png',
                title: '真心想要'
            },
            {
                src: 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/8.png',
                title: '电视热卖'
            },
            {
                src: 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/9.png',
                title: '家电热卖'
            },
            {
                src: 'https://tangzhe123-com.oss-cn-shenzhen.aliyuncs.com/public/10.png',
                title: '其他选项'
            },
        ],
        // themeA: null, //null也是一个Object，先标记起来
        // themeE: null,
        // themeF: null,
        // themeH: null,
        // bannerB: null,
        // gridC: [],
        // activityD: null,
        // bannerG: null,
        // themeG: null,
        // spuPaging: null,
        // loadingType: 'loading'
    },
    tap() {
        console.log('123');
    },
    toSpuDetail() {
        console.log('正在跳转，请注意把page页面加到app.json去');
        wx.navigateTo({
            url: '/pages/spu-detail/spu-detail'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.lin.renderWaterFlow(this.data.waterFlow, false, () => {
            console.log('渲染成功')
        })
        /**
         *文档中写的wx.request是一个object是一个对象
         * Object.url等等
         * 最好将请求进行封装
         */
        // this.initAllData() //调用本js方法还要这样子的，那和java一样啊
        // const data = await Theme.getHomeLocationA(
        //     //   data => {
        //     // this.setData({//setData作为回调函数来使用，那这个{}里面写的是什么呢
        //     //       /**
        //     //        * Page.prototype.setData(Object data, Function callback)
        //     //        * Object 以 key: value 的形式表示，将 this.data 中的 key 对应的值
        //     //        * 改变成 value。
        //     //        */
        //     //       topTheme: data[0]//被指向了this
        //     //     }
        // )
        // // 相当于写同步得到异步，只有await得到值了，才能进行下一段（也就是回调函数了）
        // console.log(data)
        // this.setData({
        //     topTheme: data[0]
        // })
        // const banner =await Banner.getHomeLocationB()
        // console.log(banner)
        // this.setData({
        //     banner1:banner.items
        // })
        //原本this将要指向调用这个函数的onLoad函数的(记住不是getHomeLocationA因为这是被调用的函数，数据不在这里)
        // 由于箭头函数，this指向了page
        //     })
        // this.initBottomSpuList()
    }

    ,
    // async initAllData() { //含有异步方法需要加async
    //     // 把生命周期函数和其他方法写在了一起
    //     // Test.test()//测试我写的api
    //     const theme = new Theme()
    //     await theme.getThemes()
    //     // await theme.test(1,'ko',true,theme)
    //     //下面几个获取theme是可以不加await的，因为他们的themes已经获取了
    //     // 因为themes才是要加的通过回调得到的，
    //     const themeA = theme.getHomeLocationA()
    //     const themeE = theme.getHomeLocationE()
    //     const themeF = theme.getHomeLocationF()
    //     const themeH = theme.getHomeLocationH()
    //     const themeG = theme.getHomeLocationG()
    //     let themeESpu
    //     if (themeE.online) {
    //         const data = await Theme.getHomeLocationESpu()
    //         //必须使用await是因为要等待异步方法返回的结果
    //         if (data) {
    //             themeESpu = data.spu_list.slice(0, 7) //slice是截取数组的函数
    //         }
    //     }
    //     // const a=b.find(t=>t.name==='11');//值得一说的是string是属于基本类型，所以用===没问题
    //     // const themes = await Theme.getThemes()
    //     // const themeA = themes.find(t => t.name === 't-1')//找到第一个theme，
    //     //t => t === 't-1'对每一个元素进行判断直到找到这个条件为true，
    //     // 如果不传函数直接来一个布尔值就没意义了吧，或者如果有多个满足条件怎么办？？？
    //     //===是绝对等于，==会进行类型转换，他们和java是很不同的
    //     const bannerB = await Banner.getHomeLocationB()
    //     const gridC = await Category.getHomeLocationC()
    //     const activityD = await Activity.getHomeLocationD()
    //     const bannerG = await Banner.getHomeLocationG()
    //     this.setData({
    //         themeA, //按照排序的序号来找是不靠谱的，可以试试用函数式编程用find
    //         bannerB, //同名不用写赋值？？？
    //         gridC,
    //         activityD,
    //         themeE,
    //         themeESpu,
    //         themeF,
    //         themeH,
    //         bannerG,
    //         themeG,
    //     })
    // },
    // async initBottomSpuList() {
    //     const paging = SpuPaging.getLatestPaging()
    //     this.data.spuPaging = paging
    //     const data = await paging.getMoreData()
    //     //如何理解这里加await，把下面的代码当做回调函数，但只有上面完成了才有下面的回调函数
    //     //否则不是回调函数，由于异步的相关问题，下面用的数据就会丢失变成undefined，因为没有await到该有的数据
    //     // await paging.getMoreData()是异步执行的，如果不加await将等不到数据就往下走了，这就叫
    //     //用同步的写法写异步
    //     if (!data) {
    //         return
    //     }
    //     wx.lin.renderWaterFlow(data.items)
    // },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    // onReachBottom: async function () {
    //     const data = await this.data.spuPaging.getMoreData()
    //     if (!data) {
    //         return
    //     }
    //     wx.lin.renderWaterFlow(data.items)
    //     if (!data.moreData) {
    //         this.setData({
    //             loadingType: 'end'
    //         })
    //     }
    // },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },


})