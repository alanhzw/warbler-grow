/*
 * @Description:工厂方法模式 把创建产品的工作交由具体工厂类来实现
 * @Date: 2021-06-22 14:33:28
 * @LastEditTime: 2021-06-22 16:31:26
 * @FilePath: \day1\js\03.ts
 */

// export {};

//抽象类只能用于继承  咖啡类
abstract class Coffee {
  constructor(public name: string) {}
}
//子类  美式咖啡
class AmericanCoffee extends Coffee {}
//子类  拿铁咖啡
class LatteCoffee extends Coffee {}
//子类  卡布奇诺咖啡
class CappuccinoCoffee extends Coffee {}

//抽象类  咖啡工厂类
abstract class CafeFactory {
  //抽象方法 不需要实现
  abstract createCoffee(): Coffee;
}

//美式咖啡工厂
class AmericanFactory extends CafeFactory {
  createCoffee() {
    return new AmericanCoffee('美式咖啡');
  }
}

//拿铁咖啡工厂
class LatteFactory extends CafeFactory {
  createCoffee() {
    return new LatteCoffee('拿铁咖啡');
  }
}

//卡布奇诺咖啡工厂
class CappuccinoFactory extends CafeFactory {
  createCoffee() {
    return new CappuccinoCoffee('卡布奇诺咖啡');
  }
}

//建立工厂方法模式
class Factory {
  static order(name: string) {
    switch (name) {
      case 'American':
        return new AmericanFactory().createCoffee();
      case 'Latte':
        return new LatteFactory().createCoffee();
      case 'Cappuccino':
        return new CappuccinoFactory().createCoffee();
      default:
        throw new Error('没有此种咖啡');
    }
  }
}

//调用工厂函数测试一下
console.log(Factory.order('American')); //AmericanCoffee {name: "美式咖啡"}
console.log(Factory.order('Latte')); //LatteCoffee {name: "拿铁咖啡"}
console.log(Factory.order('Cappuccino')); //CappuccinoCoffee {name: "卡布奇诺咖啡"}
console.log(Factory.order('meinianda')); //Uncaught Error: 没有此种咖啡

/*
//先创造一个工厂
let americanFactory = new AmericanFactory();
console.log(americanFactory.createCoffee()); //AmericanCoffee {name: "美式咖啡"}

let latteFactory = new LatteFactory();
console.log(latteFactory.createCoffee()); //LatteCoffee {name: "拿铁咖啡"}

let cappuccinoFactory = new CappuccinoFactory();
console.log(cappuccinoFactory.createCoffee()); //CappuccinoCoffee {name: "卡布奇诺咖啡"}
*/

function createElement(type: any, config: any) {
  //this绑定为null 第一个参数绑定为type
  return { type, props: config };
}

function createFactory(type) {
  //源码中没有用到this,所以this绑定为null
  const factory = createElement.bind(null, type);
  return factory;
}

let factory = createFactory('h1');
let element = factory({ id: 'h1', className: 'title' });
