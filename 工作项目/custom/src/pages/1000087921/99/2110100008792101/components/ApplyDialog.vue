<template>
  <!-- 申领记录弹窗 -->
  <div class="popup">
    <div class="box">
      <img src="../assets/apply-dialog.png"
           class="popup">

      <div class="title">申领记录</div>

      <div class="data-view" style="top: 1rem;font-weight: 900">
        <div class="data-one" style="width: 33%">申领时间</div>
        <div class="data-one" style="width: 28%">礼品</div>
      </div>
      <!-- 数据 -->
      <div v-if="applyRecordObj.prizeType !== null" class="data-view">
        <div class="data-one" style="width: 33%">{{ applyRecordObj.applyTime }}</div>
        <div class="data-one" style="width: 28%">{{ applyRecordObj.prizeType }}</div>
      </div>
      <div v-else class="data-view" style="top: 2rem;padding-left: .2rem;width: 96%">暂无申领数据</div>

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
  applyRecordObj: Object,
});
const emit = defineEmits(['closeDialog']);

const closeDialog = () => {
  emit('closeDialog', 'applyDialog');
};
</script>

<style lang='scss' scoped>
.box {
  position: relative;

  .popup {
    width: 6rem;
  }

  .title {
    position: absolute;
    top: 0.3rem;
    left: .3rem;
    width: 95%;
    text-align: center;
    font-weight: 900;
    font-size: 0.3rem;
  }

  .data-view {
    display: flex;
    justify-content: center;
    align-content: center;
    position: absolute;
    top: 1.5rem;
    width: 100%;
    font-size: .26rem;

    .data-one {
      width: 34%;
      text-align: center;
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
