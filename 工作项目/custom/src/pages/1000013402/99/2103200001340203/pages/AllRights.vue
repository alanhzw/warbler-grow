<template>
  <div class="yili">
    <div class="prompt">
      <!--      <div v-if="rightInfo.isLock == 1" style="font-size: .22rem;margin-top: .66rem;color:#FFFFFF">-->
      <!--        当前已解锁的权益如下-->
      <!--      </div>-->

      <!--      <div v-else style="font-size: .22rem;color:#FFFFFF">-->
      <!--        成长值{{ rightInfo.achievePoints }}可解锁的权益如下-->
      <!--      </div>-->
    </div>

    <div class="banner">
      <div class="circular-view">
        <div v-for="(item,index) in levelNameList" :key="item" class="level" :class="item"
             :style="index + 1 > userLevel?'opacity:0.4':''">
          {{ item }}
        </div>

        <div style="position:absolute;top: 2.45rem;width: 100%">
          <div class="level-bg">V{{ userLevel }}</div>
          <div style="font-size: .36rem;color: #ffef67;margin-top: .1rem">当前成长值: {{ userAchieveNum }}</div>
        </div>
        <CircularCanvas :activeIndex="activeIndex + 1"></CircularCanvas>
      </div>

      <div class="swiper-container" ref="swiperRef">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in rightList" :key="index">
            <div style="position:relative;margin-top: .9rem;">
              <img :src="item.equityIcon"/>
              <img style="width: 3.3rem;position: absolute;left: 2.5rem;z-index: 1;"
                   src="../assets/right-lock.png" v-if="item.isLock === '0'"/>
              <div v-else
                   style="position: absolute;top: 1.8rem;left: 0.75rem;z-index: 1;font-size: .26rem;"
                   :style="colorChange(item.level)">已达成该等级
              </div>
            </div>

            <!-- 成长值列表 -->
            <div class="grow-list">
              <div class="content">
                <div class="title">
                  <img style="width: 4.14rem" src="../assets/right-grow-title.png"/>
                </div>
                <div style="overflow-y: auto;height: 9rem;margin-top: 1.3rem;">
                  <div class="task" v-for="(_item,_index) in item.sonEquities" :key="_index">
                    <!-- 成长任务 icon -->
                    <img class="task-img" :src="_item.icon"
                         :class="{'gray':_item.isLock === null || _item.isLock === '0'}"/>
                    <!-- 成长任务 信息 -->
                    <div class="task-message">
                      <div class="name">{{ _item.name }}</div>
                      <div class="detail">{{ _item.message }}</div>
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
    <!--    弹窗区域-->

    <!--京豆弹窗-->
    <div class="showMaskBlack" v-show="jdBean">
      <div class="bean-context">
        <div v-if="JdSourceList.length > 0" class="jdBean-content">
          <div v-for="item in JdSourceList" :key="item" class="bean-list">
            <div class="data-one" style="width: 33%">{{ item.jingdou }}京豆</div>
            <div class="data-one">下单{{ item.gmv }}元</div>
            <div class="data-one">{{ item.createTime }}</div>
          </div>
        </div>
        <div v-else style="position: absolute;top: 2.7rem;width: 99%">暂无京豆数据</div>

        <button class="backBtn" @click="jdBean = false"/>
        <button class="closeBtn" @click="jdBean = false"/>
      </div>
    </div>
    <!--中奖弹窗-->
    <div class="showMaskBlack" v-show="lotteryPrize">
      <div class="prize-context">
        <img class="real-icon" :src="winnerInfo?.drawInfo?.showImage || winnerInfo.yunSmaImageUrl" alt="图片加载失败"/>
        <button class="backBtn" @click="gotoAddress()"/>
        <button class="closeBtn" @click="lotteryPrize = false"/>
      </div>
    </div>
    <!--实物弹窗-->
    <!--    <van-overlay :show="realAddress">-->
    <div class="showMaskBlack" v-show="realAddress">
      <div class="real-context">
        <div class="info-area">
          <input maxlength="10" v-model="commitInfo.userName" style="width: 80%"/>
          <input maxlength="11" type="tel" v-model="commitInfo.phone"/>
          <input :value="address" @click="addressSelect=true" readonly/>
          <input maxlength="30" v-model="commitInfo.address"/>
        </div>
        <button class="backBtn" @click="getCommitCheck()"/>
        <button class="closeBtn" @click="realAddress = false"/>
      </div>
    </div>
    <!--    </van-overlay>-->
    <!--底部地址选择弹出层-->
    <Popup position="bottom" v-model:show="addressSelect" :style="{ height: '40%' }">
      <Area title="选择地址" :area-list="areaList" @confirm="confirmAddress"
            @cancel="addressSelect= false"/>
    </Popup>

    <!--未中奖弹窗-->
    <div class="showMaskBlack" v-show="noPrize">
      <div class="no-context">
        <button class="backBtn" @click="noPrize = false"/>
        <button class="closeBtn" @click="noPrize = false"/>
      </div>
    </div>

    <!--优惠券未到-->
    <div class="showMaskBlack" v-show="couponComing">
      <div class="coupon-failed">
        <button class="backBtn" @click="couponComing = false"/>
        <button class="closeBtn" @click="couponComing = false"/>
      </div>
    </div>

    <!--敬请期待-->
    <div class="showMaskBlack" v-show="comingSoon">
      <div class="coming-context">
        <button class="backBtn" @click="comingSoon = false"/>
        <button class="closeBtn" @click="comingSoon = false"/>
      </div>
    </div>

    <!--敬请期待 -- 年度奖品-->
    <div class="showMaskBlack" v-show="comingSoonYears">
      <div class="coming-years-context">
        <button class="backBtn" @click="comingSoonYears = false"/>
        <button class="closeBtn" @click="comingSoonYears = false"/>
      </div>
    </div>

    <!--我的奖品-->
    <div class="showMaskBlack" v-show="myPrize">
      <div class="my-prize-context">

        <!-- 数据 -->
        <div v-if="myPrizeList.length > 0" class="overflow">
          <div v-for="item in myPrizeList" :key="item" class="data-view">
            <div class="data-one">{{ item.drawInfoName }}</div>
            <div class="data-one">{{ getDateFormat(item.createTime) }}</div>
            <div class="data-one" v-if="item.score===0" style="width: 25%">已填写</div>
            <div v-else-if="item.score===1" class="data-one" @click="fillAddress(item)" style="width: 25%">
              未填写
            </div>
            <div v-else class="data-one" style="width: 25%"></div>
          </div>
        </div>
        <div v-else class="none-data" style="position: absolute;top: 2.7rem;width: 99%">暂无抽奖数据</div>
        <button class="backBtn" @click="myPrize = false"/>
        <button class="closeBtn" @click="myPrize = false"/>
      </div>
    </div>

    <!--联系客服-->
    <div class="showMaskBlack" v-show="kefu">
      <div class="kefu-context">
        <button class="backBtn" @click="kefu = false"/>
        <button class="closeBtn" @click="kefu = false"/>
      </div>
    </div>

    <!--e卡弹窗-->
    <div class="showMaskBlack" v-show="eCard">
      <div class="eCard-context">
        <button class="backBtn" @click="eCard = false"/>
        <button class="closeBtn" @click="eCard = false"/>
      </div>
    </div>

    <!--九宫格弹窗-->
    <div class="showMaskBlack" v-show="jiugGongDraw">
      <div class="jiugong-context">
        <div class="lottery">
          <div class="message">
            <span>当前剩余抽奖次数: </span>
            <span style="color: #ffb728">{{ drawNum }}</span>
            <span>次</span>
          </div>

          <JiuGongLottery @getResult="lotteryResult"
                          @drawIsOver="drawIsOver"
                          :drawNum="drawNum"
                          :drawPrizeInfo="drawPrizeArr"
                          :TurntableBg="LotteryConfig.TurntableBg"
                          :TurnStartBg="LotteryConfig.TurnStartBg"
                          :PrizeGridOddBg="LotteryConfig.PrizeGridOddBg"
                          :PrizeGridEvenBg="LotteryConfig.PrizeGridEvenBg"
                          :FontOddColor="LotteryConfig.FontOddColor"
                          :FontEvenColor="LotteryConfig.FontEvenColor"
                          :PrizeImgSize="`${LotteryConfig.PrizeImgSize/100}rem`"
                          :FontSize="`${LotteryConfig.FontSize/100}rem`"
                          :JdouUrl="LotteryConfig.JdouUrl"
                          :winnerInfo="winnerInfo">
          </JiuGongLottery>
        </div>
        <button class="closeBtn" @click="sureDrawing()"/>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Swiper from 'swiper';
