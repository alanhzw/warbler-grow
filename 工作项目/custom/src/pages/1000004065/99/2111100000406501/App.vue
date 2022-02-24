<!--
 * @actName:
 * @author: Ronghua lin
 * @createDate: 2021/11/29
 * @filePath: D:\A-Code\custom\src\pages\1000004065\2111100000406501\App.vue
-->
<template>
  <!-- background -->
  <div class="background">
    <div class="kv" @click="gotoSkuPage(100016562739)"></div>
    <!--  tips  -->
    <!--    <div class="purchase-tip">每日 20:30 限量发放 {{ bgmInfo.totalCount }} 个<br/>今天剩余（ {{ bgmInfo.todayBgmCount }} ）个必购码</div>-->
    <!--    入会答题入口  -->
    <!--    <img class="member-btn" src="./assets/img/index/btn-member.png" @click="getQuestion()"/>-->
    <!--    答题机会  -->
    <!--    <div class="qa-change">今天还剩{{ contentData.qaChance }}次答题机会</div>-->
    <!--    时间轴  -->
    <!--    <img class="time-line" src="./assets/img/index/time-line.png"/>-->
    <!--    活动规则入口  -->
    <!--    <div class="rule-btn" @click="changeRule(0)">活动规则 ></div>-->
    <!--    做任务赢答题机会标题  -->
    <!--    <img class="title-1" src="./assets/img/index/title-1.png"/>-->
    <!--    任务显示区域  -->
    <!--    <div class="task-1">-->
    <!--      <div class="view" :class="{'task-line':index>0}"-->
    <!--           v-for="(item,index) in contentData.oppoBgmQaButtonModelDtos" :key="index">-->
    <!--        <div style="text-align: left">-->
    <!--          <div style="font-size: .34rem">-->
    <!--            <span>{{ item.modelName }}</span>-->
    <!--            <span v-if="item.modelName !== '分享好友'">（{{ item.status }} / 1）</span>-->
    <!--          </div>-->
    <!--          <div v-if="item.code==='plusMember'" style="color: #fff4df;font-size: .24rem">+3 次答题机会</div>-->
    <!--          <div v-else style="color: #fff4df;font-size: .24rem">+1 次答题机会</div>-->
    <!--        </div>-->
    <!--        <div class="btn-bg" :class="{'gray':item.status === 1}"-->
    <!--             @click="item.status === 0?operationBtn(item):''">-->
    <!--          {{ item.buttonName }}-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    做任务赢答题机会标题  -->
    <img class="title-2" id="lottery" src="./assets/img/index/title-2.png"/>
    <!--    九宫格抽奖  -->
    <JiuGongLottery @getResult="getLotteryResult"
                    @drawIsOver="openDialog('lottery')"
                    :drawNum="canDrawTimes"
                    :drawPrizeInfo="lotteryInfo"
                    :winnerInfo="winnerInfo">
    </JiuGongLottery>
    <!--    抽奖信息按钮  -->
    <div class="lottery-info">
      <!--    我的奖品按钮  -->
      <div class="lottery-btn" @click="getMyPrizeList()"></div>
      <!--    抽奖规则按钮  -->
      <div class="lottery-btn" @click="changeRule(1)"></div>
    </div>
    <!--    做任务赢抽奖机会标题  -->
    <img class="title-1" src="./assets/img/index/title-3.png"/>
    <!--    任务显示区域  -->
    <div class="task-2">
      <div class="view" :class="{'task-line':index>0}" style="height: 1.66rem"
           v-for="(item,index) in contentData.oppoBgmDrawButtonModelDtos" :key="index">
        <div style="text-align: left">
          <div style="font-size: .34rem">
            <span>{{ item.modelName }}</span>
            <span v-if="item.modelName === '分享好友'">（{{ item.status }} / 3）</span>
            <span v-else>（{{ item.status }} / 1）</span>
          </div>
          <div v-if="item.code==='plusMember'" style="color: #fff4df;font-size: .24rem">+10 次抽奖机会</div>
          <div v-else style="color: #fff4df;font-size: .24rem">+1 次抽奖机会</div>
        </div>
        <div class="btn-bg" :class="{'gray':item.status === 1 &&item.modelName !== '分享好友'}"
             @click="operationBtn(item)">
          {{ item.buttonName }}
        </div>
      </div>
    </div>
    <img src="./assets/img/index/icon.png" style="width: 1.65rem;position: absolute;right: 0;bottom: 16.3rem"/>
    <!--    sku1  -->
    <img @click="gotoSkuPage(100016562739)" src="./assets/img/index/sku1.png" style="width: 7.15rem;margin: .41rem 0"/>
    <!--    sku2  -->
    <div class="sku-2">
      <div class="sku-view" @click="gotoSkuPage(100029371874)"></div>
      <div class="sku-view" @click="gotoSkuPage(100016216549)"></div>
    </div>
    <!--    进店逛逛  -->
    <img src="./assets/img/index/btn-shop.png" @click="gotoShopPage(venderId)"
         style="width: 5.3rem;margin-top: 1.28rem"/>
  </div>

  <van-popup class="popup" v-model:show="dialogShow" :close-on-click-overlay="false">
    <RuleDialog @close="closeDialog" :rule="rule" v-if="dialogName === 'rule'"></RuleDialog>
    <MyPrizeDialog @close="closeDialog" v-if="dialogName === 'prize'" :myPrizeArr="myPrizeArr"></MyPrizeDialog>
    <BuyCodeDialog @close="closeDialog" @share="shareActivity('shareQa')" :status="buyCodeStatus"
                   :isCourse="buyCodeCourse"
                   :buycode="bgmInfo"
                   v-if="dialogName === 'buycode'"></BuyCodeDialog>
    <LotteryResultDialog @close="closeDialog" :winnerInfo="winnerInfo"
                         v-if="dialogName === 'lottery'"></LotteryResultDialog>
    <QuestionDialog @close="closeDialog" :questionInfo="questionInfo" @getQaResult="getQaResult"
                    @getHasBuyCode="getHasBuyCode" v-if="dialogName === 'question'"></QuestionDialog>
  </van-popup>

