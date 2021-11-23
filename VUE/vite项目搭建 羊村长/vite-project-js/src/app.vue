<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-07-18 15:06:19
 * @LastEditTime: 2021-07-18 15:35:26
 * @FilePath: \vite-project-js\src\App.vue
-->
<template>
  <div class="main">
    <router-link :to='{path:"/a"}'>点击去a页面</router-link>
    <br>
    <router-link :to='{path:"/b"}'>点击去b页面</router-link>
    <router-view>

    </router-view>
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
.main {
  margin-left: 100px;
}
</style>
