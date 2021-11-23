/*
 * @Description:
 * @Date: 2021-03-26 15:52:32
 * @LastEditTime: 2021-03-26 15:55:34
 * @FilePath: \vite-project-js\src\components\todos\useFilter.js
 */

import { reactive, computed } from 'vue';

const filters = {
  all(todos) {
    console.log('todos:', todos);
    return todos;
  },
  active(todos) {
    console.log(
      'todos:',
      todos.filter((todo) => {
        !todo.completed;
      })
    );

    return todos.filter((todo) => !todo.completed);
  },
  completed(todos) {
    return todos.filter((todo) => todo.completed);
  },
};

export function useFilter(todos) {
  const filterState = reactive({
    visibility: 'all',
    filterItems: [
      { label: 'all', value: 'all' },
      { label: 'active', value: 'active' },
      { label: 'completed', value: 'completed' },
    ],
    filterdTodos: computed(() => {
      return filters[filterState.visibility](todos.value);
    }),
  });
  return {
    filterState,
  };
}
