/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-07-07 17:46:27
 * @LastEditTime: 2021-11-23 10:01:49
 * @FilePath: \vue-dev\src\core\observer\dep.js
 */
/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'
import config from '../config'

// dep 依赖收集器的id 递增不重复
let uid = 0

// 定义依赖收集器类  本质就是一个用来实现发布订阅模式的一个类
export default class Dep {
  //
  static target: ?Watcher;
  // id 递增不重复
  id: number;
  // 订阅消息队列(Subscribes),其实就是存放 Watchers
  subs: Array<Watcher>;

  // 构造器
  constructor() {
    this.id = uid++
    this.subs = []
  }

  //添加 Watcher
  addSub(sub: Watcher) {
    // 添加一个(Watcher)
    this.subs.push(sub)
  }

  // 移除 Watcher
  removeSub(sub: Watcher) {
    // 移除一个(Watcher)
    remove(this.subs, sub)
  }

  // Dep.target: 正在处理的某个 Watcher
  depend() {
    // 如果存在这么一个 Watcher 调用 Watcher 上的 addDep 方法,把当前的 Dep实例 传递进去
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  // 发布者
  notify() {
    // 拷贝一个 this.subs 的副本
    const subs = this.subs.slice()
    //
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // 每一个 Watcher 都会有一个 id , 根据 id 递增的顺序进行排序  到时候会按照这个顺序触发视图的更新
      subs.sort((a, b) => a.id - b.id)
    }
    // 循环触发 Watcher 的 update 方法, 更新视图
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}


// Dep 依赖收集器类的 target 默认为 null
Dep.target = null

//
const targetStack = []

// Dep 类的 target 设置为 传入的 Watcher
export function pushTarget(target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

//
export function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
