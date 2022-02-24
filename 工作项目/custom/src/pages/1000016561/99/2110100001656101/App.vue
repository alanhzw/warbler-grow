<!--
 * @actName: babyCare 邀新冲关挑战
 * @author: Ronghua lin
 * @createDate: 2021/10/12
 * @filePath: D:\A-Code\custom\src\pages\1000016561\99\2108100008792101\App.vue
-->
<template>
  <div class="baby-care">
    <!-- banner -->
    <img src="./assets/img/banner.png"
         class='banner'>

    <!-- 按钮组 -->
    <div class="btn-group">
      <div v-for="(item,index) in btnArr"
           :key="index"
           class="btn">
        <span class="btn-name"
              @click="openDialog(item.code)">{{ item.name }} ></span>
      </div>
    </div>

    <!-- 01 标题 -->
    <img class="title-01"
         src="./assets/img/01-title.png" />

    <!-- lottery-抽奖 -->
    <div class="lottery">
      <img style="width: 7.5rem;margin-top: .58rem"
           src="./assets/img/lottery.png" />
      <div class="my-jd">
        <div style="font-size: .22rem">我的京豆池</div>
        <div style="font-size: .24rem">{{ myBeans }}</div>
      </div>
      <div class="receive-jd">
        <div style="font-size: .22rem">已领取京豆</div>
        <div style="font-size: .24rem">{{ earndBeans }}</div>
      </div>
    </div>

    <!-- post-share-btn -->
    <img style="width: 1.65rem"
         @click="openDialog('postShareDialog')"
         src="./assets/img/post-btn.png" />
    <!-- invite-btn -->
    <img style="width: 2.4rem"
         @click="shareActivity"
         src="./assets/img/invite-btn.png" />
    <!-- invite-banner -->
    <img style="width: 5.54rem"
         src="./assets/img/invite-banner.png" />
    <!-- invite-title -->
    <div class="invite-title">
      <div style="font-size: .3rem;font-weight: 900">邀请人数</div>
      <div style="font-size: .18rem;margin-top: .12rem">* 邀请好友完成订单，解锁关卡后，京豆1-2日自动到账，优惠券需主动领取！</div>
    </div>
    <!-- invite-progress -->
    <InviteProgress v-if="contentPortSuc"
                    :inviteNumber="inviteNumber"
                    @getGiftId="getGiftId" />

    <!-- 箭头 -->
    <img style="width: .62rem;margin: .85rem auto"
         src="./assets/img/arrow.png" />

    <!-- 02 标题 -->
    <img class="title-02"
         src="./assets/img/02-title.png" />

    <!-- 任选30件 -->
    <div class="optional"
         @click="openDialog('skusDialog'),pageTrackLogCommon('选择奖品池');">
      <div class="optional-goods">
        <div v-for="(item,index) in mainSkuArr"
             :key="index"
             class="optional-sku">
          <img style="width: 1rem;margin: 0 auto"
               :src="require(`./assets/img/skus/${item.id}.jpg`)" />
          <img src="./assets/img/lock-btn.png"
               style="width: .84rem;margin-top: .12rem" />
        </div>
      </div>
    </div>

    <!-- 排行榜 -->
    <InviteRanking v-if="contentPortSuc"
                   :inviteRankingArr="inviteRankingArr" />
  </div>

  <div class="bottom-bg">
    <div class="bottom-tab">
      <template v-for="(item,index) in linkArr"
                :key="index">
        <a :href="item"
           style="width: 2rem"></a>
      </template>
    </div>
  </div>
  <span class="hover-icon"
        style="right:0rem;top:8rem;width:1rem;height:1rem;background-image:url('//img10.360buyimg.com/imgzone/jfs/t1/170883/38/22251/702022/61725979E901bb604/6ed4c4c9f8589c27.gif')"
        @click="tracking"></span>
  <van-popup class="popup"
             v-model:show="dialogShow"
             :close-on-click-overlay="popupCloseOnClick">
    <RuleDialog @closeDialog="closeDialog"
                :rule="rule"
                v-if="dialogName === 'ruleDialog'"></RuleDialog>
    <UnlockDialog @closeDialog="closeDialog"
                  :baseInfo="baseInfo"
                  v-if="dialogName === 'unlockDialog'"></UnlockDialog>
    <PostShareDialog @getQrImg="getQrImg"
                     v-if="dialogName === 'postShareDialog'"
                     :qrUrl="qrUrl"
                     @getPostUrl="getPostUrl"
                     :postUrl="postUrl"></PostShareDialog>
    <FriendDialog @closeDialog="closeDialog"
                  :receiveFriendArr="receiveFriendArr"
                  :successFriendArr="successFriendArr"
                  v-if="dialogName === 'friendDialog'"></FriendDialog>
    <ConfirmDialog @closeDialog="closeDialog"
                   :baseInfo="baseInfo"
                   @sureAssistance="sureAssistance"
                   v-if="dialogName === 'confirmDialog'"></ConfirmDialog>
    <InviteeOnceDialog @closeDialog="closeDialog"
                       @getCoupon="getCoupon"
                       :couponId="couponArr"
                       :baseInfo="baseInfo"
                       v-if="dialogName === 'inviteeOnceDialog'"></InviteeOnceDialog>
    <InviteeSecondDialog @closeDialog="closeDialog"
                         :baseInfo="baseInfo"
                         v-if="dialogName === 'inviteeSecondDialog'"></InviteeSecondDialog>
    <CommitDialog @closeDialog="closeDialog"
                  @commitInfo="commitInfo"
                  v-if="dialogName === 'commitDialog'"></CommitDialog>
    <PrizeDialog @closeDialog="closeDialog"
                 :prizeRecordArr="prizeRecordArr"
                 @openDialog="openDialog"
                 v-if="dialogName === 'prizeDialog'"></PrizeDialog>
    <SkusDialog @closeDialog="closeDialog"
                :skusObj="skusObj"
                @chooseSku="chooseSku"
                @openDialog="openDialog"
                v-if="dialogName === 'skusDialog'"></SkusDialog>
  </van-popup>
