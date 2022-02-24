<template>
  <!-- 确认选择弹窗 -->
  <div class="box">
    <img src="../assets/dialog-comingsoon.png"
         class="popup">

    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog('comingSoonDialog')"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';

const emit = defineEmits(['closeDialog']);

const closeDialog = (name: any) => {
  emit('closeDialog', name);
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;
  }

  .close-btn {
    position: absolute;
    bottom: 0;
    left: 1.3rem;
    width: 3.5rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
  }
}
</style>
