/*
 * @Author: 一尾流莺
 * @Description: initMixin 合并配置
 * @Date: 2021-07-07 17:46:27
 * @LastEditTime: 2021-07-22 08:36:23
 * @FilePath: \vue-dev\src\core\instance\init.js
 */

/* @flow */



import config from '../config'
import { initProxy } from './proxy'
import { initState } from './state'
import { initRender } from './render'
import { initEvents } from './events'
import { mark, measure } from '../util/perf'
import { initLifecycle, callHook } from './lifecycle'
import { initProvide, initInjections } from './inject'
import { extend, mergeOptions, formatComponentName } from '../util/index'



// vue实例的唯一id
let uid = 0


/**
 * @description: 定义 Vue.prototype._init 方法 
 * @param {*} Vue  Vue 构造函数
 */
export function initMixin (Vue: Class<Component>) {

  /**
   * 给Vue的原型上挂载一个_init方法
   * 负责 Vue 的初始化过程
   */
  Vue.prototype._init = function (options?: Object) {

// ```````````````````````````````````````````````````第一部分`````````````````````````````````````````````````
    // 获取 vue 实例
    const vm: Component = this
    // 每个 vue 实例都有一个 _uid，并且是依次递增的，确保唯一性
    vm._uid = uid++ 


    
   //````````````````````````性能测量开始  不重要`````````````````````∧
    let startTag, endTag
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }
   //````````````````````````性能测量开始  不重要`````````````````````∨


    
    // vue实例不应该是一个响应式的，做个标记
    vm._isVue = true



// ```````````````````````````````````````````````````第二部分`````````````````````````````````````````````````

    /**
     * 处理组件配置项 
     * 对options进行合并，vue会将相关的属性和方法都统一放到vm.$options中，为后续的调用做准备工作。
     * vm.$option的属性来自两个方面，一个是Vue的构造函数(vm.constructor)预先定义的，一个是new Vue时传入的入参对象
     */
    if (options && options._isComponent) {
    /**
     * 如果是子组件初始化时走这里,这里只做了一些性能优化
     * 将组件配置对象上的一些深层次属性放到 vm.$options 选项中，以提高代码的执行效率
     */
      initInternalComponent(vm, options)
    } else {
      /**
       * 合并配置项
       * 如果是根组件初始化走这里,，合并 Vue 的全局配置到根组件的局部配置，比如 Vue.component 注册的全局组件会合并到 根实例的 components 选项中
       * 至于每个子组件的选项合并则发生在两个地方：
       *   1、Vue.component 方法注册的全局组件在注册时做了选项合并 (全局API)
       *   2、{ components: { xx } } 方式注册的局部组件在执行编译器生成的 render 函数时做了选项合并，包括根组件中的 components 配置  (编译器)
       */
      vm.$options = mergeOptions(
        // 这里是取到之前的默认配置，组件 指令 过滤器等  也就是构造函数的options
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }


// ```````````````````````````````````````````````````第三部分`````````````````````````````````````````````````


    //在非生产环境下执行了initProxy函数,参数是实例;在生产环境下设置了实例的_renderProxy属性为实例自身
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    
    //设置了实例的_self属性为实例自身
    vm._self = vm
    // 初始化组件实例关系属性, 比如 $parent、$children、$root、$refs 等  不是组件生命周期mounted,created...
    initLifecycle(vm)
    /**
     * 初始化自定义事件，这里需要注意一点，所以我们在 <comp @click="handleClick" /> 上注册的事件，监听者不是父组件，
     * 而是子组件本身，也就是说事件的派发和监听者都是子组件本身，和父组件无关
     */
    initEvents(vm)
    // render初始化 初始化插槽, 获取 this.slots , 定义this._c以及$createElement ,也就是createElement方法,平时使用的 h 函数
    initRender(vm)
    // 调用创建之前的钩子函数  执行 beforeCreate 生命周期函数
    //可以根据beforeCreate调用的时期,来推测在beforeCreate中都可以获取哪些东西.
    callHook(vm, 'beforeCreate')
    // 注入初始化  初始化  inject 选项  得到 {key:val} 形式的配置对象  并对解析结果做响应式处理 ，并代理每个 key 到 vm 实例  先继承后传递
    initInjections(vm) // resolve injections before data/props
    // 数据初始化  响应式原理的核心,处理 props methods computed data watch 等
    initState(vm)
    // 解析组件配置项上的 provide 对象，将其挂载到 vm._provided 属性上

    initProvide(vm) // resolve provide after data/props
    // 调用创建完成的钩子函数  执行 created 生命周期函数
    // created中就可以访问数据了
    callHook(vm, 'created') 



    //通过_init() 可以知道 beforeCreate 生命周期不可以访问数据  因为还没有初始化 但是可以拿到关系属性,插槽,自定义事件

   //`````````````````````性能测量结束  不重要`````````````````````∧

    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }
   //`````````````````````性能测量结束  不重要`````````````````````∨


// ```````````````````````````````````````````````````第四部分`````````````````````````````````````````````````


    /**
     * 判断vm.$options有没有el  如果有 el 属性，则调用 vm.$mount 方法挂载 vm，挂载的目标就是把模板渲染成最终的 DOM
     * 存在el则默认挂载到el上 不存在的时候不挂载  需要手动挂载
     */
    if (vm.$options.el) {
       // 调用 $mount 方法，进入挂载阶段
      vm.$mount(vm.$options.el)
    }
  }
}


