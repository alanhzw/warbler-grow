<!--
 * @Author: 一尾流莺
 * @Description:获奖弹窗
 * @Date: 2021-09-02 14:19:26
 * @LastEditTime: 2021-09-06 17:27:15
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\components\PopupSuccess.vue
-->
<template>
  <van-popup v-model:show="myVisible"
             get-container="#app">
    <div class="success-box">
      <img src="../assets/popup-success.png"
           class="popup-content" />
      <div class="success-box">
        <img :src="myImg" />
      </div>
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

import draw01 from '../assets/draw-01.png';
import draw02 from '../assets/draw-02.png';
import draw03 from '../assets/draw-03.png';
import draw04 from '../assets/draw-04.png';
import draw05 from '../assets/draw-05.png';
import draw06 from '../assets/draw-06.png';
import draw07 from '../assets/draw-07.png';
import draw08 from '../assets/draw-08.png';

const list = [draw01, draw02, draw03, draw04, draw05, draw06, draw07, draw08];

const emit = defineEmits(['closePopup']);
const props = defineProps({
  visible: {
    type: Boolean,
    default: () => (false),
  },
  successPrize: {
    type: Number,
    default: () => (1),
  },
});
const myVisible = computed(() => props.visible);

const myImg: any = computed(() => list[props.successPrize - 1]);
// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.success-box {
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
  .success-box {
    width: 2.7rem;
    height: 2rem;
    position: absolute;
    left: 50%;
    top: 2rem;
    transform: translate(-50%);
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
    }
  }
}
</style>
