<template>
  <div class="noQuality-view">
    <div class="knowed" @click="goOrder()"></div>
<!--    <div class="close-btn" @click="closeDialog()"></div>-->
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const emit = defineEmits(['closeNoL', 'openOrder']);

const closeDialog = () => {
  emit('closeNoL', 'noLotteryDialog');
};
// 跳转订单页
const goOrder = () => {
  emit('openOrder');
};
// 3秒跳转订单页
let timea;
// eslint-disable-next-line prefer-const
timea = setTimeout(() => {
  goOrder();
}, 3000);
</script>

<style lang='scss'>
.noQuality-view{
  width: 5rem;
  height: 3rem;
  position: relative;
  background: url("../assets/order.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

  .knowed{
    margin: 2rem auto 0;
    width: 2rem;
    height: 0.6rem;
  }
  .close-btn{
    width: 0.42rem;
    height: 0.42rem;
    position: absolute;
    bottom: 0;
    background: url("../assets/closeBtn.png") no-repeat;
    background-size: 100%;
  }
}
</style>
