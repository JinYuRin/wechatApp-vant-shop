import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";

/**
 * 核心交流类
 * 渲染数据可用fenceGroup，点击事件判定cells状态和确定sku选择用本类
 */
class Judger {
    fenceGroup
    pathDict = []
    skuPending

    /**
     * 本类为了确定cells状态，需要得到fenceGroup的所有信息来
     * 初始化spu的路径字典和默认SkuPending
     * @param fenceGroup
     */
    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup
        this.initPathDict()
        this.initSkuSpending()
    }

    /**
     * 判定sku是否选择完毕的调用，完成请选择的逻辑显示
     * @returns {boolean}
     */
    isSkuIntact() {
        return this.skuPending.isIntact()
    }
    getCurrentValues(){
        return this.skuPending.getCurrentSpecValues()
    }

    getMissingKeys() {
        const missingKeysIndex = this.skuPending.getMissingSpecKeysIndex()
        return missingKeysIndex.map(i => {
            return this.fenceGroup.fences[i].title
        })
    }

    /**
     * ......................
     */
    initSkuSpending() {
        const specsLength = this.fenceGroup.fences.length
        this.skuPending = new SkuPending(specsLength)
        const defaultSku = this.fenceGroup.getDefaultSku()
        if (!defaultSku) {
            return
        }
        this.skuPending.init(defaultSku)
        console.log(this.skuPending)
        this._initSelectedCell()
        this.judge(null, null, null, true)
    }

    _initSelectedCell() {
        this.skuPending.pending.forEach(cell => {
            this.fenceGroup.setCellStatusById(cell.id, CellStatus.SELECTED)
        })
    }


    /**
     * 用skuCode类初始化每一个sku的路径并加入字典
     */
    initPathDict() {
        this.fenceGroup.skuList.forEach(s => {
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
        })
        // console.log(this.pathDict)
    }

    /**
     *
     * @param cell
     * @param x
     * @param y
     * @param isInit
     * @private
     */
    judge(cell, x, y, isInit = false) {
        if (!isInit) {
            this._changeCurrentCellStatus(cell, x, y)
        }
        /**
         * 该回调函数本来是私有方法，但是由于this的指向问题，直接变成了箭头函数
         */
        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y)
            if (!path) {
                return
            }
            const isIn = this.isInDict(path)
            if (isIn) {
                this.fenceGroup.setCellStatusByXy(x, y, CellStatus.WAITING)
                // this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
            } else {
                this.fenceGroup.setCellStatusByXy(x, y, CellStatus.FORBIDDEN)
                // this.fenceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN
            }
        })
    }

    getDeterminateSku() {
        const code = this.skuPending.getSkuCode()
        const sku = this.fenceGroup.getSKu(code)
        return sku
    }

    /**
     * 独立方法更具可读性和易用性
     * @param path
     * @returns {boolean}
     */
    isInDict(path) {
        return this.pathDict.includes(path)
    }

    /**
     * 搜索当前点击cell的潜在路径，注意，每一个当前cell只有一个路径
     * 为了得到已选择的cell和最终确定sku，采用了skuPending类
     * @param cell
     * @param x
     * @param y
     * @returns {*}
     * @private
     */
    _findPotentialPath(cell, x, y) {
        const joiner = new Joiner('#')
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.skuPending.findSelectedCellByX(i)
            if (x === i) {
                //遍历所有的cell中找出当前行的x=i
                //但是如果是已经选择的cell怎么办，还是被加入，这个路径一旦被判定存在
                //selected就变成了Waiting了
                if (this.skuPending.isSelected(cell, x)) {
                    return
                }
                const cellCode = cell.getCellCode()
                joiner.join(cellCode)
            } else {
                if (selected) {
                    const selectedCellCode = selected.getCellCode()
                    joiner.join(selectedCellCode)
                }
            }
        }
        return joiner.getStr()
    }

    /**
     * 作为_findPotentialPath的私有方法，避免了cell对象和渲染层cell的问题
     * @param spec
     * @returns {string}
     * @private
     */
    // _getCellCode(spec) {
    //     return spec.key_id + '-' + spec.value_id
    // }

    /**
     * 改变当前所点击的cell的状态
     * @param cell
     * @param x
     * @param y
     * @private
     */
    _changeCurrentCellStatus(cell, x, y) {
        if (cell.status === CellStatus.WAITING) {
            // cell.status=CellStatus.SELECTED
            // this.fenceGroup.fences[x].cells[y]=cell引用是不行的
            // console.log(cell)
            // console.log(this.fenceGroup.fences[x].cells[y])
            // 为什么这个方法不行？
            this.fenceGroup.setCellStatusByXy(x, y, CellStatus.SELECTED)
            // this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
            this.skuPending.insertCell(cell, x)
        }
        if (cell.status === CellStatus.SELECTED) {
            // cell.status=CellStatus.WAITING
            // this.fenceGroup.fences[x].cells[y]=cell
            this.fenceGroup.setCellStatusByXy(x, y, CellStatus.WAITING)
            // this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
            this.skuPending.removeCell(x)
        }
    }

}

export {Judger}