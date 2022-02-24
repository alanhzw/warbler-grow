<!--
 * @Author: 一尾流莺
 * @Description:获实物奖品弹窗
 * @Date: 2021-09-02 14:19:26
 * @LastEditTime: 2021-09-06 21:22:01
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\components\PopupSuccessEntity.vue
-->
<template>
  <van-popup v-model:show="myVisible"
             get-container="#app">
    <div class="success-entity-box">
      <img src="../assets/popup-success-entity.png"
           class="popup-content" />
      <div class="success-box">
        <img :src="successPrize" />
      </div>
      <div class="add-address"
           @click='openAddAddressPopup'></div>
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
import draw02 from '../assets/draw-02.png';

const emit = defineEmits(['closePopup', 'openAddAddressPopup']);
const props = defineProps({
  visible: {
    type: Boolean,
    default: () => (false),
  },
  successPrize: {
    type: String,
    default: () => (draw02),
  },
});
// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
const myVisible = computed(() => props.visible);

// 关闭弹窗
const openAddAddressPopup = () => {
  emit('closePopup');
  emit('openAddAddressPopup', {}, true);
};
</script>

<style lang='scss'>
.success-entity-box {
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
   .add-address {
    width: 3rem;
    height: 0.6rem;
    position: absolute;
    left: 50%;
    bottom: 1.9rem;
    transform: translate(-50%);
  }
  .success-box {
    width: 2.7rem;
    height: 2rem;
    position: absolute;
    left: 50%;
    top: 1.6rem;
    transform: translate(-50%);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 85%;
    }
  }
}

</style>
