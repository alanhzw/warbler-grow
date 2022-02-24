<!--
 * @Author: 一尾流莺
 * @Description:立即领取弹窗
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-09-30 14:43:58
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\components\PopupWin.vue
-->
<template>
  <div class="win-popup">
    <img v-if='isShowRed'
         src="../assets/popup-win-red.png"
         class="popup-content" />
    <img v-else
         src="../assets/popup-win-gray.png"
         class="popup-content" />
    <div class="win-content"
         @click='win'>
      <div v-if='isShowRed'
           class="num">可领取 <span style='color:#4da14c'> {{limitCardDrawCnt}} </span> 张</div>
      <div v-else
           class="num">已领取 <span style='color:#4da14c'> {{hasCardDrawCnt}} </span> 张</div>

    </div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang='ts' setup>
import { Toast } from 'vant';

import { defineProps, defineEmits, computed } from 'vue';
// ````````````引入hooks`````````````
import useBaseInfo from '../hooks/useBaseInfo';
import useLuckyDraw from '../apis/useLuckyDraw';

// 获取基本信息
const { baseInfo } = useBaseInfo();
const { luckyDraw } = useLuckyDraw(baseInfo);

const emit = defineEmits(['closePopup', 'main', 'openOpenCardPopup']);
const props = defineProps({
  limitCardDrawCnt: {
    type: Number,
    default: () => (0),
  },
  hasCardDrawCnt: {
    type: Number,
    default: () => (0),
  },
  isOpenCard: {
    type: Boolean,
    default: () => (false),
  },
});
const isShowRed = computed(() => props.limitCardDrawCnt > 0);
// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
const win = async () => {
  if (!props.isOpenCard) {
    emit('openOpenCardPopup');
    return;
  }
  if (!isShowRed.value) {
    return;
  }
  const res = await luckyDraw(2);
  // 抽中了
  if (res.data.status) {
    Toast.success('领取成功');
    closePopup();
    setTimeout(() => {
      emit('main');
    }, 1000);
  }
};

</script>

<style lang='scss'>
.win-popup {
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
  .win-content {
    width: 5.1rem;
    height: 1.5rem;
    position: absolute;
    left: 50%;
    top: 6.5rem;
    transform: translate(-50%);
    overflow: auto;
    color: #000000;
    font-size: 0.28rem;

    .num{
      width: 100%;
      text-align: center;
    }
  }
}
</style>
