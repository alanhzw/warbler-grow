<!--
 * @Descripttion: 企业端首页-数据展示项
 * @Author: yang chenglin
 * @Date: 2021-10-10 15:33:23
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-12 19:49:33
-->
<template>
  <div class="base-info-root">
    <div><img :src="info.icon" alt="暂无图片"></div>
    <div>
      <div class="base-info-cont" :style="index > 1 ?'border-right: none' : 'border-right: 1px solid #E8E8E8'">
        <div class="cont-desc">{{info.label}}</div>
        <div class="cont-num">{{number}}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps } from 'vue';

defineProps({
  info: {
    default: () => ({}),
  },
  index: {
    type: Number,
  },
  number: {
    type: Number,
  },
});
</script>

<style lang='scss'>
.base-info-root {
  height: 100%;
  text-align: center;
  &>div {
    height: 50%;
  }
  img {
    margin-top: 20px;
  }
  .base-info-cont {
    .cont-desc {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #656565;
      line-height: 21px;
    }
    .cont-num {
      font-size: 28px;
      font-family: PingFang SC-Heavy, PingFang SC;
      font-weight: 800;
      color: #222222;
      line-height: 42px;
    }
  }
}
</style>
