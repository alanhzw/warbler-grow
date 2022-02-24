<template>
  <div class="lottery-view">
    <div class="lotteryView-area">
      <div v-if="props.prizeMsg.status === 1">
        <span v-if="props.prizeMsg.bean !== 0">获得{{ props.prizeMsg.beanCnt }}京豆和{{ props.prizeMsg.pointCnt }}积分</span>
<!--        <span v-if="props.prizeMsg.bean !== 0 && props.prizeMsg.point !== 0">和</span>-->
<!--        <span v-if="props.prizeMsg.point !== 0">{{ props.prizeMsg.point }}积分</span>-->
      </div>
      <div v-else-if="props.prizeMsg.status === 2">
        <span>获得{{ props.prizeMsg.pointCnt }}积分</span>
      </div>
      <div v-else>
        <span>很遗憾未获奖</span>
      </div>
    </div>
    <div class="close-btn" @click="closeDialog()"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  prizeMsg: Array,
  // bean: Number,
  // point: Number,
});
const emit = defineEmits(['closeLottery']);
const closeDialog = () => {
  emit('closeLottery', 'lotteryDialog');
};
</script>

<style lang="scss">
.lottery-view {
  width: 5.14rem;
  height: 8.3rem;
  position: relative;
  background: url("../assets/lotteryView.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

  .lotteryView-area {
    position: absolute;
    top: 2.8rem;
    height: 4.5rem;
    width: 100%;
    overflow: scroll;
    color: #FFFFFF;
    font-size: 0.35rem;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    font-family: Qualcomm, Qualcomm, l;
  }

  .close-btn {
    width: 0.42rem;
    height: 0.42rem;
    position: absolute;
    bottom: 0;
    background: url("../assets/closeBtn.png") no-repeat;
    background-size: 100%;
  }
}
</style>
