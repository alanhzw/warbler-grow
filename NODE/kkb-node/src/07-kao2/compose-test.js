/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-10 17:38:07
 * @LastEditTime: 2021-12-11 21:10:42
 * @FilePath: \kkb-node\src\07-kao2\compose-test.js
 */

// 计算 x + y
const add = (x, y) => x + y
// 计算 z 的 平方
const square = z => z * z
// 计算 m - 1
const cutOne = (m) => m - 1

// 函数组合 先计算 z = x + y ,再计算 z 的平方
const fn = (x, y) => square(add(x, y))

console.log(fn(1, 2)); //=> 9

// 函数组合封装 2 个函数组合
const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))

const fn2 = compose(add, square)

console.log(fn2(1, 2)); //=> 9

// 函数组合封装  多个函数组合
const composeMore = (...[first, ...other]) => (...args) => {
  let ret = first(...args)
  other.forEach((fn) => {
    ret = fn(ret)
  })
  return ret
}

const fn3 = composeMore(add, square, cutOne, cutOne, cutOne)

console.log(fn3(1, 2)); //=> 9
