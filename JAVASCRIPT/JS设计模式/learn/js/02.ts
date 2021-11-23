/*
 * @Description:简单工厂模式
 * @Date: 2021-06-22 10:15:09
 * @LastEditTime: 2021-06-22 17:03:44
 * @FilePath: \day1\js\02.ts
 */

//联合类型
interface jQuery {
  [index: number]: any;
}
class jQuery {
  length: number;
  constructor(selector: string) {
    //获取dom元素 使用Array.from将类数组转成数组
    let elements = Array.from(document.querySelectorAll(selector));
    let length = elements ? elements.length : 0;
    this.length = length;
    for (let i = 0; i < length; i++) {
      this[i] = elements[i];
    }
  }
  html(htmlText: string | undefined) {
    //如果传参就是赋值,否则就是取值
    if (htmlText) {
      for (let i = 0; i < this.length; i++) {
        this[i].innerHTML = htmlText;
      }
    } else {
      return this[0].innerHTML;
    }
  }
}

interface Window {
  $: any;
}

//简单工厂就是函数里返回类的实例
window.$ = function (selector: string) {
  return new jQuery(selector);
};
