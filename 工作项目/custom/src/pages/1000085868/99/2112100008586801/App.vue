<template>
  <!--  kv部分-->
  <div class="main-kv">
    <div class="rule-btn" @click="openWindow('ruleWin')">活动规则</div>
    <div class="prize-btn" @click="openPrizeBtn">我的奖品</div>
    <div class="laugh-btn" @click="openLaughRank">我的爆笑值记录</div>
    <div class="comment-area">
      <vue-danmaku
        class="comment-show"
        ref="danmaku"
        :danmus="danmus"
        :channels="3"
        :extraStyle="commentStyleNow"
        :speeds="80"
        loop
      ></vue-danmaku>
      <div class="add-area">
        <input type="text" v-model="comment" :placeholder="placeholder">
        <button v-if="canSend" @click="addPing()">发送弹幕</button>
        <button style="background-color: gray" v-else @click="Toast('您今日已用完发送弹幕次数')">发送弹幕</button>
      </div>
    </div>
  </div>
  <!--直播间-->
  <div class="live-area">
    <div>
      <div class="live-title"></div>
      <div class="live-title-text">每日首次进入观看直播间，可得<span class="red-span">20爆笑值</span></div>
    </div>
    <div class="live-house" :style="{background:`url(${liveInfo.image}) no-repeat`, backgroundSize: '100%'}" @click="watchLive">
      <div class="live-house-mask">
        <div class="live-house-icon"></div>
      </div>
    </div>
  </div>
  <!--  喜剧福利站-->
  <div class="video-area">
    <div class="video-area-bg-title"></div>
    <div class="video-area-title">每完整观看一个节目视频奖励<span class="red-span">15爆笑值</span></div>
    <div class="video-list">
      <div v-for="(item,index) in concatList" :key="item.taskId" class="video-style">
        <video-item
          :video-item="item"
          :video-index="index"
          @playId="getVideoPrize"
        ></video-item>
      </div>
    </div>
  </div>
  <!--欢乐上新，爆笑加倍-->
  <div class="book-mem" v-if="dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') >= '2021-12-14 11:00:00'">
    <div class="book-list">
      <div class="book-item-text" v-if="new Date().getTime() >= ysStartTime">成功支付1件新品定金奖励<span>50爆笑值</span></div>
      <div class="book-item-text" v-else>vivo S12系列新品好物先了解</div>
      <!--      <button class="book-btn" v-if="preSell" @click="toNew">新品已预约</button>-->
      <button class="book-btn" @click="addPresell">{{ bookBtn }}</button>
    </div>
    <div class="count-area">
      <div v-if="new Date().getTime() >= ysStartTime">距离新品正式开售还有:</div>
      <div v-else>距离产品发布会开始还有:</div>
      <CountDown :time="checkZFTime">
        <template #default="timeData">
          <span class="time-num">{{ getTens(timeData.days) }}</span>
          <span class="time-num">{{ getSingle(timeData.days) }}</span>
          <span class="time-text">天</span>
          <span class="time-num">{{ getTens(timeData.hours) }}</span>
          <span class="time-num">{{ getSingle(timeData.hours) }}</span>
          <span class="time-text">时</span>
          <span class="time-num">{{ getTens(timeData.minutes) }}</span>
          <span class="time-num">{{ getSingle(timeData.minutes) }}</span>
          <span class="time-text">分</span>
          <span class="time-num">{{ getTens(timeData.seconds) }}</span>
          <span class="time-num">{{ getSingle(timeData.seconds) }}</span>
          <span class="time-text">秒</span>
        </template>
      </CountDown>
    </div>
  </div>
  <!--  惊喜一爆笑瓜分-->
  <div class="surprise-one">
    <div class="surprise-one-title">
      爆笑值<span class="red-span">达到100万</span>后,<br/>将在活动结束后2个工作日内瓜分<span class="red-span">50万京豆</span>
    </div>
    <div class="my-laugh-sore">我的实时爆笑值：<span>{{ myLaughSore }}</span></div>
    <div class="grow-process">
      <div class="process-bg">
        <div style="width: 100%;height: 100%;position: relative;">
          <div class="progress-active" :style="{ width: growWidth+'%'}">
            <div class="price-span"><span style="margin: .07rem auto 0;display: block;height: .413rem">当前爆笑值{{ realLaugh }}W</span></div>
            <div v-show="shining" class="shining-span"></div>
          </div>
        </div>
      </div>
      <div class="process-end"></div>
    </div>
    <div class="got-chance gray" v-if="openTaskStatus===false&&followTaskStatus===false"></div>
    <div class="get-chance" v-else @click="openWindow('getChanceWin')"></div>
    <div class="count-area">
      <div>距离活动结束时间还有:</div>
      <CountDown :time="ysEndTime">
        <template #default="timeData">
          <span class="time-num">{{ getTens(timeData.days) }}</span>
          <span class="time-num">{{ getSingle(timeData.days) }}</span>
          <!--        <span class="block">{{ timeData.days }}</span>-->
          <span class="time-text">天</span>
          <span class="time-num">{{ getTens(timeData.hours) }}</span>
          <span class="time-num">{{ getSingle(timeData.hours) }}</span>
          <span class="time-text">时</span>
          <span class="time-num">{{ getTens(timeData.minutes) }}</span>
          <span class="time-num">{{ getSingle(timeData.minutes) }}</span>
          <span class="time-text">分</span>
          <span class="time-num">{{ getTens(timeData.seconds) }}</span>
          <span class="time-num">{{ getSingle(timeData.seconds) }}</span>
          <span class="time-text">秒</span>
        </template>
      </CountDown>
    </div>
  </div>
  <div class="chance-btns">
    <div class="chance-open">
      <div class="chance-open-btn" v-if="isOpenCarded" @click="Toast('已开卡')"></div>
      <div class="chance-open-btn" v-else @click="toOpen"></div>
      <div class="chance-open-text"></div>
    </div>
    <div class="chance-book">
      <div class="chance-book-btn" v-if="followTaskStatus===false" @click="Toast('已关注')"></div>
      <div class="chance-book-btn" v-else @click="toAttention"></div>
      <div class="chance-book-text"></div>
    </div>
  </div>
  <!--  惊喜二爆笑预言帝-->
  <div class="surprise-two">
    <div class="surprise-two-title">
      <span class="red-span">消耗100爆笑值</span>可竞猜一次，<br/>猜中者将获得<span class="red-span">500爆笑值</span>
    </div>
    <div class="guess-bg">
      <div class="guess-text">猜猜本期中，哪个社团的总分最高？</div>
      <div class="group-list">
        <div class="group-item" v-for="item in guessingList" :key="item.taskId">
          <div class="group-item-img" :style="{background:`url(${item.image}) no-repeat`, backgroundSize: '100%'}"></div>
          <div class="group-item-btn" v-if="item.status">已选TA</div>
          <div class="group-item-btn" v-else @click="chooseGroup(item.taskId, item.name, item.guissingStop)">选TA</div>
        </div>
      </div>
    </div>
  </div>
  <!--  惊喜三扭出快乐-->
  <div class="surprise-three" @click="getLottory">
    <div class="surprise-three-title"><span class="red-span">消耗100爆笑值</span>可开启扭蛋机一次</div>
  </div>
  <!--  惊喜四爆笑排行榜-->
  <div class="surprise-four">
    <div class="surprise-four-prize-list"></div>
    <div class="surprise-four-prize-area">
      <div class="surprise-four-prize-item" v-for="(item, index) in giftInfoList" :key="index">
        <img :src="item.productUrl"/>
        <div>{{ item.name }}</div>
      </div>
    </div>
    <div class="surprise-four-rank-title"></div>
    <div class="surprise-four-rank-list">
      <div
        class="swiper-container"
        ref="swiperRef"
        style="width: 100%; height: 100%; overflow: hidden;"
      >
        <div class="swiper-wrapper" v-if="rankList.length > 0">
          <div
            class="winner swiper-slide"
            v-for="item in rankList"
            :key="item.rank"
          >
            <span style="width: .8rem;margin-left: .2rem">{{ item.rank }}</span>
            <span style="width: 1.8rem;margin-left: .6rem">{{ item.nick }}</span>
            <span style="width: 2.2rem">{{ item.value }}</span>
          </div>
        </div>
        <div v-else>
          <p class="winner-null">暂无数据</p>
        </div>
      </div>
    </div>
    <div class="surprise-four-rank-myRank">我的当前排名: {{ mySort }}</div>
    <div class="surprise-four-rank-myLaugh">我的累计爆笑值: {{ myTotalValue }}</div>
  </div>
  <!--  做任务领取爆笑值-->
  <div class="surprise-getPrize-List-bg">
    <div class="surprise-getPrize-List">
      <div>
        <div>成功邀请一位好友开卡，可获得<span>20爆笑值</span></div>
        <button @click="share">分享助力</button>
      </div>
      <div>
        <div>每日成功答对一道，可获得<span>15爆笑值</span></div>
        <button @click="openQuestion">答题有礼</button>
      </div>
      <div>
        <div>加购全部指定商品，可获得<span>20爆笑值</span></div>
        <button @click="addGood">一键加购</button>
      </div>
      <div>
        <div>单笔订单付款满800元，确认收货后可获得<span>50爆笑值</span></div>
        <button @click="gotoShopPage(shopId)">去下单</button>
      </div>
    </div>
  </div>
  <div class="iqy-icon"></div>
  <!--  曝光商品-->
  <div class="sku-bg">
    <div class="sku-bg-title"></div>
    <div class="sku-area">
      <div class="sku-item" v-for="item in skusList" :key="item.actId">
        <img :src="item.logo"/>
        <div class="sku-top">{{ item.skuName }}</div>
        <div class="sku-bottom">
          <div class="sku-price">￥{{ item.promoPrice }}</div>
          <button class="sku-btn" @click="gotoSkuPage(item.skuId)">立即购买</button>
        </div>
      </div>
    </div>
  </div>

  <!--  分享好友-->
  <!--  <div class="share-area">-->
  <!--    <div class="share-btn" :class="{gray:!shareStatus}" @click="share"></div>-->
  <!--  </div>-->

  <!--  弹窗组件-->
  <Popup class="popup" v-model:show="maskShow" :close-on-click-overlay="false">
    <laugh-window :myLaugh="myLaughList" @closeLaugh="closeWindow" v-if="windowName === 'laughWin'"></laugh-window>
    <rule-window @closeRule="closeWindow" :myRule="rule" v-if="windowName === 'ruleWin'"></rule-window>
    <prize-window :myPrize="prizeList" @openFix="openFix" @closePrize="closeWindow" v-if="windowName === 'prizeWin'"></prize-window>
    <open-card-window @openCard="toOpen" @closeMem="closeWindow" v-if="windowName === 'openWin'"></open-card-window>
    <lottery-window :drawInfoData="drawInfoData" @openFix="openFix" @closeLottery="closeWindow" v-if="windowName === 'lotteryWin'"></lottery-window>
    <get-chance-window @openCard="toOpen" @attentionShop="toAttention" @closeChance="closeWindow" v-if="windowName === 'getChanceWin'"></get-chance-window>
    <collect-window :laughNum="collectLaughNum" @closeLaughNum="closeWindow" v-if="windowName === 'collectLaugh'"></collect-window>
    <fix-info-window :currentData="formData" @commitInfo="commitInfo" @closeFix="closeWindow" v-if="windowName === 'fixInfoWin'"></fix-info-window>
    <question-window :qaData="qaData" @getAnswer="getAnswer" @closeChance="closeWindow" v-if="windowName === 'questionWin'"></question-window>
    <no-lottery-window @closeNoL="closeWindow" v-if="windowName === 'noLotteryWin'"></no-lottery-window>
    <no-enough-l-window @closeLE="closeWindow" v-if="windowName === 'noELWin'"></no-enough-l-window>
    <no-guess-enough @closeGE="closeWindow" v-if="windowName === 'noGEWin'"></no-guess-enough>
    <guess-success @closeYes="closeWindow" v-if="windowName === 'guessYWin'"></guess-success>
    <rank-open-window :rankOpenData="rankOpenData" @openFix="openFix" @closeRankOpen="closeWindow" v-if="windowName === 'rankOpenWin'"></rank-open-window>
    <new-ps-window @closeNewPS="closeWindow" v-if="windowName === 'newPSWin'"></new-ps-window>
  </Popup>

