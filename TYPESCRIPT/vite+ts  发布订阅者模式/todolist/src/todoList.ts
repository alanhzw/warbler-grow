/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-08-26 15:50:51
 * @LastEditTime: 2021-08-27 10:47:19
 * @FilePath: \todolist\src\todoList.ts
 */
export interface ITodo {
  // id 唯一标识
  id: number;
  // 内容
  content: string;
  // 是否完成
  completed: boolean;
}

class TodoList {
  private oTodoList: HTMLElement;
  //消息队列
  private message: Object = {};
  constructor(oTodoList: HTMLElement) {
    this.oTodoList = oTodoList;
  }
  //初始化该观察者,暴露该方法,由于我们要操作dom,所以需要传入一个总dom参数
  public static create(oTodoList: HTMLElement) {
    return new TodoList(oTodoList);
  }

  public on(type: string, fn: Function) {
    // 先判断有没有这个属性
    // 如果没有就初始化一个空的数组
    if (!this.message[type]) {
      this.message[type] = [];
    }
    // 如果有就向数组的后面push一个fn
    this.message[type].push(fn);
  }
  public off(type: string, fn: Function) {
    //先判断有没有订阅
    if (!this.message[type]) {
      return;
    }
    //判断有没有fn这个消息
    if (!fn) {
      //如果没有fn就删除整个消息队列
      this.message[type] = undefined;
      return;
    }
    //如果有fn就只是删除fn这个消息
    this.message[type] = this.message[type].filter((item: Function) => item !== fn);
  }
  public emit<T>(type: string, param: T) {
    //表示执行的是第几个Promise
    let i: number = 0;
    //待执行的函数数组
    let handlers: Function[];
    //每次执行的都是一个单独的Promise
    let res: Promise<unknown>;
    handlers = this.message[type];
    //如果这个数组长度不为0,才执行
    if (handlers.length) {
      //Promise.then的形式
      res = handlers[i](param);
      while (i < handlers.length - 1) {
        i++;
        res = res.then((param) => {
          return handlers[i](param);
        });
      }
    }
  }
}

export default TodoList;
