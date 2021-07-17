import {Http} from "../utils/http";

class Spu {
    static intactSku;
    static isNoSpec(spu) {
        if (spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0) {
            return true
        }
        return false
    }

    static async getDetail(id) {//获取spu详情
        return await Http.request({
            url: `spu/id/${id}/detail`
        })
    }

    /**
     * 从spu的sku列表中寻找指定sku的方法
     * 1-3代表一个规格，#进行分割，$区分sku
     * @param spu
     * @param code
     * @returns {*}
     */
    static findSku(spu, code) {
        spu.sku_list.forEach(sku => {
            if (sku.code.endsWith(code)) {
                this.intactSku = sku
            }
        })
        return this.intactSku
    }
    static getSketchSpec(spu){
        return spu.sketch_spec_id
    }
}

export {
    Spu
}
