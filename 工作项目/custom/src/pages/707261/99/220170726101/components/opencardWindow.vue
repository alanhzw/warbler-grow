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
  width: 5.14rem;
  height: 8.2rem;
  position: relative;
  background: url("../assets/openView.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

.open-btn{
  position: absolute;
  top: 6.1rem;
  left: 0.4rem;
  height: 1rem;
  width: 87%;
  overflow: scroll;
  color: #535353;
  font-size: 0.23rem;
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
