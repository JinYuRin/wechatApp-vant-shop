import {Http} from "../utils/http";

class Banner {
    static locationB = 'b-1'
    static locationG = 'b-2'

    //请注意，对象的属性直接用：表示赋值，而类就和java一样的写法
    static async getHomeLocationB() {
        return await Http.request({
            url: `banner/name/${Banner.locationB}`,
            //${Banner.locationB}模板字符串进行拼接时直接使用属性名无法定位属性
        })
    }

    static async getHomeLocationG() {
        return await Http.request({
            url: `banner/name/${Banner.locationG}`,
        })
    }

}

export {
    Banner
}