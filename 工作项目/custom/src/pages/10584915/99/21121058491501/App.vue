<template>
  <div class="telunsu">
    <div class="coupon">
      <div v-for="(item,index) in couponArr" :key="index">
        <img :src="item.img" style="width: 5.6rem"/>
      </div>
    </div>
    <div class="btn" @click="getCoupon()"></div>
    <a href="https://pro.m.jd.com/mall/active/FggFtYUfhekbk18idBJny5RXJLT/index.html">
      <div class="detail"></div>
    </a>
  </div>
</template>

<script lang='ts' setup>
import {
  ref, inject, reactive, Ref, onMounted,
} from 'vue';
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

import coupon1 from './assets/coupon_1.png';
import coupon2 from './assets/coupon_2.png';
import coupon3 from './assets/coupon_3.png';
import coupon4 from './assets/coupon_4.png';

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 是否开卡表示是否注册
const openCard: boolean = inject('isOpenCard') as boolean;
// 获取基本信息
const {
  activityId, pin, venderId,
} = baseInfo;

const couponArr = [
  {
    img: coupon1,
    url: 'https://coupon.m.jd.com/coupons/show.action?linkKey=AAROH_xIpeffAs_-naABEFoesAtNlLGC_HixzlyH6S3l5z1D0UiwdVQ2NTyX2dpokIWCByZm9bLse-waey0fUB2KPx2rIw',
  }, {
    img: coupon2,
    url: 'https://coupon.m.jd.com/coupons/show.action?linkKey=AAROH_xIpeffAs_-naABEFoebqYrbdeRv9Z-Y1fY6XGbqaWFvKp7ZUAMjGaqRqX7D6NaAVI98RJwt4KW8d1s8KB9v_jDVw',
  }, {
    img: coupon3,
    url: 'https://coupon.m.jd.com/coupons/show.action?linkKey=AAROH_xIpeffAs_-naABEFoeZVCWKFhTICx85ZbaTVxzBRsQcz8vg7Vw-vVDEWeKmNLRWtv8vtr21kXAuj9_U1SoWY4syQ',
  }, {
    img: coupon4,
    url: 'https://coupon.m.jd.com/coupons/show.action?linkKey=AAROH_xIpeffAs_-naABEFoeooZjl9Hmd17hwTfqrTod0VnIaN1wujjPQQNuog_ucn7mPSxyU6Uot9_p2HNaCA3HrEUbtg',
  },
];

// 埋点
const pageTrackLogCommon = (elementId: string) => {
  cjwxRequest.post('/crm/pageVisit/insertCrmPageVisit', {
    venderId,
    elementId,
    pageId: activityId,
  }).then((res) => {
    console.log('埋点 --> 用户点击领取按钮');
  });
};

// 领取优惠券按钮
const getCoupon = () => {
  pageTrackLogCommon('tlsNewCoupon');
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest
    .post('/deluxe/openGift/receive', {
      activityId,
    })
    .then((res) => {
      if (res.success) {
        Toast(`领取成功${res.data}张，请到京东APP-我的-优惠券查看`);
        console.log(res);
      } else {
        Toast(res.msg);
      }
    });
};

// 去开卡
const gotoOpenCard = () => {
  const returnUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=10584915&shopId=10370169&venderType=5&channel=7016&returnUrl=${returnUrl}`;
};

onMounted(() => {
  if (!openCard) {
    gotoOpenCard();
  }
});
</script>

<style lang='scss'>
html {
  max-width: 750px;
  margin: 0 auto;
  background: #24129c;
}

.van-toast {
  background-color: rgba(0, 0, 0, 0.7);
  flex-wrap: nowrap;
  min-width: max-content;
}

.telunsu {
  width: 100%;
  height: 15.81rem;
  padding: 3.3rem 1rem 6rem;
  box-sizing: border-box;
  background: {
    image: url("./assets/background1.png");
    repeat: no-repeat;
    size: 100% 100%;
  };

  .coupon {
    margin-top: .4rem;
    text-align: center;
  }

  .btn {
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    margin: 0 auto;
  }

  .detail {
    width: 3rem;
    height: 1rem;
    margin: 0 auto;
  }
}

</style>
