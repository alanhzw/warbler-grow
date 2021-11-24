/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-24 14:40:04
 * @LastEditTime: 2021-11-24 15:56:28
 * @FilePath: \my-mini-vue-kkb\MyVue.js
 */


/**
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

  new Observer(this.$data)
}

/**
 * @param {*} obj  目标对象
 * @param {*} key  目标对象的一个属性
 * @param {*} val  目标对象的一个属性的初始值
 */
function $set(obj, key, val) {
  defineReactive(obj, key, val)
}


// 根据传入value的类型做响应的响应式处理
class Observer {
  constructor(value) {
    this.value = value
    if (Array.isArray(value)) {
      // todo  数组的响应式处理方式
    } else {
      // 对象的响应式处理方式
      this.walk(value)
    }
  }

  // 对象的响应式处理
  walk(obj) {
    // 遍历 obj, 对 obj 的每个属性进行响应式处理
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}


/**
 * 1.对data选项做响应式处理
 * 2.编译模板
 */
class MyVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    // data响应式处理
    observe(this.$data)
  }
}