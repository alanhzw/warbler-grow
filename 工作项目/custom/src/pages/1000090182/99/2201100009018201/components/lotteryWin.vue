<template>
  <div class="close-btn" @click="closeDialog()"></div>
  <div class="lottery-view"></div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['closeWin']);
const closeDialog = () => {
  emit('closeWin');
};
</script>

<style lang='scss'>
.lottery-view{
  width: 5.67rem;
  height: 5.2rem;
  position: relative;
  background: url("../assets/lottery-view.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;
}
.close-btn{
  width: 0.75rem;
  height: 0.75rem;
  position: absolute;
  top: 0.2rem;
  right: 0.3rem;
  background: url('../assets/closeBtn.png') no-repeat;
  background-size: 100%;
  z-index: 9999;
}
</style>