</template>

<script lang='ts' setup>
import VueDanmaku from 'vue3-danmaku';
import { computed, inject, nextTick, Ref, ref } from 'vue';
import { CountDown, Popup, Toast } from 'vant';
import Swiper, { Autoplay } from 'swiper';
import dayjs from 'dayjs';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { callShare, gotoShopPage, gotoSkuPage } from '@/utils';
import { reportClick } from '@/utils/trackEvent/jdReport';
import RuleWindow from './components/ruleWindow.vue';
import PrizeWindow from './components/prizeWindow.vue';
import OpenCardWindow from './components/opencardWindow.vue';
import LotteryWindow from './components/lotteryWindow.vue';
import LaughWindow from './components/myLaughWindow.vue';
import GetChanceWindow from './components/getChanceWin.vue';
import CollectWindow from './components/collectLaughWin.vue';
import FixInfoWindow from './components/fixInfoWindow.vue';
import QuestionWindow from './components/questionWindow.vue';
import NoLotteryWindow from './components/noLottery.vue';
import NoEnoughLWindow from './components/noLotteryEnough.vue';
import NoGuessEnough from './components/noGuessEnough.vue';
import GuessSuccess from './components/GuessSuccess.vue';
import RankOpenWindow from './components/rankOpenWindow.vue';
import NewPsWindow from './components/newPrizeStart.vue';
import videoList from './config/videoList';
import VideoItem from './components/videoItem.vue';

