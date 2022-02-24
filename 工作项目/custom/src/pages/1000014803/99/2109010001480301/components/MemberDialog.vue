<template>
  <!-- 申请入会弹窗 -->
  <div class="box">
    <img src="../assets/dialog-member.png" class="popup">

    <!-- 去入会按钮 -->
    <div class="sure-btn"
         @click="goOpenCard()"></div>

    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog('memberDialog')"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';

const emit = defineEmits(['closeDialog']);

const closeDialog = (name: any) => {
  emit('closeDialog', name);
};

// 去开卡
const goOpenCard = () => {
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000014803&shopId=1000014803&venderType=5&channel=7089&returnUrl=${window.location.href}`;
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
    top: 5.4rem;
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
