/*
 * @Author: 一尾流莺
 * @Description: 数据响应式核心
 * @Date: 2021-07-07 17:46:27
 * @LastEditTime: 2021-07-22 08:34:18
 * @FilePath: \vue-dev\src\core\instance\state.js
 */
/* @flow */

import config from '../config'
import Watcher from '../observer/watcher'
import Dep, { pushTarget, popTarget } from '../observer/dep'
import { isUpdatingChildComponent } from './lifecycle'

import {
  set,
  del,
  observe,
  defineReactive,
  toggleObserving
} from '../observer/index'

import {
  warn,
  bind,
  noop,
  hasOwn,
  hyphenate,
  isReserved,
  handleError,
  nativeWatch,
  validateProp,
  isPlainObject,
  isServerRendering,
  isReservedAttribute,
  invokeWithErrorHandling
} from '../util/index'

// ```````````````````````````````````````````````proxy```````````````````````````````````````````````

// 代理对象
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

/**
 * 代理 通过sharedPropertyDefinition对象 给key添加一层getter和setter  将key代理到 vue 实例上
 * 当我们访问this.key的时候,实际上就会访问 vm._data.key / vm._props.key
 * @param {*} target  实例vm
 * @param {*} sourceKey  _data / _props
 * @param {*} key data / props 中的属性
 */

export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  // 拦截对 this.key的访问
  Object.defineProperty(target, key, sharedPropertyDefinition)
}



// ```````````````````````````````````````````````initState```````````````````````````````````````````````


/**
 * @description: 初始化数据  响应式原理的入口
 * @param {*} vm 实例 vm
 */
export function initState (vm: Component) {
  // 为当前组件创建了一个watchers属性，为数组类型  vm._watchers保存着当前vue组件实例的所有监听者（watcher）
  vm._watchers = []
  // 从实例上获取配置项
  const opts = vm.$options
  //如果vm.$options上面定义了props 初始化props 对props配置做响应式处理  
  //代理props配置上的key到vue实例,支持this.propKey的方式访问
  if (opts.props) initProps(vm, opts.props)
  //如果vm.$options上面定义了methods 初始化methods ,props的优先级 高于methods的优先级
  //代理methods配置上的key到vue实例,支持this.methodsKey的方式访问
  if (opts.methods) initMethods(vm, opts.methods)
  //如果vm.$options上面定义了data ,初始化data, 代理data中的属性到vue实例,支持通过 this.dataKey 的方式访问定义的属性
  if (opts.data) {
    initData(vm)
  } else {
    //这里是data为空时observe 函数观测一个空对象：{}
    observe(vm._data = {}, true /* asRootData */)
  }
  //如果vm.$options上面定义了computed 初始化computed
  //computed 是通过watcher来实现的,对每个computedKey实例化一个watcher,默认懒执行.
  //将computedKey代理到vue实例上,支持通过this.computedKey的方式来访问computed.key
  if (opts.computed) initComputed(vm, opts.computed)
  //如果vm.$options上面定义了watch 初始化watch
  if (opts.watch && opts.watch !== nativeWatch) { 
    // 判断组件有watch属性 并没有nativeWatch（ 兼容火狐）
    initWatch(vm, opts.watch)
  }
}

// ```````````````````````````````````````````````initProps```````````````````````````````````````````````

/**
 * @description: 初始化props
 * @param {*} vm 实例vm
 * @param {*} propsOptions 配置对象上的props
 */
