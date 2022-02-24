<!--
 * @Author: 一尾流莺
 * @Description:活动规则弹窗
 * @Date: 2021-09-27 15:27:04
 * @LastEditTime: 2021-12-22 15:16:56
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\components\PopupRule.vue
-->

<template>
  <div class="rule-popup">
    <img src="../assets/popup-rule.png"
         class="rule-img" />
    <div class="rule-content">
      <p>1、活动对象：通过此活动新关注店铺用户，每ID仅可领取一次；</p>
      <p>2、若用户存在刷奖等恶意行为，一经发现将取消奖品发放资格（如奖品已经发放，有权追回奖品）；</p>
      <p>3、活动参与主体资格：</p>
      <p>（1）每位自然人用户仅能使用一个京东账号参与活动，微信号、QQ、京东帐号、手机号码等任一信息一致或指向同一用户的，视为同一个用户，则第一个参与本活动的账号参与结果有效，其余账号参与结果均视为无效。</p>
      <p>（2）若发现同一位用户使用不同账号重复参与活动，承办方有权取消其参与资格。</p>
      <p>（3）是否获得优惠以活动发布者后台统计结果为准。</p>
    </div>
    <div class="close-icon"
         @click="closePopup"></div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits } from 'vue';
import { openCard } from '../hooks/useMethods';

const emit = defineEmits(['closePopup']);

const props = defineProps({
  activityInfo: {
    type: Object,
    default: () => ({}),
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
  .rule-img {
    width: 6.5rem;
  }
  .close-icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0rem;
    right: 0rem;
  }
  .rule-content{
    width: 5.5rem;
    font-size: 0.24rem;
    position: absolute;
    top: 0.4rem;
    left: 50%;
    transform: translateX(-50%);
    font-family: "HYb1gj";
    line-height: 1.3;

    p{
      margin: 0.15rem 0;
    }
  }
}
</style>
