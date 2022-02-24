<template>
  <div :class="num"
       v-cloak>
    <div class="collect"
         @click="getCoupon"></div>
    <div class="go-shop"
         @click="gotoShopPage('1000077433')"></div>
    <span class="hover-icon"
          @click="tracking"></span>
  </div>
</template>

<script lang='ts' setup>
import {
  ref, inject, onMounted, Ref, computed,
} from 'vue';
import { Popup, Toast, Overlay } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import shareWithCmdword, { gotoShopPage } from '@/utils/platforms';
// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 获取活动id
const activityId = ref<string>(baseInfo.activityId);
// 获取店铺ID
const venderId = ref<string>(baseInfo.venderId);
// 用户Pin
const userPin = ref<string>(baseInfo.pin);
// 是否开卡表示是否注册
const isOpenCarded: boolean = inject('isOpenCard') as boolean;
// const isOpenCarded = true;
// 页面号
const pageNum = ref('');
// class号
const num = ref('');
// 规则
const rule = ref('');
// 动态页更换
const changePage = () => {
  if (pageNum.value === '98') {
    num.value = 'page98';
  } else if (pageNum.value === '198') {
    num.value = 'page198';
  }
};
function tracking() {
  window.location.href = 'https://lzkj-isv.isvjcloud.com/wxAssemblePage/largeSign';
}
// 开卡状态
const getOpenStatus = () => {
  if (!isOpenCarded) {
    window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000077433&shopId=1000077433&venderType=5&channel=7017&returnUrl=${window.location.href}`;
  }
};
// 领券
const getCoupon = () => {
  Toast.loading({
    forbidClick: true,
  });
  cjwxRequest.post('/gnc/largeCoupon/convertPrize', {
    pin: userPin.value,
    activityId: activityId.value,
  }).then((res) => {
    if (res.result) {
      Toast(res.data);
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 主接口
const mainContent = () => {
  Toast.loading({
    forbidClick: true,
  });
  cjwxRequest.post('/gnc/largeCoupon/activityContent', {
    pin: userPin.value,
    activityId: activityId.value,
  }).then((res) => {
    if (res.result) {
      pageNum.value = res.data.pageNum;
      changePage();
    } else {
      Toast(res.errorMessage);
    }
  });
};

getOpenStatus();
mainContent();
</script>

<style lang='scss'>
[v-cloak] {
  display: none;
}
html {
  max-width: 750px;
  margin: 0 auto;
  background: #441100;
}
.hover-icon {
  position: fixed;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  right: 0rem;
  top: 8rem;
  width: 1rem;
  height: 1rem;
  background-image: url("//img10.360buyimg.com/imgzone/jfs/t1/170883/38/22251/702022/61725979E901bb604/6ed4c4c9f8589c27.gif");
}
.page98 {
  background: url("./assets/98coupon.gif") no-repeat;
  background-size: cover;
  height: 18.85rem;
  position: relative;
}
.page198 {
  background: url("./assets/198coupon.gif") no-repeat;
  background-size: cover;
  height: 18.85rem;
  position: relative;
}
.collect {
  position: absolute;
  width: 4.4rem;
  height: 1rem;
  top: 9.3rem;
  left: 1.55rem;
  border-radius: 1rem;
}
.go-shop {
  position: absolute;
  width: 4.9rem;
  height: 1.15rem;
  top: 16.8rem;
  left: 1.3rem;
  border-radius: 1rem;
}
.van-toast {
  min-width: max-content;
}
</style>