function initProps (vm: Component, propsOptions: Object) {
  // 存放父组件传入子组件的props
  const propsData = vm.$options.propsData || {}
  // 存放经过转换后的最终的props的对象, props 与 vm._props 保持同一个引用，初始值为 {}
  const props = vm._props = {}

  // 缓存 props 的每个 key，性能优化, 一个存放props的key的数组，就算props的值是空的，key也会存在里面 ,keys 与 vm.$options._propKeys 保持同一个引用，初始值为 {}
  const keys = vm.$options._propKeys = []

  // 判断是不是根元素
  const isRoot = !vm.$parent

  //当组件不是根组件时，使用 toggleObserving(false) 取消对 Object Array 类型 Prop 深度观测，为什么这么做呢，因为 Object Array 在父组件中已经被深度观测过了。
  if (!isRoot) {
    toggleObserving(false)
  }
  
  // 遍历props配置对象
  for (const key in propsOptions) {
    // 向缓存键值数组中添加键名
    keys.push(key)
    /**
     * 用validateProp校验是否为预期的类型值，然后返回相应 prop 值(或default值)
     * 如果有定义类型检查，布尔值没有默认值时会被赋予false，字符串默认undefined
     */
    const value = validateProp(key, propsOptions, propsData, vm)
    //非生产环境
    if (process.env.NODE_ENV !== 'production') {
      // 进行键名的转换，将驼峰式转换成连字符式的键名
      const hyphenatedKey = hyphenate(key)
      
      // 校验prop是否为内置的属性, 内置属性：key,ref,slot,slot-scope,is
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          `"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`,
          vm
        )
      }
      // 对属性建立观察，并在直接使用props属性时给予警告
      defineReactive(props, key, value, () => {
        // 子组件直接修改属性时 弹出警告
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            `Avoid mutating a prop directly since the value will be ` +
            `overwritten whenever the parent component re-renders. ` +
            `Instead, use a data or computed property based on the prop's ` +
            `value. Prop being mutated: "${key}"`,
            vm
          )
        }
      })
    } else {
       // 生产环境下直接对属性进行存取器包装，建立依赖观察, 为 props 的每个 key 设置数据响应式
      defineReactive(props, key, value)
    }

    // 当实例上没有同名属性时，对属性进行代理操作,将对键名的引用指向vm._props对象中
    if (!(key in vm)) {
      // 代理 key 到 vm 对象上
      proxy(vm, `_props`, key)
    }
  }
   // 开启观察状态标识, 重新打开观测开关，避免影响后续代码执行
  toggleObserving(true)
}

// ```````````````````````````````````````````````initData```````````````````````````````````````````````

/**
 * @description: 初始化data
 * @param {*} vm 实例vm
 */
function initData (vm: Component) {
  //从vm.$options.data里面拿到data,就是我们在开发时候定义的data  赋值给data 还有vm._data
  let data = vm.$options.data
  /**
   * 判断data是不是一个function 保证后续处理的data是一个对象
   * 如果是 执行getData方法
   * 如果不是 返回 data || {}
   */

  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}

  //如果不是个对象的话,开发环境下会报一个警告
  if (!isPlainObject(data)) {
    //把data重置为一个空对象
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  //拿到data对象的key 组成一个数组
  const keys = Object.keys(data)
  //拿到props
  const props = vm.$options.props
  //拿到methods
  const methods = vm.$options.methods

  /**
   * 循环判断data中的属性和props,methods中的属性是否冲突
   * 因为所有的data,props,methods最终都会挂载到vm实例上
   */

  let i = keys.length
  while (i--) {
    const key = keys[i]
    //非生产环境
    if (process.env.NODE_ENV !== 'production') {
      //与methods判重
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    //与props判重
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      //判重通过,最终交给proxy做代理 ,代理data中的属性到vue实例,支持通过 this.dataKey 的方式访问定义的属性
      proxy(vm, `_data`, key)
    }
  }
  // 对data进行响应式处理
  observe(data, true /* asRootData */)
}

//如果data是一个函数 那么会走这个方法

export function getData (data: Function, vm: Component): any {

  // 收集依赖
  pushTarget()
  try {
    // 调用call 返回的值就是这个对象
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, `data()`)
    return {}
  } finally {
    // 释放依赖
    popTarget()
  }
}


// ```````````````````````````````````````````````initComputed```````````````````````````````````````````````

//用于传入Watcher实例的一个对象 懒执行
const computedWatcherOptions = { lazy: true }

/**
 * @description: 初始化computed
 * @param {*} vm 实例vm
 * @param {*} computed 定义的computed配置
 */
