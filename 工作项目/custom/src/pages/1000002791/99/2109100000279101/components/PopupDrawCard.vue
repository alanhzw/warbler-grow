<!--
 * @Author: 一尾流莺
 * @Description:立即抽卡弹窗
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-09-24 15:12:21
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\components\PopupDrawCard.vue
-->
<template>
  <div class="draw-card-popup">
    <img src="../assets/popup-draw-card.png"
         class="popup-content" />
    <div class="draw-card-content"
         @click='drawCard'></div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>

</template>

<script lang='ts' setup>
import { Popup as VanPopup } from 'vant';
import { defineProps, defineEmits } from 'vue';
// ````````````引入hooks`````````````
import useBaseInfo from '../hooks/useBaseInfo';
import useLuckyDraw from '../apis/useLuckyDraw';

// 获取基本信息
const { baseInfo } = useBaseInfo();

const { luckyDraw } = useLuckyDraw(baseInfo);

const emit = defineEmits(['openOpenCardPopup', 'closePopup', 'openDisinfectPopup', 'openWashPopup', 'openSterilizationPopup', 'main']);
const props = defineProps({
  rule: {
    type: String,
    default: () => ('暂无规则'),
  },
  isOpenCard: {
    type: Boolean,
    default: () => (false),
  },
});
// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
const drawCard = async () => {
  if (!props.isOpenCard) {
    emit('openOpenCardPopup');
    return;
  }
  const res = await luckyDraw(1);
  // 抽中了
  if (res.data.status) {
    emit('main');
    closePopup();
    if (res.data.giftName === '消毒守护卡') {
      emit('openDisinfectPopup');
    }
    if (res.data.giftName === '洗手守护卡') {
      emit('openWashPopup');
    }
    if (res.data.giftName === '除菌守护卡') {
      emit('openSterilizationPopup');
    }
  }
};

</script>

<style lang='scss'>
.draw-card-popup {
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
  .draw-card-content {
    width: 5.1rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    top: 5.7rem;
    transform: translate(-50%);
    overflow: auto;
    color: #000000;
    font-size: 0.28rem;
  }
}
</style>
