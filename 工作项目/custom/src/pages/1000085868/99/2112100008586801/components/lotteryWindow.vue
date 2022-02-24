<template>
  <div class="lottery-view">
    <div class="lotteryView-area">
      <img :src="drawInfoData.wdsrvo.drawInfo.showImage"/>
      <span class="lottery-text">恭喜您抽中<span>{{drawInfoData.wdsrvo.drawInfo.name}}</span></span>
    </div>
    <div v-if="drawInfoData.wdsrvo.drawInfo.type === 7" class="collect-real" @click="toFix()"></div>
    <div v-else class="collect-fake" @click="closeDialog()"></div>
    <div class="close-btn" @click="closeDialog()"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  drawInfoData: Array,
});
const emit = defineEmits(['closeLottery']);
const closeDialog = () => {
  emit('closeLottery', 'lotteryDialog');
};
const toFix = () => {
  emit('openFix', props.drawInfoData.addressId);
};
</script>

<style lang="scss">
.lottery-view {
  width: 5.8rem;
  height: 7rem;
  position: relative;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/211722/17/6770/245127/61aebed3Ef66f0352/8304eeedaf036dac.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

  .lotteryView-area {
    position: absolute;
    top: 1.5rem;
    height: 4.5rem;
    width: 100%;
    overflow: scroll;
    color: #FFFFFF;
    font-size: 0.3rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;

    img{
      width: 1.5rem;
      margin-top: 1rem;
      margin-bottom: .3rem;
    }
    .lottery-text{
      color: #FFFFFF;
      font-size: .26rem;

      >span{
        color: #ffc50b;
        font-weight: 500;
      }
    }
  }
  .collect-fake{
    position: absolute;
    width: 3rem;
    height: .7rem;
    bottom: 1.35rem;
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/138755/4/23800/21543/61aebef1Ec207e464/36ef490c480dc4db.png") no-repeat;
    background-size: 100%;
  }
  .collect-real{
    position: absolute;
    width: 3rem;
    height: .7rem;
    bottom: 1.35rem;
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/221559/19/5359/23119/61b1a75fE2e9e5488/6b6f7a78fcebaf27.png") no-repeat;
    background-size: 100%;
  }
  .close-btn {
    width: 0.42rem;
    height: 0.42rem;
    position: absolute;
    bottom: 0;
    background: url("../assets/closeBtn.png") no-repeat;
    background-size: 100%;
  }
}
</style>
