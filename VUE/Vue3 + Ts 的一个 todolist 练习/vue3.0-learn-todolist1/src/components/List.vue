<!--
 * @Description: 
 * @Date: 2021-03-17 19:10:35
 * @LastEditTime: 2021-03-25 16:40:30
 * @FilePath: \vue3.0-learn-todolist1\src\components\List.vue
-->
<template>
  <ul class="todo-main">
    <Item v-for='(item,index) in todos' :key="item.id" :todo='item' :deleteTodo='deleteTodo' :index3='index' :updateTodo='updateTodo' />
  </ul>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'

import Item from './Item.vue'
export default defineComponent({
  name: 'List',
  components: {
    Item,
  },
  props: ['todos', 'deleteTodo', 'updateTodo'],
  setup() {
    return {}
  },
})
</script>

<style lang='scss'>
</style>
