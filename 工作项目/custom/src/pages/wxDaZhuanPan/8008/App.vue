<template>
  <JiuGongLottery :drawPrizeInfo="drawPrizeInfo" @getResult="lotteryResult" :winnerId="winnerId"></JiuGongLottery>
</template>

<script lang='ts' setup>
import { defineProps, withDefaults, ref } from 'vue';
import JiuGongLottery from '@/widgets/JiuGongLottery/JiuGongLottery.vue';
import Draw from './components/Draw.vue';

const drawPrizeInfo = [
  {
    id: 939834,
    name: '测试实物',
    type: 7,
    position: 1,
    drawTime: null,
    showImage: 'https://img10.360buyimg.com/imgzone/jfs/t1/196851/14/14041/37780/6172102eEc4832733/d5ae2157359f6ac9.png',
    realValue: null,
    value: null,
    addressId: null,
    needWriteAddress: null,
    priceInfo: '99.00',
    itemId: null,
    addressStatus: null,
  }, {
    id: 939835,
    name: '66店铺积分',
    type: 9,
    position: 2,
    drawTime: null,
    showImage: 'null',
    realValue: null,
    value: null,
    addressId: null,
    needWriteAddress: null,
    priceInfo: '0',
    itemId: null,
    addressStatus: null,
  }, {
    id: 939836,
    name: '实物',
    type: 7,
    position: 3,
    drawTime: null,
    showImage: 'https://img10.360buyimg.com/imgzone/jfs/t1/211534/13/6244/37688/6172104fE0d8ecda5/5f0744ea47ccf3a1.png',
    realValue: null,
    value: null,
    addressId: null,
    needWriteAddress: null,
    priceInfo: '999.00',
    itemId: null,
    addressStatus: null,
  }, {
    id: 939837,
    name: '11店铺积分',
    type: 9,
    position: 4,
    drawTime: null,
    showImage: null,
    realValue: null,
    value: null,
    addressId: null,
    needWriteAddress: null,
    priceInfo: '0',
    itemId: null,
    addressStatus: null,
  }, {
    id: 0,
    name: '谢谢参与!',
    type: 0,
    position: 0,
    drawTime: null,
    showImage: null,
    realValue: null,
    value: null,
    addressId: null,
    needWriteAddress: null,
    priceInfo: null,
    itemId: null,
    addressStatus: null,
  }, {
    id: 0,
    name: '100京豆',
    type: 6,
    position: 0,
    drawTime: null,
    showImage: null,
    realValue: null,
    value: null,
    addressId: null,
    needWriteAddress: null,
    priceInfo: null,
    itemId: null,
    addressStatus: null,
  }, {
    id: 0,
    name: '谢谢参与!',
    type: 0,
    position: 0,
    drawTime: null,
    showImage: null,
    realValue: null,
    value: null,
    addressId: null,
    needWriteAddress: null,
    priceInfo: null,
    itemId: null,
    addressStatus: null,
  }, {
    id: 0,
    name: '谢谢参与!',
    type: 0,
    position: 0,
    drawTime: null,
    showImage: null,
    realValue: null,
    value: null,
    addressId: null,
    needWriteAddress: null,
    priceInfo: null,
    itemId: null,
    addressStatus: null,
  }];

const winnerId = ref(-1);
const lotteryResult = () => {
  winnerId.value = 5;
};

</script>

<style lang='scss'>
html {
  max-width: 750px;
  margin: 0 auto;
}
</style>
