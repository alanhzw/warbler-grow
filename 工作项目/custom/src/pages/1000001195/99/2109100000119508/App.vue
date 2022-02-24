<!--
 * @Author: 一尾流莺
 * @Description:【蓝月亮】已购非会员入会有礼活动定制开发
 * @Date: 2021-08-02 09:34:41
 * @LastEditTime: 2021-09-06 21:22:37
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\App.vue
-->
<template>
  <!-- 【蓝月亮】已购非会员入会有礼活动定制开发 -->
  <div class="blue-moon-page"
       :style="pageOptions">
    <!-- KV部分 -->
    <Part :optins="firstPartOptions"
          class="first-part">
      <!-- 活动规则 -->
      <div class="rule-btn"
           @click="isShowRulePopup = true"></div>
      <!-- 我的奖品 -->
      <div class="prize-btn"
           @click="handlerGetMyPrize"></div>
    </Part>
    <!-- 加入会员专享好礼 -->
    <Part :optins="secondPartOptions"
          class="second-part">
      <!-- 点击领取 -->
      <div class="draw-now"
           @click='handlerWin'></div>
    </Part>
    <!-- 专属抽奖新品尝鲜 -->
    <Part :optins="thirdPartOptions"
          class="third-part">
      <!-- 点击抽奖 -->
      <div class="draw-container">
        <div v-for="item in drawList"
             @click="handlerDraw(item.id)"
             class="draw-item"
             :key="item.id">
          <img :src="item.activePic"
               v-if="item.isActive"
               class="draw-item-img" />
          <img :src="item.pic"
               v-else
               class="draw-item-img" />
        </div>
      </div>
    </Part>
    <!-- 专属好货,新品推荐 -->
    <Part :optins="fourthPartOptions"
          class="fourth-part">
      <div class="skus-list">
        <div class="skus-item"
             @click="gotoSkuPage(item.sku)"
             v-for="item in skusList"
             :key="item.sku">
          <img :src="item.pic" />
        </div>
      </div>
    </Part>
    <!-- 我的奖品弹窗 -->
    <popup-my-prize :visible="isShowMyPrizePopup"
                    :prize-list='myPrizeList'
                    @open-add-address-popup='openAddressPopup'
                    :base-info='baseInfo'
                    @close-popup="isShowMyPrizePopup = false"></popup-my-prize>
    <!-- 不满足条件弹窗 -->
    <popup-no-conditions :visible="isShowNoPopup"
                         @close-popup="isShowNoPopup = false"></popup-no-conditions>
    <!-- 未中奖弹窗 -->
    <popup-no-prize :visible="isShowNoPrizePopup"
                    @close-popup="isShowNoPrizePopup = false"></popup-no-prize>
    <!-- 活动规则弹窗 -->
    <popup-rule :visible="isShowRulePopup"
                :rule='rule'
                @close-popup="isShowRulePopup = false"></popup-rule>
    <!-- 中奖了弹窗 -->
    <popup-success :visible="isShowSuccessPopup"
                   :success-prize='drawResult'
                   @close-popup="isShowSuccessPopup = false"></popup-success>
    <!-- 入会成功弹窗 -->
    <popup-member :visible="isShowMemberPopup"
                  @close-popup="isShowMemberPopup = false"></popup-member>
    <!-- 中实物了弹窗 -->
    <popup-success-entity :visible="isShowEntityPopup"
                          @close-popup="isShowEntityPopup = false"
                          @open-add-address-popup='openAddressPopup'></popup-success-entity>
    <!-- 填写地址弹窗 -->
    <popup-add-address :visible="isShowAddPopup"
                       :base-info='baseInfo'
                       :gift-id='giftId'
                       :is-can-submit='isCanSubmit'
                       :address-info=addressInfo
                       @close-popup="isShowAddPopup = false"></popup-add-address>

  </div>

  <!-- 活动已结束 -->
</template>

<script setup lang="ts">
import {
  computed, ref, onMounted, reactive, inject,
} from 'vue';
import {
  Popup as VanPopup, Toast, DatetimePicker as VanDatetimePicker,
} from 'vant';

import { gotoShopPage, gotoSkuPage } from '@/utils/platforms';

