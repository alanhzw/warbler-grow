<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-07-18 15:07:30
 * @LastEditTime: 2021-07-18 18:20:37
 * @FilePath: \vite-project-js\src\components\C.vue
-->
<template>
  <div>
    <h1>我是页面C啊</h1>

    <comp></comp>

  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import comp from './comp.vue';
export default defineComponent({
  name: '',
  components: {
    comp,
  },
  setup() {
    return {};
  },
});
</script>

<style lang='scss'>
</style>
