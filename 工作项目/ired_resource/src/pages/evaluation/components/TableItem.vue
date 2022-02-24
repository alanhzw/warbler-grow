<!--
 * @Author: 一尾流莺
 * @Description:表格item组件
 * @Date: 2021-10-15 11:38:43
 * @LastEditTime: 2021-11-08 11:03:26
 * @FilePath: \ired_resource\src\pages\evaluation\components\TableItem.vue
-->
<template>
  <div class="table-item">
    <div class="item gray">{{title}}</div>
    <div class="item no-border-right">{{score}}</div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    default: () => 'E',
  },
  score: {
    type: String,
    default: () => '20',
  },
});
</script>

<style lang='scss'>
.table-item {
  display: flex;
  justify-content: flex-start;
  .item {
    width: 204px;
    height: 64px;
    border-right: 1px solid #fff;
    text-align: center;
    line-height: 64px;
    color: #222222;
    font-size: 18px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 800;
    border-bottom: 1px solid #E8E8E8;
  }
  .gray{
    background-color: #F8F8F8;
    border:1px solid #E8E8E8;
    border-top: none;
  }
  .no-border-right {
    border-right: none;
  }
}
</style>
