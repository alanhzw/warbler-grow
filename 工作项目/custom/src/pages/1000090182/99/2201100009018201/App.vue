<template>
  <!--  kv部分-->
  <div class="main-kv" @click="pageTrackLogCommon('模块1')"></div>
<!--  入会按钮-->
  <div class="member-btn" @click="toOpen" :class="{'opened': isOpenCarded}"></div>
<!--  活动说明栏-->
  <div class="info-Area bg-color">
    <div>
      <div style="font-size: .5rem">50积分兑换虎年红包封面</div>
      <div class="red-bar"></div>
    </div>
    <div class="info-Area-time">兑换时间：2022/1/19 00:00 - 2022/2/28 23:59</div>
  </div>
<!--  我的会员、兑换详情-->
  <div class="info-btn-group">
    <div class="info-btn bg-color" @click="openlevelBtn();pageTrackLogCommon('模块2')">我的会员></div>
    <div class="info-btn bg-color" @click="openWindow('prizeWin');pageTrackLogCommon('模块3')">兑换详情></div>
  </div>
<!--  兑换红包-->
  <div class="get-prize-view" @click="pageTrackLogCommon('模块4')">
    <div v-if="isOpenCarded" class="prizeStatus" :class="`prizeStatus${receiveStatus}`" @click="getPrize"></div>
    <div v-else class="prizeStatus prizeStatus4"></div>
  </div>
<!--  兑换说明-->
  <div class="exchange-Info bg-color" @click="pageTrackLogCommon('模块5')">
<!--    <div>-->
<!--      <div style="font-size: .5rem">红包封面兑换说明</div>-->
<!--      <div class="red-bar"></div>-->
<!--    </div>-->
<!--    <div class="exchange-Info-text">-->
<!--      <p>每人限参与领取1次，填写信息后可获得虎年封面红包兑换码1份，每个兑换码仅可-->
<!--      兑换1次，请领取后1周内按照流程进行兑换。若因信息未填、填写错误、自行分享、-->
<!--      超期未兑等用户原因导致奖品作废，不予补发。-->
<!--      </p>-->
<!--      <p>-->
<!--        红包兑换流程：用户需更新手机微信至最新版本，打开发红包界面，前往“红包封-->
<!--      面”-“添加红包封面”，输入有效领取序列号即可领取红包封面。详情请咨询客服。-->
<!--      </p>-->
<!--    </div>-->
  </div>
<!--  活动规则-->
  <div class="rule-Info bg-color" @click="pageTrackLogCommon('模块6')">
    <div>
      <div style="font-size: .5rem">活动规则</div>
      <div class="red-bar"></div>
    </div>
    <div class="rule-Info-bg">
      <div class="rule-Info-text">
        <div v-html="rule"></div>
      </div>
    </div>
  </div>
<!--  店铺热卖-->
  <div class="hotSell bg-color">
    <div>
      <div style="font-size: .5rem">店铺热卖</div>
      <div class="red-bar"></div>
    </div>
  </div>
  <div class="sku-area">
    <div class="sku-item" v-for="item in goodsList" :key="item.sku" @click="pageTrackLogCommon(item.track)">
      <img :src="item.pic"/>
      <div class="sku-name">{{item.name}}</div>
      <div class="sku-btn" @click="gotoSkuPage(item.sku)"></div>
    </div>
  </div>
<!--  返回顶部-->
  <div class="scroll-top bg-color" @click="scrollTop();pageTrackLogCommon('模块11')">
    返回顶部<span></span>
  </div>
  <!--  弹窗组件-->
  <Popup class="popup" v-model:show="maskShow" :close-on-click-overlay="false">
    <div class="wrapper-page">
      <level-win :levelInfo="levelInfo" @closeWin="closeWindow" v-if="windowName === 'levelWin'"></level-win>
      <prize-window :myPrize="prizeList" @closeWin="closeWindow" v-if="windowName === 'prizeWin'"></prize-window>
      <fix-info-window @commitInfo="receivePrize" @closeFix="closeWindow" v-if="windowName === 'fixInfoWin'"></fix-info-window>
      <no-qualify @closeWin="closeWindow" v-if="windowName === 'noQWin'"></no-qualify>
      <coupon-win :couponId="giftId" @closeWin="closeWindow" v-if="windowName === 'couponWin'"></coupon-win>
    </div>
  </Popup>

</template>

<script lang='ts' setup>
import { computed, inject, nextTick, reactive, Ref, ref } from 'vue';
import { CountDown, Popup, Toast } from 'vant';
import Swiper, { Autoplay } from 'swiper';
import dayjs from 'dayjs';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { callShare, gotoShopPage, gotoSkuPage } from '@/utils';
import { reportClick } from '@/utils/trackEvent/jdReport';
import LevelWin from './components/levelWindow';
import PrizeWindow from './components/prizeWindow.vue';
import FixInfoWindow from './components/fixInfoWindow.vue';
import NoQualify from './components/noqualifications';
import CouponWin from './components/couponIdWin';
import './assets/css/style.scss';
import sku01 from './assets/sku01.png';
import sku02 from './assets/sku02.png';
import sku03 from './assets/sku03.png';
import sku04 from './assets/sku04.png';