Swiper.use([Autoplay]);
// Toast.allowMultiple();
Toast.setDefaultOptions({ duration: 3000 });
// 弹幕输入引导词
const randomText = () => {
  const randomIndex = Math.floor((Math.random() * 10) % 3);
  const randomPlace = ['看到了我的同款X70Pro+！', '节目也太好看了吧', '爱上同款手机了', '用X70Pro+看节目好清晰！'];
  // placeholder = ref(randomPlace[randomIndex]);
  return ref(randomPlace[randomIndex]);
};
// 弹幕引导
let placeholder = randomText().value;
// 实际发送内容
const realComment = ref('');
// 弹幕组件对象
const danmaku = ref<any>(null);
// 评论
const comment = ref('');
// 弹幕样式
const commentStyleNow = ref('');
// 弹幕随机样式
setInterval(() => {
  commentStyleNow.value = 'color: black;background-color:#ffd217;border:1px solid black;border-radius:1rem;padding:3px .15rem;display: flex;align-items: center;';
  const randomNumber = Math.floor(Math.random() * 2 + 1);
  if (randomNumber === 1) {
    commentStyleNow.value = 'color: black;background-color:#ffd217;border:1px solid black;border-radius:1rem;padding:3px .15rem;display: flex;align-items: center;';
  } else {
    commentStyleNow.value = 'color: white;background-color:#fd360d;border:1px solid black;border-radius:2rem;padding:3px .15rem;display: flex;align-items: center;';
  }
}, 200);
// 加弹幕
const addPing = () => {
  if (comment.value) {
    Toast('发送成功');
    danmaku.value.add(comment.value);
    realComment.value = comment.value;
    placeholder = randomText().value;
    // console.log(realComment.value);
    // eslint-disable-next-line no-use-before-define
    sendBarrage(realComment.value);
  } else if (placeholder) {
    danmaku.value.add(placeholder);
    realComment.value = placeholder;
    placeholder = randomText().value;
    // console.log(realComment.value);
    // eslint-disable-next-line no-use-before-define
    sendBarrage(realComment.value);
  } else {
    Toast('发送内容不能为空');
  }
};
// 弹幕内容
const danmus = ref([]);
// 分享渠道
const shareChannel = ['Wxfriends', 'Wxmoments', 'Sinaweibo', 'QQfriends', 'QQzone'];
// 视频列表
const concatList = ref([]);
// 视频遮罩
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
// 实际爆笑值
const BeforeRealLaugh = ref(0);
const realLaugh = computed(() => (BeforeRealLaugh.value / 10000).toFixed(2));
// 进度条爆笑值
const memLaugh = ref(0);
// 进度条计算
const growWidth = computed(() => (BeforeRealLaugh.value / 1000000) * 100);
// 进度条光效
const shining = ref(false);

// 预售时间
// const time = ref(890054137);
// 我的爆笑值
const myLaughSore = ref(0);
// 点选队伍
const isChoose = ref(false);
// 未点选
const noChoose = ref(true);
// 我的爆笑值记录
const myLaughList = ref([]);
// 能否发送弹幕
const canSend = ref(false);
// 剩余发送弹幕数
const dayCanSendTimes = ref(0);
// 开卡任务完成状态
const openTaskStatus = ref(true);
// 关注店铺完成状态
const followTaskStatus = ref(true);
// 一件加购完成状态
const addTaskStatus = ref(true);
// 暂存获奖爆笑值
const collectLaughNum = ref(0);
// 直播间信息
const liveInfo = ref([]);
// 竞猜队伍信息
const guessingList = ref([]);
// 完善信息内容
const formData = ref({
  // giftRecordId: '',
  receiver: '',
  phone: '',
  address: '',
  // postalCode: '',
  // personalID: '',
  province: '',
  city: '',
  district: '',
});
// 中奖信息
const drawInfoData = ref([]);
// 排行榜开奖信息
const rankOpenData = ref([]);
// 当前填写地址Id
const currentAddressId = ref('');
// 我的排名
const mySort = ref();
// 排行榜奖品列表
const giftInfoList = ref([]);
// 排行榜名单列表
const rankList = ref([]);
// 曝光商品列表
const skusList = ref([]);
// 发布会 正式开售时间
const checkZFTime = ref();
// 预售开始时间
const ysStartTime = ref();
// 活动结束时间
const ysEndTime = ref();
// 排行榜开奖
const rankOpenPrize = ref(false);
// 预约状态
const preSell = ref(false);
// 预约按钮状态
const bookBtn = ref('');
const checkYsStatus = ref(false);
// 答题数据
const qaData = ref({});
// 是否可以答题
const canAnswer = ref(false);
// 我的累计爆笑值
const myTotalValue = ref('');

const swiperRef: Ref<HTMLElement | null> = ref(null);

const initSwiper = () => {
  if (rankList.value.length > 3) {
    nextTick(() => {
      const mySwiper = new Swiper('.swiper-container', {
        autoplay: {
          delay: 1000,
          // 滚动到最后停止
          stopOnLastSlide: true,
          // 触碰后依然自动滚动
          disableOnInteraction: false,
        },
        speed: 2000,
        direction: 'vertical',
        // loop: false,
        slidesPerView: 'auto',
        loopedSlides: 10,
        // centeredSlides: true,
      });
      console.log('mySwiper', mySwiper);
    });
  }
};
// ·································

