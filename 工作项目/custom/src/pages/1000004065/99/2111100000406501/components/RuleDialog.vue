<template>
  <!-- 活动规则弹窗 -->
  <div class="box">
    <img src="../assets/img/dialog/dialog-rule.png"
         class="popup">

    <!-- 规则 -->
    <div class="rule-view">
      <div class="rule" v-html="rule"></div>
    </div>

    <!-- 关闭按钮 -->
    <div class="btn-bg" @click="closeDialog()">返回首页</div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';

const emit = defineEmits(['close']);
const props = defineProps({ rule: String });

const closeDialog = () => {
  emit('close', 'ruleDialog');
};

</script>

<style lang='scss' scoped>
.box {
  position: relative;

  img {
    margin: 0 auto;
  }

  .popup {
    width: 5.5rem;
  }

  .rule-view {
    margin: 0 auto;
    position: absolute;
    top: 0.7rem;
    width: 100%;
    padding: 0 .5rem;
    box-sizing: border-box;

    .rule {
      width: 100%;
      padding: .1rem .2rem;
      box-sizing: border-box;
      height: 4.8rem;
      overflow-y: auto;
      font-size: .18rem;
      text-align: left;
      white-space: break-spaces;
    }
  }

  .btn-bg {
    width: 2.75rem;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    color: #0b0442;
    margin: .05rem auto;
    font-size: .28rem;
    font-weight: 800;
    position: absolute;
    bottom: 1.1rem;
    left: 1.4rem;
    background: {
      image: url("../assets/img/dialog/btn-format.png");
      repeat: no-repeat;
      size: cover;
    };
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
