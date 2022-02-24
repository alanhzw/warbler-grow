<template>
  <div class="noQuality-view">
    <div class="noQuality-btn" @click="goMemPage()"></div>
    <div class="close-btn" @click="closeDialog()"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, inject } from 'vue';

const emit = defineEmits(['closeNoQ', 'memPage']);
const closeDialog = () => {
  emit('closeNoQ');
};
// 跳转开卡
const goMemPage = () => {
  emit('memPage');
};
</script>

<style lang='scss'>
.noQuality-view{
  width: 5.8rem;
  height: 7.7rem;
  position: relative;
  background: url("../assets/noQuality.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

  .noQuality-btn{
    height: 0.7rem;
    width: 3.5rem;
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
