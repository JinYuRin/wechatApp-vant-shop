import {Http} from "./http";
import {Spu} from "../models/spu-paging";
import boolean from "../miniprogram_npm/lin-ui/common/async-validator/validator/boolean";

/**
 * 之所以进行paging封装，是因为前端需要防抖截流和分页
 * 用来减少服务器压力和提升用户体验
 * 这就是做全栈才会有的缜密思维
 */
class Paging {
    req//用来封装包括url的请求内容的
    start
    count
    locker = false
    url//方便获取最原始的url，防止重复拼接参数
    moreData = true//判断是否有跟多数据防止重复发请求,布尔值默认是false
    accumulator = []//累加的items作为一个对象的属性来使用，因为他可以储存数据状态

    constructor(req, count = 10, start = 0) {
        this.req = req
        this.count = count
        this.start = start
        this.url = this.req.url
    }

    async getMoreData() {//主函数，要判定是否锁定和是否有更多数据，还涉及到了开始start变量的叠加和
        //锁的解放
        //getlocker releaselocker
        //先判断一个数据锁防止抖动重复发送请求，再判断是否有更多数据防止请求穿透
        if (!this._getLocker()) {
            return
        }
        if (!this.moreData) {
            return
        }
        const actualData = this._actualGetData()
        this.start = this.start + this.count
        this._releaseLocker()
        return actualData
    }

    async _actualGetData() {
        let paging = await Http.request(this._getCurrentReq())
        //获取数据失败
        if (!paging) {
            return null
        }
        //数据库为零
        if (paging.total === 0) {
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: []
            }
        }
        //如果有数据
        this.moreData = Paging._moreData(paging.total_page, paging.page)
        this._accumulator(paging.items)
        //如果有更多数据
        if (this.moreData) {
            return {
                empty: false,
                items: paging.items,
                moreData: true,
                accumulator: this.accumulator
            }
        }
        //如果没有更多数据
        return {
            empty: false,
            items: paging.items,
            moreData: false,
            accumulator: this.accumulator
        }
        //存在数据，moreData为true，应该返回？moreData为false返回？？
        //实际上可以设计成一个类来返回的
        // 另外这里需要对各个属性进行判断再返回
    }

    /**
     *独立写一个方法判断是否有更多数据，由于无类属性相关，可设置为静态
     * 独立写一个方法计算累加items
     */
    static _moreData(totalPage, pageNum) {
        return pageNum < totalPage - 1
    }

    _accumulator(items) {
        this.accumulator = this.accumulator.concat(items)
    }

    /**
     * 由于这是一个分页数据的封装，获取当前的url需要进行处理
     */
    _getCurrentReq() {
        let url = this.url
        //注意，和java有所不同，js的string并不是一个类的对象，他类似于java的基础类型
        // js在这里如果是将一个对象而不是string赋值出去的话，则是引用对象的地址
        // 他的值会被引用的改变而改变
        //可能发生重复拼接所以必须使用原始url，所以我们先在类的属性中把url从req提取出来
        const params = `start=${this.start}&count=${this.count}`
        if (url.includes('?')) {
            url += '&' + params
        } else {
            url += '?' + params
            //如果马上就是出口就可以return，如果需要分支后进行统一处理则如下操作
        }
        this.req.url = url
        //由于url只是一个变量，而this.req.url没有改变，所以重新赋值
        //由于分页是每一次都要获取的，如果我们在这里保存了this.req，在之后提取url
        // 可能发生重复拼接
        return this.req
    }

    /**
     *数据锁的打开和关闭
     */
    _getLocker() {
        if (this.locker) {
            return false
        }
        this.locker = true
        return true
    }

    _releaseLocker() {
        this.locker = false
    }
}

export {
    Paging
}