<!--
 * @Author: 一尾流莺
 * @Description:已购蕴醇ESKU弹窗
 * @Date: 2021-09-27 15:27:04
 * @LastEditTime: 2021-09-29 18:01:07
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\components\PopupYunchun.vue
-->

<template>
  <div class="yunchun-popup">
    <img src="../assets/popup-yunchun.png"
         class="yunchun-img" />
    <div class="yunchun-btn"
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
  emit('changePageType', 'yunchun');
};

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.yunchun-popup {
  position: relative;
  .yunchun-img {
    width: 7.5rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  .yunchun-btn {
    width: 5rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    top: 4.7rem;
    transform: translate(-50%);
  }
}
</style>
