<!--
 * @Author: 一尾流莺
 * @Description:正在招聘和热门企业的架子
 * @Date: 2021-09-28 16:56:44
 * @LastEditTime: 2021-11-13 15:46:36
 * @FilePath: \ired_resource\src\pages\public\home\components\HomeBlock.vue
-->
<template>
  <!-- 组件根节点 -->
  <div class="home-block">
    <!-- 标题 -->
    <div class="title">{{title}}</div>
    <!-- 列表 -->
    <slot></slot>

  </div>
</template>

<script lang='ts' setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  title: {
    type: String,
    default: () => '正在招聘',
  },
});


</script>

<style lang='scss'>

.home-block {
  .title {
    width: 1200px;
    text-align: center;
    font-size: 38px;
    font-family: Alibaba PuHuiTi-Bold, Alibaba PuHuiTi;
    font-weight: bold;
    color: #222222;
  }


}
</style>
