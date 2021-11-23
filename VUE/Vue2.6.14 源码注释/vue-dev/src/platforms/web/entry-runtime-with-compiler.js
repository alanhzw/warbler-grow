/*
 * @Author: 一尾流莺
 * @Description: 当我们的代码执行 import Vue from 'vue' 的时候，就是从这个入口执行代码来初始化 Vue
 * 扩展$mount 解析el,template等选项
 * @Date: 2021-07-07 17:46:27
 * @LastEditTime: 2021-07-22 08:09:30
 * @FilePath: \vue-dev\src\platforms\web\entry-runtime-with-compiler.js
 */
/* @flow */


/**
 * 问:脚手架 vue-cli 创建的项目  new Vue 为什么不用 el ?
 * 答:不包含编译器,只包含运行时.
 */


/**
 * 问:el template render 的优先级, 同时设置谁会生效?
 * 答:render > template > el
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
 * @description: 
 * @param {*} el
 * @param {*} hydrating
 * @return {*}
 */
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {

  el = el && query(el)

  //警告信息 vm实例不可以挂载到html和body上
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  //获取用户的配置选项 就是 new Vue 传入的 options 参数
  const options = this.$options

  //先判断用户是否传入了 render 函数
  if (!options.render) {
    let template = options.template
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
      template = getOuterHTML(el)
    }

    // 获取模板之后,编译它
    if (template) {
   
      //
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      // 编译模板的目的是 获取渲染函数
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      //最后还是赋值给options.render  也就是说如果用户没有传入render  编译之后也会有options.render
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }

  //执行默认的挂载功能
  return mount.call(this, el, hydrating)
  
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el: Element): string {
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
