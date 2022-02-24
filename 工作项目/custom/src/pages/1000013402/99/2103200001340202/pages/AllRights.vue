<template>
  <div class="yili">
    <!-- banner -->
    <div class="title">
      <img style="width: 4.11rem" src="../assets/right-grow-title.png"/>
    </div>

    <!-- 进度条 -->
    <div class="prompt">
      <div v-if="rightInfo.isLock == 1" style="font-size: .22rem;margin-top: .66rem;color:#FFFFFF">
        当前已解锁的权益如下
      </div>

      <div v-else style="font-size: .22rem;margin-top: .66rem;color:#FFFFFF">
        成长值{{ rightInfo.achievePoints }}可解锁的权益如下
      </div>
    </div>

    <div class="banner">
      <div class="circular-view">
        <div v-for="(item,index) in levelNameList" :key="index" class="level" :class="item"
             :style="index + 1 > userLevel?'opacity:0.4':''">
          {{ item }}
        </div>

        <div style="position:absolute;top: 1.6rem;width: 100%">
          <div class="level-bg">V{{ userLevel }}</div>
          <div style="font-size: .36rem;color: #ffef67;margin-top: .1rem">当前成长值: {{ userAchieveNum }}</div>
        </div>
        <CircularCanvas :activeIndex="activeIndex + 1"></CircularCanvas>
      </div>

      <div class="swiper-container" ref="swiperRef">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in rightList" :key="index">
            <div style="position:relative;">
              <img :src="item.equityIcon">
              <img style="width: 5.3rem;position:absolute;top: 1rem;left: .7rem;z-index: 1"
                   src="../assets/right-lock.png" v-if="item.isLock === '0'">
              <div v-else
                   style="position: absolute;top: 2.5rem;left: .6rem;z-index: 1;font-size: .26rem;color: #4b68b2">已达成该等级
              </div>
            </div>

            <!-- 成长值列表 -->
            <div class="grow-list">
              <div class="content">
                <div style="overflow-y: auto;height: 5.6rem">
                  <div class="task" v-for="(_item,_index) in item.sonEquities" :key="_index">
                    <!-- 成长任务 icon -->
                    <img class="task-img" :src="_item.icon"/>
                    <!-- 成长任务 信息 -->
                    <div class="task-message">
                      <div class="name one-line-omit">{{ _item.name }}</div>
                      <div class="detail two-line-omit">{{ _item.message }}</div>
                    </div>
                    <!-- 状态按钮 -->
                    <div @click="clickStatusBtn(index,_index)" class="task-btn"
                         :class="{'gray':_item.isEffective === null || _item.isEffective === '1'}">
                      {{ getBtnStatus(_item.isEffective) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-popup class="popup" v-model:show="dialogShow" :close-on-click-overlay="false">
      <!-- 客服 -->
      <KeFuDialog @closeDialog="closeDialog" v-if="dialogName === 'kefuDialog'"></KeFuDialog>
      <!-- 敬请期待 -->
      <ComingSoonDialog @closeDialog="closeDialog" v-if="dialogName === 'comingSoonDialog'"></ComingSoonDialog>
      <!-- 敬请期待--年度奖品 -->
      <ComingSoonYearsDialog @closeDialog="closeDialog"
                             v-if="dialogName === 'comingSoonYearsDialog'"></ComingSoonYearsDialog>
      <!-- 未中奖 -->
      <LosingLotteryDialog @closeDialog="closeDialog" v-if="dialogName === 'losingLotteryDialog'"></LosingLotteryDialog>
      <!-- 中奖 -->
      <WinningLotteryDialog @openDialog="openDialog" @commitInfo="getCommitInfo" :drawInfo="drawInfo"
                            v-if="dialogName === 'winningLotteryDialog'"></WinningLotteryDialog>
      <!-- 京豆详情 -->
      <JdSourceDialog @closeDialog="closeDialog" :JdSourceList="JdSourceList"
                      v-if="dialogName === 'jdSourceDialog'"></JdSourceDialog>
      <!-- 京豆详情 -->
      <MyPrizeDialog @closeDialog="closeDialog" :myPrizeList="myPrizeList" @notFillAddress="notFillAddress"
                     v-if="dialogName === 'myPrizeDialog'"></MyPrizeDialog>
      <!-- 优惠券 敬请期待 -->
      <CouponComingSoonDialog @closeDialog="closeDialog"
                              v-if="dialogName === 'couponComingSoonDialog'"></CouponComingSoonDialog>
      <!-- 九宫格抽奖 -->
      <JiuGongLotteryDialog @closeDialog="closeDialog" @openDialog="openDialog" :drawPrizeArr="drawPrizeArr"
                            :rightItemId="rightItemId" @getAllRightsList="getAllRightsList" @winnerInfo="winnerInfo"
                            v-if="dialogName === 'jiuGongLotteryDialog'"></JiuGongLotteryDialog>
    </van-popup>
  </div>
</template>

<script lang='ts' setup>
import Swiper from 'swiper';
import { inject, nextTick, ref, Ref } from 'vue';
import { Popup as vanPopup, Toast } from 'vant';
import { BaseInfo } from '@/types/BaseInfo';
import { cjwxRequest } from '@/utils/service';

import KeFuDialog from '../components/KeFuDialog.vue';
import MyPrizeDialog from '../components/MyPrizeDialog.vue';
import JdSourceDialog from '../components/JdSourceDialog.vue';
import ComingSoonDialog from '../components/ComingSoonDialog.vue';
import ComingSoonYearsDialog from '../components/ComingSoonYearsDialog.vue';
import LosingLotteryDialog from '../components/LosingLotteryDialog.vue';
import WinningLotteryDialog from '../components/WinningLotteryDialog.vue';
import JiuGongLotteryDialog from '../components/JiuGongLotteryDialog.vue';
import CouponComingSoonDialog from '../components/CouponComingSoonDialog.vue';
import CircularCanvas from '../components/CircularCanvas.vue';

// 活动子品牌 - 伊利 舒化
const sonBrand = 'shuhua';
const cjwxPin = window.sessionStorage.getItem('LZ_JD_USER_PIN');
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 获取活动id
const activityId = ref<string>(baseInfo.activityId);
const venderId = ref<string>(baseInfo.venderId);

const activeIndex = ref(0);
const swiperRef: Ref = ref(null);
// 权益列表
const rightList = ref([]);
// 当前权益Swiper信息
const rightInfo = ref({});
// 京豆详情列表
const JdSourceList = ref([]);
// 我的奖品列表（抽奖记录）
const myPrizeList = ref([]);
// 转盘奖品信息
const drawPrizeArr = ref([]);
// 转盘item信息
const rightItemId = ref();

const levelNameList = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7'];
const userLevel = ref(0);
const userAchieveNum = ref(0);

/* ---------------------------------  dialog  ------------------------------- */
// 弹窗是否显示
const dialogShow = ref(false);
// 显示的弹窗标示位
const dialogName = ref('jiuGongLotteryDialog');

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

// 中奖信息
const drawInfo = ref({
  name: '测试奖品',
  venderId: '1888',
  addressId: '001',
  activityId: '888',
  url: '//img10.360buyimg.com/imgzone/jfs/t1/179810/31/6504/96002/60b31f6fE58a8096c/50b7a655ed7d85d7.png',
});

// 九宫格中奖时 更新奖品信息 ---> 传入 中奖弹窗组件
const winnerInfo = (info?: any) => {
  if (info.drawOk) {
    drawInfo.value = info;
    console.log(drawInfo.value);
  }
};

// 我的奖品 没填写地址 ---> 填写地址
const notFillAddress = (info?: any) => {
  drawInfo.value = info;
  openDialog('winningLotteryDialog');
};

// 获取任务列表;
const getAllRightsList = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/yili/medal/memberAllRights', {
    cjwxPin,
    brand: sonBrand,
  }).then((res) => {
    if (res.success) {
      rightList.value = res.data;
      userLevel.value = Number(res.data[0].rightsLevel);
      userAchieveNum.value = res.data[0].points;
      // eslint-disable-next-line prefer-destructuring
      rightInfo.value = rightList.value[0];

      nextTick(() => {
        if (swiperRef.value) {
          const mySwiper = new Swiper(swiperRef.value, {
            slidesPerView: 1.2,
            centeredSlides: true,
            spaceBetween: 0,
            grabCursor: true,
            on: {
              slideChange() {
                activeIndex.value = this.activeIndex;
                rightInfo.value = rightList.value[this.activeIndex];
              },
            },
          });
          mySwiper.slideToLoop(activeIndex.value === 0 ? userLevel.value - 1 : activeIndex.value, 800, false);
        }
      });
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 获取奖品提交信息（子组件弹窗）
const getCommitInfo = (info: any) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  console.log();
  cjwxRequest.post('/yili/medal/save', {
    venderId: venderId.value,
    activityId: drawInfo.value.activityId,
    actType: '13',
    prizeName: drawInfo.value.name,
    receiver: info.value.userName,
    phone: info.value.phone,
    province: info.value.province,
    generateId: drawInfo.value.addressId,
    city: info.value.city,
    county: info.value.district,
    postalCode: '116600',
    address: info.value.address,
  }).then((res) => {
    if (res.result) {
      Toast('提交成功！');
    } else {
      Toast(res.errorMessage);
    }
    closeDialog();
  });
};

// 获取京豆订单详情
const getJdDetailList = (medalId: string, rightsId: string) => {
  cjwxRequest.post(`/yili/medal/return/log?brand=${sonBrand}&medalId=${sonBrand}&rightsId=${sonBrand}`).then((res) => {
    if (res.success) {
      JdSourceList.value = res.data;
      openDialog('jdSourceDialog');
    }
  });
};

// 获取我的奖品列表
const getMyPrizeList = (rightsItemId: number) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.get('/yili/medal/draw/record', {
    params: {
      brand: sonBrand,
      rightsItemId,
    },
  }).then((res) => {
    if (res.success) {
      myPrizeList.value = res.data;
      openDialog('myPrizeDialog');
      Toast.clear();
    }
  });
};

// 获取按钮状态
const getBtnStatus = (isEffective: string) => {
  let btnName = '';
  if (isEffective === '0') {
    btnName = '点击领取';
  } else if (isEffective === '1') {
    btnName = '已领取';
  } else if (isEffective === '2') {
    btnName = '查看详情';
  } else if (isEffective === '3') {
    btnName = '立即进入';
  } else if (isEffective === '4') {
    btnName = '敬请期待';
  } else if (isEffective === '6') {
    btnName = '我的奖品';
  } else if (isEffective === '7' || isEffective === '8') {
    btnName = '查看详情';
  } else {
    btnName = '点击领取';
  }
  return btnName;
};

// 获取转盘奖品信息
const getDrawPrizeInfo = (drawActId: string, rightsItemId: number): any => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/wxDrawActivity/activityContent', {
    activityId: drawActId,
  }).then((res) => {
    if (res.result) {
      drawPrizeArr.value = res.data.content;
      rightItemId.value = rightsItemId;
      openDialog('jiuGongLotteryDialog');
    }
  });
};

