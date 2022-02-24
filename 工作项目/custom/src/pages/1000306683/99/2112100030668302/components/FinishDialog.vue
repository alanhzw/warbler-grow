<template>
  <!-- 活动结束弹窗 -->
  <div class="box">
    <img src="../assets/dialog-noChange.png"
         class="popup">

    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog()"></div>

    <!-- 去店铺首页 -->
    <div class="shop-btn"
         @click="gotoShop()"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';

const emit = defineEmits(['closeDialog']);

const closeDialog = () => {
  emit('closeDialog');
};

const gotoShop = () => {
  window.location.href = 'https://shop.m.jd.com/?shopId=1000306683';
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
    top: 1.2rem;
    right: .5rem;
    width: 1rem;
    height: 1rem;
    overflow: auto;
  }

  .shop-btn {
    position: absolute;
    bottom: 2.2rem;
    left: 1.5rem;
    width: 3rem;
    height: 1rem;
    overflow: auto;
  }
}
</style>
