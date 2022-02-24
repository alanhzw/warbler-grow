<!--
 * @Author: 一尾流莺
 * @Description:不符合条件弹窗
 * @Date: 2021-09-27 15:27:04
 * @LastEditTime: 2021-09-28 11:30:57
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\components\PopupUnqualified.vue
-->

<template>
  <div class="unqualified-popup">
    <img src="../assets/popup-unqualified.png"
         class="unqualified-img" />
    <div class="unqualified-btn"
         @click='handlerBtn'></div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from 'vue';
import { getCoupon } from '../hooks/useMethods';

const emit = defineEmits(['closePopup']);
const props = defineProps({
  value: {
    type: String,
    default: () => (''),
  },
});

const handlerBtn = () => {
  getCoupon();
};

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.unqualified-popup {
  position: relative;
  .unqualified-img {
    width: 7.5rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  .unqualified-btn {
    width: 4rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    top: 5.2rem;
    transform: translate(-50%);
  }
}
</style>
