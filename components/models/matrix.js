/**
 * 为了完成二维矩阵的转置创建一个工具类
 * 这个
 */
class Matrix {
    m

    /**
     * @param matrix 即将转置的对象
     */
    constructor(matrix) {//我们用构造函数接受一个二维数组，
        //在这个对象中将二维数组转置
        this.m = matrix
    }

    /**
     * 为了简化代码和易于阅读，给取行列号的操作都编排了各自的get修饰方法代表取某个属性
     * @returns {*}
     */
    get rowsNum() {
        return this.m.length
    }

    get colsNum() {
        return this.m[0].length
    }


    /**
     * 矩阵转置，将col与row互转
     * @returns {[]}
     */
    transpose() {
        const desArr = [];
        for (let j = 0; j < this.colsNum; j++) {
            desArr[j] = [];
            for (let i = 0; i < this.rowsNum; i++) {
                desArr[j][i] = this.m[i][j];
            }
        }
        return desArr;
    }

    forEach(cb) {//涉及具体的行列号操作使用基本foreach
        for (let j = 0; j < this.colsNum; j++) {
            for (let i = 0; i < this.rowsNum; i++) {
                const element = this.m[i][j]
                cb(element, i, j)//遍历了矩阵后进行一个回调函数
            }//为什么要遍历这个矩阵，我们直接转置不行吗，这里有什么伏笔吗
            //使用了j，达到一列一列地遍历,可能是不同算法
        }
    }
}

export {Matrix}