<!--
 * @Description:
 * @Date: 2021-03-25 11:43:47
 * @LastEditTime: 2021-04-20 16:48:33
 * @FilePath: \vite-project-js\src\components\todos\Todos.vue
-->
<template>
  <div>
    <div class="aaa"></div>
    <edit-todo v-model:todo-title="newTodo" @keyup.enter='addTodo' autofocus autocomplete="off" placeholder="请输入今日待办"></edit-todo>
    <ul>
      <todo-item v-for='todo in filterdTodos' :key='todo.id' :todo='todo' v-model:edited-todo="editedTodo" @remove-todo='removeTodo'></todo-item>
    </ul>
    <Filter :items='filterItems' v-model='visibility'></Filter>
  </div>
</template>

<script >
import { defineComponent, reactive, toRefs } from 'vue';
import Filter from './Filter.vue';
import TodoItem from './TodoItem.vue';

import { useTodos } from './useTodos';
import { useFilter } from './useFilter';


export default defineComponent({
  components: { TodoItem, Filter },
  name: 'Todo',
  setup () {

    const todoState = reactive({
      newTodo: '',
      editedTodo: null, // 正在编辑的todo
    });

    const { todos, addTodo, removeTodo, } = useTodos(todoState);

    const { filterState } = useFilter(todos);


    return {
      ...toRefs(filterState),
      ...toRefs(todoState),
      addTodo,
      removeTodo,
    };

  },


});
</script>

<style lang='scss'>
.test {
  width: 300px;
  height: 150px;
  background-color: blue;
  // border: 1px solid red;
  position: relative;
}
.test::before {
  content: '';
  display: block;
  width: 50%;
  height: 150px;
  background-color: green;
  position: absolute;
  top: 0;
  left: 0;
}
.aaa {
  width: 400px;
  height: 500px;
}
</style>