</template>

<script lang='ts' setup>
import {
  ref, reactive, inject, onMounted, Ref, nextTick,
} from 'vue';
import { filterFiles } from 'vant/es/uploader/utils';
import { Popup as vanPopup, Toast, Icon } from 'vant';
import JD from '@/utils/platforms';
import { BaseInfo } from '@/types/BaseInfo';
import { cjwxRequest } from '@/utils/service';

import RuleDialog from './components/RuleDialog.vue';
import SkusDialog from './components/SkusDialog.vue';
import PrizeDialog from './components/PrizeDialog.vue';
import UnlockDialog from './components/UnlockDialog.vue';
import CommitDialog from './components/CommitDialog.vue';
import FriendDialog from './components/FriendDialog.vue';
import ConfirmDialog from './components/ConfirmDialog.vue';
import PostShareDialog from './components/PostShareDialog.vue';
import InviteeOnceDialog from './components/InviteeOnceDialog.vue';
import InviteeSecondDialog from './components/InviteeSecondDialog.vue';
// 邀请奖励 组件
import InviteProgress from './components/InviteProgress.vue';
// 邀请排名 组件
import InviteRanking from './components/InviteRanking.vue';

// 底部 tab
const linkArr = ['https://pro.m.jd.com/mall/active/3hs7C3fEsd4JJd2hZQ2JJsEQReBb/index.html', 'https://pro.m.jd.com/mall/active/2fAKQBYEeche6yWxSKQSXm48CpY8/index.html', 'https://giftcard.jd.com/storepurchase/index?flag=1&encodeJsonStr=up%2B0pDbwr342PGQVzkamkYXzzWlaCDIaw8s8FS7nx%2Bs%3D', 'https://shop.m.jd.com/?shopId=1000016561'];
// 是否允许点击遮罩层 关闭弹窗
const popupCloseOnClick = ref(false);
// 分享者Uuid -- 链接上获取
const { friendUuid, fromSource } = inject('pathParams');
// 当前用户Uuid -- 接口获取
const userUuid = ref('');
// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 获取活动id
const { activityId } = baseInfo;
// 是否开卡表示是否注册
const isOpenCarded = inject('isOpenCard');
// 活动规则
const rule = ref('');