import {
  inject,
  nextTick, onMounted, ref, Ref,
} from 'vue';
import { areaList } from '@vant/area-data';
import { Popup, Toast, Area } from 'vant';
import { cjwxRequest } from '@/utils/service';
import JiuGongLottery from '@/widgets/JiuGongLottery/JiuGongLottery.vue';
import { BaseInfo } from '@/types/BaseInfo';
import { LotteryConfig } from '../assets/ts/JiuGongConfig';
import CircularCanvas from '../components/CircularCanvas.vue';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const venderId = ref<string>(baseInfo.venderId);

// 活动子品牌 - 伊利 优酸乳
const sonBrand = 'yousuanru';
const cjwxPin = window.sessionStorage.getItem('LZ_JD_USER_PIN');

const activeIndex = ref(0);

// 权益列表
const rightList = ref([]);

// 当前权益Swiper信息
const rightInfo = ref({});

// 京豆详情列表
const JdSourceList = ref([]);

// 京豆弹窗
const jdBean = ref(false);

// 中奖弹窗
const lotteryPrize = ref(false);

// 实物地址弹窗
const realAddress = ref(false);
// 地址选择框
const addressSelect = ref(false);
const address = ref('');

const commitInfo = ref({
  userName: '',
  phone: '',
  province: '',
  city: '',
  district: '',
  address: '',
});