// 点击 领取/查看详情/抽奖 按钮
const clickStatusBtn = (index: number, _index: number) => {
  const sonRightlist = rightList.value[index].sonEquities;
  // eslint-disable-next-line no-underscore-dangle
  const { isEffective } = sonRightlist[_index];
  // 判断是首次领取 还是查看详情 0:未领取 1：已领取
  if (isEffective === '1') {
    Toast('您已领取过该权益!');
  } else if (isEffective === '0') {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    // eslint-disable-next-line no-underscore-dangle
    cjwxRequest.get(`/yili/medal/receive/rights?brand=${sonBrand}&rightsItemId=${sonRightlist[_index].id}`).then((res) => {
      if (res.success) {
        if (res.data.success) {
          if (res.data.rightsType === '7') {
            // 转盘抽奖 ---> 九宫弹窗
            getDrawPrizeInfo(res.data.activityId, sonRightlist[_index].id);
          } else if (res.data.rightsType === '1') {
            // 会员卡 ---> 敬请期待弹窗
            openDialog('comingSoonDialog');
            setTimeout(() => getAllRightsList(), 800);
          } else {
            Toast(res.data.msg);
            setTimeout(() => getAllRightsList(), 800);
          }
        } else {
          // 提示错误信息
          Toast(res.data.msg);
        }
      }
    }).finally(() => {
      Toast.clear();
    });
  } else if (isEffective === '2') {
    // 京豆接口 --> 弹窗京豆详情
    // eslint-disable-next-line no-underscore-dangle
    getJdDetailList(rightList.value[index].medalId, sonRightlist[_index].rightsId);
  } else if (isEffective === '3') {
    // 跳转客服页面
    window.location.href = 'https://fpage.jd.com/exService/?venderId=1000013402#/';
  } else if (isEffective === '4') {
    // 敬请期待 -- 弹窗
    openDialog('comingSoonDialog');
  } else if (isEffective === '6') {
    // 我的奖品弹窗 -- 弹窗
    getMyPrizeList(sonRightlist[_index].id);
  } else if (isEffective === '7') {
    // 联系客服弹窗 -- 弹窗
    openDialog('kefuDialog');
  } else if (isEffective === '8') {
    // 敬请期待-- 年度奖品 -- 弹窗
    openDialog('comingSoonYearsDialog');
  } else {
    Toast('您暂不满足领取条件！');
  }
};

