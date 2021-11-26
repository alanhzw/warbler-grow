/*
 * @Author: 一尾流莺
 * @Description: 当我们的代码执行 import Vue from 'vue' 的时候，就是从这个入口执行代码来初始化 Vue
 * 扩展$mount 解析el,template等选项
 * @Date: 2021-07-07 17:46:27
 * @LastEditTime: 2021-11-26 10:59:42
 * @FilePath: \vue-dev\src\platforms\web\entry-runtime-with-compiler.js
 */
/* @flow */


/**
 * 问:脚手架 vue-cli 创建的项目  new Vue 为什么不用 el ?
 * 答:不包含编译器,只包含运行时.
 */


/**
 * 问:el template render 的优先级, 同时设置了谁会生效?
 * 答:render > template > el
 * vue会先根据el挂载的节点 找到 template  然后再根据 template 编译成 render 函数 再转化成真实dom
 * 所以如果有render函数 就直接用 render函数了
 * const app = new Vue({
 *    el:"#demo",
 *    template:"<div>template</div>"
 *    template:"#app",
 *    render(h){return h('div','render')}
 *    data:{
 *      foo:'foo'
 *    }
 * })
 */


import config from 'core/config'
import { warn, cached } from 'core/util/index'
import { mark, measure } from 'core/util/perf'

//在这导出来Vue 然后给它原型上挂载一些东西 再给导出去
import Vue from './runtime/index'
import { query } from './util/index'
import { compileToFunctions } from './compiler/index'
import { shouldDecodeNewlines, shouldDecodeNewlinesForHref } from './util/compat'


const idToTemplate = cached(id => {
  const el = query(id)
  return el && el.innerHTML
})

// ```````````````````````````````````````````````````````扩展$mount`````````````````````````````````````````````````

//mount指向的就是Vue.prototype.$mount
const mount = Vue.prototype.$mount

/**
 * @description: 扩展$mount
 * @param {*} el
 * @param {*} hydrating
 * @return {*}
 */
Vue.prototype.$mount = function(
  el?: string | Element,
  hydrating?: boolean
): Component {

  // 获取 el 指定的 宿主元素 这一步返回的就一定是个 element 元素了
  el = el && query(el)

  //警告信息 vm实例不可以挂载到html和body上
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  // 获取用户的配置选项 就是 new Vue 传入的 options 参数
  const options = this.$options

  //先判断用户是否传入了 render 函数  ,如果不存在 render 才会走里面的逻辑
  if (!options.render) {
    // 获取用户设置的  template 选项
    let template = options.template
    // 如果设置了template el 就不用了
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      // 这里是 用户没有设置 template 选项 ,那么 el 才会生效 就会通过 getOuterHTML 获取模板内容
      // render 和 template 都没有 设置 , 才会使用 el , 获取的还是模板内容
      template = getOuterHTML(el)
    }

    // 获取模板之后,编译它
    if (template) {

      //
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      // 编译模板的目的是 获取渲染函数render
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      // 最后还是赋值给options.render  也就是说如果用户没有传入 render  编译之后也会有o ptions.render
      options.render = render
      //
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }

  // 执行默认的挂载功能
  return mount.call(this, el, hydrating)

}

/**
 * 获取元素的 outerHTML
 * @param {*} el dom 元素 , vue 的宿主元素
 */
function getOuterHTML(el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    const container = document.createElement('div')
    container.appendChild(el.cloneNode(true))
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions

export default Vue