// 分享渠道
const shareChannel = ['Wxfriends', 'Wxmoments', 'Sinaweibo', 'QQfriends', 'QQzone'];
// 弹窗遮罩
const maskShow = ref(false);
// 弹窗名称
const windowName = ref('');
// 规则
const rule = ref('');
// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const { activityId, venderId, shopId, endTime, pin, actName } = baseInfo;
// 设置页面title
document.title = actName;
// 是否开卡表示是否注册
// const isOpenCarded: boolean = inject('isOpenCard') as boolean;
// const isOpenCarded = false;
const isOpenCarded = ref(false);
// 完善信息内容
const formData = ref({
  // giftRecordId: '',
  receiver: '',
  phone: '',
});
// 等级信息
const levelInfo = ref({
  level: 0,
  points: 0,
});
// 领取状态
const receiveStatus = ref(0);
// 兑换记录
const prizeList = ref([]);
// 兑换码
const giftId = ref('');
// 曝光商品列表
const goodsList = ref([
  {
    pic: sku01, // 商品图
    name: '氨糖软骨素绿瓶120粒',
    sku: 2788733, // 商品sku
    track: '模块7',
  },
  {
    pic: sku02,
    name: 'neuriva脑动力plus30粒',
    sku: 100015981998,
    track: '模块8',
  },
  {
    pic: sku03,
    name: '深海南极磷虾油120粒',
    sku: 5909815,
    track: '模块9',
  },
  {
    pic: sku04,
    name: '超级液体钙镁片90粒',
    sku: 100007991171,
    track: '模块10',
  },
]);
// 滚动的到顶部
const scrollTop = () => {
  const timer = setInterval(() => {
    const osTop = document.documentElement.scrollTop || document.body.scrollTop;
    const ispeed = Math.floor(-osTop / 5);
    // eslint-disable-next-line no-multi-assign
    document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
    if (osTop === 0) {
      clearInterval(timer);
    }
  }, 30);
};
// 埋点
const pageTrackLogCommon = (elementId: string) => {
  cjwxRequest.post('/crm/pageVisit/insertCrmPageVisit', {
    venderId,
    elementId,
    pageId: activityId,
    pin,
  });
};
// 开启弹窗
const openWindow = (name: string) => {
  windowName.value = name;
  maskShow.value = true;
};
// 关闭弹窗
const closeWindow = () => {
  maskShow.value = false;
};
// 时间戳转YYYY-MM-DD
const getLocalTime = (r: string) => {
  const year = String(new Date(r).getFullYear());
  const month = String(new Date(r).getMonth() + 1);
  const date = String(new Date(r).getDate());
  const hour = String(new Date(r).getHours());
  let minute = String(new Date(r).getMinutes());
  if (minute.length === 1) {
    minute = `0${minute}`;
  }
  return `${year}-${month}-${date}`;
};
const openlevelBtn = () => {
  if (isOpenCarded.value) {
    openWindow('levelWin');
  } else {
    Toast('请先入会');
  }
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
// 跳转开卡
const toOpen = () => {
  if (isOpenCarded.value) return;
  const returnUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000090182&channel=7010&returnUrl=${returnUrl}`;
};
// 活动信息
const actContent = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wx/moveFree/forRedEnvelope/activityContent', {
    activityId,
    pin,
  }).then((res) => {
    if (res.result) {
      levelInfo.value.level = res.data.levelName;
      levelInfo.value.points = res.data.points;
      receiveStatus.value = res.data.status;
      if (receiveStatus.value === 1) {
        prizeList.value = [{
          giftName: res.data.detail.urlKey,
          exchangeTime: getLocalTime(res.data.detail.drawTime),
        }];
        console.log(prizeList.value);
      }
    }
  });
};
// 获取奖品
const receivePrize = (infoData) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/wx/moveFree/forRedEnvelope/redeem', {
    activityId,
    pin,
    phone: infoData.value.phone,
    nickPin: infoData.value.receiver,
  }).then((res) => {
    if (res.result) {
      actContent();
      giftId.value = res.data.urlKey;
      openWindow('couponWin');
    } else {
      Toast(res.errorMessage);
    }
    Toast.clear();
  });
};
// 点击领取
const getPrize = () => {
  if (receiveStatus.value === 2) {
    // receivePrize();
    openWindow('fixInfoWin');
  } else if (receiveStatus.value === 0) {
    openWindow('noQWin');
  }
};
// 开卡状态
const checkOpenStatus = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/crmCard/common/coupon/getOpenCardStatusWithOutSelf', {
    venderId,
    activityId,
  }).then((res) => {
    isOpenCarded.value = res.openCard;
    actContent();
  });
};
// 后端记录状态
const recordUser = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wx/moveFree/forRedEnvelope/saveMoveFreeActor', {
    activityId,
    pin,
  }).then(() => {
    checkOpenStatus();
    // actContent();
  });
};
getActivityInfo();
recordUser();
// actContent();
// getSkuList();
</script>

<style lang='scss'></style>