// 未中奖弹窗
const noPrize = ref(false);

// 优惠券未到
const couponComing = ref(false);

// 电子卡弹窗
const eCard = ref(false);

// 敬请期待
const comingSoon = ref(false);

// 敬请期待 -- 年度
const comingSoonYears = ref(false);

// 我的奖品弹窗
const myPrize = ref(false);

// 联系客服
const kefu = ref(false);

// 九宫格转盘弹窗
const jiugGongDraw = ref(false);

const swiperRef: Ref = ref(null);
// 勋章等级
const levelNameList = ['V1', 'V2', 'V3', 'V4', 'V5', 'V6', 'V7'];
const userLevel = ref(0);
const userAchieveNum = ref(0);

// 我的奖品列表（抽奖记录）
const myPrizeList = ref([]);
// 转盘奖品信息
const drawPrizeArr = ref([]);
// 转盘item信息
const rightItemId = ref();
// 转盘是否正在转动
const drawTurn = ref(false);
// 转盘可转动次数
const drawNum = ref(1);
// 中奖的奖品数据
const winnerInfo = ref({
  venderId: '',
  activityId: '',
  name: '',
  addressId: '',
});

// 勋章切换颜色
const colorChange = (level: any) => {
  let fontColor = '';
  if (level === 1 || level === 2) {
    fontColor = 'color:#8b95c2';
  } else if (level === 3 || level === 4) {
    fontColor = 'color:#5ebecd';
  } else if (level === 5 || level === 6) {
    fontColor = 'color:#1b765e';
  } else {
    fontColor = 'color:#c9ac23';
  }
  return fontColor;
};

// 我的奖品 填写地址
const fillAddress = (item: any) => {
  winnerInfo.value = item;
  realAddress.value = true;
  myPrize.value = false;
};

// 转盘转动时不允许关闭
const sureDrawing = () => {
  if (drawTurn.value === true) {
    Toast('转盘正在运行中！请稍后关闭');
  } else {
    jiugGongDraw.value = false;
  }
};

// 时间戳转时间
const add0 = (num: number) => (num < 10 ? `0${num}` : num);
const getDateFormat = (date: number) => {
  const time = new Date(date);
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  const mm = time.getMinutes();
  const s = time.getSeconds();
  return `${y}-${add0(m)}-${add0(d)} ${add0(h)}:${add0(mm)}`;
};

