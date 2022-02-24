<template>
  <div class="index">
    <div class="coupon">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/203574/6/12734/81220/6177ddf6E507997bc/29d7f0967d09e34b.png"
      />
      <span class="coupon-integral">
        {{coupon.points}}
        <br />
        <span style="font-size: 0.2rem;">积分兑</span>
      </span>
      <span class="coupon-time">有效期：{{coupon.starTimeStr}}-{{coupon.endTimeStr}}</span>
    </div>
    <div class="box">
      <div class="box-line1">
        <span class="box-integral">{{coupon.points}}积分</span>
        <span class="box-rule" @click="overlay.rule = true">活动规则></span>
      </div>
      <div class="box-line2">
        剩余
        <span>{{coupon.restNum}}</span>份，每人限领
        <span>{{coupon.limitNum}}</span>份
      </div>
    </div>
    <img
      src="//img10.360buyimg.com/imgzone/jfs/t1/191428/1/6008/38839/60b5d1c5E38292024/463e400d1a5e5b2d.png"
      class="sure-btn"
      @click="convertPrize()"
    />
  </div>
  <!-- 领取成功弹窗 -->
  <van-popup v-model:show="overlay.rule">
    <div class="rule">
      <div v-html="rule" style="height: 6.4rem; overflow-y: scroll"></div>
      <div class="closeBtn" @click="overlay.rule = false"></div>
    </div>
  </van-popup>
  <!-- 入会弹窗 -->
  <van-popup v-model:show="overlay.openCard" :close-on-click-overlay="false">
    <div class="open-card">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/155746/17/26668/128004/61691c57E4a123dd5/0d15babed77d2d3b.png"
        class="open-card-img"
      />
      <div class="open-card-go" @click="goOpenCard"></div>
      <div class="open-card-close" @click="overlay.openCard = false"></div>
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
} from 'vant';
import Clipboard from 'clipboard';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import './css/index.css';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const openCard: boolean = inject('isOpenCard') as boolean;

// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;

// 设置页面title
document.title = actName;

const overlay = ref({
  openCard: false,
  rule: false,
});
const rule = ref('');
const coupon:Ref<any> = ref({});

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
  cjwxRequest.post('/common/points/exchangeCoupons/activityContent', {
    activityId: baseInfo.activityId,
    pin: baseInfo.pin,
  }).then((data) => {
    if (data.result) {
      coupon.value = data.data;
    } else {
      Toast(data.errorMessage);
    }
  });
};

// 开卡链接
const goOpenCard = () => {
  const returnUrl = encodeURIComponent(`https://${window.location.host}/m/1000001947/99/2110100000194701/`);
  // window.location.href = `${returnUrl}`;
};

// 兑换礼品
const convertPrize = () => {
  // if (!openCard) {
  //   overlay.value.openCard = true;
  //   return;
  // }
  Toast.loading({
    message: '领取中...',
    forbidClick: true,
  });
  cjwxRequest.post('/common/points/exchangeCoupons/convertPrize', {
    activityId: baseInfo.activityId,
    pin: baseInfo.pin,
  }).then((data) => {
    Toast.clear();
    if (data.result) {
      Toast(data.data);
    } else {
      Toast(data.errorMessage);
    }
  });
};

if (!openCard) {
  const returnUrl = encodeURIComponent(`https://${window.location.host}/m/1000001947/99/2110100000194701/`);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000001947&channel=401&returnUrl=${returnUrl}`;
}
getActivityInfo();
getActivityContent();
</script>

<style lang='scss'>
</style>
