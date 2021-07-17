///category/grid/all
import {Http} from "../utils/http";
import {Paging} from "../utils/paging";
import countdown from "../miniprogram_npm/lin-ui/behaviors/countdown";

/**
 *制作分页数据时需要考虑一些因素，从而进行paging的封装
 * 1.如果没有下一页不能再发送请求，moreData
 * 2.如果服务器总记录数为零不能再发请求，empty
 * 3.需要有累加数据，accumulator
 * 4.需要当前数据，items
 */
class SpuPaging {
    static getLatestPaging() {
        return new Paging({
            url: `spu/latest`
        }, 6)
    }

}

export {
    SpuPaging
}