function initComputed (vm: Component, computed: Object) {

  // 声明变量 watchers，与 vm._computedWatchers 保持同一个引用，并且初始化值为空对象。
  const watchers = vm._computedWatchers = Object.create(null)

  // 声明变量isSSR,判断是不是 ssr(服务端渲染)
  const isSSR = isServerRendering()

  // 遍历 computed 配置对象 
  for (const key in computed) {
    // 获取 key 当次遍历对应的值.
    const userDef = computed[key]
    /**
     * 使用过 computed 都知道,它有两种写法  函数写法以及对象写法
     * computed: {
        compA: function() { return this.a + 1 },
        compB: {
                 get: function() { return this.b + 1 },
               }
       }
     * 判断是不是函数,如果是函数 getter 就是函数本身,如果是对象,getter就用他的get属性
     */
    const getter = typeof userDef === 'function' ? userDef : userDef.get

    // 非生产环境下getter如果为null,警告
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        `Getter is missing for computed property "${key}".`,
        vm
      )
    }

    // 如果不是SSR
    if (!isSSR) {
      /**
       * 针对当次循环的 computed，实例化一个 Watcher , 所以computed其实就是通过Watcher来实现的
       * watchers 保存了 vm._computedWatchers 的引用，所以这里同样会将该 watcher 保存到 vm._computedWatchers。
       * 每一个 computed 的 key，都会生成一个 watcher 实例，并且保存到 vm._computedWatchers 这个对象上。
       */

      watchers[key] = new Watcher(
        vm, //实例vm
        getter || noop, // getter
        noop, // 空函数
        computedWatcherOptions // 配置对象 懒执行(不可更改)
      )
    }

    //if 语句用来检测 computed 的命名是否与 data，props 冲突，在非生产环境将会打印警告信息。
    if (!(key in vm)) {
      //不冲突时，调用 defineComputed 方法。
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
      //与data中的属性冲突
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        //与props中的属性冲突
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      } else if (vm.$options.methods && key in vm.$options.methods) {
        //与methods中的属性冲突
        warn(`The computed property "${key}" is already defined as a method.`, vm)
      }
    }
  }
}

/**
 * @description: 为 sharedPropertyDefinition 添加 get， set 属性,将该 computed 属性添加到 Vue 实例 vm 上，并使用 sharedPropertyDefinition 作为设置项。
 * @param {*} target vm实例
 * @param {*} key 当次循环的computedKey
 * @param {*} userDef   computed.key
 */
export function defineComputed (
  target: any,
  key: string,
  userDef: Object | Function
) {
  //
  const shouldCache = !isServerRendering()


  if (typeof userDef === 'function') {
    // 如果computed.key是function类型走这里

    //设置sharedPropertyDefinition配置对象的get方法
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef)
    //设置sharedPropertyDefinition配置对象的set方法
    sharedPropertyDefinition.set = noop
  } else {
    //如果computed.key不是function类型走这里

    //设置sharedPropertyDefinition配置对象的get方法
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    //设置sharedPropertyDefinition配置对象的get方法
    sharedPropertyDefinition.set = userDef.set || noop
  }
  //如果是非生产环境 并且sharedPropertyDefinition的set方法是noop
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    //将sharedPropertyDefinition的set方法设置为警告
    sharedPropertyDefinition.set = function () {
      warn(
        `Computed property "${key}" was assigned to but it has no setter.`,
        this
      )
    }
  }
  //将computed配置项中的key,代理到vue实例上,支持通过this.computedKey的方式去访问 computed中的属性
  Object.defineProperty(target, key, sharedPropertyDefinition)
}


/**
 * @description: 在这里我们暂时只需要知道sharedPropertyDefinition的 get属性 被设置为这个方法的返回值就行
 * @param {*} key computedKey
 * @return {*} computedGetter
 */
