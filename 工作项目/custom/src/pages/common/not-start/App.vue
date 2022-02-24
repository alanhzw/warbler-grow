<template>
  <div class="page-not-start">
    <h3>很抱歉，您来早了，活动还未开始哦~</h3>
    <count-down v-if="startTime" :time="time" format="距离开始还有 DD 天 HH 时 mm 分 ss 秒" @finish="tikEnd"></count-down>
    <a href="javascript:;" v-if="shopId" @click="onGoShopClick">进店逛逛</a>
  </div>
</template>
<script setup lang="ts">
import { inject, ref } from 'vue';
import { CountDown } from 'vant';
import { gotoShopPage } from '@/utils/platforms';

const currentTime = new Date().getTime();
const startTime = Number(inject('startTime') || 0);
const shopId = inject('shopId') as string;
const from = inject('from') as string;
const time = ref(startTime - currentTime);

// console.log('startTime', startTime, new Date(startTime));
// console.log('shopId', shopId);
// console.log('time', time.value);

const onGoShopClick = () => {
  gotoShopPage(shopId);
};

const tikEnd = () => {
  // console.log('tikEnd');

  if (from) {
    window.location.href = decodeURIComponent(from);
  }
};

</script>
<style lang="scss" scoped>
.page-not-start {
  max-width: 750px;
  margin: 3rem auto 0px;
  font-family: "Helvetica Neue", Helvetica, sans-serif !important;
  text-shadow: none !important;
  text-align: center;

  img {
    width: 2.28rem;
    height: 2.28rem;
  }
  h3 {
    margin-top: 0.45rem;
    font-size: 0.36rem;
    font-weight: normal;
  }
  p {
    margin-top: 0.2rem;
    font-size: 0.24rem;
    color: rgb(102, 102, 102);
  }
  a {
    display: block;
    margin: 0.8rem auto;
    width: 4.4rem;
    height: 0.9rem;
    line-height: 0.9rem;
    color: rgb(255, 255, 255);
    background: rgb(0, 136, 223);
    border-radius: 0.55rem;
    text-decoration: none;
    font-weight: 300;
  }
}
</style>
