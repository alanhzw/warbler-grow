<template>
<!--  kv部分-->
  <div class="kv-area">
    <div class="main-kv">
      <!--  会员栏-->
      <div class="join-bg">
        <div class="join-mem">加入会员才能参加活动哦</div>
        <div class="join-btn gray" v-if="isOpenCarded">已入会</div>
        <div class="join-btn" v-else @click="toOpen">立即入会</div>
      </div>
    </div>
    <div class="rule-btn" @click="openWindow('ruleWin')">活动规则</div>
    <div class="prize-btn" @click="openWindow('prizeWin')">我的奖品</div>
  </div>
  <!--  视频部分-->
  <div class="video-area">
    <div v-for="(item,index) in concatList" :key="item.id" style="display: flex;justify-content: center;margin-bottom: .2rem;">
      <video-item
        :video-item="item"
        :video-index="index"
        @playNo="playNo"
        @playId="lessSend"
        @goOpen="openWindow('openWin')"></video-item>
    </div>
<!--    @playStop="playStop"-->
<!--    :videoList="concatList"-->
  </div>
<!--  分享好友-->
<!--  <div class="share-area">-->
<!--    <div class="share-btn" :class="{gray:!shareStatus}" @click="share"></div>-->
<!--  </div>-->
<!--  弹窗组件-->
  <Popup class="popup" v-model:show="maskShow" :close-on-click-overlay="false">
    <rule-window @closeRule="closeWindow" :myRule="rule" v-if="windowName === 'ruleWin'"></rule-window>
    <prize-window :myPrize="prizeList" @closePrize="closeWindow" v-if="windowName === 'prizeWin'"></prize-window>
    <open-card-window @openCard="toOpen" @closeMem="closeWindow" v-if="windowName === 'openWin'"></open-card-window>
    <lottery-window :prizeMsg="prizeMsg" @closeLottery="closeWindow" v-if="windowName === 'lotteryWin'"></lottery-window>
  </Popup>

</template>

<script lang='ts' setup>
import { ref, inject, computed, onMounted, nextTick } from 'vue';
import {
  Popup, Toast, Overlay, Dialog, Checkbox, Area,
} from 'vant';
import { areaList } from '@vant/area-data';
import _ from 'underscore';
import { reportAssistEvent, reportClick } from '@/utils/trackEvent/jdReport';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { setHeaderShare, callShare, gotoShopPage, gotoSkuPage } from '@/utils';
import RuleWindow from './components/ruleWindow.vue';
import PrizeWindow from './components/prizeWindow.vue';
import OpenCardWindow from './components/opencardWindow.vue';
import LotteryWindow from './components/lotteryWindow.vue';
import videoList from './config/videoList';
import VideoItem from './components/videoItem.vue';

const shareChannel = ['Wxfriends', 'Wxmoments', 'Sinaweibo', 'QQfriends', 'QQzone'];
// 视频列表
const concatList = ref([]);
// 视频遮罩
const maskShow = ref(false);
// const maskVid = ref(true);
// 弹窗名称
const windowName = ref('');
// 规则
const rule = ref('');
// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const { activityId, venderId } = baseInfo;
// 是否开卡表示是否注册
const isOpenCarded: boolean = inject('isOpenCard') as boolean;
// const isOpenCarded = true;
// 用户Pin
const userPin = ref<string>(baseInfo.pin);
// 奖品列表
const prizeList = ref([]);
// url截取的发起人id
const helpUuid: string = inject('helpUuid') as string;
console.log(`助力人${helpUuid}`);
// 中奖信息
const prizeMsg = ref([]);
// 自身Id
const myUuid = ref('');
// 助力状态
const helpStatus = ref(false);
const shareStatus = ref(true);
// ·································

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

// 未播放弹出遮罩0
const playNo = (index) => {
  concatList.value[index].maskdex = false;
  concatList.value.forEach((item, vIndex) => {
    if (index !== vIndex) {
      concatList.value[vIndex].maskdex = true;
      concatList.value[vIndex].id = Math.floor((Math.random() * 10000000) + 1);
    }
  });
};
// 退出播放恢复遮罩
// const playStop = (index) => {
//   concatList.value.forEach((item, vIndex) => {
//     if (index === vIndex) {
//       concatList.value[vIndex].maskdex = true;
//     }
//   });
// };

// 分享好友
// const share = () => {
//   if (!isOpenCarded) {
//     openWindow('openWin');
//     return;
//   }
//   if (!shareStatus.value) {
//     Toast('助力人数已达上限');
//     return;
//   }
//   callShare({
//     type: baseInfo.shareType,
//     title: '骁龙分享有礼',
//     // imageUrl: actList.value.shareImg as string,
//     shareUrl: `${window.location.origin}/m/707261/99/211270726101/?helpUuid=${myUuid.value}` as string,
//     // afterShare: sharePoint,
//     channel: shareChannel.join(','),
//   });
// };

