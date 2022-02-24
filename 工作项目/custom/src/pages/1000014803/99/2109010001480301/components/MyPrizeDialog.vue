<template>
  <!-- 申领记录弹窗 -->
  <div class="popup">
    <div class="box">
      <img src="../assets/dialog-my-prize.png"
           class="popup">

      <!-- 数据 -->
      <div v-if="myPrizeList.length > 0" class="data-view">
        <div v-for="(item,index) in myPrizeList" :key="index" class="data">
          <div class="data-one" style="width: 30%">{{ getDateFormat(item.createTime) }}</div>
          <div class="data-one" style="width: 30%">{{ item.giftId }}</div>
          <div class="data-btn" @click="getPrizeInfo(item)" style="width: 20%">{{ getBtnStatus(item.status) }}</div>
        </div>
      </div>
      <div v-else class="data-view" style="top: 3rem;padding-left: .2rem;width: 96%;font-size: .26rem;text-align: center">暂无我的奖品数据</div>

      <!-- 提交按钮 -->
      <div class="close-btn" style="bottom: 1.2rem"
           @click='closeDialog()'></div>
      <!-- 关闭按钮 -->
      <div class="close-btn"
           @click="closeDialog()"></div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {
  defineComponent, defineEmits, defineProps, ref,
} from 'vue';

const props = defineProps({
  myPrizeList: Array,
});
const emit = defineEmits(['closeDialog']);

// 格式化时间戳
const getDateFormat = (dateNumber: number) => {
  const date = new Date(dateNumber); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = `${date.getFullYear()}-`;
  const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
  const D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} `;
  const h = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:`;
  const m = (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes());
  return Y + M + D + h + m;
};

// 获取按钮状态
const getBtnStatus = (status: number) => {
  let str = '';
  if (status === 0) {
    str = '填写地址';
  } else if (status === 1) {
    str = '修改地址';
  } else {
    str = '';
  }
  return str;
};

// 关闭弹窗
const closeDialog = () => {
  emit('closeDialog', 'applyDialog');
};

// 点击操作按钮将 整条奖品信息传回父组件
const getPrizeInfo = (prizeInfo: any) => {
  console.log(prizeInfo);
  emit('getPrizeInfo', prizeInfo);
};
</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;
  }

  .data-view {
    position: absolute;
    top: 2.1rem;
    width: 100%;
    font-size: .2rem;

    .data {
      display: flex;
      justify-content: space-evenly;
      align-content: center;
      align-items: center;
      margin-bottom: .25rem;
    }

    .data-one {
      text-align: center;
    }

    .data-btn {
      background: #1652ff;
      color: #FFFFFF;
      font-size: .25rem;
      text-align: center;
      border-radius: .2rem;
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
