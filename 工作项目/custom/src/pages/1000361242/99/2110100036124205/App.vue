<!--
 * @actName:
 * @author: Ronghua lin
 * @createDate: 2021/10/21
 * @filePath: D:\A-Code\custom\src\pages\111\99\000\App.vue
-->
<template>
  <!-- background -->
  <div class="bg">
    <!-- rule & prize -->
    <div class="rule-prize-btn" v-if="isPerfectChildInfo !== 0">
      <img class="btn" @click="openDialog('ruleDialog')" src="./assets/img/rule-btn.png"/>
      <img class="btn" @click="getMyPrize" src="./assets/img/prize-btn.png"/>
    </div>

    <!-- states -->
    <div v-if="isPerfectChildInfo === 0" @click="openDialog('perfectInfoDialog')">
      <img src="./assets/img/unconditions-state.png" style="margin: unset;width: 7.5rem"/>
    </div>

    <div class="states" v-else>
      <div v-for="(item,index) in stateUrl" :key="index" class="state">
        <img style="width:1.9rem" @click="stateIndex=index"
             :class="[stateIndex === index ? 'active':'',myLevel === index?'':'gray']" :src="item"/>
        <img src="./assets/img/state-active-bg.png" v-if="stateIndex === index" class="state-active-bg"/>
      </div>
    </div>

    <!-- mylevel -->
    <div :class="`level-${myLevel}`" class="level-view" v-if="isPerfectChildInfo !== 0">
      <div>已学习{{ userInfo.hasGrowDay }}天</div>
      <div v-if="myLevel < 2">距离{{ myLevel === 0 ? '小学' : '中学' }}Q宝还需{{ userInfo.needGrowDay }}天</div>
    </div>

    <!-- swiper-achievement-gift -->
    <SwiperAchievement v-if="isPerfectChildInfo !== 0" :stateIndex="stateIndex" :myLevel="myLevel" :giftArr="giftArr"
                       @switchStateIndex="switchStateIndex" @toDrawGift="toDrawGift"></SwiperAchievement>

    <!-- my-rights -->
    <div class="my-right-view view-format" v-if="isPerfectChildInfo !== 0">
      <template v-for="(item,index) in rightsArr" :key="index">
        <div class="click-spot" @click="toDrawGift(item,index)"></div>
      </template>
    </div>

    <!-- sign & buypresent -->
    <div class="sign-buy-view view-format">
      <div class="click-spot" @click="goPage('sign')"></div>
      <div class="click-spot" @click="goPage('buypresent')"></div>

      <!--      <a class="click-spot"-->
      <!--         :href="`${hrefUrl}/qqstar/growth/sign/activity?activityId=2111100036124204`"></a>-->
      <!--      <a class="click-spot"-->
      <!--         :href="`${hrefUrl}/qqstar/buyGive/activityPage?activityId=2110100036124203`"></a>-->
    </div>

    <!-- member day -->
    <img style="width: 6.88rem" src="./assets/img/member-day-banner.png" @click="checkDate()"/>

    <!-- coupon banner -->
    <img style="width: 6.88rem;margin-top: .4rem" src="./assets/img/coupon-banner.png" @click="toGetPrize()"/>
    <img style="width: 6.88rem;margin-top: .4rem" src="./assets/img/reserve.png" @click="goToReserve()"/>

    <!-- store banner -->
    <!--    <img style="margin-top: .4rem" src="./assets/img/store-value-banner.png" @click="getCoupon('store')"/>-->

    <!-- sku list -->
    <div class="sku-view">
      <div class="sku" v-for="(item,index) in skuArr" :key="index" @click="gotoSkuPage(item)"></div>
    </div>
  </div>

  <van-popup class="popup" v-model:show="dialogShow" :close-on-click-overlay="false">
    <RuleDialog @closeDialog="closeDialog" :rule="rule" v-if="dialogName === 'ruleDialog'"></RuleDialog>
    <ImgUploadDialog @closeDialog="closeDialog" v-if="dialogName === 'imgUploadDialog'"
                     @toPerfectImage="perfectInfo"></ImgUploadDialog>
    <PrizeDialog @closeDialog="closeDialog" v-if="dialogName === 'prizeDialog'" :prizeList="prizeList"
                 @getPrizeInfo="getPrizeInfo"></PrizeDialog>
    <CommitDialog @closeDialog="closeDialog" v-if="dialogName === 'commitDialog'"
                  @commitInfo="commitInfo"></CommitDialog>
    <PerfectInfoDialog @closeDialog="closeDialog" v-if="dialogName === 'perfectInfoDialog'"
                       @perfectInfo="perfectInfo"></PerfectInfoDialog>
  </van-popup>

