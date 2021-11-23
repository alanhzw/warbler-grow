/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-08-26 15:51:21
 * @LastEditTime: 2021-08-27 17:25:52
 * @FilePath: \todolist\src\todoDom.ts
 */

import { ITodo } from './todoList';

class TodoDom {
  private oTodoList: HTMLElement;
  constructor(oTodoList: HTMLElement) {
    this.oTodoList = oTodoList;
  }
  //生成实例,需要传入一个dom节点
  public static create(oTodoList: HTMLElement) {
    return new TodoDom(oTodoList);
  }
  //添加待办
  public addItem(todo: ITodo): Promise<void> {
    return new Promise((resolve, reject) => {
      //生成节点
      const oItem: HTMLElement = document.createElement('div');
      oItem.className = 'todo-item';
      console.log('🚀🚀~ this.todoView:', this);
      oItem.innerHTML = this.todoView(todo);
      this.oTodoList.appendChild(oItem);
      resolve();
    });
  }
  //移除待办
  public removeItem(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      //获取待办列表
      const oItems: HTMLCollection = document.getElementsByClassName('todo-item');
      //根据id查找
      Array.from(oItems).forEach((oItem) => {
        const _id = Number.parseInt(oItem.querySelector('button').dataset.id);
        //移除对应dom
        if (_id === id) {
          oItem.remove();
          resolve();
        }
      });
      reject();
    });
  }
  //修改待办状态
  public toggleItem(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      //获取待办列表
      const oItems: HTMLCollection = document.getElementsByClassName('todo-item');
      //根据id查找
      Array.from(oItems).forEach((oItem) => {
        const oCheckBox: HTMLInputElement = oItem.querySelector('input');
        const _id = parseInt(oCheckBox.dataset.id);
        //修改对应dom的状态
        if (_id === id) {
          const oContent: HTMLSpanElement = oItem.querySelector('span');
          oContent.style.textDecoration = oCheckBox.checked ? 'line-through' : 'none';
          resolve();
        }
      });
      reject();
    });
  }
  public log() {
    console.log('🚀🚀~ 123:', 123);
  }
  //插入节点
  private todoView({ id, content, completed }: ITodo): string {
    return `
    <input type="checkbox" ${completed ? 'checked' : ''} data-id="${id}">
    <span style="text-decoration:${completed ? 'line-through' : 'none'}">${content}</span>
    <button data-id="${id}">删除</button>
    `;
  }
}
export default TodoDom;
