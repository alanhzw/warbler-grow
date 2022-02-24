<!--
 * @Author: 一尾流莺
 * @Description:红包到账弹窗
 * @Date: 2021-09-27 15:27:04
 * @LastEditTime: 2021-09-28 11:28:45
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\components\PopupRedPackage.vue
-->

<template>
  <div class="red-package-popup">
    <img src="../assets/popup-red-package.png"
         class="red-package-img" />
    <div class="red-package-btn"
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
.red-package-popup {
  position: relative;
  .red-package-img {
    width: 7.5rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  .red-package-btn {
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    top: 5.2rem;
    transform: translate(-50%);
  }
}
</style>
