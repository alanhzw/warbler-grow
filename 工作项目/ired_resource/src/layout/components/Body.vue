<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-08 09:24:29
 * @LastEditTime: 2021-11-18 10:01:33
 * @FilePath: \ired_resource\src\layout\components\Body.vue
-->
<template lang="">
  <div v-if='route.path === "/" || route.path === "/overall"'>
    <Search></Search>
  </div>
  <wrapper v-if="route.meta.wrapper === 'default'" class="body-wrapper">
    <router-view />
  </wrapper>
  <router-view v-else />
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router';
import Wrapper from './Wrapper.vue';
import Search from '@/components/search/Search.vue';

const route = useRoute();
</script>
<style lang="scss" scoped>
.body-wrapper {
  flex: 1;
  background-color: v-bind("route.meta.wrapperBgColor");
}
</style>
