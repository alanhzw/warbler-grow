<!--
 * @Author: 一尾流莺
 * @Description:【滴露】明星集卡抽奖
 * @Date: 2021-08-02 09:34:41
 * @LastEditTime: 2021-10-11 15:12:28
 * @FilePath: \custom\src\pages\1000002791\99\2109100000279101\App.vue
-->
<template>
  <div class="dettol-cards">
    <!-- kv -->
    <Part class="part-01"
          @click='hanlderClick(1)'
          :options="partOptions01"></Part>
    <!-- 立即入会/显示等级 -->
    <Part class="part-02"
          @click='hanlderClick(1)'
          :options="partOptions02">
      <!-- 入会按钮 -->
      <div class="main-btn"
           v-if="!isOpenCard"
           @click="openCard(isOpenCard)">立即入会 ></div>
      <div v-else
           class="main-btn">您当前等级为滴露{{ levelMap[activityInfo.level] }}</div>
    </Part>
    <!-- 卡片展示 -->
    <Part class="part-03"
          :options="partOptions03">
      <!-- 活动规则按钮 -->
      <div class="rule-btn"
           @click="openRulePopup"></div>
      <!-- 卡片获取记录按钮 -->
      <div class="my-cards-btn"
           @click="openCardsRecordsPopup"></div>
      <div class="crads-list">
        <div class="card-item"
             v-for="item in activityInfo.giftVOS"
             :key="item.giftId">
          <div class="card-num">{{ item.cardCnt }}</div>
          <!-- <img :src="item.image" /> -->
        </div>
      </div>
    </Part>
    <!-- 抽限定红包封面 -->
    <Part class="part-04"
          :options="partOptions04">
      <!-- 抽奖记录按钮 -->
      <div class="records-btn"
           @click="openDrawRecordsPopup"></div>
      <!-- 我的奖品按钮 -->
      <div class="my-prize-btn"
           @click="openMyPrizePopup"></div>
      <!-- 已抽光图片 -->
      <img src="./assets/none-red-package.png"
           v-if='activityInfo.redPacketStockStatus'
           class="none" />
      <!-- 立即抽奖按钮 -->
      <div class="draw-btn"
           @click="openDrawPopup"></div>
      <!-- 30张守护卡兑换 -->
      <div class="exchange-30"
           @click="open30Popup"></div>
      <img src="./assets/none-xiaodu.png"
           v-if='activityInfo.redeemGiftVOS && activityInfo.redeemGiftVOS[0].status===3'
           class="none-30" />
      <!-- 15张守护卡兑换 -->
      <div class="exchange-15"
           @click="open15Popup"></div>
      <img src="./assets/none-xishou.png"
           v-if='activityInfo.redeemGiftVOS && activityInfo.redeemGiftVOS[1].status===3'
           class="none-15" />
      <!-- 5张守护卡兑换 -->
      <div class="exchange-5"
           @click="open5Popup(false)"></div>
    </Part>
    <!-- 卡片获取方式 -->
    <Part class="part-05"
          :options="partOptions05">
      <!-- 立即抽卡按钮 -->
      <div class="draw-btn"
           @click="openDrawCardPopup"></div>
      <!-- 立即领取按钮 -->
      <div class="win-btn"
           @click="openWinPopup"></div>
    </Part>
    <!-- 店铺热卖 -->
    <Part class="part-06"
          :options="partOptions06">
      <div class="goods">
        <div class="goods-item"
             @click="gotoSkuPage(item.sku)"
             v-for="item in hootGoods"
             :key="item.sku">
          <!-- <img :src="item.image"> -->
        </div>
      </div>
    </Part>

    <!-- 活动规则弹窗 -->
    <van-popup v-model:show="isShowRulePopup"
               get-container="#app">
      <popup-rule @close-popup="closeRulePopup"
                  :rule="activityInfo.rule"></popup-rule>
    </van-popup>

    <!-- 卡片获取记录弹窗 -->
    <van-popup v-model:show="isShowCardsRecordsPopup"
               get-container="#app">
      <popup-cards-records @close-popup="closeCardsRecordsPopup"
                           :record-list="cardsRecordList"></popup-cards-records>
    </van-popup>

    <!-- 抽奖记录弹窗 -->
    <van-popup v-model:show="isShowDrawRecordsPopup"
               get-container="#app">
      <popup-draw-records @close-popup="closeDrawRecordsPopup"
                          :record-list="drawRecordList"></popup-draw-records>
    </van-popup>

    <!-- 我的奖品弹窗 -->
    <van-popup v-model:show="isShowMyPrizePopup"
               get-container="#app">
      <popup-my-prize @close-popup="closeMyPrizePopup"
                      @open-add-info-popup="openAddInfoPopup"
                      @open-5-popup="open5Popup"
                      @open-cdk-popup="openCdkPopup"
                      @change-cdk="changeCdk"
                      @open-add-address-popup="openAddAddressPopup"
                      @change-address-id="changeAddressId"
                      :record-list="prizeRecordList"></popup-my-prize>
    </van-popup>

    <!-- 立即抽奖弹窗 -->
    <van-popup v-model:show="isShowDrawPopup"
               get-container="#app">
      <popup-draw @close-popup="closeDrawPopup"
                  @change-address-id="changeAddressId"
                  @change-cdk="changeCdk"
                  @main="main"
                  :is-open-card="isOpenCard"
                  @open-open-card-popup="openOpenCardPopup"
                  @open-add-info-popup="openAddInfoPopup"
                  @open-fail-popup="openFailPopup"></popup-draw>
    </van-popup>

    <!-- 立即抽卡弹窗 -->
    <van-popup v-model:show="isShowDrawCardPopup"
               get-container="#app">
      <popup-draw-card @close-popup="closeDrawCardPopup"
                       @main="main"
                       @open-open-card-popup="openOpenCardPopup"
                       @open-disinfect-popup="openDisinfectPopup"
                       :is-open-card="isOpenCard"
                       @open-wash-popup="openWashPopup"
                       @open-sterilization-popup="openSterilizationPopup"></popup-draw-card>
    </van-popup>

    <!-- 立即领取弹窗 -->
    <van-popup v-model:show="isShowWinPopup"
               get-container="#app">
      <popup-win @close-popup="closeWinPopup"
                 @main="main"
                 @open-open-card-popup="openOpenCardPopup"
                 :is-open-card="isOpenCard"
                 :limit-card-draw-cnt="activityInfo.limitCardDrawCnt"
                 :has-card-draw-cnt="activityInfo.limitCardTotalCnt"></popup-win>
    </van-popup>

    <!-- 立即兑换30弹窗 -->
    <van-popup v-model:show="isShow30Popup"
               get-container="#app">
      <popup-exchange-30 @close-popup="close30Popup"
                         @open-success-30-popup="openSuccess30Popup"
                         @open-fail-30-popup="openFail30Popup"
                         @main="main"
                         @open-open-card-popup="openOpenCardPopup"
                         :is-open-card="isOpenCard"
                         @change-address-id="changeAddressId"
                         @open-add-address-popup="openAddAddressPopup"></popup-exchange-30>
    </van-popup>

    <!-- 立即兑换15弹窗 -->
    <van-popup v-model:show="isShow15Popup"
               get-container="#app">
      <popup-exchange-15 @close-popup="close15Popup"
                         @open-success-15-popup="openSuccess15Popup"
                         @open-fail-15-popup="openFail15Popup"
                         @change-address-id="changeAddressId"
                         @main="main"
                         @open-open-card-popup="openOpenCardPopup"
                         :is-open-card="isOpenCard"
                         @open-add-address-popup="openAddAddressPopup"></popup-exchange-15>
    </van-popup>

    <!-- 兑换失败30弹窗 -->
    <van-popup v-model:show="isShowFail30Popup"
               get-container="#app">
      <popup-exchange-fail30 @close-popup="closeFail30Popup"></popup-exchange-fail30>
    </van-popup>

    <!-- 兑换失败15弹窗 -->
    <van-popup v-model:show="isShowFail15Popup"
               get-container="#app">
      <popup-exchange-fail15 @close-popup="closeFail15Popup"></popup-exchange-fail15>
    </van-popup>

    <!-- 兑换成功30弹窗 -->
    <van-popup v-model:show="isShowSuccess30Popup"
               get-container="#app">
      <popup-exchange-success30 @close-popup="closeSuccess30Popup"
                                @change-address-id="changeAddressId"
                                @open-add-address-popup="openAddAddressPopup"></popup-exchange-success30>
    </van-popup>

    <!-- 兑换成功15弹窗 -->
    <van-popup v-model:show="isShowSuccess15Popup"
               get-container="#app">
      <popup-exchange-success15 @close-popup="closeSuccess15Popup"
                                @change-address-id="changeAddressId"
                                @open-add-address-popup="openAddAddressPopup"></popup-exchange-success15>
    </van-popup>

    <!-- 立即兑换5弹窗 -->
    <van-popup v-model:show="isShow5Popup"
               get-container="#app">
      <popup-exchange-5 @close-popup="close5Popup"></popup-exchange-5>
    </van-popup>

    <!-- 消毒卡弹窗 -->
    <van-popup v-model:show="isShowDisinfectPopup"
               get-container="#app">
      <popup-disinfect-card @close-popup="closeDisinfectPopup"></popup-disinfect-card>
    </van-popup>
    <!-- 洗手卡弹窗 -->
    <van-popup v-model:show="isShowWashPopup"
               get-container="#app">
      <popup-wash-card @close-popup="closeWashPopup"></popup-wash-card>
    </van-popup>
    <!-- 灭菌卡弹窗 -->
    <van-popup v-model:show="isShowSterilizationPopup"
               get-container="#app">
      <popup-sterilization-card @close-popup="closeSterilizationPopup"></popup-sterilization-card>
    </van-popup>
    <!-- 添加红包信息弹窗 -->
    <van-popup v-model:show="isShowAddInfoPopup"
               get-container="#app">
      <popup-add-info @close-popup="closeAddInfoPopup"
                      @open-cdk-popup="openCdkPopup"
                      @close-my-prize-popup="closeMyPrizePopup"
                      :address-id="addressId"></popup-add-info>
    </van-popup>
    <!-- 添加地址信息弹窗 -->
    <van-popup v-model:show="isShowAddAddressPopup"
               get-container="#app">
      <popup-add-address @close-popup="closeAddAddressPopup"
                         @close-my-prize-popup="closeMyPrizePopup"
                         @closeSuccess-30-popup="closeSuccess30Popup"
                         @closeSuccess-15-popup="closeSuccess15Popup"
                         :address-id="addressId"></popup-add-address>
    </van-popup>
    <!-- 未中奖弹窗 -->
    <van-popup v-model:show="isShowFailPopup"
               get-container="#app">
      <popup-fail @close-popup="closeFailPopup"></popup-fail>
    </van-popup>
    <!-- 查看红包兑换码弹窗 -->
    <van-popup v-model:show="isShowCdkPopup"
               get-container="#app">
      <popup-cdk @close-popup="closeCdkPopup"
                 :cdk="cdk"></popup-cdk>
    </van-popup>
    <!-- 开卡弹窗 -->
    <van-popup v-model:show="isShowOpenCardPopup"
               get-container="#app">
      <popup-open-card @close-popup="closeOpenCardPopup"></popup-open-card>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
