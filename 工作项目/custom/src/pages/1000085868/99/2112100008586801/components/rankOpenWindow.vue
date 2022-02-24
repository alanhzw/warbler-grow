<template>
  <div class="rankOpen-view">
    <div class="rankOpen-viewView-area">
      <img :src="rankOpenData.giftImage"/>
      <span class="rankOpen-text">恭喜您获得<span>{{rankOpenData.giftName}}</span></span>
    </div>
    <div v-if="rankOpenData.giftType === 7" class="collect-real" @click="toFix()"></div>
    <div v-else class="collect-fake" @click="closeDialog()"></div>
    <div class="close-btn" @click="closeDialog()"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  rankOpenData: Array,
});
const emit = defineEmits(['closeRankOpen']);
const closeDialog = () => {
  emit('closeRankOpen', 'rankOpenDialog');
};
const toFix = () => {
  emit('openFix', props.rankOpenData.id);
};
</script>

<style lang="scss">
.rankOpen-view {
  width: 5.8rem;
  height: 7rem;
  position: relative;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/211722/17/6770/245127/61aebed3Ef66f0352/8304eeedaf036dac.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

  .rankOpen-viewView-area {
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
    .rankOpen-text{
      color: #FFFFFF;
      font-size: .26rem;

      >span{
        color: #ffc50b;
        font-weight: 500;
      }
    }
  }
  .collect-real{
    position: absolute;
    width: 3rem;
    height: .7rem;
    bottom: 1.25rem;
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/221559/19/5359/23119/61b1a75fE2e9e5488/6b6f7a78fcebaf27.png") no-repeat;
    background-size: 100%;
  }
  .collect-fake{
    position: absolute;
    width: 3rem;
    height: .7rem;
    bottom: 1.25rem;
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/138755/4/23800/21543/61aebef1Ec207e464/36ef490c480dc4db.png") no-repeat;
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
