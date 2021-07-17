import {Matrix} from "./matrix";
import {Fence} from "./fence";

/**
 *可以采用大框架内嵌多层类型的方法处理一个复杂的图形数据渲染和用户数据采集
 *例如FenceGroup>Fence>Cell
 */
class FenceGroup {
    spu
    skuList = []
    fences = [];

    /**
     * 一个规格矩阵是归属于一个spu
     * spu和skuList都归属于FenceGroup这个层级
     */
    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
        // console.log(this.skuList)
    }


    eachCell(cb) {
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                const cell = this.fences[i].cells[j]
                cb(cell, i, j)//第二次使用回调函数的编程
            }
        }
    }

    setCellStatusById(cellId, status) {
        this.eachCell((cell) => {
            if (cell.id === cellId) {
                cell.status = status
            }
        })
    }

    setCellStatusByXy(x, y, status) {
        this.fences[x].cells[y].status = status
    }


    /**
     * 由于spu是从属于FenceGroup的，可由此获取DefaultSku
     * @returns {*}
     */
    getDefaultSku() {
        const default_sku_id = this.spu.default_sku_id
        if (!default_sku_id) {
            return
        }
        return this.skuList.find(s =>
            s.id === default_sku_id
        )

    }

    getSKu(skuCode) {
        const fullSkuCode=this.spu.id+'$'+skuCode
        const sku = this.spu.sku_list.find(s => s.code===fullSkuCode)
        return sku?sku:null
    }


    // static getKeys(spuDetail) {//获取规格名
    //     const keys = []
    //     for (let i = 0; i < spuDetail.sku_list[0].specs.length; i++) {
    //         keys.push(spuDetail.sku_list[0].specs[i].key)
    //     }
    //     return keys
    // }
    //
    // static getValuesArray(spuDetail) {//获取规格值
    //     const sourceArr = [];
    //     for (let i = 0; i < spuDetail.sku_list.length; i++) {
    //         //先遍历所有的sku
    //         let values = [];
    //         for (let j = 0; j < spuDetail.sku_list[i].specs.length; j++) {
    //             //再遍历单个sku里所有的value
    //             values.push(spuDetail.sku_list[i].specs[j].value)
    //         }
    //         sourceArr.push(values)//把每个sku的values压进数组
    //     }
    //     //以下是遍历数组的新方法
    //     // const sku_list = []
    //     // spuDetail.sku_list.forEach(sku => {
    //     //     let values = [];
    //     //     sku.specs.forEach(spec => {
    //     //         values.push(spec.value)
    //     //     })
    //     //     sku_list.push(values)
    //     // })
    //     const valuesArr = Matrix.reverseMatrix(sourceArr)//矩阵转置，row=>column
    //     for (let i = 0; i < valuesArr.length; i++) {
    //         valuesArr[i] = this.unique(valuesArr[i])
    //     }//每一个key的规格值数组进行去重
    //     return valuesArr
    // }
    /**
     * 本类的核心Api，把转置后的规格矩阵一个个推入fences[]中
     */
    initFences() {
        const matrix = this._creatMatrix(this.skuList)
        const fences = []
        // let currentJ = -1
        // matrix.forEach((element, i, j) => {
        //     /**
        //      *fences[j][i]=element这样子不好吗，这个可行吗,想得很好，但是
        //      这样就无法充分利用Fence类的对象，我们推数组的操作最好利用Fence的方法进行
        //      这样子Fence-group才有意义而且代码清晰明了
        //      而且fence里面还涉及value和id以及key的问题，直接将整个对象推进数组实在不好进行后续
        //      */
        //     if (currentJ !== j) {//开启一个新列
        //         currentJ = j
        //         fences[currentJ] = this._creatFence()
        //     }
        //     fences[currentJ].pushValueTitle(element.value)
        // })
        // console.log(matrix.m)
        const AT = matrix.transpose()
        // console.log(AT)
        AT.forEach(r => {
            const fence = new Fence(r)
            fence.init()
            // console.log(fence)
            fences.push(fence)
            // 这就是采用对象的好处，直接封装，不需要写一大堆，直接得到数据即可
        })
        this.fences = fences
        //后期改成矩阵转置法
        // fences.forEach(fence => {//事实证明，set的去重操作无法用于对象去重
        //     fence.valueTitles = FenceGroup.unique(fence.valueTitles)
        // })
        // fences.forEach(fence => {//事实证明，set的去重操作无法用于对象去重
        //     fence = FenceGroup.unique(fence)
        // })
        // console.log(fences)
    }

    //
    // _creatFence() {
    //     const fence = new Fence()
    //     return fence
    //把规格值传入，避免整个spec对象的整体传入，因为这不好后续处理
    // }

    /**
     * @param skuList 本方法用多个sku的规格产生一个待转置的二维数组
     * @returns {Matrix}
     * @private 如果一个方法只在本类中调用，可以_标记为私有方法
     */
    _creatMatrix(skuList) {
        const m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
//由于specs中的同样属性的规格其实对象是相同的！
//所以不需要特别提出他的value值啊！！！最终wx：for="{{}}"也只需要一个数组就能完美渲染
//所以还是要对接口数据足够分析熟悉,如果是自己设计的数据接口就好了
//其实是犯了一个错误，数据结构里面的id不是虚设，直接提取字符串是愚蠢的
        })
        return new Matrix(m)
    }

}

export {FenceGroup}