import {Cell} from "./cell";
import {Joiner} from "../../utils/joiner";

/**
 * 如果要确定一个cell的状态，就必须确定其他cell的是否处于selected状态，
 * 创建一个新的skuPending类来储存已经selected的cell
 */
class SkuPending {
    pending = []
    size

    constructor(size) {
        this.size = size
    }

    /**
     * 初始化默认sku，但是必须预先判断是否有默认sku
     * @param sku
     */
    init(sku) {
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i])
            this.insertCell(cell, i)
        }
    }

    getCurrentSpecValues() {
        const values = this.pending.map(cell => {
            return cell ? cell.title : null
        })
        return values
    }

    getMissingSpecKeysIndex() {
        const keysIndex=[]
        for (let i = 0; i < this.size; i++) {
            if (!this.pending[i]){
                keysIndex.push(i)
            }
        }
        return keysIndex
    }

    /**
     * 当intact时将pending的内容组成code
     */
    getSkuCode() {
        const joiner = new Joiner('#')
        this.pending.forEach(cell => {
            // codes.push(cell.spec.key_id + '-' + cell.id)
            const cellCode = cell.getCellCode()
            joiner.join(cellCode)
        })
        return joiner.getStr()
    }


    /**
     * 判定sku是否已选择完毕
     * @returns {boolean}
     */
    isIntact() {
        // if (this.size !== this.pending.length) {
        //     return false
        // }
        for (let i = 0; i < this.size; i++) {
            // const isEmpty = this.isEmptyPart(i)
            if (this._isEmptyPart(i)) {
                return false
            }
        }
        return true
    }

    _isEmptyPart(index) {
        return this.pending[index] ? false : true
    }

    /**
     * 正选的cell
     * @param cell 被插入的cell
     * @param x 被插入的cell的行号，从而保证一行只有一个cell
     */
    insertCell(cell, x) {
        this.pending[x] = cell
    }

    /**
     * 反选的cell
     * @param x 传入要删除的行号即可
     */
    removeCell(x) {
        this.pending[x] = null
    }

    /**
     * 通过传入的行号寻找是否本行有被选择的cell
     * 这个类设置地十分巧妙，能有效减少大量的代码和多余的循环（否则确认被选择的cell需要遍历全部cells，我之前就是这么做）还为了sku的确定做准备
     * @param x
     * @returns {*}
     */
    findSelectedCellByX(x) {
        return this.pending[x]
    }

    /**
     * 确定一个cell是否是selected，是则不需要抓取这个cell的潜在路径，因为selected的cell潜在路径肯定在路径字典里，其status会被设置为Waiting
     * @param cell
     * @param x
     * @returns {boolean}
     */
    isSelected(cell, x) {
        const pendingCell = this.pending[x]
        if (!pendingCell) {
            return false
        }
        return cell.id === pendingCell.id
    }
}

export {SkuPending}