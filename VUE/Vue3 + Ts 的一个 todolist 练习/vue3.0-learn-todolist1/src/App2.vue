<!--
 * @Description: 
 * @Date: 2021-03-17 19:15:08
 * @LastEditTime: 2021-03-19 15:41:03
 * @FilePath: \vue3.0-learn-todolist1\src\App.vue
-->
<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo='addTodo' />
      <List :todos='todos' :deleteTodo='deleteTodo' :updateTodo='updateTodo' />
      <Footer :todos='todos' :checkAll='checkAll' :clearAll='clearAll' />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, watch, onMounted } from 'vue'
//引入子组件
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import List from './components/List.vue'

//引入泛型接口
import { Todo } from './types/todo'

import { saveTodos, readTodos } from './hooks/useLocalStorage'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer,
    List,
  },
  setup() {
    const state = reactive<{ todos: Todo[] }>({
      todos: [],
    })
    const addTodo = (todo: Todo) => {
      state.todos.unshift(todo)
    }
    const deleteTodo = (index: number) => {
      state.todos.splice(index, 1)
    }
    const updateTodo = (todo: Todo, isselect: boolean) => {
      todo.isSelect = isselect
    }
    const checkAll = (isSelect: boolean) => {
      state.todos.forEach((todo) => {
        todo.isSelect = isSelect
      })
    }
    const clearAll = () => {
      state.todos = state.todos.filter((todo) => {
        return !todo.isSelect
      })
    }
    watch(
      () => state.todos,
      (value) => {
        saveTodos(value)
      },
      { deep: true }
    )
    onMounted(() => {
      state.todos = readTodos()
    })
    return {
      ...toRefs(state),
      addTodo,
      deleteTodo,
      updateTodo,
      checkAll,
      clearAll,
    }
  },
})
</script>

<style lang='scss'>
</style>
