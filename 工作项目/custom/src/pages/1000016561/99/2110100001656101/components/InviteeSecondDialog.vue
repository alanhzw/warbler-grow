<template>
  <!-- 确认选择弹窗 -->
  <div class="box">
    <img src="../assets/img/dialog/invitee-second-dialog.png"
         class="popup">

    <!-- 关闭按钮 -->
    <div class="btn-close" @click="closeDialog('confirmDialog')"></div>
    <!-- 去店铺按钮 -->
    <a class="btn-shop" style="display: block" href="https://shop.m.jd.com/?shopId=1000016561"></a>

    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog('confirmDialog')"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps({ baseInfo: Object });
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

  .btn-close {
    width: 3.5rem;
    height: 0.5rem;
    position: absolute;
    bottom: 1.2rem;
    left: 1.2rem;
  }

  .btn-shop {
    width: 1.7rem;
    height: 0.5rem;
    position: absolute;
    bottom: .7rem;
    left: 2rem;
  }

  .close-btn {
    position: absolute;
    top: .2rem;
    right: 0.3rem;
    width: 1rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
  }
}
</style>