import PopupMyPrize from './components/PopupMyPrize.vue';
import PopupNoConditions from './components/PopupNoConditions.vue';
import PopupNoPrize from './components/PopupNoPrize.vue';
import PopupRule from './components/PopupRule.vue';
import PopupSuccess from './components/PopupSuccess.vue';
import PopupSuccessEntity from './components/PopupSuccessEntity.vue';
import PopupMember from './components/PopupMember.vue';
import PopupAddAddress from './components/PopupAddAddress.vue';
import Part from './components/Part.vue';

import skusList from './config/skusList';
import secondPartActive from './assets/second-part-active.png';

import usePopup from './hooks/usePopup';
import useDraw from './hooks/useDraw';
import useBaseInfo from './hooks/useBaseInfo';
import useGetActivityInfo from './hooks/useGetActivityInfo';
import useGetStatus from './hooks/useGetStatus';
import useGetMyPrize from './hooks/useGetMyPrize';
import useWin from './hooks/useWin';

import {
  pageOptions,
  firstPartOptions,
  secondPartOptions,
  thirdPartOptions,
  fourthPartOptions,
} from './config';

// 获取基本信息
const { baseInfo } = useBaseInfo();

// 与弹窗相关的操作
const {
  isShowRulePopup,
  isShowMyPrizePopup,
  isShowNoPrizePopup,
  isShowNoPopup,
  isShowSuccessPopup,
  isShowEntityPopup,
  isShowMemberPopup,
  isShowAddPopup,
} = usePopup();

// 获取抽奖,领奖的状态
const {
  wonStatus,
  drawStatus,
  handlerGetStatus,
} = useGetStatus(baseInfo);

// 获取活动信息  规则 抽奖次数等
const {
  rule, canDrawTimes, main, getRule,
} = useGetActivityInfo(baseInfo);

// 与抽奖相关的操作
const {
  drawList, handlerDraw, drawResult, giftId,
} = useDraw(baseInfo, canDrawTimes, drawStatus, isShowNoPopup, isShowSuccessPopup, isShowEntityPopup, isShowNoPrizePopup, main, handlerGetStatus);

// 与领奖相关的操作
const { handlerWin } = useWin(baseInfo, wonStatus, isShowNoPopup, isShowMemberPopup, main, handlerGetStatus);

// 与我的奖品相关的操作
const { myPrizeList, handlerGetMyPrize } = useGetMyPrize(baseInfo, isShowMyPrizePopup);

const addressInfo = ref({});
const isCanSubmit = ref(true);

// 打开添加地址弹窗
const openAddressPopup = (info:any, flag:any) => {
  isShowAddPopup.value = true;
  addressInfo.value = info;
  isCanSubmit.value = flag;
};

onMounted(async () => {
  console.log('🚀🚀~ 初始化');
  // 初始化
  await handlerGetStatus();
  main();
  getRule();
  // 修改领取图片的按钮文字
  if (wonStatus.value === 3) {
    secondPartOptions.value.backgroundImage = `url(${secondPartActive})`;
  }
});

</script>

<style lang='scss'>
html,
body {
  min-height: 100vh;
}

#app {
  height: 100%;
  .van-popup{
    background: transparent;
  }
}

.blue-moon-page {
  width: 7.5rem;
  height: 100%;
  background-repeat: repeat-y;
  background-size: 100%;

  .first-part {
    position: relative;
    .rule-btn {
      position: absolute;
      width: 1.2rem;
      height: 0.4rem;
      top: 0.9rem;
      right: 0rem;
    }
    .prize-btn {
      position: absolute;
      width: 1.2rem;
      height: 0.4rem;
      top: 1.38rem;
      right: 0rem;
    }
  }
  .second-part {
    position: relative;
    .draw-now {
      width: 3rem;
      height: 1rem;
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translate(-50%);
    }
  }
  .third-part {
    position: relative;

    .draw-container {
      width: 6.5rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      position: absolute;
      top: 1.7rem;
      left: 50%;
      transform: translate(-50%);

      .draw-item {
        width: 2rem;
        margin: 0.1rem 0rem;

        img {
          width: 100%;
          background-size: 100%;
        }
      }
    }
  }
  .fourth-part {
    .skus-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      width: 92%;
      position: absolute;
      top: 1.7rem;
      left: 50.5%;
      transform: translate(-50%);

      .skus-item {
        margin-bottom: 0.3rem;
        img {
          width: 3.3rem;
        }
      }
    }
  }
}
</style>
