<template>
  <!-- 提交成功弹窗 -->
  <div class="box">
    <img src="../assets/dialog-success.png" class="popup">

    <!-- 关闭按钮 -->
    <div class="sure-btn"
         @click="closeDialog('successDialog')"></div>

    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog('successDialog')"></div>
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

  .sure-btn {
    width: 3rem;
    height: 1rem;
    position: absolute;
    left: 1.5rem;
    top: 4.6rem;
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