</template>

<script lang='ts' setup>
import { ref, inject, computed, nextTick } from 'vue';
import { Toast, Popup as vanPopup } from 'vant';
import { callShare } from '@/utils';
import { gotoSkuPage, gotoShopPage } from '@/utils/platforms';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

import { stateUrl, achievementGiftArr } from './assets/ts/imgUrl';
import RuleDialog from './components/RuleDialog.vue';
import MyPrizeDialog from './components/MyPrizeDialog.vue';
import BuyCodeDialog from './components/BuyCodeDialog.vue';
import QuestionDialog from './components/QuestionDialog.vue';
import LotteryResultDialog from './components/LotteryResultDialog.vue';

import JiuGongLottery from './components/JiuGongLottery.vue';
import { LotteryConfig } from './assets/ts/JiuGongConfig';

const shareChannel = ['Wxfriends', 'Sinaweibo'];
const myPrizeArr = ref([]);
const questionInfo = ref({});

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const isOpenCard: boolean = inject('isOpenCard') as boolean;
// 获取活动id
const { activityId, venderId } = baseInfo;

const rule = ref(''); // 规则弹窗数
const activityRule = ref(''); // 活动规则
const lotteryRule = ref(''); // 九宫格抽奖规则

const bgmInfo = ref({}); // 必购码信息

const canDrawTimes = ref(0); // 可抽奖次数
const lotteryInfo = ref({}); // 奖盘信息
const winnerInfo = ref({}); // 中奖信息

const buyCodeCourse = ref(false); // 是否在答题过程中
const buyCodeStatus = ref('none'); // 获取必购码状态

// 主接口数据
const contentData = ref({});

const taskArr: any [] = [];

/* ---------------------------------  dialog  ------------------------------- */
// 弹窗是否显示
const dialogShow = ref(false);
// 显示的弹窗标示位
const dialogName = ref('prize');

// 打开弹窗
const openDialog = (name: string) => {
  dialogName.value = name;
  dialogShow.value = true;
};

// 关闭弹窗
const closeDialog = (e: any) => {
  dialogShow.value = false;
  if (e === 'scroll') {
    document.getElementById('lottery').scrollIntoView();
  }
};
/* --------------------------------------------------------------------------- */

