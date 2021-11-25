/*
 * @Author: 一尾流莺
 * @Description:数据响应式
 * @Date: 2021-11-23 15:54:09
 * @LastEditTime: 2021-11-25 15:13:36
 * @FilePath: \my-mini-vue-kkb\01-reactive.js
 */



// 数组响应式

// 1.替换数组原型中的7个方法

const originalProto = Array.prototype;

// 备份一份,修改备份

const arrayProto = Object.create(originalProto);

['push', 'pop', 'shift', 'unshift', 'reverse', 'sort', 'splice'].forEach(method => {
  arrayProto[method] = function() {
    // 原始操作
    originalProto[method].apply(this, arguments)
    // 覆盖操作:通知更新
    console.log(`数组执行${method}操作`);
  }
})









/**
 *
 * @param {*} obj  目标对象
 * @param {*} key  目标对象的一个属性
 * @param {*} val  目标对象的一个属性的初始值
 */
function defineReactive(obj, key, val) {
  // 递归
  observe(val)
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
        // 如果 newVal 是个对象类型,再次做响应式处理。
        if (typeof obj === 'object' && obj !== null) {
          observe(newVal)
        }
        val = newVal
      }
    }
  })
}

// 遍历obj 对其每个属性进行响应式处理
function observe(obj) {
  // 先判断类型, 响应式处理的目标一定要是个对象类型
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  //判断传入的obj类型

  if (Array.isArray(obj)) {
    // 覆盖原型 替换7个变更操作
    obj.__proto__ = arrayProto
    // 对数组内部的元素执行相应化处理
    const keys = Object.keys(obj)

    for (let i = 0; i < obj.length; i++) {
      observe(obj[i])
    }

  } else {
    // 遍历 obj, 对 obj 的每个属性进行响应式处理
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }


}

const obj = {
  foo: 'foo',
  bar: 'bar',
  friend: {
    name: 'aa'
  },
  arr: [1, 2, 3, 4]
}

observe(obj)


/**
 * @param {*} obj  目标对象
 * @param {*} key  目标对象的一个属性
 * @param {*} val  目标对象的一个属性的初始值
 */
function $set(obj, key, val) {
  defineReactive(obj, key, val)
}

$set(obj, 'age', 18)

obj.age = 20




obj.arr.push(6)