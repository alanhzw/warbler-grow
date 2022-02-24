<template>
  <!--  kv部分-->
  <div class="main-kv">
    <!--活动一储值额外送-->
    <div class="save-money-area">
      <div class="save-money-tile"></div>
      <div class="save-money-coupon" @click="gotoShopPage(shopId)"></div>
    </div>
    <!--活动二老客复购送-->
    <div class="old-customer-prize">
<!--      <div class="old-customer-title"></div>-->
      <div class="old-customer-area">
        <div class="rule-btn" @click="openWindow('ruleWin')">活动规则</div>
        <div class="remain-num">
          还剩
          <span>{{restThousand}}</span>
          <span>{{restHundred}}</span>
          <span>{{restTens}}</span>
          <span>{{restSingle}}</span>
          份小酒礼包等你领取
        </div>
        <div class="dotted"></div>
        <div class="old-customer-step">step 01 确认礼包领取资格</div>
        <div class="old-customer-text">在本店<span class="red-span"> 2021-7-1至2021-12-31 </span>期间有已完成订单的会员即可报名参加</div>
        <div class="book-btn" :class="{'gray':applyButton !== 0}" @click="joinIn">立即报名>></div>
        <div class="old-customer-step">step 02 立即下单领取礼包</div>
        <div class="old-customer-text"><span class="red-span">2022-1-1至2022-1-29 </span>期间购买全店任意产品单笔实付满<span class="red-span" style="font-size: .23rem"> 799 </span>元即可领取</div>
        <div class="old-customer-step">step 03 订单完成领取礼包</div>
        <div class="fix-btn" :class="{'gray':fillButton !== 0}" @click="fixInfo">填写地址</div>
        <div class="old-customer-text" style="margin: 0">*确认收货<span class="red-span"> 48小时后</span>填写地址将自动变成可填写状态。</div>
        <div class="old-customer-text" style="margin: 0">请及时填写地址信息，赠品将于活动结束后<span class="red-span"> 15个工作日</span>内完成发放，请耐心等待。</div>
      </div>
    </div>
  </div>
  <!--  曝光商品-->
  <div class="sku-bg" v-if="skusList.length > 0">
    <div class="sku-bg-title"></div>
    <div class="sku-area">
      <div class="sku-item" v-for="item in skusList" :key="item.actId">
        <img :src="item.logo"/>
        <div class="sku-top">{{ item.skuName }}</div>
        <button class="sku-btn" @click="gotoSkuPage(item.skuId)">立即抢购></button>
      </div>
    </div>
  </div>
  <!--查看更多-->
  <div class="see-more" @click="goActivity"></div>

  <!--  分享好友-->
  <!--  <div class="share-area">-->
  <!--    <div class="share-btn" :class="{gray:!shareStatus}" @click="share"></div>-->
  <!--  </div>-->

  <!--  弹窗组件-->
  <Popup class="popup" v-model:show="maskShow" :close-on-click-overlay="false">
    <open-card-window @openCard="toOpen" @closeMem="closeWindow" v-if="windowName === 'openWin'"></open-card-window>
    <rule-window @closeRule="closeWindow" :myRule="rule" v-if="windowName === 'ruleWin'"></rule-window>
    <fix-info-window @commitInfo="commitInfo" @closeFix="closeWindow" v-if="windowName === 'fixInfoWin'"></fix-info-window>
    <no-quality @memPage="goActivity" @closeNoQ="closeWindow" v-if="windowName === 'noQualityWin'"></no-quality>
  </Popup>

</template>