// 开卡跳转
const goOpenCard = () => {
  window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=100000000001320&channel=401&returnUrl=${window.location.href}`;
};

// 切换活动规则 || 转盘规则
const changeRule = (num: number) => {
  rule.value = num === 0 ? activityRule.value : lotteryRule.value;
  openDialog('rule');
};

// 必购码接口
const getBgmCountPort = () => {
  cjwxRequest.post('/oppo/bgmdraw/getBgmCount', {
    activityId,
  }).then((res) => {
    if (res.result) {
      bgmInfo.value = res.data;
    }
  });
};

// 组件:点击下一题时，判断此时是否还有必购码
const getHasBuyCode = () => {
  cjwxRequest.post('/oppo/bgmdraw/getBgmCount', {
    activityId,
  }).then((res) => {
    if (res.result) {
      bgmInfo.value = res.data;
      if (!res.data.hasSurBgm) {
        // 今日无剩余必购码
        buyCodeStatus.value = 'none';
        buyCodeCourse.value = true;
        openDialog('buycode');
      }
    }
  });
};

// 题目接口
const getQuestionPort = () => {
  // Toast.loading({
  //   message: '加载中...',
  //   forbidClick: true,
  // });
  cjwxRequest.post('/oppo/bgmdraw/getQaContent', {
    activityId,
  }).then((res) => {
    if (res.result) {
      const { data } = res;
      // 是否具备答题资格
      if (data.qaFlag) {
        questionInfo.value = data;
        openDialog('question');
      } else {
        if (data.qaFlagReason === 2) {
          // 已获得必购码
          buyCodeStatus.value = 'win';
        } else if (data.qaFlagReason === 3) {
          // 今日无剩余必购码
          buyCodeStatus.value = 'none';
        } else if (data.qaFlagReason === 4) {
          // 无剩余答题机会
          buyCodeStatus.value = 'fail';
        }
        // 未进行答题 -- 直接弹窗拒绝
        buyCodeCourse.value = false;
        openDialog('buycode');
      }
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 获取答题信息
const getQuestion = () => {
  if (!isOpenCard) {
    // 未入会跳转入会
    goOpenCard();
  } else {
    getQuestionPort();
  }
};

// 获取转盘奖品信息
const getLotteryPrizeInfo = (): any => {
  cjwxRequest.post('/wxDrawActivity/activityContent', {
    activityId: contentData.value.drawId,
  }).then((res) => {
    if (res.result) {
      // 获取谢谢参与数据
      const thanksItem = res.data.content.find((item: any) => item.type === 0);

      // 修改奖盘数据
      const arr: any[] = [];
      res.data.content.forEach((item: any, index: number) => {
        const content = res.data.content.find((_item: any) => _item.position === index + 1);
        if (content) {
          arr.push(content);
        } else {
          arr.push(thanksItem);
        }
      });

      lotteryInfo.value = arr;
      lotteryRule.value = res.data.rule;
    }
  });
};

// 抽奖
const getLotteryResult = () => {
  canDrawTimes.value -= 1;
  winnerInfo.value = {};
  cjwxRequest.post('/oppo/bgmdraw/convertDrawPrize', {
    activityId,
  }).then((res) => {
    if (res.result) {
      winnerInfo.value = res.data;
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 获取我的奖品信息
const getMyPrizeList = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wxDrawActivity/drawMyOkList', {
    activityId: contentData.value.drawId,
    type: 12,
  }).then((res) => {
    if (res.result) {
      // 删除 谢谢参与抽奖记录
      myPrizeArr.value = res.data;
      openDialog('prize');
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 获取活动规则
const getFullActInfoVo = () => {
  cjwxRequest.get(`common/brand/getFullActInfoVo?activityId=${activityId}`).then((res) => {
    if (res.result) {
      activityRule.value = res.data.rule;
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 主接口
const activityContent = async () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/oppo/bgmdraw/activityContent', {
    activityId,
  }).then((res) => {
    if (res.result) {
      contentData.value = res.data;
      canDrawTimes.value = res.data.drawChance;

      getLotteryPrizeInfo();
    } else {
      Toast(res.errorMessage);
    }
  });
  getFullActInfoVo();
  getBgmCountPort();
};

// 获取答题结果
const getQaResult = (info: any) => {
  // 是否全对
  let sum = 0;
  info.forEach((item: any) => {
    sum += item.isRightKey;
  });
  const isRight = sum === 3;

  Toast.loading({
    message: '加载中...',
    // forbidClick: true,
  });
  cjwxRequest.post('/oppo/bgmdraw/saveQaRecord', {
    activityId,
    oppoBgmUserQaVos: JSON.stringify(info),
  }).then((res) => {
    if (res.result) {
      buyCodeCourse.value = true;
      // 全对
      if (isRight) {
        if (res.data === 1) {
          // 全对，但已无剩余必购码
          buyCodeStatus.value = 'none';
        } else {
          // 全对，获取必购码
          buyCodeStatus.value = 'win';
        }
      } else {
        // 答错
        buyCodeStatus.value = 'fail';
      }
      openDialog('buycode');
      activityContent();
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 关注店铺 && 预约新品
const operationPort = (port: string) => {
  const portUrl = port === 'follow' ? '/oppo/bgmdraw/followShop' : '/oppo/bgmdraw/addPresell';
  cjwxRequest.post(portUrl, {
    activityId,
  }).then((res) => {
    if (res.result) {
      if (port === 'follow') {
        Toast('关注成功!');
      }
      setTimeout(() => {
        activityContent();
      }, 800);
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 分享埋点
const shareAnchor = (code: string) => {
  const url = code === 'shareQa' ? '/oppo/bgmdraw/qaShareRecord' : '/oppo/bgmdraw/drawShareRecord';
  cjwxRequest.post(url, {
    activityId,
  }).then((res) => {
    if (res.result) {
      Toast('分享成功!');
      setTimeout(() => {
        activityContent();
      }, 800);
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 分享
const shareActivity = (code: string) => {
  callShare({
    type: baseInfo?.shareType,
    title: '分享赢英雄联盟好礼',
    content: '抢限量定制机必购码、抽英雄联盟盲盒',
    channel: shareChannel.join(','),
    afterShare: () => {
      shareAnchor(code);
      console.log('分享回调');
    },
  });
};

// 任务操作按钮
const operationBtn = (item: any) => {
  if (item.modelName !== '分享好友' && item.status === 0) {
    console.log(item);
    if (item.code === 'plusMember') {
      window.location.href = 'https://plus.m.jd.com/index';
    } else if (item.code === 'shopMember') {
      goOpenCard();
    } else if (item.code === 'followShop') {
      operationPort('follow');
    } else if (item.code === 'orderNew') {
      operationPort('presell');
    } else {
      shareActivity(item.code);
    }
  } else if (item.modelName === '分享好友') {
    console.log(item);
    shareActivity(item.code);
  }
};

activityContent();

</script>

<style lang='scss'>
@font-face {
  font-family: 'OPPOSans-S-M';
  font-style: normal;
  font-weight: normal;
  src: url(assets/ts/OPPOSans-S-M.woff) format('woff'),
  url(assets/ts/OPPOSans-S-M.woff2) format('woff2');
  font-display: swap;
}

#app {
  font-family: 'OPPOSans-S-M', sans-serif;
}

html {
  max-width: 750px;
  margin: 0 auto;
  background: #0b0c27;
  color: #FFFFFF;

  .background {
    width: 7.5rem;
    height: 51rem;
    position: relative;
    text-align: center;
    background: {
      image: url("./assets/img/index/background.png");
      repeat: no-repeat;
      size: contain;
    };

    .kv {
      height: 11rem;
      margin-bottom: 1.2rem;
    }

    .purchase-tip {
      font-size: .4rem;
      text-align: center;
      padding-top: 1.98rem;
    }

    .member-btn {
      width: 3.35rem;
      margin-top: .38rem;
    }

    .qa-change {
      font-size: .2rem;
    }

    .time-line {
      width: 7.4rem;
      margin-top: .4rem;
    }

    .rule-btn {
      width: 1.5rem;
      text-align: right;
      font-size: 0.2rem;
      margin-left: 5.7rem;
      padding-top: .13rem;
    }

    .title-1 {
      width: 6.38rem;
      margin-top: .67rem;
    }

    .task-line {
      border-top: #45495e solid 1px;
    }

    .task-1 {
      width: 7.15rem;
      height: 3.81rem;
      margin: .65rem auto;
      background: {
        image: url("./assets/img/index/background-task1.png");
        repeat: no-repeat;
        size: cover;
      };
    }

    .title-2 {
      width: 5.58rem;
      margin-top: .39rem;
    }

    .lottery-info {
      height: .2rem;
      margin: 0 .2rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      background: {
        image: url("./assets/img/index/draw-openter.png");
        repeat: no-repeat;
        size: cover;
      };

      .lottery-btn {
        width: 1.5rem;
      }
    }

    .task-2 {
      width: 7.15rem;
      height: 9.13rem;
      margin: .73rem auto;
      padding-top: .2rem;
      box-sizing: border-box;
      background: {
        image: url("./assets/img/index/background-task2.png");
        repeat: no-repeat;
        size: contain;
      };
    }

    .view {
      height: 1.85rem;
      margin: 0 .53rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      .btn-bg {
        width: 1.5rem;
        height: .45rem;
        line-height: .45rem;
        color: #000000;
        align-items: center;
        font-size: .26rem;
        font-weight: 900;
        background: {
          image: url("./assets/img/index/btn-background.png");
          repeat: no-repeat;
          size: contain;
        };
      }
    }

    .sku-2 {
      background: {
        image: url("./assets/img/index/sku2.png");
        repeat: no-repeat;
        size: 100% 100%;
      };
      margin: 0 auto;
      width: 7.15rem;
      height: 4.76rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .sku-view {
        width: 3.5rem;
        height: 4.76rem;
      }
    }
  }
}

.popup {
  background: transparent;
}

.gray {
  /*grayscale(val):val值越大灰度就越深*/
  -webkit-filter: grayscale(100%) brightness(1);
  -moz-filter: grayscale(100%) brightness(1);
  -ms-filter: grayscale(100%) brightness(1);
  -o-filter: grayscale(100%) brightness(1);
  filter: grayscale(100%) brightness(1);
  filter: gray brightness;
}
</style>