// 主接口回调情况 -- 是否完成
const contentPortSuc = ref(false);
// 已邀请人数
const inviteNumber = ref(0);
// 我的奖品列表
const prizeRecordArr = ref([]);
// 优惠券列表
const couponArr = ref([]);
const giftId = ref(0);
// 我的京豆奖池
const myBeans = ref(0);
// 已领取京豆
const earndBeans = ref(0);
// 排行榜列表
const inviteRankingArr = ref([]);
// 已邀请好友列表
const receiveFriendArr = ref([]);
// 邀请成功列表
const successFriendArr = ref([]);
// skus
const skusObj = ref({});
// 首页前三个 sku 信息
const mainSkuArr = ref([]);
// 按钮组
const btnArr = [
  { name: '我的奖品', code: 'prizeDialog' },
  { name: '活动规则', code: 'ruleDialog' },
  { name: '我的好友', code: 'friendDialog' },
  { name: '助力领试用', code: 'inviteeOnceDialog' },
  { name: '海报分享', code: 'postShareDialog' }];

// postUrl
const postUrl = ref('');
const getPostUrl = (e: string) => {
  postUrl.value = e;
};

// 埋点
const pageTrackLogCommon = (elementId: string) => {
  cjwxRequest.post('/crm/pageVisit/insertCrmPageVisit', {
    venderId: baseInfo.venderId,
    elementId,
    pageId: baseInfo.activityId,
    pin: baseInfo.pin,
  });
};
// 悬浮弹窗
function tracking() {
  window.location.href = 'https://lzkj-isv.isvjcloud.com/wxAssemblePage/largeSign';
}
// 分享二维码
const qrUrl = ref('');
// 获取分享二维码接口
const getQrImg = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/babycare/inviteOrder/QRUrl', {
    venderId: baseInfo.venderId,
    url: `https://lzkjdz-isv.isvjcloud.com/m/1000016561/99/2110100001656101/?friendUuid=${userUuid.value}&fromSource=3`,
  }).then((res) => {
    if (res.result) {
      qrUrl.value = res.data;
    }
  }).finally(() => {
    Toast.clear();
  });
};

/* ---------------------------------  dialog  ------------------------------- */
// 弹窗是否显示
const dialogShow = ref(false);
// 显示的弹窗标示位
const dialogName = ref('inviteeOnceDialog');

// 打开弹窗
const openDialog = (name: string) => {
  // 海报分享弹窗可以点击遮罩层关闭弹窗
  popupCloseOnClick.value = name === 'postShareDialog';
  if (name === 'postShareDialog') {
    pageTrackLogCommon('海报分享');
    setTimeout(() => {
      Toast('请长按图片进行保存后分享');
    }, 500);
  }
  dialogName.value = name;
  dialogShow.value = true;
};

// 关闭弹窗 - 子组件返回
const closeDialog = (name: string) => {
  console.log(name);
  dialogShow.value = false;
};

/* --------------------------------------------------------------------------- */

