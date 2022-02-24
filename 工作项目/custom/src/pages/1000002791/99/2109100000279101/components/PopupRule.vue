<!--
 * @Author: 一尾流莺
 * @Description:活动规则弹窗
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-10-08 22:03:49
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\components\PopupRule.vue
-->
<template>
  <div class="rule-popup">
    <img src="../assets//popup-rule.png"
         class="popup-content" />
    <div class="rule-content">
      <div class="rule-text"
           v-html="rule">
      </div>
    </div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['closePopup']);

const props = defineProps({
  rule: {
    type: String,
    default: () => (`
        暂无规则
    `),
  },
});

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.rule-popup {
  position: relative;
  .popup-content {
    width: 7.2rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0rem;
    right: 0rem;
  }
  .rule-content {
    width: 6.5rem;
    height: 8.6rem;
    position: absolute;
    left: 50%;
    top: 1.8rem;
    transform: translate(-50%);
    overflow: auto;
    color: #000000;
    font-size: 0.28rem;

    .rule-text {
      font-size: 0.28rem;
      width: 100%;
      height: 100%;
    }
    .rule-block {
      width: auto;
      display: inline-block;
      color: #ffffff;
      background: #4da14c;
      border-radius: 30px;
      padding: 0.1rem 0.3rem;
      margin: 0.2rem 0;
      font-weight: 700;
    }
    .red{
      display: inline;
      color:red
    }
  }
}
</style>
