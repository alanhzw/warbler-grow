<!--
 * @Author: 一尾流莺
 * @Description:开卡弹窗
 * @Date: 2021-09-27 15:27:04
 * @LastEditTime: 2021-11-29 15:41:12
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\components\PopupOpenCard.vue
-->

<template>
  <div class="open-card-popup">
    <img src="../assets/popup-open-card.png"
         class="open-card-img" />
    <div class="open-card-btn"
         @click='handlerBtn'></div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from 'vue';
import { openCard } from '../hooks/useMethods';

const emit = defineEmits(['closePopup']);
const props = defineProps({
  activityInfo: {
    type: Number,
    default: () => (8),
  },
});
const handlerBtn = () => {
  openCard();
};

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.open-card-popup {
  position: relative;
  .open-card-img {
    width: 6.5rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0rem;
    right: 0rem;
  }
  .open-card-btn {
    width: 3rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    top: 4.6rem;
    transform: translate(-50%);
  }
}
</style>
