<!--
 * @Author: 一尾流莺
 * @Description:查看红包兑换码弹窗
 * @Date: 2021-09-17 10:36:06
 * @LastEditTime: 2021-09-30 14:37:25
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\components\PopupCdk.vue
-->
<template>
  <div class="cdk-popup">
    <img src="../assets/popup-cdk.png"
         class="popup-content" />
    <div class="cdk-content">
      <div class="cdk"
           id="target">{{cdk}}</div>
      <div class="copy"
           id="copyBtn"
           :data-clipboard-text="cdk"
           data-clipboard-action="copy"
           data-clipboard-target="#target"
           @click="copy"></div>
    </div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>

</template>

<script lang='ts' setup>
import { defineProps, defineEmits, ref } from 'vue';
import Clipboard from 'clipboard';
import { Toast } from 'vant';

const clipboard = ref(new Clipboard('#copyBtn'));
const emit = defineEmits(['closePopup']);
const props = defineProps({
  cdk: {
    type: String,
    default: () => ('123123'),
  },
});

const copy = () => {
  clipboard.value.on('success', (e) => {
    e.clearSelection();
    Toast.success('复制成功');
  });

  clipboard.value.on('error', (e) => {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
    Toast.fail('浏览器不兼容，复制失败啦');
  });
};

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.cdk-popup {
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
  .cdk-content {
    .cdk{
       width: 100%;
       text-align: center;
      position: absolute;
      left: 50%;
      top: 5.3rem;
      transform: translate(-50%);
      overflow: auto;
      color: #000000;
      font-size: 0.4rem;
      color:#4da14c
    }
    .copy {
      width: 5.1rem;
      height: 1rem;
      position: absolute;
      left: 50%;
      top: 6.5rem;
      transform: translate(-50%);
      overflow: auto;
      color: #000000;
      font-size: 0.28rem;
    }
  }
}
</style>