// ````````````引入组件库`````````````
import { onMounted } from 'vue';
import { Popup as VanPopup } from 'vant';
import { gotoSkuPage } from '@/utils/platforms';

// ````````````引入基本配置`````````````
import {
  partOptions01, partOptions02, partOptions03, partOptions04, partOptions05, partOptions06, levelMap, hootGoods,
} from './config/index';
// ````````````引入hooks`````````````
import useBaseInfo from './hooks/useBaseInfo';
import useAddressId from './hooks/useAddressId';
import useCdk from './hooks/useCdk';

import { openCard } from './hooks/useMethods';
import useRulePopup from './popup/useRulePopup';
import useCardsRecordsPopup from './popup/useCardsRecordsPopup';
import useDrawRecordsPopup from './popup/useDrawRecordsPopup';
import useMyPrizePopup from './popup/useMyPrizePopup';
import useDrawPopup from './popup/useDrawPopup';
import useDrawCardPopup from './popup/useDrawCardPopup';
import useWinPopup from './popup/useWinPopup';
import useExchange30 from './popup/useExchange30';
import useExchange15 from './popup/useExchange15';
import useExchange5 from './popup/useExchange5';
import useCardDisinfect from './popup/useCardDisinfect';
import useCardWash from './popup/useCardWash';
import useCardSterilization from './popup/useCardSterilization';
import useAddInfoPopup from './popup/useAddInfoPopup';
import useAddAddressPopup from './popup/useAddAddressPopup';
import useFailPopup from './popup/useFailPopup';
import useCdkPopup from './popup/useCdkPopup';
import useFail15Popup from './popup/useFail15';
import useFail30Popup from './popup/useFail30';
import useSuccess15Popup from './popup/useSuccess15';
import useSuccess30Popup from './popup/useSuccess30';
import useOpenCard from './popup/useOpenCard';

