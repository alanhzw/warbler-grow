<!--
 * @Author: 一尾流莺
 * @Description:岗位信息详情的每一个小块
 * @Date: 2021-09-29 15:39:13
 * @LastEditTime: 2021-09-29 15:45:58
 * @FilePath: \ired_resource\src\pages\overall\components\InfoBlock.vue
-->
<template>
  <div class="info-block">
    <div class="title">{{ title }}</div>
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    default: () => ('招聘岗位'),
  },
});
</script>

<style lang='scss'>
.info-block {
  width: 100%;
  .title {
    font-size: 24px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: bold;
    color: #222222;
  }
  .container {
  }
}
</style>