<script lang='ts' setup>
import './css/common.scss';
import { computed, inject, nextTick, Ref, ref } from 'vue';
import { CountDown, Popup, Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { callShare, gotoShopPage, gotoSkuPage } from '@/utils';
import { reportClick } from '@/utils/trackEvent/jdReport';
import OpenCardWindow from './components/opencardWindow.vue';
import RuleWindow from './components/ruleWindow.vue';
import FixInfoWindow from './components/fixInfoWindow.vue';
import NoQuality from './components/noQuality.vue';

// Toast.allowMultiple();
// 分享渠道
const shareChannel = ['Wxfriends', 'Wxmoments', 'Sinaweibo', 'QQfriends', 'QQzone'];
// 遮罩
const maskShow = ref(false);
// 弹窗名称
const windowName = ref('');
// 规则
const rule = ref('');
// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const { activityId, venderId, shopId, endTime } = baseInfo;
// 是否开卡表示是否注册
const isOpenCarded: boolean = inject('isOpenCard') as boolean;
// const isOpenCarded = true;
// 用户Pin
const userPin = ref<string>(baseInfo.pin);
// 曝光商品列表
const skusList = ref([]);
// 剩余礼品数量
const restThousand = ref(0);
const restHundred = ref(0);
const restTens = ref(0);
const restSingle = ref(0);
// 报名状态
const applyButton = ref(1);
// 填写状态
const fillButton = ref(1);
// 完善信息id
const uuid = ref();
// 开启弹窗
const openWindow = (name: string) => {
  windowName.value = name;
  maskShow.value = true;
};
// 关闭弹窗
const closeWindow = () => {
  maskShow.value = false;
};

// 获取活动信息;
const getActivityInfo = () => {
  cjwxRequest
    .get(`/common/brand/getFullActInfoVo?activityId=${activityId}`)
    .then((res: { data: { rule: string; }; }) => {
      if (res.data) {
        const rules = res.data.rule.split('\r');
        rule.value = rules.join('<br/>');
      }
    });
};
// 分享好友
// const share = () => {
//   // if (!isOpenCarded) {
//   //   openWindow('openWin');
//   //   return;
//   // }
//   callShare({
//     type: baseInfo.shareType,
//     title: '抽手机，赢大奖',
//     // imageUrl: actList.value.shareImg as string,
//     shareUrl: `${window.location.origin}/m/1000085868/99/2112100008586801/?helpUuid=${myUuid.value}` as string,
//     // afterShare: sharePoint,
//     channel: shareChannel.join(','),
//   });
// };
// 去会员活动页
const goActivity = () => {
  window.location.href = 'https://pro.m.jd.com/mall/active/nyb4ALUMVryrauAdZU3peCHDPZ7/index.html';
};
// 跳转开卡
const toOpen = () => {
  const returnUrl = encodeURIComponent(`${window.location.origin}/m/1000088382/99/2112100008838201/`);
  window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=1000088382&shopId=1000088382&channel=8076&returnUrl=${returnUrl}`;
};
const getSkuList = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/act/common/findSkus', {
    actId: activityId,
    userId: shopId,
    type: 99,
  }).then((res) => {
    if (res.isOk) {
      res.skus.forEach((item: { logo: string | string[]; }) => {
        if (item.logo.indexOf('360buyimg') === -1) {
          item.logo = `https://img10.360buyimg.com/imgzone${item.logo}`;
        }
      });
      skusList.value = res.skus;
    } else {
      Toast(res.msg);
    }
  });
};
// 活动信息
const activityContent = () => {
  // Toast.loading({
  //   message: '加载中...',
  //   forbidClick: true,
  // });
  cjwxRequest.post('/crm/xhtx/repurchase/activityContent', {
    activityId,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      restThousand.value = Math.floor((res.data.restGifts / 1000) % 10);
      restHundred.value = Math.floor((res.data.restGifts / 100) % 10);
      restTens.value = Math.floor((res.data.restGifts / 10) % 10);
      restSingle.value = Math.floor(res.data.restGifts % 10);
      applyButton.value = res.data.applyButton;
      fillButton.value = res.data.fillButton;
      uuid.value = res.data.uuid;
    } else {
      Toast(res.errorMessage);
    }
    // Toast.clear();
  });
};
// 立即报名
const joinIn = () => {
  if (!isOpenCarded) {
    openWindow('openWin');
    return;
  }
  if (fillButton.value === 0) {
    Toast('已报名，快去填写地址吧');
    return;
  }
  if (fillButton.value === 1) {
    openWindow('noQualityWin');
    // Toast('抱歉您不是已购会员，无法参与活动');
    return;
  }
  if (fillButton.value === 2) {
    Toast('您不满足下单活动要求，尽快下单抢小酒');
    return;
  }
  if (fillButton.value === 3) {
    Toast('您已经报名');
    return;
  }
  if (fillButton.value === 4) {
    Toast('您来完了，小酒已被抢光');
    return;
  }
  cjwxRequest.post('/crm/xhtx/repurchase/apply', {
    activityId,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      // Toast(res.data);
      Toast({
        message: res.data,
        duration: 2000,
      });
      activityContent();
    } else {
      Toast(res.errorMessage);
    }
    // Toast.clear();
  });
};
// 填写地址
const fixInfo = () => {
  if (!isOpenCarded) {
    openWindow('openWin');
    return;
  }
  switch (fillButton.value) {
    case 0:
      openWindow('fixInfoWin');
      break;
    // case 1:
    //   // Toast('抱歉您不是已购会员，无法参与活动');
    //   openWindow('noQualityWin');
    //   break;
    // case 2:
    //   Toast('您不满足下单活动要求，尽快下单抢小酒');
    //   break;
    // case 3:
    //   Toast('您已经提交地址了');
    //   break;
    // case 4:
    //   Toast('您来完了，小酒已被抢光');
    //   break;
    // case 5:
    //   Toast('请先报名参与活动哦');
    //   break;
    default:
      break;
  }
};
// 提交个人信息
const commitInfo = (infoData) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/xhtx/repurchase/recordReciverInfo', {
    activityId,
    pin: userPin.value,
    uuid: uuid.value,
    venderId,
    name: infoData.value.receiver,
    mobile: infoData.value.phone,
    province: infoData.value.province,
    city: infoData.value.city,
    town: infoData.value.district,
    address: infoData.value.address,
  }).then((res) => {
    if (res.result) {
      Toast('填写成功');
      closeWindow();
      activityContent();
    } else {
      Toast(res.errorMessage);
    }
    Toast.clear();
  });
};
getActivityInfo();
activityContent();
getSkuList();
</script>

