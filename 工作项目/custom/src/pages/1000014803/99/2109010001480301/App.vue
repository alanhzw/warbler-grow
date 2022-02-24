<!--
 * @Description:蒙牛-拼手速
 * @Date: 2021-09-14 10:46:57
 * @FilePath: \custom\src\pages\1000014803\99\2108100008792101\App.vue
-->
<template>
  <div class="mengniu">
    <!-- banner -->
    <img src="./assets/banner.png" class='banner'>

    <!-- 活动规则按钮 -->
    <div class="rule-btn" @click="openDialog('ruleDialog')"></div>
    <!-- 申领记录按钮 -->
    <div class="myPrize-btn" @click="getUserPrizeRecord"></div>

    <!-- 立即抽奖按钮 -->
    <img class="draw-btn" @click="getDraw" src="./assets/draw-btn.png"/>

    <!-- 隐私权限 -->
    <div class="statement">
      <input type="checkbox" class="check-box" v-model="isChecked"/>
      <img class="title-img" @click="openDialog('statementDialog')" src="./assets/statement-titile.png"/>
    </div>

    <!-- 中奖列表 -->
    <div class="winner-info">
      <div class="swiper-container" ref="swiperRef">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in winnerList" :key="index">
            <img class="winner-headImg" :src="item.yunMidImageUrl"/>
            <div class="winner-name">{{ item.nicknameShow }}</div>
            <div class="winner-name">{{ item.giftId }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 活动规则 -->
    <div v-html="rule" class="rule-message"></div>
  </div>

  <van-popup class="popup" v-model:show="dialogShow" :close-on-click-overlay="false">
    <RuleDialog @closeDialog="closeDialog" :rule="rule" v-if="dialogName === 'ruleDialog'"></RuleDialog>
    <FailConditionDialog @closeDialog="closeDialog" v-if="dialogName === 'failConditionDialog'"></FailConditionDialog>
    <MyPrizeDialog @closeDialog="closeDialog" @getPrizeInfo="getPrizeInfo" :myPrizeList="myPrizeList"
                   v-if="dialogName === 'myPrizeDialog'"></MyPrizeDialog>
    <MemberDialog @closeDialog="closeDialog" v-if="dialogName === 'memberDialog'"></MemberDialog>
    <SuccessDialog @closeDialog="closeDialog" v-if="dialogName === 'successDialog'"></SuccessDialog>
    <CommitDialog @closeDialog="closeDialog" @commitInfo="commitInfo" :alreadyFillInfo="alreadyFillInfo"
                  v-if="dialogName === 'commitDialog'"></CommitDialog>
    <ConfirmDialog @closeDialog="closeDialog" @openDialog="openDialog"
                   v-if="dialogName === 'confirmDialog'"></ConfirmDialog>
    <StatementDialog @closeDialog="closeDialog" :statement="statement"
                     v-if="dialogName === 'statementDialog'"></StatementDialog>
  </van-popup>
</template>

<script lang='ts' setup>
import {
  ref, reactive, inject, onMounted, Ref, nextTick,
} from 'vue';
import { Popup as vanPopup, Toast, Checkbox as vanCheckbox } from 'vant';
import { filterFiles } from 'vant/es/uploader/utils';
import Swiper, { Autoplay } from 'swiper';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

import { rule, statement } from './assets/ruleMessage.ts';

import RuleDialog from './components/RuleDialog.vue';
import MyPrizeDialog from './components/MyPrizeDialog.vue';
import MemberDialog from './components/MemberDialog.vue';
import SuccessDialog from './components/SuccessDialog.vue';
import CommitDialog from './components/CommitDialog.vue';
import ConfirmDialog from './components/ConfirmDialog.vue';
import StatementDialog from './components/StatementDialog.vue';
import FailConditionDialog from './components/FailConditionDialog.vue';

Swiper.use([Autoplay]);

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 获取活动id
// const activityId = ref<string>(baseInfo.activityId);
const { activityId, venderId } = baseInfo;

// 是否开卡表示是否注册
const isOpenCarded = inject('isOpenCard');

// 我的奖品列表数据
const myPrizeList = ref([]);
// 获奖信息列表数据
const winnerList = ref([]);
// 用户可领取状态
const drawStatus = ref(null);
// 是否勾选隐私权县
const isChecked = ref(false);

// 判断奖品是否已填写地址信息，已填写则获取已填写地址用作数据回显
const alreadyFillInfo = ref({ id: '' });

// 创建swiper组件
const swiperRef: Ref = ref(null);
const creatSwiper = () => {
  if (swiperRef.value) {
    const mySwiper = new Swiper(swiperRef.value, {
      slidesPerView: 'auto', // 自动适配多个swiper-item
      direction: 'vertical', // 纵向
      loop: true, // 循环
      autoplay: {
        delay: 500, // 0.5秒切换一次
        disableOnInteraction: false,
      },
    });
  }
};

/* ---------------------------------  dialog  ------------------------------- */
// 弹窗是否显示
const dialogShow = ref(false);
// 显示的弹窗标示位
const dialogName = ref('');

// 打开弹窗
const openDialog = (name: string) => {
  dialogName.value = name;
  dialogShow.value = true;
};

/* --------------------------------------------------------------------------- */

// 主接口 获取活动信息;
const getActivityInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/mn/speed/activityContent', {
    activityId,
  }).then((res) => {
    if (res.data) {
      res.data.broadcast.forEach((i: { nicknameShow: string; }) => {
        i.nicknameShow = `${i.nicknameShow.substr(0, 1)}***${i.nicknameShow.substr(i.nicknameShow.length - 1, i.nicknameShow.length)}`;
      });
      winnerList.value = res.data.broadcast;
      drawStatus.value = res.data.status;

      // 判断如果 数据低于5条 则不创建swiper组件
      if (winnerList.value.length > 4) {
        nextTick(() => {
          creatSwiper();
        });
      }
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 关闭弹窗 - 子组件返回
const closeDialog = (name: string) => {
  dialogShow.value = false;
};

//
const pageTrackLogCommon = (elementId: string) => {
  cjwxRequest.post('/crm/pageVisit/insertCrmPageVisit', {
    venderId,
    elementId,
    pageId: activityId,
  }).then((res) => {
    console.log('埋点 --> 用户点击按钮');
  });
};

/* --------------------------------------------------------------------------- */

// 立即抽奖
const getDraw = () => {
  if (!isChecked.value) {
    Toast('请先勾选“我已阅读并同意隐私条款”！');
  } else if (drawStatus.value === 0) {
    openDialog('failConditionDialog');
  } else if (drawStatus.value === 2) {
    Toast('您已经领取过奖品了！');
  } else {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    cjwxRequest.post('/crm/mn/speed/draw', {
      activityId,
    }).then((res) => {
      if (res.result) {
        if (res.data.addressId) {
          openDialog('confirmDialog');
          alreadyFillInfo.value = { id: '' };
          alreadyFillInfo.value.id = res.data.addressId;
          getActivityInfo();
        }
      } else {
        Toast(res.errorMessage);
      }
      pageTrackLogCommon('抽奖');
    }).finally(() => {
      Toast.clear();
    });
  }
};

// 提交接口
const commitInfo = (info: any) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  const {
    id, receiver, phone, province, city, district, address, postalCode, personalEmail,
  } = info.value;
  cjwxRequest.post('/crm/mn/speed/saveAddress', {
    activityId,
    id,
    receiver,
    phone,
    province,
    city,
    district,
    address,
    postalCode,
    personalEmail,
  }).then((res) => {
    if (res.result) {
      openDialog('successDialog');
    } else {
      Toast(res.errorMessage);
    }
  }).finally(() => {
    Toast.clear();
  });
};

/* -----------------------------  获取用户中奖记录  ------------------------------ */
const getUserPrizeRecord = () => {
  // applyRecordList.value = [1, 2];
  // openDialog('applyDialog');
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/mn/speed/myPrize', {
    activityId,
  }).then((res) => {
    if (res.result) {
      myPrizeList.value = res.data;
      openDialog('myPrizeDialog');
    } else {
      Toast(res.errorMessage);
    }
  }).finally(() => {
    Toast.clear();
  });
};
/* --------------------------------------------------------------------------- */

