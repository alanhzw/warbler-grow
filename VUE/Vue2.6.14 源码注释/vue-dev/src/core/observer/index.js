/* @flow */


/**
 *
 */


import Dep from './dep'
import VNode from '../vdom/vnode'
import { arrayMethods } from './array'
import {
  def,
  warn,
  hasOwn,
  hasProto,
  isObject,
  isPlainObject,
  isPrimitive,
  isUndef,
  isValidArrayIndex,
  isServerRendering
} from '../util/index'

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)


export let shouldObserve: boolean = true

export function toggleObserving(value: boolean) {
  shouldObserve = value
}


// !``````````````````````````````````````````````````````````````````````````````````````````````````````````



/**
 * Observer 类
 */
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // 有多少个 vue 实例使用到了 data 数据

  constructor(value: any) {
    // value 就是 data 数据
    this.value = value
    // 创建一个依赖收集器
    this.dep = new Dep()
    // 有多少个 vue 实例使用到了 data 数据 初始为 0
    this.vmCount = 0
    // 标识 value 已经经过了响应式处理
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      // 数组的响应式化方式
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      //
      this.walk(value)
    }
  }


  // 给 data 中的每一个属性 调用 defineReactive 方法
  walk(obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  observeArray(items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}


/**
 *
 * @param {*} target 数组实例
 * @param {*} src
 */
function protoAugment(target, src: Object) {
  // 用 src 参数 替换了 数组实例的原型
  target.__proto__ = src
}


function copyAugment(target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}

// !``````````````````````````````````````````````````````````````````````````````````````````````````````````


/**
 * 将某个值 value 转化为一个响应式的
 * @param {*} value 目标值
 * @param {*} asRootData 是否是根 data 数据 data:{aaa:xxx,bbb:xxx}
 */
export function observe(value: any, asRootData: ?boolean): Observer | void {
  // 如果 value 不是一个对象(数组) 或者是一个 虚拟节点 直接返回
  // isObject方法 数组和对象 都会返回 true
  if (!isObject(value) || value instanceof VNode) {
    return
  }

  // 声明变量 ob
  // 除了响应式处理之外,如果 有动态属性加入活删除,数组有新元素加入或删除 做变更通知
  let ob: Observer | void

  // hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
  // 判断 value.__ob__ 存不存在 , __ob__ 用来标识 data 已经被转化为响应式的
  // 如果 value.__ob__ 存在 并且 value.__ob__ 是一个 Observer 实例 就不再重复做响应式处理
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    // 就让 ob 等于 value.__ob__
    ob = value.__ob__
  } else if (
    // 否则满足下面这些条件的话 创建一个新的 Observer 实例
    shouldObserve && // 全局变量 是否开启响应式化
    !isServerRendering() && // 不是服务端渲染
    (Array.isArray(value) || isPlainObject(value)) && // 必须是一个数组或者对象
    Object.isExtensible(value) && //  Object.isExtensible() 方法判断一个对象是否是可扩展的（是否可以在它上面添加新的属性）。
    !value._isVue // 不是一个 vue 实例
  ) {
    // 创建一个 Observer 实例
    ob = new Observer(value)
  }

  // 如果 ob 是一个 Observer 并且 是根data数据
  if (asRootData && ob) {
    //
    ob.vmCount++
  }

  // 返回ob 是一个 Observer 实例  或者 null
  return ob
}


// !``````````````````````````````````````````````````````````````````````````````````````````````````````````

/**
 * 一个对象obj的每一个key 都要过一遍  defineReactive 这个函数 转化为响应式的
 * @param {*} obj
 * @param {*} key
 * @param {*} val
 * @param {*} customSetter
 * @param {*} shallow
 */
export function defineReactive(
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  // 新建一个依赖收集器
  const dep = new Dep()

  // 该方法用来获取一个对象的所有自身属性的描述符。
  const property = Object.getOwnPropertyDescriptor(obj, key)

  // configurable 是一个布尔值，决定了是否可以修改 属性描述对象 以及表示能否通过 delete 删除属性。
  // 如果这个对象（obj）的属性（key）的 configurable 值为 false ， 也就是 不可配置的 , 直接返回什么也不做。
  // 可以用来优化性能,如果一个属性不需要响应式,那么可以把他的configurable设置为false ,就可以省去添加响应式的一套流程.
  if (property && property.configurable === false) {
    return
  }

  // 保存属性（key）的原始存取描述符 get 和 set
  const getter = property && property.get
  const setter = property && property.set

  //
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  // 递归处理

  let childOb = !shallow && observe(val)

  //
  Object.defineProperty(obj, key, {
    // 可枚举的
    enumerable: true,
    // 可配置的
    configurable: true,
    // 重新定义 getter
    get: function reactiveGetter() {
      // 获取原始属性值 调用原生的get
      const value = getter ? getter.call(obj) : val
      // 首次触发render函数的时候,会进行收集依赖
      // vue2 中 一个组件对应一个 watcher  一个 data.key 对应一个 dep
      // 但是还会有 用户自定义 的 Watcher(user watcher)
      // 所以 Watcher 和 dep 是多对多的关系
      if (Dep.target) {
        //
        dep.depend()
        // 子 ob 也要和当前的 watcher 建立关系
        if (childOb) {
          childOb.dep.depend()
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    // 重新定义 setter
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) return
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}

// !``````````````````````````````````````````````````````````````````````````````````````````````````````````

export function set(target: Array<any> | Object, key: any, val: any): any {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
export function del(target: Array<any> | Object, key: any) {
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot delete reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    )
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key]
  if (!ob) {
    return
  }
  ob.dep.notify()
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray(value: Array<any>) {
  for (let e, i = 0, l = value.length; i < l; i++) {
    e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
