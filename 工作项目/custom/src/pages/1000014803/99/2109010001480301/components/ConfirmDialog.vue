<template>
  <!-- 确认选择弹窗 -->
  <div class="box">
    <img src="../assets/dialog-prize-ticket.png"
         class="popup">
    <!-- 我知道了按钮 -->
    <div class="sure-btn"
         @click="openDialog('commitDialog')"></div>

    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog('confirmDialog')"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';

// const props = defineProps('');
const emit = defineEmits(['closeDialog', 'openDialog']);

const closeDialog = (name: any) => {
  emit('closeDialog', name);
};

const openDialog = (name: any) => {
  emit('openDialog', name);
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;
  }

  .sure-btn {
    position: absolute;
    bottom: 1.2rem;
    left: 1.3rem;
    width: 3.5rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
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