<style lang='scss'>
.gray-cover {
  background-color: rgba(0, 0, 0, .4);
}

.red-span {
  color: #e40909;
}

.main-kv {
  position: relative;
  width: 100%;
  margin: 0;
  background: url("./assets/kv.png") no-repeat;
  background-size: 100%;
  color: #54320b;
  -webkit-text-size-adjust:none;

  .save-money-area{
    position: relative;
    width: 100%;
    margin-top: 9.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .save-money-tile{
      background: url("./assets/coupon-title.png") no-repeat;
      background-size: 100%;
      width: 3.62rem;
      height: .46rem;
    }
    .save-money-coupon{
      background: url("./assets/coupon.png") no-repeat;
      background-size: 100%;
      width: 7.08rem;
      height: 2.47rem;
      margin-top: 0.1rem;
    }
  }
  .old-customer-prize{
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .old-customer-title{
      background: url("./assets/act2-title.png") no-repeat;
      background-size: 100%;
      width: 5.42rem;
      height: .47rem;
      margin: .3rem auto;
    }
    .old-customer-area{
      background: url("./assets/act2.png") no-repeat;
      background-size: 100%;
      width: 7.04rem;
      height: 10.29rem;
      font-size: 0.26rem;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: .2rem;

      .rule-btn {
        position: absolute;
        width: 1.2rem;
        height: 0.4rem;
        top: 0.9rem;
        right: 0.28rem;
        border-radius: 0.5rem 0 0 0.5rem;
        font-size: 0.23rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.9);
        border-right-width: 0;
        font-weight: 600;
      }
      .remain-num{
        width: 100%;
        text-align: center;
        margin-top: 5.4rem;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;

        >span{
          width: .3rem;
          height: .3rem;
          background-color: #FFFFFF;
          color: #e40909;
          margin:0 .05rem;
        }
      }
      .dotted{
        background: url("./assets/dotted.png") no-repeat;
        background-size: 100%;
        width: 5.74rem;
        height: 0.1rem;
        margin: 0.1rem auto;
      }
      .old-customer-step{
        background-color: #e40909;
        color: #FFFFFF;
        padding: 0.05rem 0.25rem;
        font-size: .23rem;
      }
      .old-customer-text{
        font-size: .17rem;
        font-weight: 600;
        margin: 0.13rem auto;
      }
      .book-btn{
        border-radius: 1rem;
        background-color: #ff9600;
        width: 1.5rem;
        height: 0.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .23rem;
        color: #FFFFFF;
        margin-bottom: .2rem;
      }
      .fix-btn{
        border-radius: 1rem;
        background-color: #ff9600;
        width: 1.5rem;
        height: 0.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .23rem;
        color: #FFFFFF;
        margin: .2rem auto;
      }
    }
  }
}

//曝光商品
.sku-bg {
  /* background-color: #de300b; */
  width: 7.5rem;
  margin: .5rem auto 0.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border-radius: 0.1rem; */
  /* border-bottom: 0.1rem solid #ffc50b; */

  .sku-bg-title {
    background: url("./assets/act3.png") no-repeat;
    background-size: 100%;
    width: 1.71rem;
    height: 0.45rem;
  }

  .sku-area {
    width: 96%;
    margin: 0.1rem auto 0.3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    .sku-item {
      background: url("./assets/act3-item.png") no-repeat;
      background-size: 100%;
      width: 2.4rem;
      height: 2.61rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: .2rem;
      font-weight: 600;
      color: #54320b;

      > img {
        width: 82%;
        height: 1.5rem;
        margin-top: 0.2rem;
        border-radius: .1rem;
      }

      .sku-top {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        word-break: break-all;
        width: 80%;
        margin-top: .05rem;
      }

      .sku-btn {
        width: 1.5rem;
        height: 0.3rem;
        border-radius: 1rem;
        background-image: linear-gradient(90deg, #875115, #5e390f);
        border: none;
        color: #f7e6cf;
        margin-top: 0.03rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
// 查看更多
.see-more{
  background: url("./assets/more.png") no-repeat;
  background-size: 100%;
  width: 4.25rem;
  height: 0.94rem;
  margin-bottom: 1rem;
}

//.wrapper {
//  display: flex;
//  align-items: center;
//  justify-content: center;
//  height: 100%;
//  width: 7.5rem;
//}

</style>
