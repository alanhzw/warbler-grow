/*
 * @Author: 一尾流莺
 * @Description: Vue实际上就是一个用 Function 实现的类，我们只能通过 new Vue 去实例化它。
 * @Date: 2021-07-07 17:46:27
 * @LastEditTime: 2021-07-22 08:55:20
 * @FilePath: \vue-dev\src\core\instance\index.js
 */

import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'


/*
  为何 Vue 不用 ES6 的 Class 去实现呢？
  我们往后看这里有很多 xxxMixin 的函数调用，并把 Vue 当参数传入，
  它们的功能都是给 Vue 的 prototype 上扩展一些方法，
  Vue 按功能把这些扩展分散到多个模块中去实现，而不是在一个模块里实现所有，这种方式是用 Class 难以实现的。
  这么做的好处是非常方便代码的维护和管理，这种编程技巧也非常值得我们去学习
*/

// Vue  构造函数  Vue 只能通过 new 关键字初始化，然后会调用 this._init 方法

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    // instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
    // 如果不是Vue的实例 Vue必须是new实例化出来的  es5实现class的方式(通过函数)
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  //Vue.prototype._init方法 该方法是在 initMixin 中定义的 ,其入参options就是我们定义的对象时传入的参数对象
  this._init(options)
}


/**
 * 执行xxxMixin方法，初始化相关的功能定义，这里仅仅是定义函数，后面实际用到再分析
 * 每一个Mixin都是向Vue的原型上添加一些属性或者方法(也就是实例方法的初始化)
 */

//合并配置
initMixin(Vue)
// stateMixin主要定义了$set，$delete，$watch,同时可以看到$data，$props是只读属性。
stateMixin(Vue)
//初始化事件中心 $emit/$once/$on/$off
eventsMixin(Vue)
//初始化生命周期,调用声明周期钩子函数 $_updata / $forceUpdate
lifecycleMixin(Vue)
//初始化渲染 _render $nextTick
renderMixin(Vue)

export default Vue
