<!--
 * @Description: 
 * @Date: 2021-03-17 19:10:09
 * @LastEditTime: 2021-03-25 16:42:52
 * @FilePath: \vue3.0-learn-todolist1\src\components\Footer.vue
-->
<template>
  <div>
    <label for=""> <input type="checkbox" v-model="isCheckAll"> </label>
    <span><span>已完成{{count}}</span>/全部{{todos.length}}</span>
    <br>
    <button @click='clearAll'>清除已完成任务</button>

  </div>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue'
import { Todo } from '../types/todo'

export default defineComponent({
  name: 'Footer',
  props: {
    todos: {
      type: Array as () => Todo[], //函数返回的是todo类型
      required: true,
    },
    checkAll: {
      type: Function,
      required: true,
    },
    clearAll: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const count = computed(() => {
      return props.todos.reduce((pre, todo, index) => {
        return pre + (todo.isSelect ? 1 : 0)
      }, 0)
    })
    const isCheckAll = computed({
      get() {
        return count.value > 0 && props.todos.length === count.value
      },
      set(val) {
        props.checkAll(val)
      },
    })

    return {
      count,
      isCheckAll,
    }
  },
})
</script>

<style lang='scss'>
</style>
