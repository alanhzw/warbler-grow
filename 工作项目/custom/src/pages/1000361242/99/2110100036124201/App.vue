<template>
  <div class="qqstar">
    <!-- banner -->
    <img src="./assets/banner.png"
         class="background" />
    <!-- 活动规则按钮 -->
    <div class="act-rule-btn"
         @click="overlayRule = true"></div>
    <!-- 我的奖品按钮 -->
    <div class="act-prize-btn"
         @click="overlayMyGift = true"></div>
    <!-- 立即开卡按钮 -->
    <div class="act-opencard-btn"
         @click="gotoOpenCard"></div>
    <!-- 尊享优惠券98 -->
    <div class="act-coupon98">
      <img :src="coupon1ImgUrl"
           alt="">
      <div class="coupon-btn"
           @click="goto98Coupon()"></div>

    </div>
    <!-- 尊享优惠券10 -->
    <!-- <div class="act-coupon10"> -->
    <!-- <img :src="coupon2ImgUrl"
           alt=""> -->
    <!-- <div class="coupon-btn"
           @click="!openCard? Toast('优惠券为会员专属券，加入会员再来领取吧') : goto98Coupon()"></div>
    </div> -->
    <!-- 立即报名按钮 -->
    <div class="act-enter-btn">
      <img src="./assets/enter.png"
           alt=""
           @click="queryMember"
           v-if="applyFlag == 1" />
      <img src="./assets/success.png"
           alt=""
           @click="queryMember"
           v-else />
    </div>
    <!-- 立即参与按钮 -->
    <div class="act-parti-btn"
         @click="gotoJoin">
      <!-- <img :src="joinImgUrl"
           alt=""> -->
    </div>
    <!-- 进店逛逛按钮 -->
    <!-- <div class="act-store-btn"
         @click="gotoStore"></div> -->
  </div>
  <!-- 规则弹窗 -->
  <van-popup v-model:show="overlayRule">
    <div class="rule">
      <div v-html="rule"
           class="rule-text"></div>
      <div class="close-rule"
           @click="overlayRule = false"></div>
    </div>
  </van-popup>
  <!-- 我的奖品弹窗 -->
  <van-popup v-model:show="overlayMyGift">
    <div class="mygift">
      <div class="mygift-list"
           v-if="myGifts.length != 0">
        <div v-for="(item, index) in myGifts"
             class="myGiftItem"
             :key="index">
          <div class="mygift-text">
            <p>{{ item.giftName }}</p>
            <p>{{ item.ip }}</p>
            <p v-if="item.sendResult == 'y'">发放成功</p>
            <p v-if="item.sendResult == 'n'">发放失败</p>
            <p v-if="item.sendResult == 'z'">未发放</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="gift-null">暂无数据</p>
      </div>
      <div class="close-mygift"
           @click="overlayMyGift = false"></div>
    </div>
  </van-popup>
  <!-- 入会弹窗 -->
  <van-popup v-model:show="overlayOpenCard"
             :close-on-click-overlay="false">
    <div>
      <img src="./assets/isMember.png"
           alt
           class="open-card-dialog" />
      <div class="opencard-activite"
           @click="gotoOpenCard"></div>
      <div class="close-opencard"
           @click="overlayOpenCard = false"></div>
    </div>
  </van-popup>
</template>

