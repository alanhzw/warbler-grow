<!--
 * @Author: 一尾流莺
 * @Description:已购蓝钻ESKU弹窗
 * @Date: 2021-09-27 15:27:04
 * @LastEditTime: 2021-09-29 17:59:31
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\components\PopupLanzuan.vue
-->

<template>
  <div class="lanzuan-popup">
    <img src="../assets/popup-lanzuan.png"
         class="lanzuan-img" />
    <div class="lanzuan-btn"
         @click='handlerBtn'></div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['closePopup', 'changePageType']);
const props = defineProps({
  value: {
    type: String,
    default: () => (''),
  },
});

const handlerBtn = () => {
  emit('closePopup');
  emit('changePageType', 'lanzuan');
};

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.lanzuan-popup {
  position: relative;
  .lanzuan-img {
    width: 7.5rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  .lanzuan-btn {
    width: 5rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    top: 4.7rem;
    transform: translate(-50%);
  }
}
</style>
