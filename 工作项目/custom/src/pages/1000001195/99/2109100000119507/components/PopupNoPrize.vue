<!--
 * @Author: 一尾流莺
 * @Description:未中奖弹窗
 * @Date: 2021-09-02 14:19:26
 * @LastEditTime: 2021-09-06 17:26:45
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\components\PopupNoPrize.vue
-->
<template>
  <van-popup v-model:show="myVisible"
             get-container="#app">
    <div class="no-prize-box">
      <img src="../assets/popup-fail.png"
           class="popup-content" />
      <div class="go-to-shop"
           @click="gotoShopPage('1000001195')"></div>
      <div class="close-icon"
           @click="closePopup"></div>
    </div>
  </van-popup>
</template>

<script lang='ts' setup>
import {
  Popup as VanPopup,
} from 'vant';
import { defineProps, defineEmits, computed } from 'vue';
import { gotoShopPage } from '@/utils/platforms';

const emit = defineEmits(['closePopup']);
const props = defineProps({
  visible: {
    type: Boolean,
    default: () => (false),
  },
});
const myVisible = computed(() => props.visible);

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.no-prize-box {
  position: relative;
  .popup-content {
    width: 6.5rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%);
  }
  .go-to-shop {
    width: 3rem;
    height: 0.6rem;
    position: absolute;
    left: 50%;
    bottom: 1.9rem;
    transform: translate(-50%);
  }
}
</style>
