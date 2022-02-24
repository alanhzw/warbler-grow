<!--
 * @Author: 一尾流莺
 * @Description:首页
 * @Date: 2021-09-23 08:03:25
 * @LastEditTime: 2021-09-29 11:42:13
 * @FilePath: \ired_resource\src\pages\home\index.vue
-->
<template>
  <empty-div height='40px'></empty-div>
  <!-- 组件根节点 -->
  <div class="home-page">
    <!-- 导航栏 -->
    <home-nav></home-nav>
    <!-- 正在招聘 -->
    <home-job></home-job>
    <!-- 热门企业 -->
    <home-company></home-company>
  </div>
</template>

<script lang='ts' setup>
import HomeNav from './components/HomeNav.vue';
import HomeJob from './components/HomeJob.vue';
import HomeCompany from './components/HomeCompany.vue';
import EmptyDiv from './components/EmptyDiv.vue';

</script>

<style lang='scss'>
.home-page {
  line-height: 1;
}
</style>
