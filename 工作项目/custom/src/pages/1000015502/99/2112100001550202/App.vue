<!--
 * @Author: 一尾流莺
 * @Description:【三元奶粉】复购活动满罐有礼
 * @Date: 2021-08-02 09:34:41
 * @LastEditTime: 2021-12-22 10:38:15
 * @FilePath: \custom\src\pages\1000015502\99\2112100001550202\App.vue
-->
<template>
  <div class="dettol-cards">
    <!-- 三元-爱力优系列 -->
    <Part class="part-01"
          :options="partOptions01">
      <!-- 活动规则按钮 -->
      <div class="rule"
           @click="openRulePopup"></div>
      <!-- 我的奖品按钮 -->
      <div class="prize"
           @click="openPrizePopup"></div>
      <Content :content-style='contentStyle1'
               :skus='skus1'
               @number='number1'
               :product='product1'></Content>
    </Part>
    <!-- 活动规则弹窗 -->
    <van-popup v-model:show="isShowRulePopup"
               get-container="#app">
      <popup-rule @close-popup="closeRulePopup"
                  :rule="rule"></popup-rule>
    </van-popup>

    <!-- 我的奖品弹窗 -->
    <van-popup v-model:show="isShowPrizePopup"
               get-container="#app">
      <popup-prize @close-popup="closePrizePopup"
                   :prize-list='prizeList'></popup-prize>
    </van-popup>

    <!-- 开卡弹窗 -->
    <van-popup v-model:show="isShowOpenCardPopup"
               :close-on-click-overlay='false'
               get-container="#app">
      <popup-open-card @close-popup="closeOpenCardPopup"></popup-open-card>
    </van-popup>

  </div>
</template>

<script setup lang="ts">
// ````````````引入组件库`````````````
import { onMounted } from 'vue';
import { Popup as VanPopup } from 'vant';

// ````````````引入基本配置`````````````
import {
  partOptions01,
} from './config/index';
import {
  contentStyle1,
} from './config/style';
import {
  skus1,
} from './config/skus';
// ````````````引入hooks`````````````
import useBaseInfo from './hooks/useBaseInfo';
import { gotoShopPage } from './hooks/useMethods';

import useRulePopup from './popup/useRulePopup';
import usePrizePopup from './popup/usePrizePopup';
import useOpenCardPopup from './popup/useOpenCardPopup';

// ````````````引入APIS`````````````
import useGetActivityInfo from './apis/useGetActivityInfo';
import useGetList from './apis/useGetList';

// ````````````引入自定义组件``````````````
import Part from './components/Part.vue';
import PopupRule from './components/PopupRule.vue';
import PopupPrize from './components/PopupPrize.vue';
import PopupOpenCard from './components/PopupOpenCard.vue';
import Content from './components/Content.vue';

// 获取基本信息
const { baseInfo, isOpenCard } = useBaseInfo();

// 跟活动规则弹窗相关的操作
const { isShowRulePopup, openRulePopup, closeRulePopup } = useRulePopup();

// 跟我的奖品弹窗相关的操作
const {
  isShowPrizePopup, openPrizePopup, closePrizePopup, prizeList,
} = usePrizePopup(baseInfo);
// 跟开卡弹窗相关的操作
const { isShowOpenCardPopup, openOpenCardPopup, closeOpenCardPopup } = useOpenCardPopup();
// 获取活动信息功能
const {
  main, product1, number1,
} = useGetActivityInfo(baseInfo);
// 获取活动规则功能
const { rule, getList } = useGetList(baseInfo);

onMounted(async () => {
  // 如果未开卡  打开开卡弹窗
  if (!isOpenCard) {
    openOpenCardPopup();
  }
  // 获取活动信息
  main();
  // 获取活动规则
  getList();
});

</script>

<style lang='scss'>
html,
body {
  min-height: 100vh;
  background: #c3231e;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  .van-popup {
    background: transparent;
  }
}

.dettol-cards {
  .part-01 {
    position: relative;
    .rule {
      position: absolute;
      width: 1.3rem;
      height: 0.5rem;
      right: 0;
      top: 0.5rem;
    }
    .prize {
      position: absolute;
      width: 1.3rem;
      height: 0.5rem;
      right: 0;
      top: 1rem;
    }

  }

  .part-02 {
  }

  .part-03 {
  }

  .part-04 {
    .goto-shop-page{
      width: 3rem;
      height: 0.5rem;
      position: absolute;
      bottom: 0.2rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
