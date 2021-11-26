/*
 * @Author: 一尾流莺
 * @Description:Vue.use 方法
 * @Date: 2021-07-07 17:46:27
 * @LastEditTime: 2021-11-26 14:18:53
 * @FilePath: \vue-dev\src\core\global-api\use.js
 */
/* @flow */

import { toArray } from '../util/index'

export function initUse(Vue: GlobalAPI) {


  /**
   *  Vue.use 方法
   * @param {*} plugin 插件
   */
  Vue.use = function(plugin: Function | Object) {
    //
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    //
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }
    // Vue.use(vueRouter,arg1,arg2,...)
    // 把Vue.use 传入的 参数收集起来,从第 1 个索引的位置开始, 去掉插件对象本身,
    const args = toArray(arguments, 1)
    // Vue.use 的 this 指的是 Vue 的构造函数
    // 把 this 作为第一个参数 放进去
    args.unshift(this)
    //
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    //
    installedPlugins.push(plugin)
    //
    return this
  }

}
