<template>
  <div class="open-view">
    <div class="open-btn" @click="goOpen()"></div>
    <div class="close-btn" @click="closeDialog()"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, inject } from 'vue';

const emit = defineEmits(['closeMem', 'openCard']);
const closeDialog = () => {
  emit('closeMem');
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
  background: url("../assets/openCard.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

.open-btn{
  height: 0.7rem;
  width: 2rem;
  margin-top: 5rem;
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
