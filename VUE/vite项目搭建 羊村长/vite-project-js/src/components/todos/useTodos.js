import { ref, watchEffect } from 'vue';

/*
 * @Description:
 * @Date: 2021-03-26 15:35:16
 * @LastEditTime: 2021-04-25 19:10:35
 * @FilePath: \vite-project-js\src\components\todos\useTodos.js
 */
const todoStorage = {
  fetch() {
    let todos = JSON.parse(localStorage.getItem('warbler-data') || '[]');
    todos.forEach((todo, index) => {
      todo.id = index + 1;
    });
    return todos;
  },
  save(todos) {
    localStorage.setItem('vue3-todos', JSON.stringify(todos));
  },
};

export function useTodos(state) {
  const todos = ref(todoStorage.fetch());

  const addTodo = () => {
    if (state.newTodo) {
      todos.value.push({
        id: todos.value.length + 1,
        title: state.newTodo,
        completed: false,
      });
      state.newTodo = '';
    }
  };

  const removeTodo = (todo) => {
    todos.value.splice(todos.value.indexOf(todo), 1);
  };

  watchEffect(() => {
    todoStorage.save(todos.value);
  });

  return {
    todos,
    addTodo,
    removeTodo,
  };
}
