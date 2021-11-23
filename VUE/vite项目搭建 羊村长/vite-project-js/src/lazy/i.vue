<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-07-14 10:58:54
 * @LastEditTime: 2021-07-14 11:39:38
 * @FilePath: \vite-project-js\src\lazy\a.vue
-->
<template>
  <div class="floor">
    我是组件G
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: '',
  setup() {
    return {};
  },
});
</script>

<style lang='scss'>
.floor {
  margin: 0 auto;
  width: 1600px;
  height: 800px;
  border: 2px solid #000;
  margin-bottom: 5px;
}
</style>
