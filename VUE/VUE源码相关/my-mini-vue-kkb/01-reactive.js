/*
 * @Author: 一尾流莺
 * @Description:数据响应式
 * @Date: 2021-11-23 15:54:09
 * @LastEditTime: 2021-11-23 16:05:17
 * @FilePath: \grow\VUE\VUE源码相关\my-mini-vue-kkb\01-reactive.js
 */

/**
 *
 * @param {*} obj  目标对象
 * @param {*} key  目标对象的一个属性
 * @param {*} val  目标对象的一个属性的初始值
 */
function defineReactive(obj, key, val) {
  // 通过该方法拦截数据
  Object.defineProperty(obj, key, {
    // 读取数据的时候会走这里
    get() {
      console.log('🚀🚀~ get:', key);
      return val
    },
    // 更新数据的时候会走这里
    set(newVal) {
      // 只有当新值和旧值不同的时候 才会触发重新赋值操作
      if (newVal !== val) {
        console.log('🚀🚀~ set:', key);
        val = newVal
      }
    }
  })
}


const obj = {}

defineReactive(obj, 'foo', 'foo')

obj.foo

obj.foo = 'xxxxxxxxx'

console.log('🚀🚀~ obj:', obj);