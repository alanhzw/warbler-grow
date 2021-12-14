<!--
 * @Author: 一尾流莺
 * @Description:自评的单项
 * @Date: 2021-10-15 15:07:52
 * @LastEditTime: 2021-11-08 11:45:26
 * @FilePath: \ired_resource\src\pages\evaluation\components\SelfItem.vue
-->
<template>
  <div class="self-item">
    <div class="header">{{ options.name }}</div>
    <div class="body">
      <div class="body-item"
           v-for="(item,index) in options.detailList"
           :key="index">{{ item }}</div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps } from 'vue';

defineProps({
  options: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang='scss'>
.self-item {
  * {
    box-sizing: border-box;
  }
  .header {
    width: 410px;
    border-right: 1px solid #e8e8e8;
    height: 64px;
    background: #ed263d;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    font-size: 18px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 64px;
    text-align: center;
  }
  .body {
    .body-item {
      width: 410px;
      border: 1px solid #e8e8e8;
      width: 410px;
      height: 50px;
      border-top: none;
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #656565;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
