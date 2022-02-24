<!--
 * @Description:大贸
 * @Date: 2021-06-24 10:46:57
 * @LastEditTime: 2021-07-15 10:00:47
 * @FilePath: \custom\src\pages\1000147201\2106100014720101\App.vue
-->
<template>
  <!-- 活动未结束 -->
  <div class="swisse"
       v-if='state.content.code!=="1"'>
    <!-- 背景图片 -->
    <img :src="background"
         class='
       background'>
    <!-- level -->
    <div class="levels">
      <div class="level-item-01 level-item">
        <img :src="levelImg1"
             class="img-01 levelImg">
        <div class="btn-01"
             @click='draw(state.content.level1.btnStatus)'></div>
      </div>
      <div class="level-item-02 level-item">
        <img :src="levelImg2"
             class="img-02 levelImg">
        <div class="btn-02"
             @click='draw(state.content.level2.btnStatus)'></div>
      </div>
      <div class="level-item-03 level-item">
        <img :src="levelImg3"
             class="img-03 levelImg">
        <div class="btn-03"
             @click='draw(state.content.level3.btnStatus)'></div>
      </div>
    </div>
    <!-- e卡领取记录 -->
    <div class="ecard-record"
         @click='showMycordPopup = true'>
    </div>
    <!-- 活动规则 -->
    <div class="rule">
      <div>活动规则</div>
      <div v-html="state.content.rule">
      </div>
    </div>

    <!-- 领取成功弹窗 -->
    <van-popup v-model:show="showSuccessPopup">
      <div class="success-box">
        <img :src="success"
             class="success-popup">
        <!-- 我的卡券 -->
        <div class="my-ecord"
             @click="openMyCord()">

        </div>
        <!-- 关闭按钮 -->
        <div class="close-btn-success"
             @click='showSuccessPopup=false'></div>
      </div>
    </van-popup>

    <!-- 已领取弹窗 -->
    <van-popup v-model:show="showHasPopup">
      <div class="has-box">
        <img :src="has"
             class="has-popup">
        <!-- 我的卡券 -->
        <div class="my-ecord"
             @click="openMyCord()">

        </div>
        <!-- 关闭按钮 -->
        <div class="close-btn-has"
             @click='showHasPopup=false'></div>
      </div>
    </van-popup>

    <!-- 不符合规则弹窗 -->
    <van-popup v-model:show="showFailPopup">
      <div class="fail-box">
        <img :src="fail"
             class="fail-popup">
        <!-- 进店逛逛 -->
        <div class="enter-shop"
             @click='enterShop'>

        </div>
        <!-- 关闭按钮 -->
        <div class="close-btn-fail"
             @click='showFailPopup=false'></div>
      </div>
    </van-popup>

    <!-- 我的卡券弹窗 -->
    <van-popup v-model:show="showMycordPopup">
      <div class="mycord-box">
        <img :src="mycord"
             class="mycord-popup">
        <!-- 领取记录 -->
        <div class="mycord-info">
          <div v-if='state.content.myCards.length>0'>
            <div v-for="(item) in state.content.myCards"
                 :key='item.cardPwd'>
              <!-- <div>【领取时间】：</div>
            <div> &nbsp;&nbsp;{{item.createDate}}</div>
            <div>【领取卡密】：</div>
            <div> &nbsp;&nbsp;{{item.cardPwd}}</div> -->
              <div class="mycord-info-item">【领取时间】：{{item.createDate}}</div>
              <div class="mycord-info-item">【领取卡密】：{{item.cardPwd}}</div>
            </div>
          </div>
          <div v-else>
            暂无领取记录
          </div>
        </div>

        <!-- 进店逛逛 -->
        <div class="enter-shop"
             @click='enterShop'>

        </div>
        <!-- 关闭按钮 -->
        <div class="close-btn-mycord"
             @click='showMycordPopup=false'></div>
      </div>
    </van-popup>
  </div>
  <!-- 活动已结束 -->
  <div class="activity-over"
       v-if='state.content.code === "1" '>
    <img src="./assets/activity_end.jpg"
         alt=""
         class="activity-over-img">
    <div class="activity-over-text1">您来晚了,活动已经结束了</div>
    <div class="activity-over-text2">下次记得早点来哦~</div>
    <div class="activity-over-btn"
         @click='enterShop'>进店逛逛</div>
  </div>
</template>

