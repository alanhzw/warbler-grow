<template>
  <!-- 活动规则弹窗 -->
  <div class="box">
    <img src="../assets/rule-dialog.png"
         class="popup">

    <div class="title">活动规则</div>

    <!-- 规则 -->
    <div class="rule-view">
      <div class="rule" v-html="rule"></div>
    </div>
    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog()"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps({ rule: String });
const emit = defineEmits(['closeDialog']);

const closeDialog = () => {
  emit('closeDialog', 'ruleDialog');
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
    top: 0.2rem;
    left: .3rem;
    text-align: center;
    width: 95%;
    font-weight: 900;
    font-size: .3rem;
  }

  .rule-view {
    margin: 0 auto;
    position: absolute;
    top: 0.8rem;
    height: 4rem;
    padding: 0 0.7rem 0 1rem;

    .rule {
      width: 100%;
      height: 4rem;
      overflow-y: auto;
      font-size: .26rem;
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
