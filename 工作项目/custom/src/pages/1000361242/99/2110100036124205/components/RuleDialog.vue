<template>
  <!-- 活动规则弹窗 -->
  <div class="box">
    <img src="../assets/img/rule-dialog.png"
         class="popup">

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

const emit = defineEmits(['closeDialog']);
const props = defineProps({ rule: String });

const closeDialog = () => {
  emit('closeDialog', 'ruleDialog');
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;

  img {
    margin: 0 auto;
  }

  .popup {
    width: 6rem;
  }

  .rule-view {
    margin: 0 auto;
    position: absolute;
    top: 0.8rem;
    width: 100%;
    height: 5rem;
    padding: 0.4rem 0.7rem;
    box-sizing: border-box;

    .rule {
      width: 100%;
      height: 4rem;
      overflow-y: auto;
      font-size: .26rem;
      text-align: left;
      white-space: break-spaces;
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
