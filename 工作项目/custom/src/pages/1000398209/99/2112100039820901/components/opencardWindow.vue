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
  height: 6rem;
  position: relative;
  background: url("../assets/open-view.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

.open-btn{
  height: 0.6rem;
  width: 3rem;
  margin-top: 2.9rem;
}
.close-btn{
  width: 0.55rem;
  height: 0.55rem;
  position: absolute;
  top: 0;
  right: 0;
  //background: url("../assets/closeBtn.png") no-repeat;
  //background-size: 100%;
}
}
</style>
