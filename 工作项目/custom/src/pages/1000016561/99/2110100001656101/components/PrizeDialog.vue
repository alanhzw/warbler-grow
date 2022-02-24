<template>
  <!-- 我的奖品弹窗 -->
  <div class="popup">
    <div class="box">
      <img src="../assets/img/dialog/my-prize-dialog.png"
           class="popup">

      <!-- 数据 -->
      <div v-if="prizeRecordArr.length > 0" class="data-view">
        <div v-for="(item,index) in prizeRecordArr" :key="index" class="data-arr">
          <div class="data-one" style="width:25%">{{ item.exchangeTime }}</div>
          <div class="data-one" style="width: 35%">{{ item.giftName }}</div>
          <div class="data-one" style="width: 20%" v-if="item.type === 7">已填写</div>
          <div class="data-one" style="width: 20%" v-else>已发放</div>
        </div>
      </div>
      <div v-else class="data-view" style="top: 3rem;width: 92%">暂无奖品数据</div>

      <!-- 关闭按钮 -->
      <div class="close-btn"
           @click="closeDialog()"></div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  prizeRecordArr: Array,
});
const emit = defineEmits(['closeDialog']);

const closeDialog = () => {
  emit('closeDialog');
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;
  }

  .data-view {
    width: 5.33rem;
    height: 1.8rem;
    overflow-y: auto;
    align-content: center;
    position: absolute;
    top: 2.4rem;
    left: .3rem;
    font-size: 0.2rem;
    text-align: center;

    .data-arr {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 0.63rem;
      margin: .15rem 0;
      line-height: .63rem;
      background-color: #ffffff;
      border-radius: 0.15rem;

      .data-one {
        width: 34%;
        text-align: center;
      }
    }
  }

  .close-btn {
    position: absolute;
    top: .2rem;
    right: 0.3rem;
    width: 1rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
  }
}
</style>