// 时间戳
const add0 = (num: number) => (num < 10 ? `0${num}` : num);
const getTens = (date: number) => {
  const d = add0(date);
  return Math.floor(d / 10) === 0 ? 0 : Math.floor(d / 10);
};
const getSingle = (date: number) => {
  const d = add0(date);
  return d % 10;
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

// 去新品页
const toNew = () => {
  window.location.href = 'https://item.m.jd.com/product/100029782958.html';
  reportClick();
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
//
// // 未播放弹出遮罩
// const playNo = (index) => {
//   concatList.value[index].maskdex = false;
//   concatList.value.forEach((item, vIndex) => {
//     if (index !== vIndex) {
//       concatList.value[vIndex].maskdex = true;
//       concatList.value[vIndex].id = Math.floor((Math.random() * 10000000) + 1);
//     }
//   });
// };
// // 退出播放恢复遮罩
// const playStop = (index) => {
//   concatList.value.forEach((item, vIndex) => {
//     if (index === vIndex) {
//       concatList.value[vIndex].maskdex = true;
//     }
//   });
// };
// 分享好友
const share = () => {
  // if (!isOpenCarded) {
  //   openWindow('openWin');
  //   return;
  // }
  callShare({
    type: baseInfo.shareType,
    title: '抽手机，赢大奖',
    // imageUrl: actList.value.shareImg as string,
    shareUrl: `${window.location.origin}/m/1000085868/99/2112100008586801/?helpUuid=${myUuid.value}` as string,
    // afterShare: sharePoint,
    channel: shareChannel.join(','),
  });
};
// 跳转开卡
const toOpen = () => {
  const returnUrl = encodeURIComponent(`${window.location.origin}/m/1000085868/99/2112100008586801/?helpUuid=${helpUuid}`);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000085868&channel=401&returnUrl=${returnUrl}`;
};
// 去关注
const toAttention = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/crm/vivo/comedy/followShop', {
    activityId,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      Toast('关注成功');
      // eslint-disable-next-line no-use-before-define
      activityContent();
      // eslint-disable-next-line no-use-before-define
      getRangkingList();
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 一键加购
const addGood = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/crm/vivo/comedy/addCard', {
    activityId,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      Toast('加购成功');
      collectLaughNum.value = res.data;
      openWindow('collectLaugh');
      // eslint-disable-next-line no-use-before-define
      activityContent();
      // eslint-disable-next-line no-use-before-define
      getRangkingList();
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 主活动信息
const activityContent = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/vivo/comedy/activityContent', {
    activityId,
    pin: userPin.value,
    uuid: helpUuid,
  }).then((res) => {
    if (res.result) {
      if (res.data.totalValue > 1000000) {
        BeforeRealLaugh.value = 1000000;
      } else {
        BeforeRealLaugh.value = res.data.totalValue;
      }
      myLaughSore.value = res.data.myValue;
      myTotalValue.value = res.data.myTotalValue;
      openTaskStatus.value = res.data.openTaskStatus;
      followTaskStatus.value = res.data.folowTaskStatus;
      addTaskStatus.value = res.data.addTaskStatus;
      liveInfo.value = res.data.liveInfo;
      concatList.value = videoList.value.map((item, index) => ({ ...item, ...res.data.videoList[index] }));
      guessingList.value = res.data.guessingList;
      // ysStartTime.value = (new Date((res.data.presellInfo.ysStartTime).replace(/-/g, '/')).getTime() - new Date().getTime());
      ysStartTime.value = (new Date((res.data.presellInfo.ysStartTime).replace(/-/g, '/')).getTime());
      ysEndTime.value = (endTime - new Date().getTime());
      preSell.value = res.data.presellInfo.presellFlag;
      canAnswer.value = res.data.canAnswer;

      // 发布会时间 预售时间切换
      if (new Date().getTime() > ysStartTime.value) {
        checkZFTime.value = 1640793600000 - new Date().getTime();
      } else {
        checkZFTime.value = 1640172600000 - new Date().getTime();
      }

      if (res.data.toastGuissing) {
        openWindow('guessYWin');
      }
      helpStatus.value = res.data.isHelpSuccess;
      myUuid.value = res.data.uuid;

      if (res.data.isBind) {
        if (!isOpenCarded) {
          openWindow('openWin');
        } else if (res.data.isHelpSuccess) {
          Toast('助力成功');
        }
      }
      checkYsStatus.value = (new Date().getTime() >= new Date((res.data.presellInfo.ysStartTime).replace(/-/g, '/')).getTime());

      if (new Date().getTime() > new Date((res.data.presellInfo.ysEndTime).replace(/-/g, '/')).getTime()) {
        bookBtn.value = '正式开售';
        // openWindow('newPSWin');
      } else {
        openWindow('newPSWin');
        bookBtn.value = '预售已开启';
      }

      if (growWidth.value < 90 && growWidth.value !== 0) {
        shining.value = true;
      }
    } else {
      window.location.href = `${window.location.origin}/common/riskInfo?shopId=${venderId}`;
    }
    Toast.clear();
  });
};
// 我的奖品
const getPrizeList = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/vivo/comedy/getDrawRecord', {
    activityId,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      prizeList.value = res.data;
    } else {
      Toast(res.errorMessage);
    }
    Toast.clear();
  });
};
// 我的爆笑值记录
const getMyLaughRecord = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/crm/vivo/comedy/getValueRecord', {
    activityId,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      myLaughList.value = res.data;
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 获取弹幕
const getBarrageList = () => {
  // Toast.loading({
  //   message: '加载中...',
  //   forbidClick: true,
  // });
  cjwxRequest.post('/crm/vivo/comedy/getBarrage', {
    activityId,
    pin: userPin.value,
    rankSize: 100,
  }).then((res) => {
    if (res.result) {
      danmus.value = res.data.contentList.map((item) => item.content);
      canSend.value = res.data.canSend;
      dayCanSendTimes.value = res.data.dayCanSendTimes;
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 发送弹幕
const sendBarrage = (nowComment) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/vivo/comedy/sendBarrage', {
    activityId,
    pin: userPin.value,
    content: nowComment,
  }).then((res) => {
    if (res.result) {
      collectLaughNum.value = res.data;
      openWindow('collectLaugh');
      getBarrageList();
      activityContent();
      // eslint-disable-next-line no-use-before-define
      getRangkingList();
      // getMyLaughRecord();
    } else {
      Toast(res.errorMessage);
    }
    Toast.clear();
  });
};
// 去直播间
const watchLive = () => {
  window.location.href = liveInfo.value.link;
  reportClick();
  // eslint-disable-next-line no-use-before-define
  getWatchLive();
};
// 扭蛋机抽奖
const getLottory = () => {
  if (!isOpenCarded) {
    openWindow('openWin');
    return;
  }
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/crm/vivo/comedy/start', {
    activityId,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      drawInfoData.value = res.data;
      if (res.data.wdsrvo.id === 0) {
        openWindow('noLotteryWin');
      } else {
        openWindow('lotteryWin');
      }
      activityContent();
      // eslint-disable-next-line no-use-before-define
      getRangkingList();
    } else {
      Toast({
        message: res.errorMessage,
        forbidClick: true,
        duration: 2000,
      });
    }
  });
};
// 点选队伍
const chooseGroup = (taskId, name, stop) => {
  if (stop) {
    Toast('本期竞猜未开始');
    return;
  }
  // else if ((myLaughSore.value - 100) < 0) {
  //   openWindow('noGEWin');
  //   return;
  // }
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/crm/vivo/comedy/guessing', {
    activityId,
    pin: userPin.value,
    taskId,
  }).then((res) => {
    if (res.result) {
      Toast(`您已选择了${name}队伍`);
      // eslint-disable-next-line no-use-before-define
      activityContent();
      // eslint-disable-next-line no-use-before-define
      getRangkingList();
    } else {
      Toast(res.errorMessage);
    }
  });
  // isChoose.value = true;
  // noChoose.value = false;
  // concatList.value.forEach((item, gIndex) => {
  //   if (index !== vIndex) {
  //     concatList.value[vIndex].maskdex = true;
  //     concatList.value[vIndex].id = Math.floor((Math.random() * 10000000) + 1);
  //   }
  // });
};
// 打开填写信息弹窗
const openFix = (addressId) => {
  currentAddressId.value = addressId;
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/vivo/comedy/getAddress', {
    activityId,
    pin: userPin.value,
    addressId,
  }).then((res) => {
    if (res.result) {
      formData.value.receiver = res.data.receiver;
      formData.value.phone = res.data.phone;
      formData.value.province = res.data.province;
      formData.value.city = res.data.city;
      formData.value.district = res.data.district;
      formData.value.address = res.data.address;
      openWindow('fixInfoWin');
    } else {
      Toast(res.errorMessage);
    }
    Toast.clear();
  });
};
// 排行榜开奖
const rankOpen = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/crm/vivo/comedy/lottery', {
    activityId,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      rankOpenData.value = res.data;
      openWindow('rankOpenWin');
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 获取爆笑排行榜
const getRangkingList = () => {
  cjwxRequest.post('/crm/vivo/comedy/getRangkingList', {
    activityId,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      mySort.value = res.data.mySort;
      giftInfoList.value = res.data.giftInfoList;
      rankList.value = res.data.rankList;
      initSwiper();
      rankOpenPrize.value = res.data.status;
      if (rankOpenPrize.value) {
        rankOpen();
      }
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 获取sku商品
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
// 提交个人信息
const commitInfo = (infoData) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/vivo/comedy/saveAddress', {
    activityId,
    pin: userPin.value,
    id: currentAddressId.value,
    venderId,
    receiver: infoData.value.receiver,
    phone: infoData.value.phone,
    province: infoData.value.province,
    city: infoData.value.city,
    district: infoData.value.district,
    address: infoData.value.address,
  }).then((res) => {
    if (res.result) {
      Toast('填写成功');
      closeWindow();
      // getPrizeList();
      // getMyLaughRecord();
    } else {
      Toast(res.errorMessage);
    }
    Toast.clear();
  });
};
// 获得直播奖励
const getWatchLive = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/vivo/comedy/watchLive', {
    activityId,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      Toast(`恭喜您获得${res.data}爆笑值`);
    }
    Toast.clear();
  });
};
// 获得视频奖励
const getVideoPrize = (thisId) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/vivo/comedy/watchVideo', {
    activityId,
    pin: userPin.value,
    taskId: thisId,
  }).then((res) => {
    if (res.result) {
      collectLaughNum.value = res.data;
      openWindow('collectLaugh');
      activityContent();
      getRangkingList();
    } else {
      Toast(res.errorMessage);
    }
    Toast.clear();
  });
};
// 获取题目
const getQaData = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/vivo/comedy/getQuestiont', {
    activityId,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      qaData.value = res.data;
      openWindow('questionWin');
    } else {
      Toast(res.errorMessage);
    }
    Toast.clear();
  });
};
// 获取答案
const getAnswer = (e) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/crm/vivo/comedy/answer', {
    activityId,
    pin: userPin.value,
    vivoUserQaVo: JSON.stringify(e),
  }).then((res) => {
    if (res.result) {
      if (Number(e.isRightKey) === 1) {
        collectLaughNum.value = res.data;
        openWindow('collectLaugh');
        activityContent();
        getRangkingList();
      } else {
        Toast('抱歉您答错，欢迎明日挑战');
      }
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 点击预约
const addPresell = () => {
  // if (checkYsStatus.value) {
  //   openWindow('newPSWin');
  // } else {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/vivo/comedy/addPresell', {
    activityId,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      preSell.value = true;
      window.location.href = 'https://item.m.jd.com/product/100029782958.html';
      reportClick();
    } else {
      Toast(res.errorMessage);
    }
    Toast.clear();
  });
  // }
};
// 点击我的奖品按钮
const openPrizeBtn = () => {
  getPrizeList();
  openWindow('prizeWin');
};
// 点击爆笑值记录按钮
const openLaughRank = () => {
  getMyLaughRecord();
  openWindow('laughWin');
};
const openQuestion = () => {
  if (canAnswer.value) {
    getQaData();
  } else {
    Toast('已无答题次数');
  }
};
getActivityInfo();
activityContent();
getBarrageList();
getRangkingList();
getSkuList();
</script>

<style lang='scss'>
#app {
  max-width: 750px;
  background-color: #0b1e3c;
  font-family: Source Han Sans CN, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

//ul,ol,li,dd,dt,dl{
//  list-style:none;
//}
//*{
//  box-sizing: border-box;
//}
//*::after{
//  box-sizing: border-box;
//}
//*::before{
//  box-sizing:border-box;
//}
::-webkit-input-placeholder {
  color: whitesmoke;
  font-size: .2rem;
  font-weight: bolder;
}

.gray {
  filter: grayscale(1);
}

.gray-cover {
  background-color: rgba(0, 0, 0, .4);
}

img {
  width: 100%;
  margin: .1rem auto;
}

.van-popup {
  background: none;
  overflow: hidden;
}

.van-toast {
  background-color: rgba(0, 0, 0, .7);
  min-width: max-content;
}

.red-span {
  color: #de300b;
  font-weight: 600;
  font-size: 0.3rem;
}

.count-area {
  display: flex;
  font-size: 0.23rem;
  align-items: center;
  justify-content: center;
  margin-top: .2rem;
  font-weight: 500;
}

.time-text {
  display: inline-block;
  margin: 0 .04rem;
  color: black;
  font-size: .2rem;
}

.time-num {
  display: inline-block;
  width: 0.25rem;
  color: black;
  font-size: 0.2rem;
  text-align: center;
  background-color: #ffc50b;
  box-shadow: 1px 1px black;
  margin: 0 .03rem;
  font-weight: 600;
}

.main-kv {
  position: relative;
  width: 100%;
  height: 10.7rem;
  margin: 0;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/139125/28/26168/589008/61b1e5bbEf357e6f9/786491e2a48e7683.png") no-repeat;
  background-size: 100%;

  .rule-btn {
    position: absolute;
    width: 1.1rem;
    height: 0.35rem;
    top: 0.9rem;
    right: 0;
    border-radius: 0.5rem 0 0 0.5rem;
    font-size: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid;
    border-right-width: 0;
  }

  .prize-btn {
    position: absolute;
    width: 1.1rem;
    height: 0.35rem;
    top: 1.4rem;
    right: 0;
    border-radius: 0.5rem 0 0 0.5rem;
    font-size: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid;
    border-right-width: 0;
  }

  .laugh-btn {
    position: absolute;
    width: 2rem;
    height: 0.35rem;
    top: 1.2rem;
    left: 0;
    border-radius: 0 0.5rem 0.5rem 0;
    font-size: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid;
    border-left-width: 0;
  }

  .comment-area {
    position: absolute;
    top: 8rem;
    width: 100%;
    height: 3rem;

    .comment-show {
      height: 2rem;
    }

    .add-area {
      display: flex;
      width: 4.85rem;
      background-color: #3b8732;
      border-radius: 1rem;
      border: 1px solid black;
      margin: 0.3rem auto 0;
      align-items: center;
      height: .7rem;

      input {
        width: 3.15rem;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        border: 0;
        background: none;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        padding-left: 0.1rem;
        white-space: nowrap;
        word-break: keep-all;
        font-size: .2rem;
        height: 100%;
      }

      button {
        left: 4.6rem;
        border-radius: 1rem;
        width: 1.6rem;
        white-space: nowrap;
        word-break: keep-all;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        height: 100%;
      }
    }
  }
}

.live-area {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .live-title {
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/204962/17/17073/31285/61a9c155E464cdfb4/680db21fc30c9200.png") no-repeat;
    background-size: 100%;
    width: 5.42rem;
    height: 1.45rem;
  }

  .live-title-text {
    color: #FFFFFF;
    margin-bottom: 0.1rem;
    font-size: .26rem;
    text-align: center;
  }

  .live-house {
    width: 6.86rem;
    height: 3.35rem;
    border-radius: 0.1rem;
    border-bottom: 0.1rem solid #de300b;

    .live-house-mask{
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: .7;
      display: flex;
      justify-content: center;
      align-items: center;

      .live-house-icon{
        background: url("//img10.360buyimg.com/imgzone/jfs/t1/171640/8/23006/2461/61b17bb4E27da16f5/f459a0f02614ab4e.png") no-repeat;
        background-size: 100%;
        width: .9rem;
        height: .9rem;
      }
    }
  }
}

.video-area {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #de300b;
  width: 7rem;
  height: 2.83rem;
  justify-content: center;
  align-items: center;
  margin-top: 2.8rem;
  border-radius: 0.1rem;
  border-bottom: 0.1rem solid #ffc50b;

  .video-area-bg-title {
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/156654/16/26910/37007/61b0495dE8b8af091/bedc8a6c15faf633.png") no-repeat;
    background-size: 100%;
    width: 7rem;
    height: 3rem;
    margin-top: -4.5rem;
  }

  .video-area-title {
    color: #FFFFFF;
    font-size: .26rem;
    position: absolute;
    top: -.7rem;
  }

  .video-list {
    position: absolute;
    width: 6.6rem;
    display: flex;
    align-items: stretch;
    flex-direction: row;
    overflow-x: scroll;
    top: .6rem;
    height: 2.05rem;
    //column-gap: .1rem;
    .video-style {
      margin-right: .1rem;
      //padding-bottom: .27rem;
      width: 3rem;
      flex-grow: 0;
      flex-shrink: 0;
      border-radius: .2rem .2rem 0 0;
      overflow: hidden;
      //background-color: #e5fe42;
    }
  }
}

.book-mem {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/141057/30/21807/31591/61ac63efEa903314b/2b08771b1675a3a6.png") no-repeat;
  background-size: 100%;
  width: 7rem;
  height: 4.45rem;
  margin-top: .5rem;
  position: relative;

  .book-list {
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/172365/14/22393/8496/61ac661bE9ce17507/58e87d935f78de62.png") no-repeat;
    background-size: 100%;
    width: 6.38rem;
    height: 1.01rem;
    position: relative;
    margin: 2.2rem auto 0;
    display: flex;
    align-items: center;

    .book-item-text {
      text-align: center;
      width: 4rem;
      font-size: .26rem;
      margin-left: .25rem;
      font-weight: 500;

      span {
        color: #de300b;
      }
    }

    .book-btn {
      width: 1.7rem;
      height: 0.5rem;
      border-radius: 1rem;
      background-color: #3b8732;
      border: 2px solid black;
      display: flex;
      align-items: center;
      justify-content: center;
      text-shadow: 0 0 0 black, 1px 1px black, -1px 1px black, 1px -1px black, -1px -1px black;
      color: #ffffff;
      margin-left: 0.1rem;
      font-size: 0.25rem;
      white-space: nowrap;
      word-break: keep-all;
    }
  }
}

.surprise-one {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/219497/1/6555/33203/61a9eff8E8fb13f9e/53ff0150593d5852.png") no-repeat;
  background-size: 100%;
  width: 7rem;
  height: 6.54rem;
  margin-top: .5rem;
  position: relative;

  .surprise-one-title {
    margin: 1.3rem auto 0;
    text-align: center;
    color: #ffffff;
    font-size: .26rem;
  }

  .my-laugh-sore {
    text-align: center;
    margin-top: 0.5rem;
    color: #ffc50b;
    text-shadow: 0 0 0 black, 1px 1px black, -1px 1px black, 1px -1px black, -1px -1px black;
    font-style: oblique;

    span {
      text-shadow: none;
    }
  }

  .grow-process {
    position: absolute;
    //width: 100%;
    //height: 1.4rem;
    top: 3.3rem;
    left: -1.1rem;

    .process-bg {
      width: 5.5rem;
      height: 0.2rem;
      background-color: #e0231f;
      background-size: 100% 100%;
      margin: 0.73rem 0 0 1.45rem;
      position: relative;
      border-radius: 1rem;
      border: 3px solid black;

      .progress-active {
        width: 100%;
        height: 100%;
        border-radius: 1rem;
        background-image: linear-gradient(#fad385, #fe9829, #ff5c35);
        transition-duration: 0.5s;
        transition-timing-function: linear;
        position: relative;
        top: -0.02rem;
        left: 0;

        .price-span {
          background: url("//img10.360buyimg.com/imgzone/jfs/t1/218680/39/6732/7212/61ac48b6E6473cbfe/3ac9e3201f6373a1.png") no-repeat;
          background-size: 100% 100%;
          /* width: 1.9rem; */
          padding: 0 .1rem;
          height: 0.58rem;
          margin-top: -0.75rem;
          margin-right: -1.12rem;
          text-align: center;
          color: #de300b;
          white-space: nowrap;
          word-break: keep-all;
          font-size: 0.2rem;
          right: 0;
          position: absolute;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .shining-span {
          background: url("//img10.360buyimg.com/imgzone/jfs/t1/137671/26/22187/32181/61ac526fEcb215b7a/d4a9c940bf2eb9a2.png") no-repeat;
          background-size: 100% 100%;
          width: 1.47rem;
          height: 1.46rem;
          margin-top: -0.65rem;
          margin-right: -0.7rem;
          right: 0;
          position: absolute;
        }
      }
    }
  }

  .process-end {
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/130776/8/23840/7764/61ac5b50Ec360df12/3137d197b3da73b8.png") no-repeat;
    background-size: 100%;
    width: 1.47rem;
    height: .55rem;
    position: absolute;
    right: -.7rem;
    top: .6rem;
  }

  .get-chance {
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/161181/23/27361/25723/61ac8be9E549a2170/89bbd551f9fd14c2.png") no-repeat;
    background-size: 100%;
    width: 4.16rem;
    height: .79rem;
    margin: 1.55rem auto 0;
  }

  .got-chance {
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/214297/17/6847/27084/61af300dE60277057/294f70f3f9b6e063.png") no-repeat;
    background-size: 100%;
    width: 4.16rem;
    height: .79rem;
    margin: 1.55rem auto 0;
  }
}

.chance-btns {
  display: flex;
  justify-content: center;
  margin-top: .2rem;

  .chance-open {
    display: flex;
    flex-direction: column;
    align-items: center;

    .chance-open-btn {
      background: url("//img10.360buyimg.com/imgzone/jfs/t1/173279/4/21989/18012/61ac9182E752eaa09/cbdf2ee2f0b9e1c4.png") no-repeat;
      background-size: 100%;
      width: 2.97rem;
      height: .79rem;
    }

    .chance-open-text {
      background: url("//img10.360buyimg.com/imgzone/jfs/t1/200872/11/18157/6193/61ac9183Ef07c229d/c98112f66a11c7ca.png") no-repeat;
      background-size: 100%;
      width: 1.69rem;
      height: .3rem;
    }
  }

  .chance-book {
    display: flex;
    flex-direction: column;
    align-items: center;

    .chance-book-btn {
      background: url("//img10.360buyimg.com/imgzone/jfs/t1/137589/29/22508/19252/61ac9182Eeb022c9b/bdbb4bf1550b933e.png") no-repeat;
      background-size: 100%;
      width: 2.97rem;
      height: .79rem;
    }

    .chance-book-text {
      background: url("//img10.360buyimg.com/imgzone/jfs/t1/163962/4/21002/6100/61ac9182E0fdd88ee/68cad05ed013aaf2.png") no-repeat;
      background-size: 100%;
      width: 1.69rem;
      height: .3rem;
    }
  }
}

//惊喜二
.surprise-two {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/140915/24/22707/47321/61af43d8E1e28c8ac/b7a337c266508735.png") no-repeat;
  background-size: 100%;
  width: 7rem;
  height: 7.55rem;
  margin-top: .5rem;
  position: relative;

  .surprise-two-title {
    margin: 1.2rem auto 0;
    text-align: center;
    color: #ffc50b;
    font-size: .26rem;
  }

  .guess-bg {
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/214617/8/6838/21863/61aca568E1d9883f5/fe2c9675203abb78.png") no-repeat;
    background-size: 100%;
    width: 6.22rem;
    height: 3.89rem;
    margin: 0.18rem auto 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    .guess-text {
      margin-top: .95rem;
      margin-left: 1.2rem;
      color: #ffc50b;
      font-size: .26rem;
    }

    .group-list {
      width: 95%;
      height: 53%;
      display: flex;
      justify-content: space-between;
      margin-top: 0.3rem;
      margin-right: .1rem;
      overflow-x: scroll;

      .group-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        .group-item-img {
          width: 1.94rem;
          height: 1.46rem;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-bottom: .5rem;
        }

        .group-item-btn {
          background-color: #ffc50b;
          border-radius: 1rem;
          border: 2px solid black;
          width: 1.68rem;
          height: .38rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}

//惊喜三
.surprise-three {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/213413/9/6864/181738/61acb662E9f16f480/d1649525279dc020.png") no-repeat;
  background-size: 100%;
  width: 7rem;
  height: 8.55rem;
  margin-top: .5rem;
  position: relative;

  .surprise-three-title {
    margin: 5.65rem auto 0;
    text-align: center;
    color: #1d7bdf;
    font-size: .26rem;
  }
}

//惊喜四
.surprise-four {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/219929/10/6623/33224/61acb9a4E2f54cb0b/0b29315eb8f55bba.png") no-repeat;
  background-size: 100%;
  width: 7rem;
  height: 10rem;
  margin-top: .5rem;
  position: relative;

  .surprise-four-prize-list {
    width: 6.39rem;
    height: 2.9rem;
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/210285/9/11168/13935/61acbc6aE7c8a7d65/634afdeb1f564456.png") no-repeat;
    background-size: 100%;
    margin: 2.2rem auto 0;
  }

  .surprise-four-prize-area {
    position: absolute;
    top: 3rem;
    left: .15rem;
    width: 6.55rem;
    display: flex;
    justify-content: space-around;

    .surprise-four-prize-item {
      width: 1.5rem;

      img {
        width: 1.2rem;
        height: 1.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      > div {
        font-size: .26rem;
        text-align: center;
        //margin-top: -.15rem;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }

  .surprise-four-rank-title {
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/172700/7/21505/7710/61ad768dE9726a463/02cd33039bdde02b.png") no-repeat;
    background-size: 100%;
    width: 5.09rem;
    height: .44rem;
    margin: .5rem auto 0;
  }

  .surprise-four-rank-myRank {
    position: absolute;
    bottom: 1rem;
    width: 3rem;
    left: .5rem;
    color: #ffc50b;
    text-shadow: 0 0 0 black, 1px 1px black, -1px 1px black, 1px -1px black, -1px -1px black;
    font-style: oblique;
    font-size: .26rem;
  }

  .surprise-four-rank-myLaugh {
    position: absolute;
    bottom: 1rem;
    width: 3rem;
    right: .5rem;
    color: #ffc50b;
    text-shadow: 0 0 0 black, 1px 1px black, -1px 1px black, 1px -1px black, -1px -1px black;
    font-style: oblique;
    text-align: right;
    font-size: .26rem;
  }
}

.surprise-four-rank-list {
  width: 100%;
  height: 1.82rem;
  overflow: hidden;
  position: absolute;
  top: 6.2rem;
}

.winner {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.05rem 0 0;
  margin: .11rem 0 0 .6rem;
  width: 6rem;
  border: 2px solid black;

  &:nth-child(3n+1) {
    background-color: #fb6d01;
  }

  &:nth-child(3n+2) {
    background-color: #0e5337;
  }

  &:nth-child(3n+3) {
    background-color: #1a5ebf;
  }
}

.winner img {
  width: 0.6rem;
  height: 0.6rem;
  object-fit: cover;
  border-radius: 1.2rem;
}

.winner span {
  display: block;
  font-size: 0.28rem;
  color: #FFFFFF;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: baseline;
}

.winner-null {
  text-align: center;
  line-height: 1.75rem;
  font-size: 0.3rem;
  color: #ffffff;
  font-weight: 500;
}

//做任务领取爆笑值
.surprise-getPrize-List-bg {
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/199353/12/19369/31946/61adb5d6E826035ed/3bcaa4141e9b736d.png") no-repeat;
  background-size: 100%;
  width: 7rem;
  height: 7.5rem;
  margin-top: 0.5rem;
  position: relative;

  .surprise-getPrize-List {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 2.2rem;

    > div {
      background: url("//img10.360buyimg.com/imgzone/jfs/t1/210822/33/11777/7735/61adb99aE6781d886/1384b6486dcc3b93.png") no-repeat;
      background-size: 100%;
      width: 6.38rem;
      height: 1rem;
      display: flex;
      align-items: center;
      margin-bottom: .2rem;

      > div {
        width: 4rem;
        font-size: 0.24rem;
        margin-left: 0.5rem;
        font-weight: 500;

        span {
          color: #de300b;
        }
      }

      > button {
        width: 1.5rem;
        height: 0.5rem;
        border: 2px solid black;
        font-size: .23rem;
        border-radius: 1rem;
        background-color: #3b8732;
        color: #ffffff;
      }
    }
  }
}
// 爱奇艺图标
.iqy-icon{
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/137673/9/22480/16941/61b02661E4906b620/eb3f820a42f797d7.png") no-repeat;
  background-size: 100%;
  width: 7rem;
  height: 1.5rem;
  margin-top: 0.3rem;
  position: relative;
}
//曝光商品
.sku-bg {
  //background: url("//img10.360buyimg.com/imgzone/jfs/t1/206810/29/11733/25489/61adca77E5603061f/5d6ef27a0c4cb58b.png") no-repeat;
  //background-size: 100%;
  background-color: #de300b;
  width: 6.8rem;
  margin: 1.5rem auto 0.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: .1rem;
  border-bottom: .1rem solid #ffc50b;

  .sku-bg-title {
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/160298/4/22492/18520/61b02661E7ef56dd8/bb5abe971287d5e8.png") no-repeat;
    background-size: 100%;
    width: 7rem;
    height: 2rem;
    margin-top: -1.4rem;
  }

  .sku-area {
    width: 96%;
    margin: .1rem auto .3rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .sku-item {
      background: url("//img10.360buyimg.com/imgzone/jfs/t1/212308/21/6801/5843/61adcb43E3a1a9065/cf5789c5cc35e357.png") no-repeat;
      background-size: 100%;
      width: 3.1rem;
      height: 3.98rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: .1rem;

      > img {
        width: 70%;
        margin-top: 0.2rem;
      }

      .sku-top {
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        width: 90%;
        font-size: .25rem;
        margin-top: .1rem;
      }

      .sku-bottom {
        display: flex;
        align-items: center;

        .sku-price {
          width: 1.3rem;
          color: red;
          font-weight: 500;
          font-size: .25rem;
        }

        .sku-btn {
          width: 1.4rem;
          height: 0.5rem;
          border: 2px solid black;
          font-size: 0.22rem;
          border-radius: 1rem;
          background-color: #3b8732;
          color: #ffffff;
        }
      }
    }
  }
}

.join-mem {
  position: absolute;
  width: 3rem;
  height: 1rem;
  top: 9.1rem;
  left: 3.5rem;
  text-align: center;
  color: #ffffff;
  font-weight: 500;
}

.join-btn {
  width: 1.8rem;
  height: 0.6rem;
  background-color: #112c49;
  border-radius: 1rem;
  position: absolute;
  left: 4rem;
  top: 10.1rem;
  color: #FFFFFF;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: .25rem;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 7.5rem;
}

</style>