// 跳转地址
const gotoAddress = () => {
  lotteryPrize.value = false;
  realAddress.value = true;
};

// 提交信息
const onSave = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/wxAddress/save', {
    venderId: venderId.value,
    pin: cjwxPin,
    activityId: winnerInfo.value.activityId,
    actType: '13',
    prizeName: winnerInfo.value.name,
    receiver: commitInfo.value.userName,
    phone: commitInfo.value.phone,
    province: commitInfo.value.province,
    generateId: winnerInfo.value.addressId,
    city: commitInfo.value.city,
    county: commitInfo.value.district,
    postalCode: '116000',
    address: commitInfo.value.address,
  }).then((res) => {
    if (res.result) {
      Toast('提交成功');
      commitInfo.value.userName = '';
      commitInfo.value.phone = '';
      commitInfo.value.address = '';
      realAddress.value = false;
    } else {
      Toast(res.errorMsg);
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 信息校验
const getCommitCheck = () => {
  const phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
  if (!commitInfo.value.userName) {
    Toast('请输入收件人姓名');
  } else if (!commitInfo.value.phone) {
    Toast('请输入手机号');
  } else if (!phoneReg.test(commitInfo.value.phone)) {
    Toast('请输入正确的手机号');
  } else if (!address.value) {
    Toast('请选择城市');
  } else if (!commitInfo.value.address) {
    Toast('请输入详细地址');
  } else {
    onSave();
  }
};

// 地址弹出层
const confirmAddress = (info: any) => {
  console.log(info);
  addressSelect.value = false;
  address.value = ''; // 点击确认后清空之前地址信息

  for (let i = 0; i < info.length; i += 1) {
    if (i !== 0) {
      address.value = `${address.value} ${info[i].name}`;
    } else {
      address.value += info[i].name;
    }
  }
  commitInfo.value.province = info[0].name;
  commitInfo.value.city = info[1].name;
  commitInfo.value.district = info[2].name;
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
      console.log(userLevel.value);
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
                console.log(rightInfo.value);
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

// 获取京豆订单详情
const getJdDetailList = (medalId: string, rightsId: string) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post(`/yili/medal/return/log?brand=${sonBrand}&medalId=${sonBrand}&rightsId=${sonBrand}`).then((res) => {
    if (res.success) {
      JdSourceList.value = res.data;
    }
  });
};

// 获取抽奖结果
const lotteryResult = () => {
  drawTurn.value = true;
  drawNum.value -= 1;
  cjwxRequest.get('/yili/medal/receive/draw', {
    params: {
      brand: sonBrand,
      rightsItemId: rightItemId.value,
    },
  }).then((res) => {
    if (res.success) {
      winnerInfo.value = res.data;
    }
  });
};

// 抽奖转盘转动结束
const drawIsOver = () => {
  drawTurn.value = false;
  // 刷新主接口
  getAllRightsList();
  if (winnerInfo.value.position !== 0) {
    // 中奖弹窗
    lotteryPrize.value = true;
  } else {
    // 未中奖弹窗
    noPrize.value = true;
  }
  jiugGongDraw.value = false;
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
      myPrize.value = true;
      Toast.clear();
    }
  });
};

// 获取按钮状态
const getBtnStatus = (isEffective: string) => {
  let btnName = '';
  if (isEffective === '0') {
    btnName = '立即领取';
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
const getDrawPrizeInfo = (drawActId: string): any => {
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
      jiugGongDraw.value = true;
    }
  });
};

