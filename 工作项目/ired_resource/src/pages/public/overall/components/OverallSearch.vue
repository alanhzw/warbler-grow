<!--
 * @Author: 一尾流莺
 * @Description:搜索框部分
 * @Date: 2021-09-28 17:03:05
 * @LastEditTime: 2021-09-28 17:43:04
 * @FilePath: \ired_resource\src\pages\overall\components\OverallSearch.vue
-->
<template>
  <!-- 组件根节点 -->
  <div class="home-search">
    <!-- 容器1200px的盒子 -->
    <div class="container">
      <!-- 真正的内容 -->
      <div class="box">
        <!-- 图标 -->
        <div class="icon"></div>
        <!-- 标题 -->
        <div class="title"></div>
        <!-- 搜索框 -->
        <div class="search"></div>
        <!-- 搜索按钮 -->
        <div class="btn"></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
</script>

<style lang='scss'>
.home-search {
  .container {
    max-width: $MAIN_WIDTH;
    margin: 0 auto;
    margin-top: 46px;
    .box {
      .icon {
      }
      .title {
      }
      .search {
      }
      .btn {
      }
    }
  }
}
</style>
