/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-08-26 15:51:21
 * @LastEditTime: 2021-08-27 16:54:03
 * @FilePath: \todolist\src\todoEvent.ts
 */

import { ITodo } from './todoList';

class TodoEvent {
  // 待办列表数组
  private todoData: ITodo[] = [];
  // 生成实例
  public static create(): TodoEvent {
    return new TodoEvent();
  }
  // 增加待办
  public addTodo(todo: ITodo): Promise<ITodo> {
    return new Promise((resolve, reject) => {
      //查找待办
      const _todo: ITodo = this.todoData.find((t) => t.content === todo.content);
      //如果已经存在 返回失败内容
      if (_todo) {
        console.log('🚀🚀~ 该项已存在');
        return reject(1001);
      }
      //否则添加一个待办
      this.todoData.push(todo);
      console.log('🚀🚀~ 添加成功:', this.todoData);
      resolve(todo);
    });
  }
  //删除待办
  public removeTodo(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      //根据id筛选掉对应待办
      this.todoData = this.todoData.filter((t) => t.id !== id);
      resolve(id);
    });
  }
  //切换待办状态
  public toggleTodo(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      //遍历待办列表数组
      this.todoData = this.todoData.map((t) => {
        //找到对应id,修改状态
        if (t.id === id) {
          t.completed = !t.completed;
          resolve(id);
        }
        return t;
      });
    });
  }
}
export default TodoEvent;