function createComputedGetter (key) {
  return function computedGetter () {
    //拿到watcher
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        //执行watcher.evaluate方法
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}

/**
 * @description: 在这里我们暂时只需要知道sharedPropertyDefinition的 get属性 被设置为这个方法的返回值就行
 * @param {*} fn userDef.get
 * @return {*} computedGetter
 */
function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

// ```````````````````````````````````````````````initMethods```````````````````````````````````````````````

/**
 * @description: 初始化methods
 * @param {*} vm 实例vm
 * @param {*} methods 实例配置项上面的methods vm.$options.methods
 */
function initMethods (vm: Component, methods: Object) {
  // 获取实例配置上的props
  const props = vm.$options.props
  // 做一些检查 然后赋值给Vue实例
  for (const key in methods) {
    // 判断环境 只在非生产环境下起作用
    if (process.env.NODE_ENV !== 'production') {
      // 判断key是否是function类型
      if (typeof methods[key] !== 'function') {
        warn(
          `Method "${key}" has type "${typeof methods[key]}" in the component definition. ` +
          `Did you reference the function correctly?`,
          vm
        )
      }
      // 检测 methods 中的属性名是否与 props 冲突，由 initState 方法我们知道，props 是先与 methods 初始化的。
      if (props && hasOwn(props, key)) {
        warn(
          `Method "${key}" has already been defined as a prop.`,
          vm
        )
      }
      // 检测 methods 是否使用了关键字保留字， 而且不允许以$ 或者 _ 开头。
      if ((key in vm) && isReserved(key)) {
        warn(
          `Method "${key}" conflicts with an existing Vue instance method. ` +
          `Avoid defining component methods that start with _ or $.`
        )
      }
    }
    /**
     * 将 methods 中的所有方法赋值到 vue 实例上 ,支持通过 this.methodsKey 的方式访问定义的方法
     * 如果 key 不是一个函数 则赋值为空函数
     * 如果 key 是函数 则执行bind()函数
     */
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
  }
}


// ```````````````````````````````````````````````initWatch```````````````````````````````````````````````

/**
 * @description: 初始化watch
 * @param {*} vm 实例vm
 * @param {*} watch  watch配置项 / vm.$options.watch
 */
function initWatch (vm: Component, watch: Object) {
  
  //遍历watch配置项  从这可以看出 key 和 watcher 实例可能是 一对多 的关系
  for (const key in watch) {
    //获取当次遍历 key 对应的值
    const handler = watch[key]
    //如果是数组的话
    if (Array.isArray(handler)) {
      //循环数组 为数组的每一项调用createWatcher方法
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      // 如果不是数组 直接调用createWatcher方法
      createWatcher(vm, key, handler)
    }
  }
}


/**
 * @description: 兼容性处理，保证 handler 肯定是一个函数,调用 $watch 
 * @param {*} vm 实例vm
 * @param {*} expOrFn watchKey
 * @param {*} handler watch.key
 * @param {*} options 配置选项
 */
function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  //如果是对象 从 handler 属性中获取函数
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  //如果是字符串 表示的是一个methods方法,直接通过 this.methodsKey的方式  拿到这个函数
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  //调用vm.$watch方法
  return vm.$watch(expOrFn, handler, options)
}


// ```````````````````````````````````````````````stateMixin```````````````````````````````````````````````


export function stateMixin (Vue: Class<Component>) {
 
  const dataDef = {}
  dataDef.get = function () { return this._data }
  const propsDef = {}
  propsDef.get = function () { return this._props }
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      )
    }
    propsDef.set = function () {
      warn(`$props is readonly.`, this)
    }
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef)
  Object.defineProperty(Vue.prototype, '$props', propsDef)

  Vue.prototype.$set = set
  Vue.prototype.$delete = del

  Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true
    const watcher = new Watcher(vm, expOrFn, cb, options)
    if (options.immediate) {
      const info = `callback for immediate watcher "${watcher.expression}"`
      pushTarget()
      invokeWithErrorHandling(cb, vm, [watcher.value], vm, info)
      popTarget()
    }
    return function unwatchFn () {
      watcher.teardown()
    }
  }
}