/**
 * @description: 性能优化 把组件传进来的一些配置赋值到vm.$options上 打平配置对象上的属性  减少运行时原型链的查找,提高执行效率
 * @param {*} vm 组件实例
 * @param {*} options 传递进来的配置
 */

export function initInternalComponent (vm: Component, options: InternalComponentOptions) {
  
  //基于组件构造函数上的配置对象 创建vm.$options
  const opts = vm.$options = Object.create(vm.constructor.options)

  //```````````````把组件传进来的一些配置赋值到vm.$options上````````````````````∧
  const parentVnode = options._parentVnode
  opts.parent = options.parent
  opts._parentVnode = parentVnode

  const vnodeComponentOptions = parentVnode.componentOptions
  opts.propsData = vnodeComponentOptions.propsData
  opts._parentListeners = vnodeComponentOptions.listeners
  opts._renderChildren = vnodeComponentOptions.children
  opts._componentTag = vnodeComponentOptions.tag

  //```````````````把组件传进来的一些配置赋值到vm.$options上````````````````````∨


  //如果有 render 函数, 将其赋值到vm.$options
  if (options.render) {
    opts.render = options.render
    opts.staticRenderFns = options.staticRenderFns
  }
}


/**
 * @description: 解析实例constructor上的options属性,并合并基类选项
 * @param {*} Ctor 实例构造函数
 * @return {*} options 配置选项
 */

export function resolveConstructorOptions (Ctor: Class<Component>) {
  //从实例构造函数上获取配置 options
  let options = Ctor.options
  if (Ctor.super) {
    /**
     *  Ctor.super是通过Vue.extend构造子类的时候。Vue.extend方法会为Ctor添加一个super属性，指向其父类构造器
     *  如果构造函数上有super 说明Ctor是Vue.extend构建的子类  换句话说就是检查是否有父级组件
     *  然后再用递归的方式获取基类上的配置选项,也就是获取所有上级的options合集
     */
    const superOptions = resolveConstructorOptions(Ctor.super)
    
    // Ctor.superOptions:父级组件的options  Vue构造函数上的options,如directives,filters,....
    const cachedSuperOptions = Ctor.superOptions


    if (superOptions !== cachedSuperOptions) {
      // 如果父级组件被改变过，更新superOption
      Ctor.superOptions = superOptions

      // 检查 Ctor.options 上是否有任何后期修改/附加选项
      const modifiedOptions = resolveModifiedOptions(Ctor)


      if (modifiedOptions) {
        //如果存在被修改或增加的选项，则合并两个选项
        extend(Ctor.extendOptions, modifiedOptions)
      }

      // 选项合并，将合并结果赋值为 Ctor.options
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
      
      if (options.name) {
        options.components[options.name] = Ctor
      }
    }
  }
  //当Ctor.super不存在时，如通过new关键字来新建Vue构造函数的实例 直接返回基础构造器的options
  return options
}


/**
 * @description: 检查是否有任何后期修改/附加选项
 * @param {*} Ctor 实例构造函数
 * @return {*} modified
 */

function resolveModifiedOptions (Ctor: Class<Component>): ?Object {
  // 声明修改项
  let modified
  // 获取构造函数选项
  const latest = Ctor.options
  // 密封的构造函数选项，备份
  const sealed = Ctor.sealedOptions
  // 对比两个选项，记录不一致的选项
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {}
      modified[key] = latest[key]
    }
  }
  //返回修改项
  return modified
}