<script lang='ts' setup>
import {
  computed, ref, onMounted, reactive,
  inject,
} from 'vue';
import { Popup as VanPopup, Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

import background from './assets/background.png';
import levelTrue01 from './assets/01-true.png';
import levelTrue02 from './assets/02-true.png';
import levelTrue03 from './assets/03-true.png';
import levelFlase01 from './assets/01-false.png';
import levelFlase02 from './assets/02-false.png';
import levelFlase03 from './assets/03-false.png';
import mycord from './assets/mycord.png';
import success from './assets/success.png';
import fail from './assets/fail-popup.png';
import has from './assets/has-popup.png';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;

console.log('🚀🚀~ baseInfo:', baseInfo);
// 数据
const state = reactive(
  {
    content: {
      code: '3', // 响应码:0.成功 1.活动已结束 2.您还未入会 3.没找到openId 4.配置缺失
      rule: '', // 活动规则
      // 领取区域1
      level1: {
        openDates: [], // 活动时间
        btnStatus: '2', // 是否可领取
        remark: '', // 领取说明
      },
      // 领取区域2
      level2: {
        openDates: [], // 活动时间
        btnStatus: '2', // 是否可领取
        remark: '', // 领取说明
      },
      // 领取区域3
      level3: {
        openDates: [], // 活动时间
        btnStatus: '2', // 是否可领取
        remark: '', // 领取说明
      },
      // 我的e卡
      myCards: [
        {
          createDate: '', // 领取时间
          cardPwd: '', // 卡密
        },
      ],
    },
  },
);
// 等级1
const levelImg1 = computed(() => {
  if (state.content.level1.btnStatus === '1') {
    return levelTrue01;
  }
  return levelFlase01;
});
// 等级2
const levelImg2 = computed(() => {
  if (state.content.level2.btnStatus === '1') {
    return levelTrue02;
  }
  return levelFlase02;
});
// 等级3
const levelImg3 = computed(() => {
  if (state.content.level3.btnStatus === '1') {
    return levelTrue03;
  }
  return levelFlase03;
});

// 领取结果 0.成功 1.活动已结束 2.您还未入会 3.没找到openId 4.消费金额不足 5.重复领取 6.数量不足 7.领取异常 8.服务繁忙
const drawResult = ref('');

// 领取成功弹窗
const showSuccessPopup = ref(false);
// 已领取弹窗
const showHasPopup = ref(false);
// 我的卡券弹窗
const showMycordPopup = ref(false);
// 不符合规则弹窗
const showFailPopup = ref(false);

// 获取活动id
const activityId = ref<string>(baseInfo.activityId);
// 主接口 获取活动信息
const getActivityInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/swisse/card/main', { activityId: activityId.value }).then((res) => {
    if (!res.data) {
      return;
    }
    state.content = res.data;
    state.content.rule = state.content.rule.replace(/\r\n/g, '<br>');
    // state.content.code = '1';
    if (state.content.code === '2') {
      window.location.href = 'https://shopmember.m.jd.com/shopcard?venderId=100000000000198&shopId=1000002672&venderType=1&channel=7038';
    }
    if (state.content.code === '3' || state.content.code === '4') {
      Toast('当前活动太火爆,请稍候再试~');
    }
    if (state.content.level1.btnStatus === '3' && state.content.level2.btnStatus === '3' && state.content.level3.btnStatus === '3') {
      showFailPopup.value = true;
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 点击领取按钮
const draw = (status:string) => {
  if (status === '2') {
    showHasPopup.value = true;
    return;
  }
  if (status === '3') {
    showFailPopup.value = true;
    return;
  }
  if (status === '1') {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    cjwxRequest.post('/swisse/card/draw', { activityId: activityId.value }).then((res) => {
    // 领取结果 0.成功 1.活动已结束 2.您还未入会 3.没找到openId 4.消费金额不足 5.重复领取 6.数量不足 7.领取异常 8.服务繁忙
      drawResult.value = res.data;
      if (res.data === '0') {
        showSuccessPopup.value = true;
        getActivityInfo();
      }
      if (res.data === '1') {
        Toast('活动已结束');
      }
      if (res.data === '2') {
        Toast('您还未入会');
      }
      if (res.data === '4') {
        Toast('您当前消费金额不足');
      }
      if (res.data === '5') {
      // Toast('您已经领过一次奖励了哦');
        showHasPopup.value = true;
      }
      if (res.data === '6') {
        Toast('E卡暂时库存不够，请明日再领！');
      }
      if (res.data === '3' || res.data === '7' || res.data === '8') {
        Toast('当前活动太火爆,请稍候再试~');
      }
    }).finally(() => {
      Toast.clear();
    });
  }
};

// 查看我的卡券
const openMyCord = () => {
  showSuccessPopup.value = false;
  showMycordPopup.value = true;
};
// 进店逛逛
const enterShop = () => {
  window.location.href = 'https://shop.m.jd.com/?shopId=1000147201';
};

// 初始化
onMounted(() => {
  getActivityInfo();
});

</script>

<style lang='scss'>
.swisse{
  position: relative;
  width: 100vw;
  overflow-x: hidden;
  .background{
    width: 100%;
  }
  .levels{
    width: 10.8rem;
    position: absolute;
    top: 13rem;
    left: 50.5%;
    transform: translateX(-50%);
    img{
      width: 100%;
    }
    .btn-01{
      position: absolute;
      top: 5rem;
      right: 1.3rem;
      width: 3rem;
      height: 1rem;
    }
    .btn-02{
      position: absolute;
      top: 12.9rem;
      right: 1.8rem;
      width: 2.2rem;
      height: 0.8rem;
    }
    .btn-03{
      position: absolute;
      top: 19.7rem;
      right: 1.8rem;
      width: 2.2rem;
      height: 0.8rem;
    }
    .level-item{
      margin-bottom: 0.25rem;
    }
  }
  .ecard-record{
    position: absolute;
    top: 34.9rem;
    left: 50%;
    transform: translateX(-50%);
    width: 5.5rem;
    height: 1rem;
  }
  .rule{
    position: absolute;
    top: 37.2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 9.5rem;
    height: 10rem;
    overflow: auto;
    color: #ffe9bb;;
  }
  .success-box{
    position: relative;
    .success-popup{
      width: 10rem;
    }
    .close-btn-success{
      position: absolute;
      top: 9.4rem;
      left: 52%;
      transform: translateX(-50%);
      width: 1rem;
      height: 1rem;
    }
    .my-ecord{
      position: absolute;
      top: 7.9rem;
      left: 52%;
      transform: translateX(-50%);
      width: 5rem;
      height: 1rem;
    }
  }
  .has-box{
    position: relative;
    .has-popup{
      width: 10rem;
    }
    .close-btn-has{
      position: absolute;
      top: 9.4rem;
      left: 52%;
      transform: translateX(-50%);
      width: 1rem;
      height: 1rem;
    }
    .my-ecord{
      position: absolute;
      top: 7.9rem;
      left: 52%;
      transform: translateX(-50%);
      width: 5rem;
      height: 1rem;
    }
  }
  .fail-box{
    position: relative;
    .fail-popup{
      width: 10rem;
    }
    .close-btn-fail{
      position: absolute;
      top:11.5rem;
      left: 54%;
      transform: translateX(-50%);
      width: 1rem;
      height: 1rem;
    }
    .enter-shop{
      position: absolute;
      top: 9.9rem;
      left: 52%;
      transform: translateX(-50%);
      width: 5rem;
      height: 1rem;
    }
  }
  .mycord-box{
    position: relative;
    .mycord-popup{
      width: 12rem;
    }
    .close-btn-mycord{
      position: absolute;
      top: 14rem;
      left: 52%;
      transform: translateX(-50%);
      width: 1rem;
      height: 1rem;
    }
    .enter-shop{
      position: absolute;
      top: 11.9rem;
      left: 52%;
      transform: translateX(-50%);
      width: 5rem;
      height: 1rem;
    }
    .mycord-info{
      position: absolute;
      text-align: left;

      top: 6rem;
      left: 2.4rem;
    }
    .mycord-info-item{
      height: 1rem;
      line-height: 1rem;
      border-bottom: 1px dashed #ccc;
    }
  }
  .van-popup{
    background-color: transparent;
  }
}
.activity-over{
    width: 100vw;
    margin-top: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .activity-over-img{
      width: 4.5rem;
      height: 4.5rem;
    }
    .activity-over-text1{
      margin-top: 0.5rem;
    }
    .activity-over-text2{
      margin-top: 0.2rem;
      font-size: 0.4rem;
      color: rgb(102, 102, 102);
    }
    .activity-over-btn{
      width: 4.4rem;
      height: 0.9rem;
      margin-top: 0.2rem;
      line-height: 0.9rem;
      font-size: 0.4rem;
      text-align: center;
      color: rgb(255, 255, 255);
      background: rgb(0, 136, 223);
      border-radius: 0.55rem;
    }
  }
</style>
