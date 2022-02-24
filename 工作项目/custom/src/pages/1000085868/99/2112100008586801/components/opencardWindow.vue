<template>
  <div class="open-view">
    <div class="open-btn" @click="goOpen()"></div>
    <div class="close-btn" @click="closeDialog()"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, inject } from 'vue';

// url截取的发起人id
const helpUuid: string = inject('helpUuid') as string;

const emit = defineEmits(['closePrize', 'openCard']);
const closeDialog = () => {
  emit('closeMem', 'openDialog');
};
// 跳转开卡
const goOpen = () => {
  emit('openCard');
};
</script>

<style lang='scss'>
.open-view{
  width: 5.8rem;
  height: 7.7rem;
  position: relative;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/201967/34/18090/89045/61b06d31Ed95a04d9/fe6d97ff0b01778a.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

.open-btn{
  height: 0.7rem;
  width: 3.5rem;
  margin-top: 5.3rem;
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