<script lang='ts' setup>
import {
  ref, inject, reactive, Ref,
} from 'vue';
import {
  Toast,
  Overlay as vanOverlay,
  Popup as vanPopup,
  Area as vanArea,
} from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 是否开卡表示是否注册
const openCard: boolean = inject('isOpenCard') as boolean;
// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;
const overlayOpenCard = ref(false);
const overlayGift = ref(false);
const overlayRule = ref(false);
const overlayMyGift = ref(false);
const coupon1ImgUrl = ref('');
const coupon2ImgUrl = ref('');
const joinImgUrl = ref('');
const coupon1Link = ref('');
const coupon2Link = ref('');
const joinLink = ref('');
const applyFlag = ref(1);
const rule = ref('');
// const activitDetail = ref({})
const myGifts: Ref<{ giftName: string; ip: string; sendResult: string;}[]> = ref([]);
const getActivityContent = () => {
  cjwxRequest.post('/qqstar/firstPurchase/activityContent', {
    activityId,
    pin,
  }).then((data) => {
    Toast.clear();
    if (data.result) {
      // activitDetail.value = data.data;
      myGifts.value = data.data.myGifts;
      applyFlag.value = data.data.userRecord.applyFlag;
      coupon1ImgUrl.value = data.data.activityDto.activityUrl;
      coupon1Link.value = data.data.activityDto.transferUrl1;
      coupon2ImgUrl.value = data.data.activityDto.transferUrl2;
      coupon2Link.value = data.data.activityDto.transferUrl3;
      joinImgUrl.value = data.data.activityDto.shareTitle;
      joinLink.value = data.data.activityDto.shareContent;
    } else {
      Toast(data.errorMessage);
    }
  });
};
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
const queryMember = () => {
  if (!openCard) {
    overlayOpenCard.value = true;
  }
  cjwxRequest
    .post('/qqstar/firstPurchase/applyGift', {
      activityId,
      pin,
      venderId,
    })
    .then((res) => {
      if (res.data) {
        applyFlag.value = 0;
      } else if (res.errorMessage !== '非会员不能参与活动') {
        Toast(res.errorMessage);
      }
    });
};
// 去开卡
const gotoOpenCard = () => {
  const returnUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=1000361242&shopId=1000361242&venderType=1&channel=7983&sceneval=2&jxsid=163091708617368326146&returnUrl=${returnUrl}`;
};
// 去领卷98
const goto98Coupon = () => {
  const getCouponLink = coupon1Link.value;
  window.location.href = getCouponLink;
};
// 去领卷10
const goto10Coupon = () => {
  const getCouponLink = coupon2Link.value;
  window.location.href = getCouponLink;
};
// 跳转下单抽奖页面
const gotoJoin = () => {
  const getCouponLink = joinLink.value;
  window.location.href = getCouponLink;
};
// 进店逛逛
const gotoStore = () => {
  const getCouponLink = 'https://shop.m.jd.com/?shopId=1000361242&utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=CopyURL&ad_od=share&gx=RnFmxDYPOzHdztRP--twC6WW5HcE9cjh32i8';
  window.location.href = getCouponLink;
};
getActivityInfo();
getActivityContent();
</script>

<style lang='scss'>
html {
  max-width: 750px;
  margin: 0 auto;
  background: #1c1d1c;
}
.van-toast {
  background-color: rgba(0, 0, 0, 0.7);
  flex-wrap: nowrap;
  min-width: max-content;
}
.qqstar {
  text-align: center;
  position: relative;
  .background {
    width: 100%;
  }
  .act-rule-btn {
    position: absolute;
    top: 1.5rem;
    right: 0;
    width: 1.5rem;
    height: 0.4rem;
  }

  .act-prize-btn {
    position: absolute;
    top: 2rem;
    right: 0;
    width: 1.5rem;
    height: 0.4rem;
  }
  .act-opencard-btn {
    width: 3.8rem;
    height: 0.5rem;
    position: absolute;
    top: 9.7rem;
    left: 2rem;
  }
  .act-coupon98 {
    position: absolute;
    top: 11.8rem;
    left: 0.55rem;
    width: 6.4rem;
    height: 1.4rem;
    img {
      width: 100%;
      height: 100%;
    }
    .coupon-btn {
      width: 2rem;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .act-coupon10 {
    position: absolute;
    top: 11.9rem;
    left: 0.55rem;
    width: 6.4rem;
    height: 1.4rem;
    img {
      width: 100%;
      height: 100%;
    }
    .coupon-btn {
      width: 2rem;
      height: 100%;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  .act-enter-btn {
    position: absolute;
    top: 17.9rem;
    left: 50%;
    transform: translate(-50%);
     width: 2.3rem;
      height: 0.6rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .act-parti-btn {
    position: absolute;
    top: 25.2rem;
    left: 2.85rem;
    width: 1.76rem;
    height: 1.7rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .act-store-btn {
    position: absolute;
    top: 33.3rem;
    right: 0.2rem;
    width: 1.5rem;
    height: 1.55rem;
  }
}
.rule {
  background: url(./assets/rule-dialog.jpg) no-repeat;
  background-size: 100%;
  position: relative;
  margin: auto;
  width: 6.4rem;
  height: 7.5rem;
  box-sizing: border-box;
  padding: 1.9rem 0.7rem 0.3rem 0.7rem;

  .rule-text {
    overflow-y: scroll;
    height:4.5rem;
    font-size: 0.26rem;
    color: #ffffff;
  }
}

.close-rule,
.close-mygift,
.close-opencard {
  position: absolute;
  bottom: 0;
  left: 1.3rem;
  width: 3.5rem;
  height: 1rem;
  overflow: auto;
  word-break: break-all;
}
.mygift {
  background: url(./assets/prize-dialog.jpg) no-repeat;
  background-size: 100%;
  position: relative;
  margin: auto;
  width: 6.5rem;
  height: 7.5rem;

  .mygift-list {
    width: 4.9rem;
    height: 4rem;
    margin: 0 auto;
    padding-top: 2.5rem;
    padding-left: 0.5rem;
    .myGiftItem {
      padding-top: 0.2rem;
    }
    .mygift-text {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      p {
        color: #f6faf3f8;
        font-size: 0.14rem;
        text-align: center;
      }
      :first-child {
        position: absolute;
        left: 0.2rem;
        top: 0;
      }
      :nth-child(2) {
        position: absolute;
        left: 1.45rem;
        top: 0.04rem;
      }
      :nth-child(3) {
        position: absolute;
        left: 3.3rem;
        top: 0;
      }
    }
  }
  .gift-null {
    position: absolute;
    top: 3rem;
    left: 2.6rem;
    color: #ffffff;
  }
}
.open-card-dialog {
  position: relative;
  margin: auto;
  width: 6.5rem;
  height: 7.5rem;
}
.opencard-activite {
  position: absolute;
  bottom: 2.65rem;
  left: 2.3rem;
  width: 1.55rem;
  height: 0.38rem;
}
</style>