</template>

<script lang='ts' setup>
import { ref, inject, computed, nextTick } from 'vue';
import { Toast, Popup as vanPopup } from 'vant';
import Swiper from 'swiper';
import { gotoSkuPage } from '@/utils/platforms';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

import { stateUrl, achievementGiftArr } from './assets/ts/imgUrl';
import RuleDialog from './components/RuleDialog.vue';
import PrizeDialog from './components/PrizeDialog.vue';
import CommitDialog from './components/CommitDialog.vue';
import ImgUploadDialog from './components/ImgUploadDialog.vue';
import PerfectInfoDialog from './components/PerfectInfoDialog.vue';
import SwiperAchievement from './components/SwiperAchievement.vue';

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const isOpenCard: boolean = inject('isOpenCard') as boolean;

// 获取当前域名
const hrefUrl = window.location.origin;
// 获取活动id
const { activityId, venderId } = baseInfo;
const skuArr = ['100014111228', '865332', '8534207', '865331', '100013236452', '100007219849'];
// 状态选项图标
const stateArr: Array<string> = ['./assets/state-1.png', './assets/state-2.png', './assets/state-3.png'];
const myLevel = ref(1);
const stateIndex = ref(1);

// 是否已完善孩子信息
const isPerfectChildInfo = ref(0);
const babyBirthImg = '';

const rule = ref(''); // 活动规则
const userInfo = ref({
  uploadImageStatus: false,
}); // 我的信息
const giftArr = ref([]); // 成长礼包
const addressId = ref(''); // 中奖信息Id
const prizeList = ref([]); // 我的奖品
const rightsArr = ref([]); // 我的权益

/* ---------------------------------  dialog  ------------------------------- */
// 弹窗是否显示
const dialogShow = ref(false);
// 显示的弹窗标示位
const dialogName = ref('perfectInfoDialog');

// 打开弹窗
const openDialog = (name: string) => {
  dialogName.value = name;
  dialogShow.value = true;
};

// 关闭弹窗
const closeDialog = () => {
  dialogShow.value = false;
};
/* --------------------------------------------------------------------------- */

