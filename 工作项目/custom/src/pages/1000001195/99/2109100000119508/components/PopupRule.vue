<!--
 * @Author: 一尾流莺
 * @Description:活动规则弹窗
 * @Date: 2021-09-02 14:19:26
 * @LastEditTime: 2021-09-06 17:25:48
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\components\PopupRule.vue
-->
<template>
  <van-popup v-model:show="myVisible"
             get-container="#app">
    <div class="rule-box">
      <img src="../assets//popup-rule.png"
           class="popup-content" />
      <div class="rule-content">
        <div class="rule-text"
             v-html='rule'>

        </div>
      </div>
      <div class="close-icon"
           @click="closePopup"></div>
    </div>
  </van-popup>
</template>

<script lang='ts' setup>
import {
  Popup as VanPopup,
} from 'vant';
import { defineProps, defineEmits, computed } from 'vue';

const emit = defineEmits(['closePopup']);
const props = defineProps({
  visible: {
    type: Boolean,
    default: () => (false),
  },
  rule: {
    type: String,
    default: () => ('暂无规则'),
  },
});
const myVisible = computed(() => props.visible);

// 关闭弹窗
const closePopup = () => {
  emit('closePopup');
};
</script>

<style lang='scss'>
.rule-box {
  position: relative;
  .popup-content {
    width: 6.5rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%);
  }
  .rule-content {
    width: 5.5rem;
    height: 5rem;
    position: absolute;
    left: 50%;
    top: 1.5rem;
    transform: translate(-50%);
    overflow: auto;
    color: #fff;
    font-size: 0.28rem;
    .rule-text {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
