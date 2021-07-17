import {config} from "../config/config";
import {promisic} from "../utils/util"

class Http {
    // mi = 'ni';
    //     getM(){
    //         return this.mi`${this.mi}`
    //     }
    static async request({url, data, method = 'GET'}) {//还能给出默认值
        //, callBack不需要在这里使用了，用同步的方式调用异步函数
        const res = await promisic(wx.request)({
            //promisic函数给一个函数promisic(wx.request)作为参数返回值为一个包装后的函数，再传入一个js对象作为参数
            //不能promisic(wx.request())这样子，这样子是调用了wx.request()，实际上函数作为参数来用是要去掉括号的，否则会被判定为执行该函数;
            //async 和await方法必须有返回结果，所以加上return和promisic封装
            //promisic封装将微信的api的回调函数返回值作为函数的返回值来return了
            //这个{}里写的居然是一个js对象，其实传参可以传对象
            //async+await方法调用后必须有个回调函数，实际上不可以直接使用
            url: `${config.apiBaseUrl}${url}`,//模板字符串不使用+进行拼接,参数和导入的模块甚至是类的属性都可以使用该语法
            data,//如果是get方法的话data可以传参效果等同于?name=t-1，post就是requestbody
            method,
            header: {
                appKey: config.appKey
            },
            //很多其他api是需要用key不然非法
            // success({data}) {
            //     callBack(data)
            // }
        })
        //     promisic(wx.request)({
        //             url: `${config.apiBaseUrl}${url}`,
        //             data,
        //             method,
        //             header: {
        //                 appKey: config.appKey
        //             },
        //             success({data}) {
        //                 callBack(data)
        //             }
        //         }
        // )
        return res.data
        //最终返回包装后的函数的返回值的data属性
    }

}

export {
    Http
}