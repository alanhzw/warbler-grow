<template>
  <div class="prize-view">
    <div class="prizeView-area">
      <div v-if="props.myPrize.length > 0">
        <div v-for="(item,index) in props.myPrize" :key="index" class="prize-item">
          <div>{{getDateFormat(item.createTime)}}</div>
          <div>{{item.giftName}}</div>
          <div>已发放</div>
        </div>
      </div>
      <div v-else class="no-prize">
        <div>暂无领取记录</div>
      </div>
    </div>
    <div class="close-btn" @click="closeDialog()"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  myPrize: Array,
  default: () => [],
});
const emit = defineEmits(['closePrize']);
const closeDialog = () => {
  emit('closePrize', 'prizeDialog');
};

// 时间戳
const add0 = (num: number) => (num < 10 ? `0${num}` : num);
const getDateFormat = (date: number) => {
  const time = new Date(date);
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  const mm = time.getMinutes();
  const s = time.getSeconds();
  return `${y}-${add0(m)}-${add0(d)} ${add0(h)}:${add0(mm)}`;
};
</script>

<style lang='scss'>
.prize-view{
  width: 5.15rem;
  height: 8.2rem;
  position: relative;
  background: url("../assets/prizeView.png") no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;

.prizeView-area{
  position: absolute;
  top: 2.2rem;
  left: 0.25rem;
  height: 4.5rem;
  width: 87%;
  overflow: scroll;
  color: #FFFFFF;
  font-size: 0.23rem;
  display: flex;
  flex-direction: column;

  .prize-item{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-family: Qualcomm, Qualcomm, l;

    :nth-child(1){
      width: 2rem;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
    :nth-child(2){
      width: 1.6rem;
      word-break: break-all;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
  .no-prize{
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: .25rem;
  }
}
.close-btn{
  width: 0.42rem;
  height: 0.42rem;
  position: absolute;
  bottom: 0;
  background: url("../assets/closeBtn.png") no-repeat;
  background-size: 100%;
}
}
</style>