// 点击 领取/查看详情/抽奖 按钮
const clickStatusBtn = (index: number, _index: number) => {
  const sonRightlist = rightList.value[index].sonEquities;
  rightItemId.value = sonRightlist[_index].id;
  // eslint-disable-next-line no-underscore-dangle
  const { isEffective } = sonRightlist[_index];
  console.log(isEffective);
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
            drawNum.value = 1;
            getDrawPrizeInfo(res.data.activityId);
          } else if (res.data.rightsType === '1') {
            // 会员卡 ---> 敬请期待弹窗
            comingSoon.value = true;
          } else {
            Toast(res.data.msg);
          }
          setTimeout(() => getAllRightsList(), 800);
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
    jdBean.value = true;
    // eslint-disable-next-line no-underscore-dangle
    getJdDetailList(rightList.value[index].medalId, sonRightlist[_index].rightsId);
  } else if (isEffective === '3') {
    // 跳转客服页面
    window.location.href = 'https://fpage.jd.com/exService/?venderId=1000013402#/';
  } else if (isEffective === '4') {
    // 敬请期待 -- 弹窗
    comingSoon.value = true;
  } else if (isEffective === '6') {
    // 我的奖品 -- 弹窗
    getMyPrizeList(sonRightlist[_index].id);
  } else if (isEffective === '7') {
    // 敬请期待 -- 年度奖品 -- 弹窗
    comingSoonYears.value = true;
  } else if (isEffective === '8') {
    // 联系客服 -- 弹窗
    kefu.value = true;
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
  background: url("../assets/right-banner.png") no-repeat;
  background-size: cover;
  height: 19.14rem;

  /*.title {*/
  /*  width: 100%;*/
  /*  position: absolute;*/
  /*  top: 8.2rem;*/
  /*}*/
  .prompt {
    position: absolute;
    top: 6.6rem;
    left: 1.8rem;
    width: 4rem;
    color: #fff100;
  }

  .banner {
    /*background: url("../assets/right-banner.png") no-repeat;*/
    /*background-size: 100% 100%;*/
    width: 100%;
    height: 9rem;

    .swiper-container {
      margin: 0.3rem auto;
      height: 15.5rem;
    }

    .circular-view {
      width: 100%;
      height: 2.9rem;
      position: relative;
      padding-top: 1.2rem;
      box-sizing: border-box;

      .level {
        position: absolute;
        color: #fff;
      }

      .V1 {
        top: 3.1rem;
        left: 0.9rem;
      }

      .V2 {
        top: 2.1rem;
        left: 1.5rem;
      }

      .V3 {
        top: 1.45rem;
        left: 2.5rem;
      }

      .V4 {
        top: 1.25rem;
        left: 3.6rem;
      }

      .V5 {
        top: 1.45rem;
        left: 4.7rem;
      }

      .V6 {
        top: 2.15rem;
        left: 5.75rem;
      }

      .V7 {
        top: 3.2rem;
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
        width: 5.6rem;
      }
    }
  }

  .grow-list {
    position: relative;
    margin-top: .8rem;

    .content {
      width: 5.9rem;
      height: 10.93rem;
      margin: 0 auto;
      padding: .3rem 0;
      background: url("../assets/detail-grow-bg.png") no-repeat;
      background-size: 100% 100%;

      .title {
        width: 100%;
        position: absolute;
        top: .8rem;
      }

      .task {
        width: 5rem;
        height: 1.6rem;
        margin: .2rem auto 0;
        /*padding: .12rem;*/
        align-items: center;
        /*background-color: #ffffff;*/
        /*box-shadow: 5px 5px 5px #def4ff;*/
        border-radius: 0.12rem;
        background: url('../assets/right-item-bg.png') no-repeat;
        background-size: 100%;
        position: relative;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;

        .task-img {
          width: .64rem;
          margin-left: .1rem;
        }

        .task-message {
          width: 2.7rem;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          margin-left: .2rem;

          .name {
            font-family: MicrosoftYaHei;
            font-size: 0.3rem;
            font-weight: bold;
            color: #333333;
            width: 3.8rem;
          }

          .detail {
            font-family: MicrosoftYaHei;
            height: .9rem;
            font-size: 0.22rem;
            color: #666666;
            overflow-y: scroll;
            margin-top: .05rem;
          }
        }

        .task-btn {
          width: 1.25rem;
          height: .45rem;
          line-height: .45rem;
          text-align: center;
          color: #084b39;
          font-size: 0.24rem;
          font-family: MicrosoftYaHei;
          background-image: linear-gradient(-90deg,
            #e5fe42 0%,
            #e5fe42 100%);
          border-radius: 0.23rem;
        }
      }
    }
  }

  .showMaskBlack {
    background: rgba(0, 0, 0, 0.7);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    /*e卡弹窗*/
    .eCard-context {
      padding-top: 1.5rem;
      position: relative;
      width: 6.8rem;
      height: 6.4rem;
      background: url('../assets/e-card.png') no-repeat;
      background-size: 100%;

      .closeBtn {
        position: absolute;
        width: .7rem;
        height: .7rem;
        background: none;
        border: none;
        top: 0;
        right: 0;
      }

      .backBtn {
        position: absolute;
        width: 3.5rem;
        height: .9rem;
        background: none;
        border: none;
        top: 5.9rem;
        left: 1.7rem;
      }
    }

    /*敬请期待*/
    .coming-context {
      padding-top: 1.5rem;
      position: relative;
      width: 6.8rem;
      height: 6.4rem;
      background: url('../assets/coming-failed.png') no-repeat;
      background-size: 100%;

      .closeBtn {
        position: absolute;
        width: .7rem;
        height: .7rem;
        background: none;
        border: none;
        top: 0;
        right: 0;
      }

      .backBtn {
        position: absolute;
        width: 3.5rem;
        height: .9rem;
        background: none;
        border: none;
        top: 5.9rem;
        left: 1.7rem;
      }
    }

    /*敬请期待 -- 年度奖品*/
    .coming-years-context {
      padding-top: 1.5rem;
      position: relative;
      width: 6.8rem;
      height: 6.4rem;
      background: url('../assets/coming-soon-years.png') no-repeat;
      background-size: 100%;

      .closeBtn {
        position: absolute;
        width: .7rem;
        height: .7rem;
        background: none;
        border: none;
        top: 0;
        right: 0;
      }

      .backBtn {
        position: absolute;
        width: 3.5rem;
        height: .9rem;
        background: none;
        border: none;
        top: 5.5rem;
        left: 1.7rem;
      }
    }

    /*客服*/
    .kefu-context {
      padding-top: 1.5rem;
      position: relative;
      width: 6.8rem;
      height: 6.4rem;
      background: url('../assets/ke-fu.png') no-repeat;
      background-size: 100%;

      .closeBtn {
        position: absolute;
        width: .7rem;
        height: .7rem;
        background: none;
        border: none;
        top: 0;
        right: 0;
      }

      .backBtn {
        position: absolute;
        width: 3.5rem;
        height: .9rem;
        background: none;
        border: none;
        top: 5.5rem;
        left: 1.7rem;
      }
    }

    /*我的奖品*/
    .my-prize-context {
      padding-top: 1.5rem;
      position: relative;
      width: 6.8rem;
      height: 6.4rem;
      background: url('../assets/my-prize.png') no-repeat;
      background-size: 100%;

      .overflow {
        position: absolute;
        top: 2.3rem;
        width: 100%;
        height: 3.5rem;
        overflow-y: auto;

        .data-view {
          display: flex;
          justify-content: center;
          align-content: center;
          width: 100%;
          padding: 0 .2rem;
          box-sizing: border-box;
          font-size: .22rem;
          line-height: .6rem;

          .data-one {
            width: 35%;
            text-align: center;
          }
        }
      }

      .closeBtn {
        position: absolute;
        width: .7rem;
        height: .7rem;
        background: none;
        border: none;
        top: 0;
        right: 0;
      }

      .backBtn {
        position: absolute;
        width: 3.5rem;
        height: .9rem;
        background: none;
        border: none;
        top: 5.9rem;
        left: 1.7rem;
      }
    }

    /*优惠券未到*/
    .coupon-failed {
      padding-top: 1.5rem;
      position: relative;
      width: 6.8rem;
      height: 6.4rem;
      background: url('../assets/coupon-failed.png') no-repeat;
      background-size: 100%;

      .closeBtn {
        position: absolute;
        width: .7rem;
        height: .7rem;
        background: none;
        border: none;
        top: 0;
        right: 0;
      }

      .backBtn {
        position: absolute;
        width: 3.5rem;
        height: .9rem;
        background: none;
        border: none;
        top: 5.9rem;
        left: 1.7rem;
      }
    }

    /*未中奖弹窗*/
    .no-context {
      padding-top: 1.5rem;
      position: relative;
      width: 6.8rem;
      height: 6.4rem;
      background: url('../assets/no-prize.png') no-repeat;
      background-size: 100%;

      .closeBtn {
        position: absolute;
        width: .7rem;
        height: .7rem;
        background: none;
        border: none;
        top: 0;
        right: 0;
      }

      .backBtn {
        position: absolute;
        width: 3.5rem;
        height: .9rem;
        background: none;
        border: none;
        top: 5.9rem;
        left: 1.7rem;
      }
    }

    /*实物弹窗*/
    .real-context {
      padding-top: 1.5rem;
      position: relative;
      width: 6.8rem;
      height: 6.4rem;
      background: url('../assets/prize-add.png') no-repeat;
      background-size: 100%;

      .info-area {
        width: 50%;
        position: absolute;
        top: 3.43rem;
        right: 1.3rem;

        input {
          width: 100%;
          height: 0.43rem;
          font-size: 0.25rem;
          float: right;
          padding: 0.03rem 0;
          background: unset !important;
          border: unset !important;
          text-align: right;
          margin-bottom: .12rem;
        }
      }

      .closeBtn {
        position: absolute;
        width: .7rem;
        height: .7rem;
        background: none;
        border: none;
        top: 0;
        right: 0;
      }

      .backBtn {
        position: absolute;
        width: 3.5rem;
        height: .9rem;
        background: none;
        border: none;
        top: 5.9rem;
        left: 1.7rem;
      }
    }

    /*中奖弹窗*/
    .prize-context {
      padding-top: 1.5rem;
      position: relative;
      width: 6.8rem;
      height: 6.4rem;
      background: url('../assets/lottery-prize.png') no-repeat;
      background-size: 100%;

      .real-icon {
        width: 2.5rem;
        height: 2.5rem;
        display: block;
        margin: .5rem auto 0;
        background-size: 100%;
      }

      .closeBtn {
        position: absolute;
        width: .7rem;
        height: .7rem;
        background: none;
        border: none;
        top: 0;
        right: 0;
      }

      .backBtn {
        position: absolute;
        width: 3.5rem;
        height: .9rem;
        background: none;
        border: none;
        top: 5.9rem;
        left: 1.7rem;
      }
    }

    /*京豆弹窗*/
    .bean-context {
      padding-top: 1.5rem;
      position: relative;
      width: 6.8rem;
      height: 6.4rem;
      background: url('../assets/jd-detail.png') no-repeat;
      background-size: 100%;

      .closeBtn {
        position: absolute;
        width: .7rem;
        height: .7rem;
        background: none;
        border: none;
        top: 0;
        right: 0;
      }

      .backBtn {
        position: absolute;
        width: 3.5rem;
        height: .9rem;
        background: none;
        border: none;
        top: 5.9rem;
        left: 1.7rem;
      }

      .jdBean-content {
        position: absolute;
        top: 2rem;
        width: 100%;
        height: 4.8rem;
        overflow-y: auto;

        .bean-list {
          display: flex;
          justify-content: center;
          align-content: center;
          width: 100%;
          padding: 0 .2rem;
          box-sizing: border-box;
          font-size: .26rem;
          line-height: .6rem;

          .data-one {
            width: 34%;
            text-align: center;
          }
        }
      }
    }

    .jiugong-context {
      padding-top: 1.5rem;
      position: relative;
      width: 6.8rem;
      height: 7.88rem;
      background: url('../assets/dialog-jiugong.png') no-repeat;
      background-size: 100%;

      .lottery {
        .message {
          width: 100%;
          position: absolute;
          top: 1.5rem;
          font-size: .24rem;
          color: #084b39;
        }
      }

      .closeBtn {
        position: absolute;
        width: .7rem;
        height: .7rem;
        background: none;
        border: none;
        top: 0;
        right: 0;
      }

      .backBtn {
        position: absolute;
        width: 3.5rem;
        height: .9rem;
        background: none;
        border: none;
        top: 5.9rem;
        left: 1.7rem;
      }
    }
  }
}
</style>
