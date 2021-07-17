//我们需要设置的是业务对象，比如theme主题的这个类型的属性函数调用
//其实这和后端逻辑的基本一致性，这是我之前没有设想过的
import {Http} from "../utils/http";
//这不就是java吗？？？！！！
class Theme {
    //这样吧，我们在前端也设置业务对象，把一些通用方法封装到工具类中进行调用
    static locationA = 't-1'
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'
    static locationG = 't-5'
    themes = []
    async getThemes(...args) {//(callBack)
        //用对象保存数据，用一个初始化方法获取themes然后再用其他成员方法来查找数组元素
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH},${Theme.locationG}`
        this.themes = await Http.request({//也就是在getHomeLocationA里调用其他类的方法啊
            url: `theme/by/names`,//原本的参数就是模板字符串
            data: {
                names,
                // names: names 跟home.js一样能够自动赋值
            },
            // callBack:data=>{
            //     callBack(data)
            /**
             * 这个callBack(Http.request的参数)的传参为一个箭头函数，箭头函数又调用了
             * getHomeLocationA(callBack)这个参数
             * 其实这个callback相当不合理，层层调用，还要层层写，归根究底是因为callback是异步函数机制
             * 如果只调用一层回调函数其实还可以
             * 微信小程序的开发中虽然已经支持了ES6语法，
             * 但是在微信原生的API中仍然使用的还是ES5的回调函数。
             * 作为一个与时俱进的developer，我们当然使用Promise。
             * 所以我们为大家提供了Promisic函数，帮助大家来对原生的回调函数进行转换。
             */
        })
    }

    getHomeLocationA() {
        return this.themes.find(t => t.name === Theme.locationA)
        //    使用数组的查找方法，这是js特色的函数类型的参数，传函数统一使用箭头函数
    }

    getHomeLocationG() {
        return this.themes.find(t => t.name === Theme.locationG)
    }

    getHomeLocationE() {
        return this.themes.find(t => t.name === Theme.locationE)
    }

    getHomeLocationF() {
        return this.themes.find(t => t.name === Theme.locationF)
    }

    getHomeLocationH() {
        return this.themes.find(t => t.name === Theme.locationH)
    }

    static getHomeLocationESpu() {
        return Theme.getHomeLocationSpuByName(Theme.locationE)
    }

    static getHomeLocationSpuByName(name) {
        return Http.request({//当不需要等待调用方法的结果时也就是后面不需要写其他代码
            // ，是不需要加await
            //加async是为了返回一个promise，来保证await的代码可以执行
            //上面的getHomeLocationH方法没有Http
            // Http.request已经封装成可以返回一个
            //promise
            url: `theme/name/${name}/with_spu`,
        })//如果没有使用到实例属性的话就不会提醒你使用static方法
        //最好依靠自己的判断
    }


    //     wx.request({
    //         url: `${config.apiBaseUrl}theme/by/names`,
    //         //主要是使用模板字符串进行拼接，将自动导入对应的包
    //         method: "GET",//Get请求会将参数名和值插入url ?name=!,Post 则是加入body
    //         data: {
    //             names: 't-1'
    //         },
    //         header: {
    //             appKey: config.appKey//很多其他api是需要用key不然非法
    //         },
    //         success: ({data}) => {//请记住在success字段调用箭头函数的方法
    //             //再回顾一下原本的样子success({callback(res)})原来一切是这样的！！
    //             console.log(data)//顺带一提这里this的指向问题就不存在了
    //             // this.setData({//this指向被修正
    //             //     topTheme: data[0]
    //             callBack(data)//getHomeLocationA方法的参数为一个函数，参数名为data
    //         }
    //     })
    //     //  原本的success({})是这样的Object，里面直接默认是匿名的回调函数
    //     //  直接写执行语句即可，改造成非匿名回调函数就是如上所示

}

export {
    Theme//暴露一个类，其实Vue也是用的这些基础语法的变形而已
}