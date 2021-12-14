<!--
 * @Author: 一尾流莺
 * @Description:自测last的item
 * @Date: 2021-10-15 15:42:09
 * @LastEditTime: 2021-11-13 18:13:15
 * @FilePath: \ired_resource\src\pages\evaluation\components\FinallyItem.vue
-->
<template>
  <div class="finally-item">
    <div class="top">{{ title }}</div>
    <div class="middle">
      <div class="style">{{ result.result }}</div>
      <div class="result">{{ result.shortName }}</div>
    </div>
    <div class="bottom">
      <div class="item"
           v-html='content'></div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: () => '测试结果',
  },

  result: {
    type: Object,
    default: () => {},
  },

});

const content = computed(() => props.result.shortIntroduction.replace(/\r/g, '<br>'));

</script>

<style lang='scss'>
.finally-item {
  width: 400px;
  background: #ffffff;
  box-shadow: 0px 3px 20px 1px rgba(0, 0, 0, 0.05999999865889549);
  border-radius: 20px 20px 20px 20px;
  opacity: 1;
  .top {
    width: 134px;
    height: 40px;
    background: #ed263d;
    border-radius: 20px 0px 20px 0px;
    opacity: 1;
    font-size: 18px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    line-height: 40px;
  }
  .middle {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    .style {
      font-size: 40px;
      font-family: Alibaba PuHuiTi-Heavy, Alibaba PuHuiTi;
      font-weight: 800;
      color: #000000;
      margin: 20px 10px 0 30px;
    }
    .result {
      font-size: 18px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
    }
  }
  .bottom {
    margin: 20px 30px;
    .item {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #656565;
      line-height: 21px;
    }
  }
}
</style>