// ````````````引入APIS`````````````
import useGetActivityInfo from './apis/useGetActivityInfo';
import useClick from './apis/useClick';
import useFirstEnter from './apis/useFirstEnter';

// ````````````引入自定义组件``````````````
import Part from './components/Part.vue';
import PopupRule from './components/PopupRule.vue';
import PopupCardsRecords from './components/PopupCardsRecords.vue';
import PopupDrawRecords from './components/PopupDrawRecords.vue';
import PopupMyPrize from './components/PopupMyPrize.vue';
import PopupDraw from './components/PopupDraw.vue';
import PopupDrawCard from './components/PopupDrawCard.vue';
import PopupWin from './components/PopupWin.vue';
import PopupExchange30 from './components/PopupExchange30.vue';
import PopupExchange15 from './components/PopupExchange15.vue';
import PopupExchangeFail30 from './components/PopupExchangeFail30.vue';
import PopupExchangeFail15 from './components/PopupExchangeFail15.vue';
import PopupExchangeSuccess30 from './components/PopupExchangeSuccess30.vue';
import PopupExchangeSuccess15 from './components/PopupExchangeSuccess15.vue';
import PopupExchange5 from './components/PopupExchange5.vue';
import PopupDisinfectCard from './components/PopupDisinfectCard.vue';
import PopupSterilizationCard from './components/PopupSterilizationCard.vue';
import PopupWashCard from './components/PopupWashCard.vue';
import PopupAddInfo from './components/PopupAddInfo.vue';
import PopupAddAddress from './components/PopupAddAddress.vue';
import PopupFail from './components/PopupFail.vue';
import PopupCdk from './components/PopupCdk.vue';
import PopupOpenCard from './components/PopupOpenCard.vue';