// 助力接口
const sureAssistance = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/babycare/inviteOrder/assist', {
    activityId: baseInfo.activityId,
    uuid: userUuid.value,
    inviterUuid: friendUuid,
  }).then((res) => {
    if (res.result) {
      openDialog('inviteeOnceDialog');
    } else {
      Toast.fail(res.errorMessage);
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 奖品奖池接口
const getSkuGifts = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/babycare/inviteOrder/getSkuGifts', {
    activityId: baseInfo.activityId,
  }).then((res) => {
    if (res.result) {
      nextTick(() => {
        skusObj.value = res.data;
        mainSkuArr.value = res.data.skuList?.slice(0, 3);
      });
    } else {
      Toast.fail(res.errorMessage);
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 选择奖池奖品接口
const chooseSku = (skuId: number) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/babycare/inviteOrder/selectSkuGift', {
    skuId,
    uuid: userUuid.value,
    activityId: baseInfo.activityId,
  }).then((res) => {
    if (res.result) {
      setTimeout(() => Toast('锁定商品成功~'), 500);
      getSkuGifts();
    } else {
      Toast.fail(res.errorMessage);
    }
  }).finally(() => {
    Toast.clear();
  });
};

const getActivityRule = () => {
  cjwxRequest
    .get(`/common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`)
    .then((res) => {
      if (res.data) {
        const rules = res.data.rule.split('\r');
        rule.value = rules.join('<br/>');
      }
    });
};

// 主接口 获取活动信息;
const getActivityInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/babycare/inviteOrder/activityContent', {
    activityId,
    fromSource,
  }).then((res) => {
    if (res.data) {
      contentPortSuc.value = true;
      myBeans.value = res.data.myBeans;
      earndBeans.value = res.data.earndBeans;
      userUuid.value = res.data.userRecord.uuid;
      inviteNumber.value = res.data.userRecord.assistCount;
      receiveFriendArr.value = res.data.receiveFriends;
      successFriendArr.value = res.data.successFriends;
      inviteRankingArr.value = res.data.rankingList;
      prizeRecordArr.value = res.data.myGifts;
      couponArr.value = res.data.giftList;

      // 如果没入会 先跳转入会
      if (res.data.userRecord.openCardStatus === 0) {
        const returnUrl = encodeURIComponent(`https://${window.location.host}/m/1000016561/99/2110100001656101/?fromSource=${fromSource}&friendUuid=${friendUuid}`);
        window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=1000016561&shopId=1000016561&venderType=5&channel=401&returnUrl=${returnUrl}`;
      }

      //  用户中奖未填写地址
      if (res.data.openWinStatus === 1) {
        openDialog('commitDialog');
      } else if (friendUuid && friendUuid !== userUuid.value) {
        // 用户被邀请进入页面
        // 如果 接口返回绑定被邀请人为null && 当前链接有邀请人uuid ----- 被邀请人第一次进入页面
        if (!res.data.userRecord.inviterUuid) {
          openDialog('confirmDialog');
          // inviteeOnceDialog
        } else if (res.data.userRecord.inviterUuid && res.data.userRecord.inviterUuid !== friendUuid) {
          // 如果接口返回 已经绑定邀请人 && 邀请人uuid 与 链接上的uuid不同 ----- 被邀请人 进入他人分享页面
          openDialog('inviteeSecondDialog');
        }
      }
      // rule
      getActivityRule();
      // sku
      getSkuGifts();

      JD.setHeaderShare({
        type: baseInfo.shareType,
        title: '抢千万京豆，赢任选30件BC好物',
        content: '邀请好友购买最高可领30000京豆，打榜赢30件任选好礼~',
        imageUrl: 'https://img10.360buyimg.com/imgzone/jfs/t1/198156/28/13753/159520/616e8a93E9ce853d4/f6d28ee3cdb65a66.jpg',
        shareUrl: `https://lzkjdz-isv.isvjcloud.com/m/1000016561/99/2110100001656101/?friendUuid=${userUuid.value}&fromSource=4`,
        afterShare: () => {
          console.log('头部分享埋点回调');
          pageTrackLogCommon('邀请');
        },
      });
    } else {
      Toast.fail(res.errorMessage);
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 点击分享
const shareActivity = () => {
  JD.callShare({
    type: baseInfo.shareType,
    title: '抢千万京豆，赢任选30件BC好物',
    content: '邀请好友购买最高可领30000京豆，打榜赢30件任选好礼~',
    imageUrl: 'https://img10.360buyimg.com/imgzone/jfs/t1/198156/28/13753/159520/616e8a93E9ce853d4/f6d28ee3cdb65a66.jpg',
    shareUrl: `https://lzkjdz-isv.isvjcloud.com/m/1000016561/99/2110100001656101/?friendUuid=${userUuid.value}&fromSource=4`,
    afterShare: () => {
      console.log('头部分享埋点回调');
      pageTrackLogCommon('邀请');
    },
  });
};

// 填写地址接口
const commitInfo = (object: any) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/babycare/inviteOrder/recordReciverInfo', {
    activityId: baseInfo.activityId,
    phone: object.value.phone,
    receiver: object.value.userName,
    province: object.value.province,
    city: object.value.city,
    district: object.value.district,
    address: object.value.address,
  }).then((res) => {
    if (res.result) {
      setTimeout(() => Toast('提交成功~'), 500);
      closeDialog('commitDialog');
      getActivityInfo();
    } else {
      Toast.fail(res.errorMessage);
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 领取优惠券接口
const getCoupon = (id: number) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/babycare/inviteOrder/convertPrize', {
    giftId: id,
    activityId: baseInfo.activityId,
  }).then((res) => {
    if (res.result) {
      setTimeout(() => Toast(res.data), 500);
      getActivityInfo();
    } else {
      Toast.fail(res.errorMessage);
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 兑奖
const getGiftId = (index: number) => {
  if (index === 0) {
    giftId.value = couponArr.value[0].id;
  } else if (index === 2) {
    giftId.value = couponArr.value[1].id;
  } else if (index === 5) {
    giftId.value = couponArr.value[2].id;
  }

  getCoupon(giftId.value);
};

// 调用活动信息接口
getActivityInfo();

</script>

<style lang='scss'>
html {
  max-width: 750px;
  margin: 0 auto;
  background: #ffcb09;
}
.hover-icon {
  position: fixed;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.baby-care {
  padding-bottom: 1rem;

  .banner {
    width: 100%;
  }

  .btn-group {
    width: 7.5rem;
    position: absolute;
    top: .45rem;

    .btn {
      width: 50%;
      height: .4rem;
      float: right;
      padding: .06rem 0;

      .btn-name {
        background: #FFFFFF;
        color: #464646;
        font-size: .18rem;
      }
    }

    // 左边按钮
    .btn:nth-child(even) {
      text-align: left;

      .btn-name {
        border-radius: 0 .2rem .2rem 0;
        padding: .1rem .2rem .1rem .1rem;
      }
    }

    // 右边按钮
    .btn:nth-child(odd) {
      text-align: right;

      .btn-name {
        border-radius: .2rem 0 0 .2rem;
        padding: .1rem .1rem .1rem .2rem;
      }
    }
  }

  .title-01 {
    width: 4.4rem;
    margin: 0 auto;
    margin-top: -1.1rem;
  }

  .lottery {
    position: relative;
    text-align: center;
    color: #FFFFFF;

    .my-jd {
      width: 2rem;
      position: absolute;
      bottom: 1.45rem;
      left: 1.1rem;

      transform: rotate(15deg);
      -ms-transform: rotate(15deg); /* Internet Explorer */
      -moz-transform: rotate(15deg); /* Firefox */
      -webkit-transform: rotate(15deg); /* Safari 和 Chrome */
      -o-transform: rotate(15deg); /* Opera */
    }

    .receive-jd {
      width: 2rem;
      position: absolute;
      bottom: 1.45rem;
      right: .92rem;

      transform: rotate(-12deg);
      -ms-transform: rotate(-12deg); /* Internet Explorer */
      -moz-transform: rotate(-12deg); /* Firefox */
      -webkit-transform: rotate(-12deg); /* Safari 和 Chrome */
      -o-transform: rotate(-12deg); /* Opera */
    }
  }

  .title-02 {
    width: 4.4rem;
    margin: .5rem auto;
    display: block;
  }

  .invite-title {
    padding: 0 .6rem;
    margin-top: .67rem;
  }

  .optional {
    width: 6.28rem;
    height: 8.87rem;
    margin: 0.2rem auto;
    text-align: center;
    padding: 5.7rem .8rem 1.2rem .8rem;
    box-sizing: border-box;
    background: url("./assets/img/option-prize.png") no-repeat;
    background-size: cover;

    .optional-goods {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .optional-sku {
        width: 1.48rem;
        height: 1.83rem;
        padding-top: .3rem;
        box-sizing: border-box;
        background: url("./assets/img/sku-bg.png") no-repeat;
        background-size: cover;
      }
    }

    .optional-btn {
      width: 2rem;
      height: .5rem;
      float: right;
    }
  }
}

.bottom-bg {
  position: fixed;
  height: 1.25rem;
  width: 100%;
  bottom: 0;
  background-color: #e4301f;

  .bottom-tab {
    height: 1.09rem;
    display: flex;
    justify-content: space-around;
    background: url("./assets/img/bottom-tab.png") no-repeat;
    background-size: 100% 100%;
  }
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

img {
  display: block;
  margin: .2rem auto;
}

.popup {
  background: unset !important;
}
</style>
