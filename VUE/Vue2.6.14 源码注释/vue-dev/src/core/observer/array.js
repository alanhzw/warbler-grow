/*
 * @Author: 一尾流莺
 * @Description: 数组响应式
 * @Date: 2021-07-07 17:46:27
 * @LastEditTime: 2021-11-29 18:58:15
 * @FilePath: \vue-dev\src\core\observer\array.js
 */
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
// 数组原型的一个备份
export const arrayMethods = Object.create(arrayProto)

// 能改变数组本身的 七个 方法(变更方法)
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

//
methodsToPatch.forEach(function(method) {
  // 缓存原生的方法
  const original = arrayProto[method]
  // 扩展这七个方法,让他们可以做变更通知
  def(arrayMethods, method, function mutator(...args) {
    const result = original.apply(this, args)

    //
    const ob = this.__ob__
    // 新元素插入操作
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 新元素是仍然需要做响应式处理的
    if (inserted) ob.observeArray(inserted)
    // 通知更新
    ob.dep.notify()
    return result
  })
})
