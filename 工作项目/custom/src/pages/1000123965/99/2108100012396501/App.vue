<template>
  <div class="index">
    <img src="//img10.360buyimg.com/imgzone/jfs/t1/189315/35/20028/1960754/612734f7E57e4cceb/27f84cc7bafef5eb.png" alt="" class="index-img">
    <div class="show-rule" @click="overlayRule = true"></div>
    <div class="my-gift"  @click="overlayMyGift = true"></div>
    <div class="amount-spent">
      <span>已消费{{ ordAmt }}元</span>
      <span>还差{{ difference(ordAmt) }}元</span>
    </div>
    <div class="invite-button">
      <div @click="share"></div>
      <div @click="gotoShopButton"></div>
    </div>
    <div class="receive">
      <div class="receive-button" v-for="item,index in giftList.values" :key="index">
        <img src="//img10.360buyimg.com/imgzone/jfs/t1/180012/37/21008/7825/612734f4E493124e4/78cd781219799a17.png" alt="" v-if="item.buttonStatus === 0" @click="convertPrize(item.id)">
        <img src="//img10.360buyimg.com/imgzone/jfs/t1/191519/27/19973/6642/612734f5E76edbed3/8c73489ab95f5dbb.png" alt="" v-else-if="item.buttonStatus === 1" class="receive-button-gray">
        <img src="//img10.360buyimg.com/imgzone/jfs/t1/191285/14/19960/6565/612734f5E6db16534/d303f6808854d24a.png" alt="" v-else class="receive-button-gray">
      </div>
    </div>
    <div class="invitation-record" @click="overlayRecord = true"></div>
    <div class="sku-list">
      <div class="sku-list-button" v-for="item in skuLists" :key="item" @click="goSkuPage(item)"></div>
    </div>
    <div class="go-shop" @click="gotoShop"></div>
  </div>
<!-- 规则弹窗 -->
  <van-popup v-model:show="overlayRule">
    <div class="rule">
      <div class="close-rule" @click="overlayRule = false"></div>
      <div v-html="rule" class="rule-text"></div>
    </div>
  </van-popup>
<!-- 我的奖品弹窗 -->
  <van-popup v-model:show="overlayMyGift">
    <div class="mygift">
      <div class="close-mygift" @click="overlayMyGift = false"></div>
      <div class="mygift-list">
        <div class="mygift-list-gift" v-for="item,index in myGifts.values" :key="index">
          <img :src="item.showImage" alt="" class="mygift-img">
          <div class="mygift-text">
            <p>{{ item.giftName }}</p>
            <p>{{ item.exchangeTime }}</p>
          </div>
          <!-- <div class="mygift-button">待领取</div> -->
          <div class="mygift-button" style="background: none;color: #666;">已领取</div>
        </div>
        <div class="more">
          没有更多了...
        </div>
        <!-- <div class="mygift-empty">
          没有更多了...
        </div> -->
      </div>
    </div>
  </van-popup>
  <!-- 邀请记录弹窗 -->
  <van-popup v-model:show="overlayRecord">
    <div class="record">
      <div class="close-record" @click="overlayRecord = false"></div>
      <div class="record-list">
        <div class="record-list-tr" v-for="item,index in assistantFriends.values" :key="index">
          <div style="width: 1.35rem;">{{ item.userName }}</div>
          <div style="width: 1.35rem;">{{ item.openCardTimeStr }}</div>
          <div style="width: 1.4rem;">是</div>
          <div style="width: 1.55rem;">{{ item.ordAmt }}</div>
        </div>
        <div class="mygift-empty"  v-if="assistantFriends.values.length == ''">
          暂时还没有邀请到好友
        </div>
      </div>
    </div>
  </van-popup>
  <!-- 入会弹窗 -->
  <van-popup v-model:show="overlayOpenCard" :close-on-click-overlay="false">
    <div>
      <img src="//img10.360buyimg.com/imgzone/jfs/t1/6989/17/9456/310120/612734f5E1f0c8379/f7e0fa689de76b95.png" alt="" class="open-card-img" @click="gotoOpenCard">
    </div>
  </van-popup>
  <!-- 优惠券弹窗 -->
  <van-popup v-model:show="overlayCoupon">
    <div>
      <img src="//img10.360buyimg.com/imgzone/jfs/t1/203917/40/3173/229246/612734f4Edbb4221f/75590ef06014594c.png" alt="" class="coupon-img">
      <div class="coupon-button" @click="convertPrize(couponId)"></div>
      <div class="close-coupon" @click="overlayCoupon = false"></div>
    </div>
  </van-popup>
    <!-- 获奖弹窗 -->
  <van-popup v-model:show="overlayGift">
    <div>
      <img src="//img10.360buyimg.com/imgzone/jfs/t1/184124/2/21258/138180/612734f5E3928d7d0/b1697bf06a1fb8aa.png" alt="" class="gift-img">
      <div class="gift-name">恭喜您获得{{ giftName }}</div>
      <div class="close-gift" @click="overlayGift = false"></div>
    </div>
  </van-popup>
</template>

<script lang='ts' setup>
import {
  ref, inject, reactive,
} from 'vue';
// import Vue from 'vue';
import {
  Toast,
  Overlay as vanOverlay,
  Popup as vanPopup,
} from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import JD from '@/utils/platforms';
import './css/index.css';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const openCard: boolean = inject('isOpenCard') as boolean;

// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;

// 设置页面title
document.title = actName;

const overlayOpenCard = ref(false);
const overlayCoupon = ref(false);
const overlayGift = ref(false);
const overlayRule = ref(false);
const overlayMyGift = ref(false);
const overlayRecord = ref(false);
const rule = ref('');
const receive = 3;
const giftList = reactive([]);
const couponId = ref('');
const identity = 0;
const ordAmt = ref(0);
const assistantFriends = reactive([]);
const myGifts = reactive([]);
const giftName = ref('');
const skuLists = [5310973, 5310975, 7680076, 7680098, 100002553703, 100003921234];

const myUuid = ref('');
let inviterUuid = '';
let isPerfectionmsgs = false;

// 获取地址栏邀请人Uuid
const getUrlData = (name: string) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return '';
};
inviterUuid = getUrlData('helpUuid');

// 主接口 获取规则;
const getActivityInfo = () => {
  cjwxRequest
    .get(`/common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`)
    .then((res) => {
      if (res.data) {
        const rules = res.data.rule.split('\n');
        rule.value = rules.join('<br/>');
      }
    });
};

// 主接口 活动内容信息
const getActivityContent = () => {
  cjwxRequest.post('/sanyuan/inviteOrder/activityContent', {
    activityId: baseInfo.activityId,
    pin: baseInfo.pin,
    inviterUuid,
  }).then((data) => {
    if (data.result) {
      myUuid.value = data.data.userRecord.uuid;
      ordAmt.value = data.data.userRecord.ordAmt;
      assistantFriends.values = data.data.assistantFriends;
      giftList.values = data.data.giftList.filter((item: any) => item.showAreaCode === '1');
      couponId.value = data.data.giftList.filter((item: any) => item.showAreaCode === '2')[0].id;
      myGifts.values = data.data.myGifts;
      isPerfectionmsgs = data.data.isPerfectionmsgs;
      console.log(myGifts.values);
      if (data.data.userRecord.assistStatus === 1) {
        Toast('助力成功！');
      } else if (data.data.userRecord.assistStatus === 5) {
        Toast('老会员无法助力！');
      }
      if (data.data.userRecord.openCardStatus === 0) {
        overlayOpenCard.value = true;
        return;
      }
      if (data.data.isFriendCoupon) {
        overlayCoupon.value = true;
      }
    } else {
      Toast(data.errorMessage);
    }
  });
};

const difference = (amt: number) => {
  let i = 99 - amt;
  if (i < 0) {
    i = 0;
  }
  return Math.round(i * 100) / 100;
};

const gotoOpenCard = () => {
  const returnUrl = encodeURIComponent(window.location.href);
  if (inviterUuid === '') {
    window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000123965&shopId=1000123965&venderType=1&channel=7008&returnUrl=${returnUrl}`;
  } else {
    window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000123965&shopId=1000123965&venderType=1&channel=7009&returnUrl=${returnUrl}`;
  }
};

const goLink = (couponIdNum: string) => {
  cjwxRequest.post('/crmCard/wyethCouponPoint/drawCouponWithoutPoint', {
    pin: baseInfo.pin,
    venderId: baseInfo.venderId,
    couponId: couponIdNum,
  }).then((data) => {
    if (data.status) {
      if (!data.sendFlg) {
        window.location.href = data.coupon.urlLink;
      } else {
        Toast('领取成功！');
        getActivityContent();
      }
    } else {
      Toast(data.msg);
    }
  });
};

const convertPrize = (giftId: string) => {
  cjwxRequest.post('/sanyuan/inviteOrder/convertPrize', {
    activityId: baseInfo.activityId,
    giftId,
    uuid: myUuid.value,
    pin: baseInfo.pin,
  }).then((data) => {
    if (data.result) {
      getActivityContent();
      if (data.data.type === 8) {
        giftName.value = data.data.giftName;
        overlayGift.value = true;
      } else {
        overlayCoupon.value = false;
        Toast('领取成功！');
      }
    } else {
      Toast(data.errorMessage);
    }
  });
};

const goSkuPage = (skuId: number) => {
  window.location.href = `https://item.m.jd.com/product/${skuId}.html`;
};

const gotoShop = () => {
  window.location.href = `https://shop.m.jd.com/?shopId=${baseInfo.venderId}`;
};

const gotoShopButton = () => {
  if (isPerfectionmsgs) {
    Toast('请填写信息！');
    setTimeout(() => {
      window.location.href = `https://${window.location.host}/sanyuan/common/saveUserInfo?activityId=2108100012396501`;
    }, 2000);
  } else {
    gotoShop();
  }
};

const shareCMD = () => {
  JD.shareWithCmdword({
    type: '2',
    title: '帮我点一下，一起领豪礼',
    shareUrl: `https://${window.location.host + window.location.pathname}?helpUuid=${myUuid.value}`,
  });
};

const share = () => {
  if (isPerfectionmsgs) {
    Toast('请填写信息！');
    setTimeout(() => {
      window.location.href = `https://${window.location.host}/sanyuan/common/saveUserInfo?activityId=2108100012396501`;
    }, 2000);
    return;
  }
  if (difference(ordAmt.value) === 0) {
    shareCMD();
  } else {
    Toast('您的消费金额不满足99元，请前往下单！');
  }
  console.log(ordAmt.value);
};

getActivityInfo();
getActivityContent();
</script>

<style lang='scss'>
</style>
