/*
 * @Description:抽象工厂模式
 * @Date: 2021-06-22 14:33:32
 * @LastEditTime: 2021-06-22 19:28:47
 * @FilePath: \day1\js\04.ts
 */
export {};

//抽象类可以继承抽象类
abstract class Coffee {}

//抽象产品
abstract class AmericanCoffee extends Coffee {}
abstract class LatteCoffee extends Coffee {}
abstract class CappuccinoCoffee extends Coffee {}

//具体产品的个数 =  产品族 * 产品等级
class StarBucksAmericanCoffee extends AmericanCoffee {}
class LuckinAmericanCoffee extends AmericanCoffee {}
class StarBucksLatteCoffee extends LatteCoffee {}
class LuckinLatteCoffee extends LatteCoffee {}
class StarBucksCappuccinoCoffee extends CappuccinoCoffee {}
class LuckinCappuccinoCoffee extends CappuccinoCoffee {}

//抽象工厂 需要三个抽象方法
abstract class CafeFactory {
  //抽象方法  创建美式咖啡
  abstract createAmericanCoffee(): AmericanCoffee;
  //抽象方法  创建拿铁咖啡
  abstract createLatteCoffee(): LatteCoffee;
  //抽象方法  创建卡布奇诺咖啡
  abstract createCappuccinoCoffee(): CappuccinoCoffee;
}

//具体工厂 星巴克
class StarBucksCafeFactory extends CafeFactory {
  //具体方法  创建星巴克美式咖啡
  createAmericanCoffee() {
    return new StarBucksAmericanCoffee();
  }
  //具体方法  创建星巴克拿铁咖啡
  createLatteCoffee() {
    return new StarBucksLatteCoffee();
  }
  //具体方法  创建星巴克卡布奇诺咖啡
  createCappuccinoCoffee() {
    return new StarBucksCappuccinoCoffee();
  }
}

//具体工厂 瑞幸
class LuckinCafeFactory extends CafeFactory {
  //具体方法  创建星巴克美式咖啡
  createAmericanCoffee() {
    return new LuckinAmericanCoffee();
  }
  //具体方法  创建星巴克拿铁咖啡
  createLatteCoffee() {
    return new LuckinLatteCoffee();
  }
  //具体方法  创建星巴克卡布奇诺咖啡
  createCappuccinoCoffee() {
    return new LuckinCappuccinoCoffee();
  }
}

//创建瑞幸工厂
let luckinCafeFactory = new LuckinCafeFactory();
//创建瑞幸的美式咖啡
console.log(luckinCafeFactory.createAmericanCoffee()); //LuckinAmericanCoffee {}
