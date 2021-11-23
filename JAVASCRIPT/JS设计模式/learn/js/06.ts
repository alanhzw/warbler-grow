/*
 * @Description:单例模式
 * @Date: 2021-06-26 15:28:47
 * @LastEditTime: 2021-06-26 17:47:57
 * @FilePath: \day1\js\06.ts
 */

//在整个系统中,只能有一个类的实例

//把window类做成单例

export {};
/*
使用static关键字定义静态属性  通过类访问
TS中属性具有三种修饰符：
public（默认值），可以在类、子类和对象中修改
protected ，可以在类、子类中修改
private ，可以在类中修改
 */
class Window {
  private static instance: Window;
  private constructor() {}
  public static getInstance() {
    if (!Window.instance) {
      Window.instance = new Window();
    }
    return Window.instance;
  }
}

let w1 = Window.getInstance();

let w2 = Window.getInstance();

//两个实例不相等
console.log(w1 === w2); //false
