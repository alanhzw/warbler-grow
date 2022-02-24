<!--
 * @Author: 一尾流莺
 * @Description:兑换30的
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-09-27 15:38:34
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\components\PopupExchangeSuccess30.vue
-->
<template>
  <div class="exchange-30-success-popup">
    <img src="../assets/exchange-30-success.png"
         class="popup-content" />
    <div class="exchange-30-success-content"
         @click='win'></div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['closePopup', 'openAddAddressPopup']);
const props = defineProps({
  rule: {
    type: String,
    default: () => ('暂无规则'),
  },
});

const win = () => {
  emit('openAddAddressPopup');
};

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.exchange-30-success-popup {
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
  .exchange-30-success-content {
    width: 5.1rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    top: 6.5rem;
    transform: translate(-50%);
    overflow: auto;
    color: #000000;
    font-size: 0.28rem;
  }
}
</style>