// 跳转开卡
const toOpen = () => {
  const returnUrl = encodeURIComponent(`${window.location.origin}/m/707261/99/211270726101/?helpUuid=${helpUuid}`);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=707261&channel=7017&returnUrl=${returnUrl}`;
};

// 活动信息
const activityContent = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wx/qualcomm/videoGift/activityContent', {
    activityId,
    pin: userPin.value,
    helpUuid,
  }).then((res) => {
    if (res.result) {
      helpStatus.value = res.data.helpStatus;
      myUuid.value = res.data.customerId;
      shareStatus.value = res.data.shareStatus;
      concatList.value = videoList.value.map((item, index) => ({ ...item, ...res.data.videoList[index] }));
      // if (res.data.helpStatus === 1) {
      //   Toast('助力成功');
      // } else if (res.data.helpStatus === 2) {
      //   Toast('助力人数已达上限');
      // }
      if (!isOpenCarded) {
        openWindow('openWin');
      }
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 我的奖品
const getPrizeList = () => {
  // Toast.loading({
  //   message: '加载中...',
  //   forbidClick: true,
  // });
  cjwxRequest.post('/common/brand/getDrawRecord', {
    activityId,
    venderId,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      prizeList.value = res.data;
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 观看视频奖励
const getVideoPrize = (thisId) => {
  // Toast.loading({
  //   message: '加载中...',
  //   forbidClick: true,
  // });
  cjwxRequest.post('/wx/qualcomm/videoGift/receivePrize', {
    activityId,
    pin: userPin.value,
    taskId: thisId,
  }).then((res) => {
    if (res.result) {
      prizeMsg.value = res.data;
      if (res.data.status !== 0) {
        openWindow('lotteryWin');
      }
      activityContent();
      getPrizeList();
    } else {
      Toast(res.errorMessage);
    }
  });
};
let keep = '';
const debounce = (time: number, actId) => {
  if (keep) {
    clearTimeout(keep);
  }
  keep = setTimeout(() => {
    getVideoPrize(actId);
    keep = '';
  }, time);
};
const lessSend = (actId) => {
  debounce(500, actId);
};

getActivityInfo();
activityContent();
getPrizeList();
</script>

<style lang='scss'>
@font-face {
  /* font-properties */
  font-family: Qualcomm;
  src:url('./assets/font/QualcommNext-Medium.otf');
  /* font-properties */
  font-family: SourceHanSansCN;
  src:url('./assets/font/QualcommNext-Medium.otf')
}
#app{
  max-width: 750px;
  background-color: #e61324;
  font-family: Source Han Sans CN, sans-serif;
}
.gray {
  filter: grayscale(1);
}
.gray-cover{
  background-color: rgba(0,0,0,.4);
}
img{
  width: 100%;
  margin: .1rem auto;
}
.van-popup {
  background: none;
  overflow: hidden;
}
.van-toast {
  background-color: rgba(0,0,0,.7);
  min-width: max-content;
}
.kv-area{
  position: relative;

  .main-kv{
    width: 100%;
    margin: 0;
    background: url("./assets/main-kv.png") no-repeat;
    background-size: 100%;
    padding-top: 4.3rem;

    .join-bg{
      position: relative;
      background: url("./assets/joinBg.png") no-repeat;
      background-size: 100%;
      width: 7.29rem;
      height: 1.64rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: .2rem;

      .join-mem{
        width: 4rem;
        text-align: center;
        color: #e61324;
        font-weight: 600;
        margin-left: 0.5rem;
      }
      .join-btn{
        width: 1.8rem;
        height: 0.6rem;
        background-color: #e61324;
        border-radius: 1rem;
        color: #fbceb1;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.25rem;
        font-weight: 600;
      }
    }
  }
  .rule-btn{
    position: absolute;
    width: .95rem;
    height: 0.35rem;
    top: 3.1rem;
    right: 0;
    border-radius: .5rem 0 0 .5rem;
    font-size: .2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #fbceb1;
  }
  .prize-btn{
    position: absolute;
    width: 0.95rem;
    height: 0.35rem;
    top: 3.55rem;
    right: 0;
    border-radius: .5rem 0 0 .5rem;
    font-size: .2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #fbceb1;
  }
}
.video-area{
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  video{
    width: 6.7rem;
    height: 3.8rem;
    margin-top: .02rem;
    z-index: 1;
    border-radius: .2rem;
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 7.5rem;
}
.showMask{
  background: rgba(0, 0, 0, 0.8);
  background-size: 100%;
  width: 6.7rem;
  height: 3.85rem;
  z-index: 2000;
  position: absolute;
  border-radius: 0.1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .icon{
    background: url("./assets/video-mask.png") no-repeat;
    background-size: 100%;
    width: .65rem;
    height: .65rem;
  }
  .icon-text{
    color: #e71224;
    font-size: .36rem;
    margin-top: .2rem;
    font-weight: bold;
  }
}
.share-area{
  background: url("./assets/share.png") no-repeat;
  background-size: 100%;
  width: 7.1rem;
  height: 1.34rem;
  margin: .2rem auto 0;
  padding-bottom: .4rem;
  position: relative;
  display: flex;
  align-items: center;

  .share-btn{
    background: url("./assets/share-btn.png") no-repeat;
    background-size: 100%;
    position: absolute;
    width: 2.1rem;
    height: .65rem;
    left: 4.7rem;
  }
}

</style>
