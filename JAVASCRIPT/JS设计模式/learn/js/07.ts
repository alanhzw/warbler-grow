/*
 * @Description:透明单例
 * @Date: 2021-06-26 15:28:52
 * @LastEditTime: 2021-06-26 16:59:07
 * @FilePath: \day1\js\07.ts
 */

export {};

let Window = (function () {
  let window: Window;
  let Window = function (this: Window) {
    if (window) {
      return window;
    } else {
      return (window = this);
    }
  };
  Window.prototype.hello = function () {
    console.log('hello');
  };
  return Window;
})();

let window1 = new (Window as any)();
let window2 = new (Window as any)();
window1.hello();
console.log(window1 === window2);