getAllRightsList();

</script>

<style lang='scss' scoped>
.yili {
  position: relative;
  text-align: center;

  .prompt {
    width: 100%;
    position: absolute;
    top: 6.55rem;
  }

  .title {
    width: 100%;
    position: absolute;
    top: 8.2rem;
  }

  .banner {
    background: url("../assets/right-banner.png") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 9rem;

    .circular-view {
      width: 100%;
      height: 2.9rem;
      position: relative;
      padding-top: .2rem;
      box-sizing: border-box;

      .level {
        position: absolute;
        color: #FFFFFF;
        font-size: .3rem;
      }

      .V1 {
        top: 2.2rem;
        left: 0.9rem;
      }

      .V2 {
        top: 1.1rem;
        left: 1.5rem;
      }

      .V3 {
        top: 0.4rem;
        left: 2.5rem;
      }

      .V4 {
        top: 0.2rem;
        left: 3.6rem;
      }

      .V5 {
        top: .4rem;
        left: 4.7rem;
      }

      .V6 {
        top: 1.15rem;
        left: 5.75rem;
      }

      .V7 {
        top: 2.2rem;
        left: 6.35rem;
      }

      .level-bg {
        background: url("../assets/right-level.png") no-repeat;
        background-size: 100% 100%;
        width: 1.14rem;
        height: .6rem;
        margin: 0 auto;
        font-size: .24rem;
        text-align: right;
        padding: .22rem .22rem 0 .4rem;
        box-sizing: border-box;
        color: #fff490;
      }
    }

    .swiper-slide {
      text-align: center;
      align-items: center;

      img {
        width: 5.97rem;
      }
    }
  }

  .grow-list {
    position: relative;
    margin-top: 2.5rem;

    .content {
      width: 5.9rem;
      height: 5.7rem;
      margin: 0 auto;
      padding: .3rem 0;
      background: url("../assets/detail-grow-bg.png") no-repeat;
      background-size: 100% 100%;

      .task {
        width: 5rem;
        height: 1.2rem;
        margin: 0 auto;
        margin-top: .2rem;
        padding: .12rem;
        align-items: center;
        background-color: #ffffff;
        box-shadow: 5px 5px 5px #def4ff;
        border-radius: 0.12rem;
        position: relative;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;

        .task-img {
          width: .64rem;
        }

        .task-message {
          width: 2.8rem;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          margin-left: .2rem;

          .name {
            font-family: MicrosoftYaHei;
            font-size: 0.3rem;
            font-weight: bold;
            color: #3d83e6;
          }

          .detail {
            font-family: MicrosoftYaHei;
            width: 2.6rem;
            height: .65rem;
            font-size: 0.22rem;
            color: #fdb531;
          }
        }

        .task-btn {
          width: 1.25rem;
          height: .45rem;
          line-height: .45rem;
          text-align: center;
          color: #FFFFFF;
          font-size: 0.24rem;
          font-family: MicrosoftYaHei;
          background-image: linear-gradient(-90deg,
            #0b4fbb 0%,
            #1279f7 100%);
          border-radius: 0.23rem;
        }
      }
    }
  }
}
</style>
