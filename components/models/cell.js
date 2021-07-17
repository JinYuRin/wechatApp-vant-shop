import {CellStatus} from "../../core/enum"

/**
 * 在规格矩阵中每一行的每个cell都是fence[]的一个元素， 在视图层中的cell的y行号可对应该数组的下标
 */
class Cell {
    id
    title
    status = CellStatus.WAITING
    spec

    /**
     * 每个spec规格矩阵的元素都是一个cell
     * id定位，title渲染和status状态
     */
    constructor(spec) {
        this.id = spec.value_id
        this.title = spec.value
        this.spec=spec
    }
    getCellCode(){
        return this.spec.key_id+'-'+this.id
    }

}

export {Cell}