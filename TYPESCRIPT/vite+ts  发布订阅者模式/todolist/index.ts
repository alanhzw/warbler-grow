/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-08-26 14:39:40
 * @LastEditTime: 2021-08-27 17:24:58
 * @FilePath: \todolist\index.ts
 */
import type { ITodo } from './src/todoList';
import TodoList from './src/todoList';
import TodoEvent from './src/todoEvent';
import TodoDom from './src/todoDom';

((document) => {
  //获取对应节点
  const oTodoList: HTMLElement = document.querySelector('.todo-list');
  const oAddBtn: HTMLElement = document.querySelector('.add-btn');
  const oInput: HTMLInputElement = document.querySelector('.todo-input input');
  //创建三个类的实例
  const todoList: TodoList = TodoList.create(oTodoList);
  const todoEvent: TodoEvent = TodoEvent.create();
  const todoDom: TodoDom = TodoDom.create(oTodoList);

  const init = (): void => {
    //订阅事件
    todoList.on('add', todoEvent.addTodo.bind(todoEvent));
    todoList.on('add', todoDom.addItem.bind(todoDom));
    todoList.on('remove', todoEvent.removeTodo.bind(todoEvent));
    todoList.on('remove', todoDom.removeItem.bind(todoDom));
    todoList.on('toggle', todoEvent.toggleTodo.bind(todoEvent));
    todoList.on('toggle', todoDom.toggleItem.bind(todoDom));
    //绑定事件
    bindEvent(todoList, oTodoList, oAddBtn, oInput);
    //触发事件
  };
  const bindEvent = (todoList: TodoList, list: HTMLElement, btn: HTMLElement, input: HTMLInputElement) => {
    //为添加按钮绑定一个点击事件
    btn.addEventListener(
      'click',
      () => {
        const val: string = input.value.trim();
        if (!val.length) {
          return;
        }
        todoList.emit<ITodo>('add', {
          id: new Date().getTime(),
          content: val,
          completed: false,
        });
        input.value = '';
      },
      false
    );
    //为所有的checkbox添加一个切换状态事件
    //为所有的删除按钮添加一个删除事件
    list.addEventListener(
      'click',
      (e: MouseEvent) => {
        const tar = e.target as HTMLLIElement;
        const targetName = tar.tagName.toLowerCase();
        if (targetName === 'input' || targetName === 'button') {
          const id: number = parseInt(tar.dataset.id);
          switch (targetName) {
            case 'input':
              todoList.emit<number>('toggle', id);
              break;
            case 'button':
              todoList.emit<number>('remove', id);
              break;
            default:
              break;
          }
        }
      },
      false
    );
  };
  init();
})(document);
