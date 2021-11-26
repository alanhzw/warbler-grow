/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-07-07 17:46:27
 * @LastEditTime: 2021-11-26 11:54:55
 * @FilePath: \vue-dev\src\core\index.js
 */

// Vue的核心方法
import Vue from './instance/index'

// 定义了全局API的相关方法
import { initGlobalAPI } from './global-api/index'

// 初始化_isServer,判断是否ssr
import { isServerRendering } from 'core/util/env'

import { FunctionalRenderContext } from 'core/vdom/create-functional-component'


// 初始化全局API，如Vue.util/Vue.set/Vue.use/vue.delete/vue.component等
initGlobalAPI(Vue)



//```````````````````````````````````````````````defineProperty``````````````````````````````````````````````

// `````````````````````与服务端渲染相关````````````````````````````^

//原型属性定义'$isServer',并拦截监听
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})


//原型属性定义'$ssrContext',并拦截监听
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})


// `````````````````````与服务端渲染相关````````````````````````````^

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})


//```````````````````````````````````````````````defineProperty``````````````````````````````````````````````



Vue.version = '__VERSION__'

export default Vue
