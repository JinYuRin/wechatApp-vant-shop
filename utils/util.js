// # promisic
// 将小程序内置非promise API转换为promise
/**
 * 其实就是将传进来的函数进行promise封装
 * 因为原本使用使用await是要用有返回值(promise)的
 * 这是一种代理模式
 * @param func
 * @returns {function(*=): Promise<unknown>}
 */
const promisic = function (func) {
    return function (params = {}) {
        return new Promise((resolve, reject) => {
            const args = Object.assign(params, {
                success: (res) => {
                    resolve(res);
                },
                fail: (error) => {
                    reject(error);
                }
            });
            func(args);
        });
    };
};
const combination = function (arr, size) {
    var r = [];
    function _(t, a, n) {
        if (n === 0) {
            r[r.length] = t;
            return;
        }
        for (var i = 0, l = a.length - n; i <= l; i++) {
            var b = t.slice();
            b.push(a[i]);
            _(b, a.slice(i + 1), n - 1);
        }
    }
    _([], arr, size);
    return r;
}
export {
    promisic,
    combination
}