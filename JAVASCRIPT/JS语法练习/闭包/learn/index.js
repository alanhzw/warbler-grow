/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-07-30 16:47:20
 * @LastEditTime: 2021-11-12 16:03:12
 * @FilePath: \闭包\learn\index.js
 */



(() => {


  class MyPromise {
    constructor(handleFun) {
      // 一个 Promise 的当前状态必须为以下三种状态中的一种：等待态（Pending）、已完成（Fulfilled）和已拒绝（Rejected）。
      this.status = 'pending'
      // 是任意合法的 Javascript 值，（包括 undefined, thenable , promise）
      this.value = undefined
      // 通过then方法会记录一些函数,当状态变化的时候会执行这些函数
      // then ⽅法可以被同⼀个 Promise 调⽤多次：
      // 当 Promise 成功执⾏时，所有 onFulfilled 需按照其注册顺序依次回调。
      // 当 Promise 被拒绝执⾏时，所有的onRejected需按照其注册顺序依次回调。
      this.fulfilledList = []
      this.rejectedList = []
      handleFun(this.triggerResolve.bind(this), this.triggerReject.bind(this))
    }
    triggerResolve(val) {
      // 当前的 promise 状态 已经变成了 resolve , 要执行后续的操作
      // 在执行上下文堆栈仅包含平台代码之前，不得调用 onFulfilled 和 onRejected
      // 所以使用 setTimeout(() => { }, 0)的方式把回调放在下一个event loop中
      setTimeout(() => {
        // 判断 只有 pending 状态才可以发生改变
        if (this.status !== 'pending') {
          return
        }
        // 如果是promise
        if (val instanceof MyPromise) {
          val.then(
            value => { },
            err => { }
          )
        } else {// 如果不是promise
          // 修改状态为已完成
          this.status = 'fulfilled'
          // 记录值
          this.value = val
          // 执行回调
          this.triggerFulFilled()
        }
      }, 0)
    }

    triggerFulFilled() {
      this.fulfilledList.forEach((item) => item())
      this.fulfilledList = []
    }

    triggerReject() { }

    then(onFulfilled, onRejected) {
      const { value, status } = this
      // then ⽅法必须返回⼀个 Promise 对象
      return new MyPromise((onNextFulfilled, onNextRejected) => {

        // 链式调用
        function onFinalFulfilled(val) {
          //判断 val是不是函数
          if (typeof onFulfilled !== 'function') {
            onNextFulfilled(val)
          } else {
            const res = onFulfilled(val)
            if (res instanceof MyPromise) {
              res.then(onNextFulfilled, onNextRejected)
            } else {
              onNextFulfilled(res)
            }
          }
        }

        function onFinalReject(error) {
          //判断 val是不是函数
          if (typeof onRejected !== 'function') {
            onNextRejected(error)
          } else {
            let res = null
            try {
              res = onRejected(error)
            } catch (e) {
              onNextRejected(e)
            }
            if (res instanceof MyPromise) {
              res.then(onNextFulfilled, onNextRejected)
            } else {
              onNextFulfilled(res)
            }
          }
        }

        switch (status) {
          case 'pending': {
            // 注册then的回调函数
            this.fulfilledList.push(onFinalFulfilled)
            this.rejectedList.push(onFinalReject)
            break
          }
          case 'fulfilled': {
            // 注册then的回调函数
            onNextFulfilled(value)
            break
          }
        }
      })
    }
    catch() { }
    finally() { }
    static resolve(value) {
      if (value instanceof myPromise) {
        return value
      }
      return new MyPromise(resolve => resolve(value))
    }
    static reject() { }
    static all(list) {
      return new MyPromise((resolve, reject) => {
        let count = 0
        const values = []
        list.forEach((i, promiseInstance) => {
          this.resolve(promiseInstance).then(
            (res) => {
              values[i] = res
              count++
              if (count === list.length) {
                resolve(values)
              }
            },
            (err) => {
              reject(err)
            })
        })

      })
    }
    static race() { }
    static any() { }
    static allSettled() { }
  }


  const promise = new MyPromise((resolve, reject) => {
    resolve("hello,warbler")
  })
  console.log('🚀🚀~ :', promise);
  promise.then(
    () => { console.log('已完成') },
    () => { console.log('已拒绝') }
  )




})()









// emojisense
// Codesnap
// TabNine
// Bookmarks
// vscode - pdf
// VSCode Rainbow Fart
// A - super- translate
// Atom One Dark Theme / One Dark Pro



