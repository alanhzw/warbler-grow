<template>
  <!-- 隐私条款弹窗 -->
  <div class="box">
    <img src="../assets/dialog-statement.png" class="popup">

    <!-- 隐私条款内容 -->
    <div class="rule-view">
      <div class="rule" v-html="statement"></div>
    </div>

    <!-- 关闭按钮 -->
    <div class="close-btn"
         @click="closeDialog('statementDialog')"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps({ statement: String });
const emit = defineEmits(['closeDialog']);

const closeDialog = (name: any) => {
  emit('closeDialog', name);
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
    top: 1.3rem;
    height: 5.2rem;
    padding: 0 .6rem;

    .rule {
      width: 100%;
      height: 5.2rem;
      overflow-y: auto;
      font-size: .26rem;
    }
  }

  .sure-btn {
    position: absolute;
    bottom: 1.2rem;
    left: 1.3rem;
    width: 3.5rem;
    height: 1rem;
    overflow: auto;
    word-break: break-all;
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
