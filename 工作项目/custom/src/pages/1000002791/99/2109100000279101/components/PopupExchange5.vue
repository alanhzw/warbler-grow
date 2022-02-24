<!--
 * @Author: 一尾流莺
 * @Description:兑换5的
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-09-27 15:37:10
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\components\PopupExchange5.vue
-->
<template>
  <div class="exchange-5-popup">
    <img src="../assets/exchange-5.png"
         class="popup-content" />
    <div class="exchange-5-content"
         @click='closePopup'></div>
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
    default: () => ('暂无规则'),
  },
});

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.exchange-5-popup {
  position: relative;
  .popup-content {
    width: 7.2rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0rem;
    right: 0rem;
  }
  .exchange-5-content {
    width: 5.1rem;
    height: 1.5rem;
    position: absolute;
    left: 50%;
    top: 6.2rem;
    transform: translate(-50%);
    overflow: auto;
    color: #000000;
    font-size: 0.28rem;
  }
}
</style>