// 跳转签到 || 买赠
const goPage = (name: string) => {
  if (isPerfectChildInfo.value !== 0) {
    if (name === 'sign') {
      window.location.href = `${hrefUrl}/qqstar/growth/sign/activity?activityId=2111100036124204`;
    } else {
      window.location.href = `${hrefUrl}/qqstar/buyGive/activityPage?activityId=2110100036124203`;
    }
  } else {
    openDialog('perfectInfoDialog');
  }
};
// 开卡跳转
const goOpenCard = () => {
  window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=1000361242&shopId=1000361242&venderType=1&channel=7986&sceneval=2&jxsid=16309170861736832614&returnUrl=${window.location.href}`;
};

// 组件 swiper 切换
const switchStateIndex = (index: number) => {
  stateIndex.value = index;
};

const goToReserve = () => {
  window.location.href = 'https://shop.m.jd.com/?shopId=1000361242&utm_source=iosapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=CopyURL&ad_od=share&gx=RnFmxDYPOzHdztRP--twC6WW5HcE9cjh32i8';
};

const toGetPrize = () => {
  window.location.href = 'https://coupon.m.jd.com/coupons/show.action?key=c5meccs2odae495390941b9d4624843d&roleId=65560109&to=https://shop.m.jd.com/?shopId=1000361242';
};

// 获取活动规则
const getFullActInfoVo = () => {
  cjwxRequest.get(`common/brand/getFullActInfoVo?activityId=${activityId}`).then((res) => {
    if (res.result) {
      rule.value = res.data.rule;
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 主接口
const activityContent = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wx/qqstar/growUpStand/activityContent', {
    activityId,
  }).then((res) => {
    if (res.result) {
      getFullActInfoVo();

      userInfo.value = res.data.statusVO;
      rightsArr.value = res.data.rightsGifts;
      myLevel.value = res.data.statusVO.babyStatus - 1;
      stateIndex.value = res.data.statusVO.babyStatus - 1;
      isPerfectChildInfo.value = res.data.statusVO.babyStatus;

      giftArr.value = res.data.growUpGifts;
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 组件
const getPrizeInfo = (info: any) => {
  addressId.value = info.addressId;
  openDialog('commitDialog');
};

// 组件 commitDialog 提交信息
const commitInfo = (info: any) => {
  console.log(JSON.stringify(info));
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/common/brand/saveAddress', {
    id: addressId.value,
    activityId,
    receiver: info.value.userName,
    phone: info.value.phone,
    province: info.value.province,
    city: info.value.city,
    district: info.value.district,
    county: info.value.district,
    address: info.value.address,
    postalCode: info.value.postalCode,
  }).then((res) => {
    if (res.result) {
      closeDialog();
      setTimeout(() => {
        Toast('保存地址成功！');
      }, 500);
      activityContent();
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 组件 perfectInfoDialog 提交信息
const perfectInfo = (info?: any) => {
  interface dataType {
    activityId: string,
    phone?: number,
    userName?: string,
    babyBirthday?: string,
    babySex?: string,
    babyNick?: string,
    babyImage?: string,
  }

  const data: dataType = { activityId };
  if (typeof info === 'string') {
    data.babyImage = info;
  } else {
    data.phone = info.value.phone;
    data.userName = info.value.userName;
    data.babyBirthday = info.value.babyBirthday;
    data.babySex = info.value.babySex;
    data.babyNick = info.value.babyNick;
    data.babyImage = info.value.babyImage;
  }

  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wx/qqstar/perfectInfo/saveInfo', data).then((res) => {
    if (res.result) {
      closeDialog();
      setTimeout(() => {
        Toast('完善信息成功！');
      }, 500);
      activityContent();
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 领取奖品
const toDrawGift = (giftInfo: any, index?: number) => {
  console.log(giftInfo);
  if (index === 0) {
    Toast('我的权益奖品正在补充！');
    return;
  }
  // 需要出生证明 && 当前用户未上传出生证明
  if (giftInfo.needImageStatus && !userInfo.value.uploadImageStatus) {
    Toast('待您上传出生证明后可以领取！');
    setTimeout(() => {
      openDialog('imgUploadDialog');
    }, 800);
    return;
  }

  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wx/qqstar/growUpStand/receivePrize', {
    giftId: giftInfo.giftId,
    activityId,
  }).then((res) => {
    if (res.result) {
      if (giftInfo.giftType === 7) {
        addressId.value = res.data;
        activityContent();
        openDialog('commitDialog');
      } else if (giftInfo.giftType === 1) {
        window.location.href = `https:${giftInfo.couponUrl}`;
      } else {
        Toast('领取成功！');
      }
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 我的奖品信息 接口
const getMyPrize = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/common/brand/getDrawRecord', {
    venderId,
    activityId,
  }).then((res) => {
    if (res.result) {
      prizeList.value = res.data;
      openDialog('prizeDialog');
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 会员日时间判断
const checkDate = () => {
  Toast('活动已经结束！');
  // const nowDateStr = new Date().toString(); // 当前时间
  // const startDateStr = new Date('2021-11-09').toString(); // 开始时间
  // const endDateStr = new Date('2021-11-23').toString(); // 结束时间
  // if (isOpenCard) {
  //   if (Date.parse(nowDateStr) >= Date.parse(startDateStr) && Date.parse(nowDateStr) <= Date.parse(endDateStr)) {
  //     // window.location.href = 'https://lzkjdz-isv.isvjcloud.com/qqstar/growth/memday/activity?activityId=2111100036124206';
  //     window.location.href = `${hrefUrl}/qqstar/growth/memday/activity?activityId=2111100036124206`;
  //   } else {
  //     Toast('即将上线，敬请期待！');
  //   }
  // } else {
  //   goOpenCard();
  // }
};

// 领取 优惠券
const getCoupon = (name: string) => {
  if (isOpenCard) {
    if (name === 'coupon') {
      window.location.href = 'https://coupon.m.jd.com/coupons/show.action?key=cfm9c6s6o7a44b4daf359c51c5ab6d7b&roleId=60223729&to=https://shop.m.jd.com/?shopId=1000361242';
    } else {
      window.location.href = 'https://mall.jd.com/index-1000361242.html?from=pc';
    }
  } else {
    goOpenCard();
  }
};

activityContent();

</script>

<style lang='scss'>
html {
  max-width: 750px;
  margin: 0 auto;
  background: #b7f281;

  img {
    margin: .2rem auto;
    width: 6.73rem;
    display: block;
  }

  .bg {
    background: #b7f281 url("./assets/img/background.png") no-repeat;
    background-size: contain;
    width: 100%;
    max-height: 47.28rem;
    padding-top: 4.81rem;
    box-sizing: border-box;
    position: relative;

    .rule-prize-btn {
      position: absolute;
      top: 10.2rem;
      right: 0;
      z-index: 2;

      .btn {
        width: 1.79rem;
      }
    }

    .states {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      height: 2.5rem;

      .state {
        width: 2.5rem;
        text-align: center;
        position: relative;
      }

      .state-active-bg {
        width: 2.11rem;
        background: url("./assets/img/state-active-bg.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        bottom: -.1rem;
        left: 0.2rem;
      }

      .active {
        width: 2.2rem !important;
        transition: 300s;
        -webkit-transition: 300ms; /* Safari */
      }

      .gray {
        -webkit-filter: brightness(0.8);
        -moz-filter: brightness(0.8);
        -ms-filter: brightness(0.8);
        -o-filter: brightness(0.8);
        filter: brightness(0.8);
        filter: gray brightness;
      }
    }

    .level-view {
      width: 6.63rem;
      height: 2.7rem;
      position: relative;
      margin: .2rem auto;
      font-size: .34rem;
      padding: 1.4rem 0 0 .5rem;
      box-sizing: border-box;
    }

    .level-0 {
      background: url("./assets/img/level-0.png") no-repeat;
      background-size: cover;
    }

    .level-1 {
      background: url("./assets/img/level-1.png") no-repeat;
      background-size: cover;
    }

    .level-2 {
      background: url("./assets/img/level-2.png") no-repeat;
      background-size: cover;
    }

    .view-format {
      position: relative;
      display: flex;
      margin: .3rem auto;
      width: 6.7rem;
    }

    .my-right-view {
      background: url("./assets/img/my-rights-banner.png") no-repeat;
      background-size: cover;
      height: 3.62rem;
      box-sizing: border-box;
      padding-top: 1rem;

      .click-spot {
        width: 50%;
        height: 2.4rem;
      }
    }

    .sign-buy-view {
      background: url("./assets/img/sign-buy-banner.png") no-repeat;
      background-size: cover;
      height: 1.92rem;

      .click-spot {
        width: 50%;
        height: 1.92rem;
      }
    }

    .sku-view {
      width: 6.69rem;
      height: 13.37rem;
      margin: 0.5rem auto;
      background: url("./assets/img/sku-list.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-flow: row wrap;
      flex-direction: row;
      justify-content: space-between;

      .sku {
        width: 3rem;
        height: 4rem;
      }
    }
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
</style>
