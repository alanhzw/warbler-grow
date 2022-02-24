<!--
 * @Author: 一尾流莺
 * @Description:导航部分
 * @Date: 2021-09-28 16:49:26
 * @LastEditTime: 2021-10-15 09:25:35
 * @FilePath: \ired_resource\src\pages\home\components\HomeNav.vue
-->
<template>
  <!-- 组件根节点 -->
  <div class='home-nav'>
    <!-- 左侧工作列表 -->
    <nav-sider></nav-sider>
    <!-- 右侧图片矩阵 -->
    <nav-image></nav-image>
  </div>
</template>

<script lang='ts' setup>
import NavImage from './NavImage.vue';
import NavSider from './NavSider.vue';

</script>

<style lang='scss'>
@import "styles/_variables.scss";

.home-nav{
  width: $MAIN_WIDTH;
  height: 392px;
  position: relative;
}
</style>
