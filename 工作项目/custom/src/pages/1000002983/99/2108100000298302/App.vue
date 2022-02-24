<!--
 * @Author: 一尾流莺
 * @Description:复购有礼活动主页面
 * @Date: 2021-08-23 10:54:37
 * @LastEditTime: 2021-09-29 10:36:44
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298302\App.vue
-->
<template>
  <!-- 活动正常 -->
  <div class="rePurchasePage"
       :style='homePageOptions'
       v-if="baseInfo.status < 3">
    <!-- ··················规则页面····················· -->
    <Page v-if="step === 1"
          :optins="stepFirstOptons">
      <!-- 规则区域 -->
      <Rule :rule='rule'
            :optins="ruleOptions"
            v-if="isUseRule"></Rule>
      <!-- 即刻领取按钮 -->
      <draw-now-btn @get-token='getToken'
                    :optins="drawNowBtnOptions"></draw-now-btn>
    </Page>
    <!-- ················领取成功页面···················· -->
    <Page v-if="step === 2"
          :optins="stepSecondOptons">
      <!-- 查看领取攻略按钮 -->
      <check-rule-btn @go-to-rule='goToRule'
                      :optins="checkRuleBtnOptions"></check-rule-btn>
      <!-- 曝光商品 -->
      <exposure-goods :base-url="baseUrl"
                      :skus-list="skusList"
                      :optins="exposureGoodsOptions"
                      @go2-shop="goToShop"></exposure-goods>
    </Page>
    <!-- ···················已领取页面··················· -->
    <Page v-if="step === 3"
          :optins="stepThirdOptons">
      <!-- 查看领取攻略按钮 -->
      <check-rule-btn @go-to-rule='goToRule'
                      :optins="checkRuleBtnOptions"></check-rule-btn>

      <!-- 曝光商品 -->
      <exposure-goods :base-url="baseUrl"
                      :skus-list="skusList"
                      :optins="exposureGoodsOptions"
                      @go2-shop="goToShop"></exposure-goods>
    </Page>
    <!-- ···················不符合规则页面··············· -->
    <Page v-if="step === 4"
          :optins="stepFourthOptons">
      <!-- 领取更多权益按钮 -->
      <draw-more-btn @draw-more='drawMore'
                     :optins="drawMoreBtnOptions"></draw-more-btn>
    </Page>
    <!-- 购物车按钮 -->
    <shopping-cart v-if="step === 3 || step === 2"
                   :optins="shoppingCartOptions"
                   @go2-car="goToCar"></shopping-cart>
  </div>
  <!-- 活动已结束 -->
  <activity-over v-else
                 @go2-shop="goToShop"></activity-over>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import useFindSkus from './hooks/useFindSkus';
import useLinks from './hooks/useLinks';
import useBaseInfo from './hooks/useBaseInfo';
import useGetActivityInfo from './hooks/useGetActivityInfo';
import useProcess from './hooks/useProcess';

import ActivityOver from './components/ActivityOver.vue';
import ExposureGoods from './components/ExposureGoods.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import Page from './components/Page.vue';
import Rule from './components/Rule.vue';
import DrawNowBtn from './components/DrawNowBtn.vue';
import CheckRuleBtn from './components/CheckRuleBtn.vue';
import DrawMoreBtn from './components/DrawMoreBtn.vue';
import {
  stepFirstOptons,
  stepSecondOptons,
  stepThirdOptons,
  stepFourthOptons,
  homePageOptions,
  checkRuleBtnOptions,
  drawMoreBtnOptions,
  drawNowBtnOptions,
  exposureGoodsOptions,
  ruleOptions,
  shoppingCartOptions,
  isUseRule,
} from './config';

// 获取基本信息
const { baseInfo, isOpenCard } = useBaseInfo();

// 一些跳转链接的方法
const {
  goToShop, drawMore, goToCar, goToOpenCard,
} = useLinks(isOpenCard);

// 获取活动信息  规则 是否可以领取令牌等
const {
  rule, status, main, getRule,
} = useGetActivityInfo(baseInfo);

// 获取曝光商品Skus
const { skusList, baseUrl, findSkus } = useFindSkus(baseInfo);

// 领取令牌 流程控制
const { step, goToRule, getToken } = useProcess(baseInfo, status, main);

onMounted(async () => {
  await main();
  await getRule();
  await findSkus();
  goToOpenCard();
});

</script>

<style lang="scss">
html,
body {
  min-height: 100vh;
}

#app {
  height: 100%;
}

.rePurchasePage {
  width: 7.5rem;
  height: 100%;
  background-repeat: repeat-y;
  background-size: 100%;
}

</style>
