<template>
  <div class="open-view">
    <div class="open-btn" @click="goOpen()"></div>
<!--    <div class="close-btn" @click="closeDialog()"></div>-->
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, inject } from 'vue';

// url截取的发起人id
const helpUuid: string = inject('helpUuid') as string;

const emit = defineEmits(['closePrize', 'openCard']);
// 跳转开卡
const goOpen = () => {
  emit('openCard');
};
// 3秒跳转开卡
let timea;
// eslint-disable-next-line prefer-const
timea = setTimeout(() => {
  goOpen();
}, 3000);
// 关闭对话框
const closeDialog = () => {
  // clearTimeout(timea);
  emit('closeMem', 'openDialog');
};

</script>

<style lang='scss'>
.open-view{
  width: 5rem;
  height: 3rem;
  position: relative;
  background: url("../assets/open-view.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

  .open-btn{
    height: 0.5rem;
    width: 1.8rem;
    margin-top: 2rem;
  }
  .close-btn{
    width: 0.52rem;
    height: 0.52rem;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
