<!--
 * @Description:
 * @Date: 2021-03-25 23:50:52
 * @LastEditTime: 2021-03-26 00:27:56
 * @FilePath: \vite-project-js\src\components\todos\EditTodo.vue
-->
<template>
  <input type="text" :value='todoTitle' @input='onInputChange' v-bind='$attrs'>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: '',
  props: {
    todoTitle: {
      type: String,
      default: '',
    },
  },
  setup (props, { emit }) {
    const onInputChange = (e) => {
      emit('update:todoTitle', e.target.value);
    };
    return {
      onInputChange,
    };
  },
});
</script>

<style lang='scss'>
</style>
