import {Cell} from "./cell";

/**
 * 在规格矩阵中每一行都是fences[]的一个元素， 在视图层中的cell的x行号可对应该数组的下标
 * 类的取名极为讲究，最好采用形象法，减少过多业务相关的命名法
 * 本类存储同一类规格的所有cell
 */
class Fence {
    cells = []
    specs = []
    title
    id

    /**
     * 由于在fence-group中进行了转置
     * specs是同种规格类的集合
     * 存储本fence的title和id方便数据渲染
     * @param specs
     */
    constructor(specs) {
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
    }

    init() {
        this._initCells()
    }

    /**
     * 初始化本fence下的cells去重操作
     * @private
     */
    _initCells() {
        this.specs.forEach(s => {
            const existed = this.cells.some(c => {
                return c.id === s.value_id//得有返回值啊一布尔值
            })
            if (existed) {
                return
            }
            const cell = new Cell(s)
            this.cells.push(cell)
        })
    }


}

export {Fence}