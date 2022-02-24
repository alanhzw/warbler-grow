<template>
  <div class="kv" :class="{'kv-new':dayjs(new Date()).format('YYYY-MM-DD') >= '2022-01-01'}"
       v-cloak>
    <div class="collect"
         @click="getCoupon"></div>
    <div class="see-more"
         @click="goMore"></div>
  </div>
</template>

<script lang='ts' setup>
import {
  ref, inject, onMounted, Ref, computed, nextTick,
} from 'vue';
import dayjs from 'dayjs';
import { Popup, Toast, Overlay } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
// import shareWithCmdword, { gotoShopPage } from '@/utils/platforms';
// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;

const pathParams: any = inject('pathParams');

// 获取活动id
const activityId = ref<string>(baseInfo.activityId);
// 获取店铺ID
const venderId = ref<string>(baseInfo.venderId);
// 用户Pin
const userPin = ref<string>(baseInfo.pin);
// 是否开卡表示是否注册
const isOpenCarded: boolean = inject('isOpenCard') as boolean;
// const isOpenCarded = true;
// 规则
const rule = ref('');
// 领取状态
// const uStatus = ref();
// 查看更多
const goMore = () => {
  window.location.href = 'https://pro.m.jd.com/mall/active/3QLab4zrzeJHYgHvQP6fPj3iVecB/index.html';
};
// 开卡状态
const getOpenStatus = () => {
  if (!isOpenCarded) {
    window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000077433&shopId=1000077433&venderType=5&channel=${pathParams.channel}&returnUrl=${window.location.href}`;
  }
};

// 埋点信息
const trackEvent = (info: any, url: any) => {
  cjwxRequest.post('/crm/pageVisit/insertCrmPageVisit', {
    venderId: venderId.value,
    elementId: pathParams.channel,
    pageId: activityId.value,
    pin: userPin,
  });
};

// 领券
const getCoupon = () => {
  // if (uStatus.value === -1) {
  //   Toast('您已领取过哦~快去下单吧');
  //   return;
  // }
  // if (uStatus.value === 0) {
  //   Toast('很抱歉，您不符合领取条件哦~');
  //   return;
  // }
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/gnc/newcus/coupon/draw', {
    pin: userPin.value,
    activityId: activityId.value,
  }).then((res) => {
  // eslint-disable-next-line no-undef
  //   const res = {
  //     success: true,
  //     msg: '调用成功！',
  //     total: 1,
  //     data: [
  //       {
  //         id: 743321110806,
  //         name: '新开卡券包（21-10）',
  //         type: 2,
  //         scanUrl: '哎呀活动火爆，请稍后再试！',
  //         activeUrl: '',
  //         couponId: null,
  //         visibilities: '',
  //         startTime: 1636128000000,
  //         endTime: 1638287999000,
  //         timeShowFg: '1',
  //         timeCheckFg: '1',
  //         condition: '21',
  //         denominations: '10',
  //         venderId: 1000077433,
  //         personLimitCount: 1,
  //         point: null,
  //         limitMonthNum: null,
  //         totalCount: 250000,
  //         appliedCount: null,
  //         stock: null,
  //         isShowItems: null,
  //         showItemIds: null,
  //         deleted: 1,
  //         createTime: 1636362658000,
  //         updateTime: 1636362673000,
  //         scopeDesc: '',
  //         timeLimit: '2021-11-06 00:00:00~2021-11-30 23:59:59',
  //         rangeDate: null,
  //         priority: null,
  //         startTimeStr: '2021-11-06 00:00:00',
  //         endTimeStr: '2021-11-30 23:59:59',
  //         putKey: 'AAROH_xIpeffAs_-naABEFoegtpe8F0gr_7_-nKxsnHi4kDJugk',
  //         couponSendId: 'efdaeeac3757432eab19cf54ec6c30a7',
  //         drawStatus: null,
  //         outerId: null,
  //         levelLimitType: null,
  //         skuIds: '',
  //       },
  //       {
  //         id: 743321110807,
  //         name: '新开卡券包（150-40）',
  //         type: 2,
  //         scanUrl: '哎呀活动火爆，请稍后再试！',
  //         activeUrl: '',
  //         couponId: null,
  //         visibilities: '',
  //         startTime: 1636128000000,
  //         endTime: 1638287999000,
  //         timeShowFg: '1',
  //         timeCheckFg: '1',
  //         condition: '150',
  //         denominations: '40',
  //         venderId: 1000077433,
  //         personLimitCount: 1,
  //         point: null,
  //         limitMonthNum: null,
  //         totalCount: 250000,
  //         appliedCount: null,
  //         stock: null,
  //         isShowItems: null,
  //         showItemIds: null,
  //         deleted: 0,
  //         createTime: 1636362710000,
  //         updateTime: 1636362723000,
  //         scopeDesc: '',
  //         timeLimit: '2021-11-06 00:00:00~2021-11-30 23:59:59',
  //         rangeDate: null,
  //         priority: null,
  //         startTimeStr: '2021-11-06 00:00:00',
  //         endTimeStr: '2021-11-30 23:59:59',
  //         putKey: 'AAROH_xIpeffAs_-naABEFoeU1xsN6yhn-rct2tH_tAYQk9WpkY',
  //         couponSendId: '59a48d94e9d4415fb48f99567bfa58cf',
  //         drawStatus: null,
  //         outerId: null,
  //         levelLimitType: null,
  //         skuIds: '',
  //       },
  //       {
  //         id: 743321110808,
  //         name: '新开卡券包（400-100）',
  //         type: 2,
  //         scanUrl: '哎呀活动火爆，请稍后再试！',
  //         activeUrl: '',
  //         couponId: null,
  //         visibilities: '',
  //         startTime: 1636128000000,
  //         endTime: 1638287999000,
  //         timeShowFg: '1',
  //         timeCheckFg: '1',
  //         condition: '400',
  //         denominations: '100',
  //         venderId: 1000077433,
  //         personLimitCount: 1,
  //         point: null,
  //         limitMonthNum: null,
  //         totalCount: 250000,
  //         appliedCount: null,
  //         stock: null,
  //         isShowItems: null,
  //         showItemIds: null,
  //         deleted: 0,
  //         createTime: 1636362769000,
  //         updateTime: 1636362799000,
  //         scopeDesc: '',
  //         timeLimit: '2021-11-06 00:00:00~2021-11-30 23:59:59',
  //         rangeDate: null,
  //         priority: null,
  //         startTimeStr: '2021-11-06 00:00:00',
  //         endTimeStr: '2021-11-30 23:59:59',
  //         putKey: 'AAROH_xIpeffAs_-naABEFoeclsXukyVqeShY2XwkGeR4fdRMpQ',
  //         couponSendId: '6f8dfda571db4a81b127b4b82e8367df',
  //         drawStatus: null,
  //         outerId: null,
  //         levelLimitType: null,
  //         skuIds: '',
  //       },
  //       {
  //         id: 743321110809,
  //         name: '新开卡券包（799-300）',
  //         type: 2,
  //         scanUrl: '哎呀活动火爆，请稍后再试！',
  //         activeUrl: '',
  //         couponId: null,
  //         visibilities: '',
  //         startTime: 1636128000000,
  //         endTime: 1638287999000,
  //         timeShowFg: '1',
  //         timeCheckFg: '1',
  //         condition: '799',
  //         denominations: '300',
  //         venderId: 1000077433,
  //         personLimitCount: 1,
  //         point: null,
  //         limitMonthNum: null,
  //         totalCount: 250000,
  //         appliedCount: null,
  //         stock: null,
  //         isShowItems: null,
  //         showItemIds: null,
  //         deleted: 0,
  //         createTime: 1636362862000,
  //         updateTime: 1636362968000,
  //         scopeDesc: '',
  //         timeLimit: '2021-11-06 00:00:00~2021-11-30 23:59:59',
  //         rangeDate: null,
  //         priority: null,
  //         startTimeStr: '2021-11-06 00:00:00',
  //         endTimeStr: '2021-11-30 23:59:59',
  //         putKey: 'AAROH_xIpeffAs_-naABEFoeJBrwzOL8MYqsyvwGbIhHkaJBThg',
  //         couponSendId: '12c23b0f66c44d8a8092a88207cf7172',
  //         drawStatus: null,
  //         outerId: null,
  //         levelLimitType: null,
  //         skuIds: '',
  //       },
  //     ],
  //   };
    if (res.success) {
      let yesStr = [];
      let noStr = [];
      const couponList = res.data;
      yesStr = couponList.filter((i: { deleted: number; }) => (i.deleted !== 0));
      noStr = couponList.filter((i: { deleted: number; }) => i.deleted === 0);
      // toastStr = couponList.map((i) => `${i.name} 领取 ${i.deleted === 0 ? `失败, 失败原因:${i.scanUrl}` : '成功'} \n`);
      // toastStr = toastStr.join('<br/>');
      // Toast(toastStr);
      if (noStr.length === 4) {
        Toast('活动太火爆啦~请稍后再试');
      } else {
        Toast(`恭喜获得${yesStr.length}张券，请到京东-我的-优惠券查看`);
      }
    } else {
      Toast(res.msg);
    }
  });
};
// 获取用户状态
// const getUser = () => {
//   Toast.loading({
//     message: '加载中...',
//     forbidClick: true,
//   });
//   cjwxRequest.post('/gnc/newcus/coupon/getUserStatus', {
//     pin: userPin.value,
//     activityId: activityId.value,
//   }).then((res) => {
//     if (res.result) {
//       uStatus.value = res.data;
//     } else {
//       Toast(res.msg);
//     }
//   });
// };

nextTick(() => {
  let inputBox = null;
  inputBox = document.querySelector('.collect');
  function clickEven(fn, delay) {
    let time = null;

    return function () {
      if (time) {
        return;
      }
      time = setTimeout(() => {
        fn();
        time = null;
      }, delay);
    };
  }

  // eslint-disable-next-line no-unused-expressions
  // inputBox?.addEventListener('click', clickEven(getCoupon, 500));
});

getOpenStatus();

onMounted(() => {
  trackEvent();
});
</script>

<style lang='scss'>
[v-cloak] {
  display: none;
}

html {
  max-width: 750px;
  margin: 0 auto;
  background: #c71f19;
}

.kv {
  background: url("./assets/newkv.png") no-repeat;
  background-size: cover;
  height: 14.48rem;
  position: relative;
}

.kv-new{
  background: url("./assets/kvnn.png") no-repeat;
  background-size: cover;
  height: 14.48rem;
  position: relative;
}

.collect {
  position: absolute;
  width: 1.9rem;
  height: 1.9rem;
  top: 9.6rem;
  left: 2.77rem;
  border-radius: 1rem;
  background: url("./assets/collect.png") no-repeat;
  background-size: 100%;
  animation: heartbeat 1s infinite;
  -webkit-animation: heartbeat 1s infinite;
}
@keyframes heartbeat {
  0% {
    transform: scale(0.8, 0.8);
    opacity: 1;
  }
  25% {
    transform: scale(1, 1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8, 0.8);
    opacity: 1;
  }
}

.see-more {
  position: absolute;
  width: 1.7rem;
  height: .4rem;
  top: 11.7rem;
  left: 3rem;
}

.van-toast {
  min-width: max-content;
}
</style>
