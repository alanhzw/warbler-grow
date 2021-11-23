<!--
 * @Description: 
 * @Date: 2021-03-17 19:10:16
 * @LastEditTime: 2021-03-17 20:08:39
 * @FilePath: \vue3.0-learn-todolist1\src\components\Header.vue
-->
<template>
  <div>
    <input type="text" @keyup.enter="add" v-model="title">
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Header',
  props: {
    addTodo: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const title = ref('')
    const add = () => {
      //获取文本框的数据
      const text = title.value
      if (!text) return
      const todo = {
        id: Date.now,
        title: text,
        isselect: false,
      }
      props.addTodo(todo)
      title.value = ''
    }
    return {
      title,
      add,
    }
  },
})
</script>

<style lang='scss'>
</style>
