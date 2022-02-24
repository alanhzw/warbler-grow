<template>
  <!-- 活动规则弹窗 -->
  <div class="box">
    <img src="../assets/img/dialog/rule-dialog.png"
         class="popup">

    <!-- 规则 -->
    <div class="rule-view">
      <div class="no-rule" v-if="!rule" style="text-align: center">暂无活动规则</div>
      <div v-else class="rule" v-html="rule"></div>
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

  .rule-view {
    margin: 0 auto;
    position: absolute;
    top: 1.6rem;
    height: 5.5rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.5rem;

    .no-rule {
      font-size: .3rem;
      text-align: center;
      margin-top: .5rem;
    }

    .rule {
      width: 100%;
      height: 5.5rem;
      overflow-y: auto;
      font-size: .26rem;
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
