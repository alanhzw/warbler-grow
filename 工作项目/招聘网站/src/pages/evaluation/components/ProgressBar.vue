<!--
 * @Author: 一尾流莺
 * @Description:进度条组件
 * @Date: 2021-10-15 10:10:35
 * @LastEditTime: 2021-11-03 11:07:47
 * @FilePath: \ired_resource\src\pages\assessment\components\ProgressBar.vue
-->
<template>
  <div class="progress-bar-box">
    <div class="active-block">
      <div class="item"
           v-for="item in activeBlock"
           :key="item"></div>
    </div>
    <div class="total-block-circle">
      <div class="item"
           v-for="(item,index) in totalBlock"
           @click='changeAnswerList(index)'
           :key="item"></div>
    </div>
    <div class="total-block-number">
      <div class="item"
           v-for="item in totalBlock"
           :key="item">{{ item - 1 }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  activeBlock: {
    type: Number,
    default: () => 0,
  },
  totalBlock: {
    type: Number,
    default: () => 6,
  },
  optionNo: {
    type: Number,
    default: () => 0,
  },
});
const emit = defineEmits(['changeAnswerList']);

const changeAnswerList = (index:number) => {
  emit('changeAnswerList', index, props.optionNo);
};

</script>

<style lang="scss">
.progress-bar-box {
  width: 780px;
  height: 14px;
  background: #e8e8e8;
  position: relative;
  border-radius: 30px;

  .active-block {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    position: absolute;
    color: #000;
    z-index: 9;
    .item{
      width: 20%;
      height: 14px;
      background: #ED263D;
      border-radius: 30px;
    }
  }
  .total-block-circle {
    position: absolute;
    left: 0px;
    top: -3px;
    width: 780px;
    height: 20px;
    display: flex;
    justify-content: space-between;
    z-index: 10;

    .item {
      width: 20px;
      height: 20px;
      background: #ffffff;
      border-radius: 50%;
      box-shadow: 0px 0px 8px 1px rgba(0, 0, 0, 0.10000000149011612);
      cursor: pointer;
    }
  }
  .total-block-number {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0px;
    top: 25px;
    width: 780px;
    z-index: 10;
    .item {
      width: 20px;
      height: 20px;
      text-align: center;
    }
  }
}
</style>
