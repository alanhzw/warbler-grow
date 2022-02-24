<template>
  <div class="getChance-view">
    <div class="goOpen-btn" @click="goOpen()"></div>
    <div class="attention-btn" @click="goAttention()"></div>
    <div class="close-btn" @click="closeDialog()"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, inject } from 'vue';

// url截取的发起人id
const helpUuid: string = inject('helpUuid') as string;

const emit = defineEmits(['closeMem', 'openCard', 'attentionShop']);
const closeDialog = () => {
  emit('closeChance', 'chanceDialog');
};
// 跳转开卡
const goOpen = () => {
  emit('openCard');
};
// 去关注店铺
const goAttention = () => {
  emit('attentionShop');
};
</script>

<style lang='scss'>
.getChance-view{
  width: 5.8rem;
  height: 5.5rem;
  position: relative;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/216339/4/6819/51781/61add135Ef27f3279/0b45549430874950.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

  .goOpen-btn{
    position: absolute;
    top: 3.4rem;
    left: 0.4rem;
    height: .6rem;
    width: 2.5rem;
  }
  .attention-btn{
    position: absolute;
    top: 3.4rem;
    left: 3rem;
    height: .6rem;
    width: 2.5rem;
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
