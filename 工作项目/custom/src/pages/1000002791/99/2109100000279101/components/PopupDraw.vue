<!--
 * @Author: 一尾流莺
 * @Description:立即抽奖弹窗
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-09-26 17:06:13
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\components\PopupDraw.vue
-->
<template>
  <div class="draw-popup">
    <img src="../assets/popup-draw.png"
         class="popup-content" />
    <div class="draw-content"
         @click='draw'></div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from 'vue';

import useBaseInfo from '../hooks/useBaseInfo';
import useLuckyDraw from '../apis/useLuckyDraw';

const { baseInfo } = useBaseInfo();

const { luckyDraw } = useLuckyDraw(baseInfo);

const emit = defineEmits(['openOpenCardPopup', 'closePopup', 'openAddInfoPopup', 'openFailPopup', 'changeAddressId', 'changeCdk', 'main']);
const props = defineProps({
  isOpenCard: {
    type: Boolean,
    default: () => (false),
  },
});

const draw = async () => {
  if (!props.isOpenCard) {
    emit('openOpenCardPopup');
    return;
  }
  const res = await luckyDraw(3);
  if (!res.result) {
    return;
  }
  if (res.data.status) {
    emit('changeCdk', res.data.awardKey);
    emit('changeAddressId', res.data.addressId);
    emit('closePopup');
    emit('openAddInfoPopup');
  }
  if (!res.data.status) {
    emit('closePopup');
    emit('openFailPopup');
  }
  emit('main');
};
// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.draw-popup {
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
  .draw-content {
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
