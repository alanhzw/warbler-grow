<template>
    <div class="main">
      <img @click='getCoupon' class="coupon" src="./assets/coupon.png">
      <div class="shop_btn" @click='goToShop'></div>
    </div>

    <!-- 入会弹窗 -->
    <van-popup class="poupon" v-model:show="openCardPopup">
      <div class="openCardBox">
        <!-- 开卡按钮 -->
        <div class="openCard_btn" @click='goToOpenCard'></div>
      </div>
    </van-popup>
</template>

<script lang='ts' setup>
import {
  ref, inject,
} from 'vue';
import { Popup as VanPopup, Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;

// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;

// 设置页面title
document.title = actName;

// 开卡弹窗
const openCardPopup = ref(false);
// 是否开卡
const isOpenCarded = inject('isOpenCard');
if (isOpenCarded) {
// eslint-disable-next-line no-irregular-whitespace
} else if (process.env.NODE_ENV === 'development') {
  openCardPopup.value = true;
} else {
  openCardPopup.value = true;
}

// 领取优惠券
const getCoupon = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/sanyuan/noperfection/draw', { activityId, pin }).then((res) => {
    Toast(res.errorMessage);
  }).finally(() => {
    Toast.clear();
  });
};

// 店铺首页
const goToShop = () => {
  window.location.href = `https://shop.m.jd.com/?shopId=${venderId}`;
};

// 开卡链接
const goToOpenCard = () => {
  window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=1000014603&shopId=1000014603&venderType=1&channel=7001&returnUrl=${window.location.href}`;
};

</script>

<style lang='scss'>
  html{
    background: #649ee5;
  }
 .poupon {
    background-color:unset !important;
  }

.main{
  width: 7.5rem;
  height: 15.03rem;
  background:url(./assets/bg.png) no-repeat;
  background-size: contain;
  margin: 0 auto;
  .coupon{
    padding-top: 5.8rem;
    display: block;
    width: 6.16rem;
    height: 1.3rem;
    margin:0 auto ;
  }
  .shop_btn{
    width: 3.5rem;
    height: 1rem;
    margin: 5.5rem auto 0;
  }
}
.openCardBox{
  width: 6.9rem;
  height: 9rem;
  background:url(./assets/opencard.png) no-repeat;
  background-size: contain;
  position: relative;
  .openCard_btn{
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    height: 1.5rem;
    width: 5rem;
}
}
</style>
