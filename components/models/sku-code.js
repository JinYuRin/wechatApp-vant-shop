import {combination} from '../../utils/util'

/**
 * 由于一个spu包含多个sku，一个sku的路径字典极为复杂繁多，为此创建本类进行封装只需向外放出接口
 */
class SkuCode {
    code
    spuId
    totalSegments = []

    /**
     * code中存储了spuId和规格值编码
     * code进行拆分组合即可得到本sku的路径字典
     * @param code
     */
    constructor(code) {
        this.code = code
        this._splitToSegment()
    }

    /**
     * 本类的核心方法
     * 拆分得到规格值编码数组进行组合，从1到length的所有组合，得到一个二维数组
     * 每个组合都是一个数组，将数组用#拼接，得到一维数组
     * 将所有的一维数组拼接组成本sku的路径字典
     * @private
     */
    _splitToSegment() {
        const spuAndSpec = this.code.split('$')
        //一个code的组成 2$1-3#2-12
        this.spuId = spuAndSpec[0]//获取spuId：2
        const specsCodeArray = spuAndSpec[1].split('#')
        for (let i = 1; i <= specsCodeArray.length; i++) {
            const segments = combination(specsCodeArray, i)
            //segments是一个数组是只有i个元素组合的数组
            //segments二维数组，每个元素都是一个组合
            // for (let i = 0; i < segments.length; i++) {
            // segments[i] = segments[i].join('#')
            const newSegments = segments.map(segs => {
                return segs.join('#')
                //直接用数组的映射函数segs数组变成一个字符串
            })
            //     .map(seg => {
            //     return this.spuId + '$' + seg
            // })
            //push会改变数组，他将目标作为元素push进来，concat则是连接所有元素
            this.totalSegments = this.totalSegments.concat(newSegments)
        }
        // console.log(this.totalSegments)
    }
}

export {SkuCode}