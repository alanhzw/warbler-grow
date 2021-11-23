<!--
 * @Description:
 * @Date: 2021-03-21 14:51:31
 * @LastEditTime: 2021-07-19 09:31:35
 * @FilePath: \vite-project-js\src\components\comp.vue
-->
<template>
  <div>我是公用组件啊</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '',
  beforeRouteUpdate(to, from) {
    console.log('🚀🚀~ beforeRouteUpdate');
  },
  setup() {
    return {};
    // a
  },
});
</script>

<style></style>
