<template>
  <div class="wrapper">
    <div class="close-btn" @click="closeDialog()"></div>
    <div class="open-card">
      <img src="../assets/coupon-view.png"
           class="open-card-img" />
      <div class="copy-text">{{ couponId }}</div>
      <input type="text"
             class="copy-input"
             :id="'copyInput'"
             :value="couponId" />
      <div class="copy-button"
           @click="copy()"
           :id="'cliptxt'"
           :data-clipboard-target="'#copyInput'"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import Clipboard from 'clipboard';
import { Toast } from 'vant';

const props = defineProps({
  couponId: String,
});
const emit = defineEmits(['closeWin']);
const closeDialog = () => {
  emit('closeWin');
};
// 复制文本
const copy = () => {
  const clipboard = new Clipboard('#cliptxt');
  clipboard.on('success', (e) => {
    Toast('复制成功！');
    clipboard.destroy();
  });
  clipboard.on('error', (e) => {
    Toast('复制失败，请长按复制！');
    clipboard.destroy();
  });
};
</script>

<style lang='scss'>
.wrapper{
  padding-top: 1rem;
}
.close-btn{
  width: 0.75rem;
  height: 0.75rem;
  position: absolute;
  top: 0rem;
  right: 0.3rem;
  background: url('../assets/closeBtn.png') no-repeat;
  background-size: 100%;
  z-index: 9999;
}

.open-card {
  position: relative;
}

.open-card-img {
  width: 5.67rem;
  height: 7.26rem;
  display: block;
}

.open-card-go {
  position: absolute;
  top: 4.7rem;
  left: 1.2rem;
  width: 5.1rem;
  height: 1rem;

}

.open-card-close {
  position: absolute;
  top: 0.1rem;
  right: 0.15rem;
  width: 0.9rem;
  height: 0.9rem;
}
.copy-text {
  position: absolute;
  top: 4.35rem;
  width: 100%;
  text-align: center;
  font-size: 0.38rem;
}
.copy-button {
  position: absolute;
  top: 5.6rem;
  width: 5.1rem;
  height: 1rem;
  left: 0.3rem;
}
.copy-input {
  position: absolute;
  width: 4rem;
  top: 5rem;
  left: 1.2rem;
  z-index: -5;
}
</style>
