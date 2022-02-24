<template>
  <!-- 我的抽奖记录弹窗 -->
  <div class="popup">
    <div class="box">
      <img src="../assets/dialog-my-prize.png"
           class="popup">

      <!-- 数据 -->
      <div v-if="myPrizeList.length > 0" class="overflow">
        <div v-for="item in myPrizeList" :key="item" class="data-view">
          <div class="data-one">{{ item.drawInfoName }}</div>
          <div class="data-one">{{ getDateFormat(item.createTime) }}</div>
          <div class="data-one" v-if="item.score===0" style="width: 25%">已填写</div>
          <div v-else-if="item.score===1" class="data-one" @click="emit('notFillAddress',item)" style="width: 25%">未填写</div>
          <div v-else class="data-one" style="width: 25%"></div>
        </div>
      </div>
      <div v-else class="none-data" style="position: absolute;top: 2.7rem;width: 99%">暂无抽奖数据</div>

      <!-- 关闭按钮 -->
      <div class="close-btn"
           @click="closeDialog('myPrizeDialog')"></div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  myPrizeList: Array,
});

const emit = defineEmits(['closeDialog', 'notFillAddress']);

const closeDialog = (name: any) => {
  emit('closeDialog', name);
};

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

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;
  }

  .overflow {
    position: absolute;
    top: 2rem;
    width: 100%;
    height: 4.8rem;
    overflow-y: auto;

    .data-view {
      display: flex;
      justify-content: center;
      align-content: center;
      width: 100%;
      padding: 0 .2rem;
      box-sizing: border-box;
      font-size: .22rem;
      line-height: .6rem;

      .data-one {
        width: 35%;
        text-align: center;
      }
    }
  }

  .close-btn {
    position: absolute;
    bottom: 0;
    left: 1.3rem;
    width: 3.5rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
  }
}
</style>
