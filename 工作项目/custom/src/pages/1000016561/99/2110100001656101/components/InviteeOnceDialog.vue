<template>
  <!-- 被邀请者第一次进入页面弹窗 -->
  <div class="box">
    <img src="../assets/img/dialog/invitee-first-dialog.png"
         class="popup">

    <!-- 立即购买 -->
    <a class="buy-btn" style="display: block" href="https://shop.m.jd.com/?shopId=1000016561"></a>

    <!-- 领取优惠券按钮 -->
    <div class="btn" @click="getCoupon()"></div>

    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog('confirmDialog')"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps({ baseInfo: Object, couponId: Array });
const emit = defineEmits(['closeDialog', 'getCoupon']);
const closeDialog = (name: any) => {
  emit('closeDialog', name);
};

const getCoupon = () => {
  emit('getCoupon', props?.couponId[3]?.id);
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;
  }

  .buy-btn {
    width: 1.8rem;
    height: 0.5rem;
    position: absolute;
    top: 3.5rem;
    left: 2.2rem;
  }

  .btn {
    width: 1.5rem;
    height: 0.5rem;
    position: absolute;
    bottom: 1.8rem;
    left: 3rem;
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
