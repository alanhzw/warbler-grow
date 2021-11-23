/*
 * @Author: 一尾流莺
 * @Description:发布-订阅者模式
 * @Date: 2021-08-19 11:46:33
 * @LastEditTime: 2021-08-20 16:36:56
 * @FilePath: \index\index.js
 */


/**
 * + 属性:消息队列
 * {
 *  'click':[fn1,fn2,fn3],
 *  'mouse':[fn1,fn2,fn3]
 * }
 * + 能向消息队列里面添加内容 $on
 * + 能删除消息队列中的内容 $off
 * + 触发消息队列里面的内容 $emit
 */

(() => {


  class Observer {
    constructor() {
      this.message = {}
    };
    $on(type, fn) {
      // 先判断有没有这个属性
      // 如果没有就初始化一个空的数组
      if (!this.message[type]) {
        this.message[type] = []
      }
      // 如果有就向数组的后面push一个fn
      this.message[type].push(fn)
    };
    $off(type, fn) {
      //先判断有没有订阅
      if (!this.message[type]) {
        return
      }
      //判断有没有fn这个消息
      if (!fn) {
        //如果没有fn就删除整个消息队列
        this.message[type] = undefined
        return
      }
      //如果有fn就只是删除fn这个消息
      this.message[type] = this.message[type].filter(item => item !== fn)
    };
    $emit(type) {
      //先判断有没有订阅
      if (!this.message[type]) {
        return
      }
      //循环执行消息
      this.message[type].forEach((item) => {
        item()
      })
    };
  }

  //使用构造函数创建一个实例

  const person1 = new Observer()

  //消息A
  const handlerA = () => {
    console.log('🚀🚀~ handlerA');
  }
  //操作B
  const handlerB = () => {
    console.log('🚀🚀~ handlerB');
  }
  //操作C
  const handlerC = () => {
    console.log('🚀🚀~ handlerC');
  }

  //向 person1 委托一些内容,帮我观察,当红宝书
  //当有红宝书的时候,执行操作A和操作B
  person1.$on('redBook', handlerA)
  person1.$on('redBook', handlerB)
  //当有黄宝书的时候,执行操作B和操作C
  person1.$on('yellowBook', handlerB)
  person1.$on('yellowBook', handlerC)


  //整个消息队列都不需要进行托管了
  person1.$off('redBook')
  //消息队列依然需要托管,只不过要删除handlerA这个消息
  person1.$off('redBook', handlerA)


  //发射事件
  person1.$emit('redBook')

})()