// 获取基本信息
const { baseInfo, isOpenCard } = useBaseInfo();
// 获取AddressId
const { addressId, changeAddressId } = useAddressId();
// 开卡
const { isShowOpenCardPopup, openOpenCardPopup, closeOpenCardPopup } = useOpenCard();
// 获取Cdk
const { cdk, changeCdk } = useCdk();
// 跟活动规则弹窗相关的操作
const { isShowRulePopup, openRulePopup, closeRulePopup } = useRulePopup();
// 跟卡片获取记录弹窗相关的操作
const {
  isShowCardsRecordsPopup, openCardsRecordsPopup, closeCardsRecordsPopup, cardsRecordList,
} = useCardsRecordsPopup(baseInfo);
// 跟抽奖记录弹窗相关的操作
const {
  isShowDrawRecordsPopup, openDrawRecordsPopup, closeDrawRecordsPopup, drawRecordList,
} = useDrawRecordsPopup(baseInfo);
// 跟我的奖品弹窗相关的操作
const {
  isShowMyPrizePopup, openMyPrizePopup, closeMyPrizePopup, prizeRecordList,
} = useMyPrizePopup(baseInfo);
// 跟立即抽奖弹窗相关的操作
const { isShowDrawPopup, openDrawPopup, closeDrawPopup } = useDrawPopup(baseInfo);
// 跟立即抽卡弹窗相关的操作
const { isShowDrawCardPopup, openDrawCardPopup, closeDrawCardPopup } = useDrawCardPopup();
// 跟立即领取弹窗相关的操作
const { isShowWinPopup, openWinPopup, closeWinPopup } = useWinPopup();
// 兑换30卡的弹窗
const { isShow30Popup, open30Popup, close30Popup } = useExchange30(baseInfo);
// 兑换15卡的弹窗
const { isShow15Popup, open15Popup, close15Popup } = useExchange15(baseInfo);
// 兑换30失败卡的弹窗
const { isShowFail30Popup, openFail30Popup, closeFail30Popup } = useFail30Popup();
// 兑换15失败卡的弹窗
const { isShowFail15Popup, openFail15Popup, closeFail15Popup } = useFail15Popup();
// 兑换30卡成功的弹窗
const { isShowSuccess30Popup, openSuccess30Popup, closeSuccess30Popup } = useSuccess30Popup();
// 兑换15卡成功的弹窗
const { isShowSuccess15Popup, openSuccess15Popup, closeSuccess15Popup } = useSuccess15Popup();
// 获取活动信息功能
const { main, activityInfo } = useGetActivityInfo(baseInfo);
// 点击埋点
const { hanlderClick } = useClick(baseInfo);
// 首次进入埋点
const { firstEnter } = useFirstEnter(baseInfo);
// 兑换5卡的弹窗
const { isShow5Popup, open5Popup, close5Popup } = useExchange5(baseInfo, main, isOpenCard, openOpenCardPopup);
// 兑换消毒卡弹窗
const { isShowDisinfectPopup, openDisinfectPopup, closeDisinfectPopup } = useCardDisinfect();
// 兑换洗手卡弹窗
const { isShowWashPopup, openWashPopup, closeWashPopup } = useCardWash();
// 兑换灭菌卡弹窗
const { isShowSterilizationPopup, openSterilizationPopup, closeSterilizationPopup } = useCardSterilization();
// 未中奖弹窗
const { isShowFailPopup, openFailPopup, closeFailPopup } = useFailPopup();
// 添加红包信息
const { isShowAddInfoPopup, openAddInfoPopup, closeAddInfoPopup } = useAddInfoPopup();
// 添加地址信息
const { isShowAddAddressPopup, openAddAddressPopup, closeAddAddressPopup } = useAddAddressPopup();
// 查看红包兑换码
const { isShowCdkPopup, openCdkPopup, closeCdkPopup } = useCdkPopup();

