/*
 * @Description: 简单工厂模式
 * @Date: 2021-06-17 17:39:31
 * @LastEditTime: 2021-06-22 15:45:05
 * @FilePath: \day1\js\01.ts
 */
export {};
//抽象类只能用于继承  咖啡类
abstract class Coffee {
  /*
  在参数中加public修饰符可以达到简写的目的
  不用声明name:string
  构造函数中不用this.name=name
  */
  constructor(public name: string) {}
}

//子类  美式咖啡
class AmericanCoffee extends Coffee {}
//子类  拿铁咖啡
class LatteCoffee extends Coffee {}
//子类  卡布奇诺咖啡
class CappuccinoCoffee extends Coffee {}

//建立咖啡工厂  简单工厂  根据传入的参数返回不同子类的实例
class CafeFactory {
  static order(name: string) {
    switch (name) {
      case 'American':
        return new AmericanCoffee('美式咖啡');
      case 'Latte':
        return new LatteCoffee('拿铁咖啡');
      case 'Cappuccino':
        return new CappuccinoCoffee('卡布奇诺咖啡');
      default:
        throw new Error('没有此种咖啡');
    }
  }
}

//调用工厂函数测试一下
console.log(CafeFactory.order('American')); //AmericanCoffee {name: "美式咖啡"}
console.log(CafeFactory.order('Latte')); //LatteCoffee {name: "拿铁咖啡"}
console.log(CafeFactory.order('Cappuccino')); //CappuccinoCoffee {name: "卡布奇诺咖啡"}
console.log(CafeFactory.order('meinianda')); //Uncaught Error: 没有此种咖啡
