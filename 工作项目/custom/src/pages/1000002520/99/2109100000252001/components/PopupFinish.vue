<!--
 * @Author: 一尾流莺
 * @Description:已完成弹窗
 * @Date: 2021-09-27 15:27:04
 * @LastEditTime: 2021-09-28 11:27:29
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\components\PopupFinish.vue
-->

<template>
  <div class="finish-popup">
    <img src="../assets/popup-zhengzhuang.png"
         class="finish-img" />
    <div class="finish-btn"
         @click='handlerBtn'></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['closePopup']);
const props = defineProps({
  value: {
    type: String,
    default: () => (''),
  },
});

const handlerBtn = () => {
  emit('closePopup');
};

</script>

<style lang='scss'>
.finish-popup {
  position: relative;
  .finish-img {
    width: 7.5rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  .finish-btn {
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    top: 5.2rem;
    transform: translate(-50%);
  }
}
</style>
