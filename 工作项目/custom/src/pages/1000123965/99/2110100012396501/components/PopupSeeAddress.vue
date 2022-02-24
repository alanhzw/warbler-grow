<!--
 * @Author: 一尾流莺
 * @Description:查看地址弹窗
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-10-12 15:40:28
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\components\PopupSeeAddress.vue
-->
<template>
  <div class="see-address-popup">
    <img src="../assets/popup-see-address.png"
         class="popup-content" />
    <div class="see-address-content">
    </div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['closePopup']);

const props = defineProps({
  rule: {
    type: String,
    default: () => (`
        暂无规则
    `),
  },
});

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.see-address-popup {
  position: relative;
  .popup-content {
    width: 6.8rem;
  }
  .close-icon {
    width: 3rem;
    height: 1rem;
    position: absolute;
    bottom: 0.9rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .see-address-content {
    width: 6.2rem;
    height: 6.2rem;
    position: absolute;
    left: 50%;
    top: 1.3rem;
    transform: translate(-50%);
    overflow: auto;
    color: #000000;
    font-size: 0.28rem;

  }
}
</style>