// 组件‘我的奖品弹窗’点击操作按钮 获取组件弹窗返回的奖品信息
const getPrizeInfo = (info: any) => {
  // 判断是否为第一次填写地址
  if (info.status === 1) {
    alreadyFillInfo.value = info;
  } else {
    alreadyFillInfo.value = { id: info.id };
  }
  openDialog('commitDialog');
};
/* --------------------------------------------------------------------------- */

// 如果没入会，点击按钮 先跳转入会
if (!isOpenCarded) {
  openDialog('memberDialog');
}

// 调用活动信息接口
getActivityInfo();

</script>

<style lang='scss'>
html {
  max-width: 750px;
  margin: 0 auto;
  background: #0b2988;
}

.mengniu {
  text-align: center;
  position: relative;

  .banner {
    width: 100%;
  }

  .rule-btn {
    position: absolute;
    top: .51rem;
    right: 0;
    width: 1.5rem;
    height: .5rem;
  }

  .myPrize-btn {
    position: absolute;
    top: 1.3rem;
    right: 0;
    width: 1.5rem;
    height: .5rem;
  }

  .draw-btn {
    width: 4rem;
    margin-top: -.25rem;
  }

  .statement {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: .2rem;

    .check-box {
      width: .35rem;
      height: .35rem;
    }

    .title-img {
      width: 3rem;
      height: .35rem;
      margin-left: .2rem;
    }
  }

  .winner-info {
    width: 6.4rem;
    height: 5.5rem;
    margin: 0 auto;
    margin-top: .5rem;
    box-sizing: border-box;
    padding-top: 1rem;
    background: url("./assets/winners-bg.png");
    background-size: 100% 100%;

    .winner-headImg {
      width: .7rem;
    }

    .winner-name {
      font-size: .26rem;
    }
  }

  .rule-message {
    padding: 0 .4rem;
    text-align: left;
    margin: .55rem 0;
    color: #FFFFFF;
  }
}

.swiper-container {
  height: 4rem;
  overflow: hidden;

  .swiper-slide {
    height: .8rem;
    line-height: .8rem;
    padding: .1rem .5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

.popup {
  background: unset !important;
}
</style>
