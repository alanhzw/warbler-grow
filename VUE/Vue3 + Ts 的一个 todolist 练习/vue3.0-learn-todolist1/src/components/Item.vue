<!--
 * @Description: 
 * @Date: 2021-03-17 19:10:28
 * @LastEditTime: 2021-03-19 15:04:23
 * @FilePath: \vue3.0-learn-todolist1\src\components\Item.vue
-->
<template>
  <li @mouseenter='mouseFn(true)' @mouseleave='mouseFn(false)'>
    <label for="">
      <input type="checkbox" v-model="isSelectCom">
      <span>{{todo.title}}</span>
    </label>
    <button v-show='isShow' @click='deleteTodo'>删除</button>
  </li>
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from 'vue'

//引入泛型接口
import { Todo } from '../types/todo'
export default defineComponent({
  name: 'Item',
  props: {
    todo: {
      type: Object as () => Todo, //函数返回的是todo类型
      required: true,
    },
    deleteTodo: {
      type: Function,
      required: true,
    },
    updateTodo: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      require: true,
    },
  },
  setup(props) {
    const isShow = ref(false)
    const mouseFn = (flag: boolean) => {
      if (flag) {
        isShow.value = true
      } else {
        isShow.value = false
      }
    }
    const isSelectCom = computed({
      get() {
        return props.todo.isSelect
      },
      set(val) {
        props.updateTodo(props.todo, val)
      },
    })
    const deleteTodo = () => {
      props.deleteTodo(props.index)
    }
    return {
      mouseFn,
      isShow,
      deleteTodo,
      isSelectCom,
    }
  },
})
</script>

<style lang='scss'>
</style>
