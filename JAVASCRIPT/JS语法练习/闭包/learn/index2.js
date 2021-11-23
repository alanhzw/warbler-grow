/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-12 16:41:37
 * @LastEditTime: 2021-11-15 19:38:28
 * @FilePath: \闭包\learn\index2.js
 */
// (() => {




/**
* Object()方法
* 如果传入的是值类型 会返回对应类型的构造函数创建的实例
* 如果传入的是对象 返回对象本身
* 如果传入 undefined 或者 null 会返回空对象

Function.prototype._call = function(ctx, ...args) {
  // 判断上下文类型 如果是undefined或者 null 指向window
  // 否则使用 Object() 将上下文包装成对象
  const o = ctx == undefined ? window : Object(ctx)
  // 如何把函数foo的this 指向 ctx这个上下文呢
  // 把函数foo赋值给对象o的一个属性  用这个对象o去调用foo  this就指向了这个对象o
  // 下面的this就是调用_call的函数foo  我们把this给对象o的属性fn 就是把函数foo赋值给了o.fn
  o.fn = this
  // 立即执行一次
  const result = o.fn(...args)
  // 删除这个属性
  delete o.fn
  // 把函数的返回值赋值给_call的返回值
  return result
}


foo._call(undefined) // window
foo._call(null) // window
foo._call(1) // Number
foo._call('11') // String
foo._call(true) // Boolean
foo._call(obj) // {name: 'warbler'}
console.log(foo._call(obj)); // success



Function.prototype._call = function(ctx, ...args) {
  // 判断上下文类型 如果是undefined或者 null 指向window
  // 否则使用 Object() 将上下文包装成对象
  const o = ctx == undefined ? window : Object(ctx)
  // 如何把函数foo的this 指向 ctx这个上下文呢
  // 把函数foo赋值给对象o的一个属性  用这个对象o去调用foo  this就指向了这个对象o
  // 下面的this就是调用_call的函数foo  我们把this给对象o的属性fn 就是把函数foo赋值给了o.fn
  //给context新增一个独一无二的属性以免覆盖原有属性
  const key = Symbol()
  o[key] = this
  // 立即执行一次
  const result = o[key](...args)
  // 删除这个属性
  delete o[key]
  // 把函数的返回值赋值给_call的返回值
  return result
}

foo(3, 4) // => 17
foo._apply(obj, [3, 4]) //=> 27
*/



var name = '一尾流莺'
var obj = {
  name: 'warbler',
}

// this 指向调用者document
// document.onclick = function() {
//   console.dir(this); // => #document
// }



Function.prototype._bind = function(ctx, ...args) {
  // 下面的this就是调用_bind的函数,保存给_self
  const _self = this
  // bind 要返回一个函数, 就不会立即执行了

  const newFn = function(...rest) {
    // 调用 call 修改 this 指向
    return _self.call(ctx, ...args, ...rest)
  }
  if (_self.prototype) {
    // 复制源函数的prototype给newFn 一些情况下函数没有prototype，比如箭头函数
    newFn.prototype = Object.create(_self.prototype);
  }
  return newFn
}

// this 指向 obj
document.onclick = function() {
  console.dir(this); // => #Object{name:'warbler}
}._bind(obj)
// })()


