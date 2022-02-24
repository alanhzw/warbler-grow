<!--
 * @Author: 一尾流莺
 * @Description:开卡
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-09-27 15:38:09
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\components\PopupOpenCard.vue
-->
<template>
  <div class="open-card-popup">
    <img src="../assets/popup-not-member.png"
         class="popup-content" />
    <div class="open-card-content"
         @click='win'></div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from 'vue';
import { openCard } from '../hooks/useMethods';

const emit = defineEmits(['closePopup', 'openAddAddressPopup']);
const props = defineProps({
  rule: {
    type: String,
    default: () => ('暂无规则'),
  },
});
const win = () => {
  openCard(false);
};
// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.open-card-popup {
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
  .open-card-content {
    width: 5.1rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    top: 4.5rem;
    transform: translate(-50%);
    overflow: auto;
    color: #000000;
    font-size: 0.28rem;
  }
}
</style>
