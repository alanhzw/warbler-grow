<template>
  <!-- 活动规则弹窗 -->
  <div class="box">
    <div class="info">
      <div v-html="rule" class="word-view"></div>
    </div>
    <div class="close-btn" @click="closeDialog"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps, ref } from 'vue';

const props = defineProps({ rule: String });
const emit = defineEmits(['closeDialog']);

const closeDialog = () => {
  emit('closeDialog');
};

</script>

<style lang='scss' scoped>
.box {
  position: fixed;
  width: 7.5rem;
  height: 12.74rem;
  box-sizing: border-box;
  bottom: 0;
  background: {
    image: url("../assets/dialog/dialog-rule.png");
    repeat: no-repeat;
    size: contain;
  };

  .info {
    width: 100%;
    box-sizing: border-box;
    padding: 3.8rem .4rem 0 .4rem;

    .word-view {
      height: 8.8rem;
      font-size: .28rem;
      overflow-y: auto;
      padding: 0 .15rem;
    }
  }

  .close-btn {
    position: absolute;
    top: 2.6rem;
    right: .2rem;
    width: 1rem;
    height: 1rem;
    overflow: auto;
  }
}
</style>
