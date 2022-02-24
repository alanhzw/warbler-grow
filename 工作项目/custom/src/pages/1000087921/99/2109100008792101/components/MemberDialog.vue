<template>
  <!-- 申请入会弹窗 -->
  <div class="box">
    <img src="../assets/member-dialog.png"
         class="popup">

    <!-- 去入会按钮 -->
    <div class="btn">

      <div class="sure-btn"
           @click="goOpenCard()"></div>
      <div class="sure-btn" style="left: 3.3rem;"
           @click="closeDialog('memberDialog')"></div>
    </div>

    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog('memberDialog')"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';

// const props = defineProps();
const emit = defineEmits(['closeDialog']);

const closeDialog = (name: any) => {
  emit('closeDialog', name);
};

// 去开卡
const goOpenCard = () => {
  // const returnUrl = 'https://lzkjdz-isv.isvjcloud.com/';
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000087921&channel=7001&returnUrl=${window.location.href}`;
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;
  }

  .btn {
    width: 100%;
    height: 0.8rem;
    position: absolute;
    bottom: 1.4rem;
    display: flex;

    .sure-btn {
      width: 2rem;
      height: 1rem;
      position: absolute;
      left: 1.2rem;
      overflow: auto;
      word-break: break-all;
    }
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
