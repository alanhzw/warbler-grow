<template>
  <div class="newPStart-view">
    <!--    <div class="noLotteryView-area">-->
    <!--      <div v-html="myRule"></div>-->
    <!--    </div>-->
    <div class="knowed" @click="toNew()"></div>
    <div class="close-btn" @click="closeDialog()"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { reportClick } from '@/utils/trackEvent/jdReport';

// const props = defineProps({
//   myRule: String,
// });

const emit = defineEmits(['closeNewPS']);

const closeDialog = () => {
  emit('closeNewPS');
};

const toNew = () => {
  window.location.href = 'https://item.m.jd.com/product/100029782958.html';
  reportClick();
};

</script>

<style lang='scss'>
.newPStart-view{
  width: 5.8rem;
  height: 7.7rem;
  position: relative;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/210258/24/11580/95224/61b06d31E5e7aff3b/d97a27b24db0d357.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

  .knowed{
    margin: 5.3rem auto 0;
    width: 3.5rem;
    height: 0.7rem;
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