onMounted(async () => {
  await main();
  firstEnter();
});

</script>

<style lang='scss'>
html,
body {
  min-height: 100vh;
  background: #a4c3c6;
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
  }

  .part-02 {
    .main-btn {
      white-space: nowrap;
      padding: 0 0.5rem;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: center;
      font-size: 0.4rem;
      background: #118347;
      font-weight: 700;
      color: #ffffff;
      border-radius: 30px;
      border: 3px solid #f3dfb1;
      position: absolute;
      top: 0rem;
      left: 50%;
      transform: translate(-50%);
    }
  }

  .part-03 {
    .rule-btn {
      width: 3.5rem;
      height: 0.6rem;
      position: absolute;
      top: 1.8rem;
      left: 0rem;
    }
    .my-cards-btn {
      width: 3.5rem;
      height: 0.6rem;
      position: absolute;
      top: 1.8rem;
      right: 0rem;
    }
    .crads-list {
      width: 99%;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0.65rem;

      .card-item {
        position: relative;
        width: 1.7rem;
        height: 1.7rem;
        img {
        }
      }
      .card-num {
        width: 0.4rem;
        height: 0.4rem;
        position: absolute;
        right: -0.1rem;
        top: -0.2rem;
        z-index: 2;
        font-size: 0.3rem;
        border-radius: 50%;
        text-align: center;
        line-height: 0.4rem;
        border: 2px solid #a4c3c6;
        background: #ffffff;
        color: #a4c3c6;
        font-weight: 700;
      }
    }
  }

  .part-04 {
    .records-btn {
      width: 3.5rem;
      height: 0.8rem;
      position: absolute;
      top: 1.7rem;
      left: 0rem;
    }
    .my-prize-btn {
      width: 3.5rem;
      height: 0.8rem;
      position: absolute;
      top: 1.7rem;
      right: 0rem;
    }
    .none {
      width: 1.4rem;
      position: absolute;
      top: 2.9rem;
      left: 0.9rem;
    }
    .none-30 {
      width: 1.6rem;
      position: absolute;
      top: 9.7rem;
      left: 0.8rem;
    }
    .none-15 {
      width: 1.6rem;
      position: absolute;
      top: 12.59rem;
      left: 0.8rem;
    }
    .draw-btn {
      width: 100%;
      height: 2.5rem;
      position: absolute;
      top: 2.7rem;
    }
    .exchange-30 {
      width: 100%;
      height: 3rem;
      position: absolute;
      top: 9.4rem;
    }
    .exchange-15 {
      width: 100%;
      height: 3rem;
      position: absolute;
      top: 12.2rem;
    }
    .exchange-5 {
      width: 100%;
      height: 3rem;
      position: absolute;
      top: 15.1rem;
    }
  }

  .part-05 {
    .draw-btn {
      width: 100%;
      height: 2.7rem;
      position: absolute;
      top: 1.2rem;
    }
    .win-btn {
      width: 100%;
      height: 2.7rem;
      position: absolute;
      top: 4.2rem;
    }
  }

  .part-06 {
    .goods {
      width: 100%;
      position: absolute;
      top: 1.2rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .goods-item {
        width: 50%;
        height: 4.5rem;
        display: flex;
        justify-content: center;
        margin-bottom: 0.4rem;
        img {
          width: 3rem;
          height: 3rem;
        }
      }
    }
  }
}
</style>
