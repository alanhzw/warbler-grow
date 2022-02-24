/**
 * @Description:caoshijie
 * @Date: 2021/12/30
 * @Description: 规则弹窗
 * @FilePath:src\pages\1000376745\99\2201100037674501\components\rule.vue
*/
<template>
  <div class='box ruleBox'>
    <van-popup v-model:show='showPopUp'>
      <div class='content'>
        <img src='../assets/ruleBg.png' alt='' srcset='' />
        <div class='ruleTitle'>活动规则</div>
        <!-- 礼品 -->
        <Gift class='gift'>
          <img style='width: 100%;display: block;border-radius: 0.1rem;' src='../assets/gift1.jpg' alt='' srcset='' />
        </Gift>
        <!-- 规则 -->
        <RuleText class='ruleBox'></RuleText>
        <div class='skuTipInfo'>
          XVIII 为产品昵称，产品名为雅诗兰黛专研紧塑精华素，国妆备进字J201713711.
        </div>
        <div class='clooseBtn' @click='closedPopUp'>返回活动页</div>
      </div>
    </van-popup>
  </div>
</template>
<script lang='ts' setup>
import { Popup as VanPopup } from 'vant';
import { defineProps, computed, defineEmits } from 'vue';
import RuleText from './ruleText.vue';
import Gift from './gift.vue';

const emit = defineEmits(['closePopup']);
const props = defineProps({
  isShowPopUp: {
    type: Boolean,
    default: () => false,
  },
});
const showPopUp = computed(() => props.isShowPopUp);

const closedPopUp = () => {
  emit('closePopup');
};
</script>
<style lang='scss'>
.content {
  width: 7.5rem;
  position: relative;
  padding-bottom: 1rem;
  box-sizing: border-box;

  .ruleTitle {
    position: absolute;
    top: 0.8rem;
    font-weight: 600;
    width: 100%;
    font-size: 0.4rem;
    text-align: center;
  }

  img {
    width: 100%;
    display: block;
  }

  .gift {
    position: absolute;
    top: 1.5rem;
    padding: 0 0.85rem;
    border-radius: .5rem;
    overflow: hidden;
  }

  .ruleBox {
    position: absolute;
    top: 4rem;
    padding: 0 1rem;
    height: 4.5rem;
    overflow-y: auto;
  }

  .skuTipInfo {
    width: 100%;
    position: absolute;
    top: 9rem;
    text-align: center;
    padding: 0 1rem;
    box-sizing: border-box;
    font-size: 0.12rem;
    color: #020d29;
    line-height: 0.2rem;
  }

  .clooseBtn {
    position: absolute;
    top: 10.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.3rem;
    padding: 0.22rem 0.65rem;
    box-sizing: border-box;
    background: #020d29;
    color: #fff;
    border-radius: 0.5rem;
  }
}

.ruleBox .van-popup {
  background-color: transparent !important;
}
</style>
<style lang='scss'>
</style>
