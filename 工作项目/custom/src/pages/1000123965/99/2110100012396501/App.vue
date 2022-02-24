<!--
 * @Author: 一尾流莺
 * @Description:【三元奶粉】复购活动满罐有礼
 * @Date: 2021-08-02 09:34:41
 * @LastEditTime: 2022-01-10 09:57:05
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\App.vue
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
               @change-init-address='changeInitAddress'
               @change-gift-id='changeGiftId'
               :number='number1'
               @open-add-address-popup='openAddAddressPopup'
               :product='product1'></Content>
    </Part>

    <!-- 三元-爱倍益系列 -->
    <Part class="part-02"
          :options="partOptions02">
      <Content :content-style='contentStyle2'
               :skus='skus2'
               @change-init-address='changeInitAddress'
               @change-gift-id='changeGiftId'
               :number='number2'
               @open-add-address-popup='openAddAddressPopup'
               :product='product2'></Content>
    </Part>

    <!-- 三元-爱诺星系列 -->
    <Part class="part-03"
          :options="partOptions03">
      <Content :content-style='contentStyle3'
               :skus='skus3'
               :number='number3'
               @change-init-address='changeInitAddress'
               @change-gift-id='changeGiftId'
               @open-add-address-popup='openAddAddressPopup'
               :product='product3'></Content>
    </Part>

    <!-- 三元-爱韵天使妈妈粉 -->
    <Part class="part-04"
          :options="partOptions04">
      <Content :content-style='contentStyle4'
               :skus='skus4'
               :number='number4'
               @change-init-address='changeInitAddress'
               @change-gift-id='changeGiftId'
               @open-add-address-popup='openAddAddressPopup'
               :product='product4'></Content>
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
                   @open-add-address-popup='openAddAddressPopup'
                   @open-see-address-popup='openSeeAddressPopup'
                   @change-gift-id='changeGiftId'
                   @change-init-address='changeInitAddress'
                   :prize-list='prizeList'></popup-prize>
    </van-popup>

    <!-- 开卡弹窗 -->
    <van-popup v-model:show="isShowOpenCardPopup"
               :close-on-click-overlay='false'
               get-container="#app">
      <popup-open-card @close-popup="closeOpenCardPopup"></popup-open-card>
    </van-popup>
    <!-- 填写地址弹窗 -->
    <van-popup v-model:show="isShowAddAddressPopup"
               :close-on-click-overlay='false'
               get-container="#app">
      <popup-add-address @close-popup="closeAddAddressPopup"
                         :init-address='initAddress'
                         v-if='isShowAddAddressPopup'
                         :gift-id='giftId'></popup-add-address>
    </van-popup>
    <!-- 查看地址弹窗 -->
    <van-popup v-model:show="isShowSeeAddressPopup"
               :close-on-click-overlay='false'
               get-container="#app">
      <popup-see-address @close-popup="closeSeeAddressPopup"></popup-see-address>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
// ````````````引入组件库`````````````
import { nextTick, onMounted } from 'vue';
import { Popup as VanPopup, Toast } from 'vant';

// ````````````引入基本配置`````````````
import { loadScript } from '@/utils/client';
import {
  partOptions01, partOptions02, partOptions03, partOptions04,
} from './config/index';
import {
  contentStyle1, contentStyle2, contentStyle3, contentStyle4,
} from './config/style';
import {
  skus1, skus2, skus3, skus4,
} from './config/skus';
// ````````````引入hooks`````````````
import useBaseInfo from './hooks/useBaseInfo';
import { gotoFinishInfo, gotoShopPage } from './hooks/useMethods';

import useRulePopup from './popup/useRulePopup';
import usePrizePopup from './popup/usePrizePopup';
import useOpenCardPopup from './popup/useOpenCardPopup';
import useAddAddressPopup from './popup/useAddAddressPopup';
import useSeeAddressPopup from './popup/useSeeAddressPopup';

import useGiftId from './hooks/useGiftId';
import useInitAddress from './hooks/useInitAddress';

// ````````````引入APIS`````````````
import useGetActivityInfo from './apis/useGetActivityInfo';
import useGetRule from './apis/useGetRule';
import useGetFinishInfo from './apis/useGetFinishInfo';

// ````````````引入自定义组件``````````````
import Part from './components/Part.vue';
import PopupRule from './components/PopupRule.vue';
import PopupAddAddress from './components/PopupAddAddress.vue';
import PopupSeeAddress from './components/PopupSeeAddress.vue';
import PopupPrize from './components/PopupPrize.vue';
import PopupOpenCard from './components/PopupOpenCard.vue';
import Content from './components/Content.vue';

// 获取基本信息
const { baseInfo, isOpenCard } = useBaseInfo();
// 全线giftId
const { giftId, changeGiftId } = useGiftId();
// 回显地址
const { initAddress, changeInitAddress } = useInitAddress();
// 跟活动规则弹窗相关的操作
const { isShowRulePopup, openRulePopup, closeRulePopup } = useRulePopup();
// 跟添加地址弹窗相关的操作
const { isShowAddAddressPopup, openAddAddressPopup, closeAddAddressPopup } = useAddAddressPopup();
// 跟查看地址弹窗相关的操作
const { isShowSeeAddressPopup, openSeeAddressPopup, closeSeeAddressPopup } = useSeeAddressPopup();
// 跟我的奖品弹窗相关的操作
const {
  isShowPrizePopup, openPrizePopup, closePrizePopup, prizeList,
} = usePrizePopup(baseInfo);
// 跟开卡弹窗相关的操作
const { isShowOpenCardPopup, openOpenCardPopup, closeOpenCardPopup } = useOpenCardPopup();
// 获取活动信息功能
const {
  main, product1, product2, product3, product4, number1, number2, number3, number4,
} = useGetActivityInfo(baseInfo);
// 获取活动规则功能
const { rule, getRule } = useGetRule(baseInfo);
// 获取完善信息结果
const { isFinishInfo, getFinishInfo } = useGetFinishInfo(baseInfo);
const imitateDelay = (timeout:number) => new Promise<void>((resolve) => {
  const timeoutHandle = setTimeout(() => {
    clearTimeout(timeoutHandle);
    resolve();
  }, timeout);
});

const Vconsole = async () => {
  await loadScript('https://cdn.bootcdn.net/ajax/libs/vConsole/3.7.0/vconsole.min.js');
  if (window.VConsole && window.location.href.split('?')[1]?.includes('debug')) {
    const vc = new window.VConsole();
  }
};

onMounted(async () => {
  // 如果未开卡  打开开卡弹窗
  if (!isOpenCard) {
    openOpenCardPopup();
    return false;
  }
  // await getFinishInfo();
  // 如果没有完善信息  跳转完善信息页面
  // if (!isFinishInfo.value) {
  //   Toast.loading({
  //     message: '加载中...',
  //     forbidClick: true,
  //     duration: 0,
  //   });
  //   await imitateDelay(3000);
  //   gotoFinishInfo();
  // }
  // 获取活动信息
  main();
  // 获取活动规则
  getRule();
  return true;
});

</script>

<style lang='scss'>
html,
body {
  min-height: 100vh;
  background: #b3dbff;
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
      height: 0.3rem;
      right: 0;
      top: 0.35rem;
    }
    .prize {
      position: absolute;
      width: 1.3rem;
      height: 0.3rem;
      right: 0;
      top: 0.8rem;
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
