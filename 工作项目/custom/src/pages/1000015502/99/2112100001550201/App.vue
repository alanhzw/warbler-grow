/**
* @Description:caoshijie
* @Date: 2021/12/9
* @Description:  洋河 新客福利站
* @FilePath:src\pages\1000015502\99\2112100001550201\App.vue
*/
<template>
  <div class='step1' v-show='step ==1'>
    <!--  kv图片-->
<!--    <img class='kv_img' src='./assets/kv.png'>-->
    <div class='rule_btn' @click='modalShow.ruleModal= true'>活动规则</div>
    <div class='rule_btn' @click='modalShow.myGift= true'>我的奖品</div>
    <div class='content'>
      <img class='kv_img' src='./assets/poin.png'>
      <div class='btn' :style='{ filter: actInfo.isMember?"grayscale(1)":"grayscale(0)"}' @click='joinRemember(actInfo.isMember)'>加入会员 &gt;</div>
<!--      没有优惠券id 暂时注释 2021年12月14日 -->
<!--      <div class='coupon_list'>-->
<!--        <img src='./assets/coupon50.png'>-->
<!--        <div class='btn btn_coupon50' @click='collectCoupons("1231231313")'>立即领取 &gt;</div>-->
<!--        <img src='./assets/coupon100.png'>-->
<!--        <div class='btn btn_coupon100' @click='collectCoupons("55555555")'>立即领取 &gt;</div>-->
<!--      </div>-->
      <!--    第一步-->
      <img class='kv_img ' src='./assets/step1.png'>
      <div class='btn step1_btn' @click='participationActivities'>会员下单 &gt;</div>
      <!--    第二步-->
      <img class='kv_img step_img' src='./assets/step2.png'>
      <div class='btn step2_btn' @click='luckDraw'>立即抽奖 &gt;</div>

      <!--    第三步-->
      <img class='kv_img step_img' src='./assets/step3.png'>
    </div>
  </div>
  <div class='sku_box' v-show='step ==2'>
    <img class='sku_title' src='./assets/skuTitle.png'>
    <div class='sku_list_box'>
      <div class='sku_list' @click='gotoSkuPage(item.skuId)' v-for='item in skuList' :key='item.id'>
        <img :src='formatUrl(item.logo)' >
        <div class='sku_short_name'>{{item.skuNameShort}}</div>
        <div class='sku_name'>{{item.skuName}}</div>
      </div>
    </div>
    <img class='sku_title' @click='backHome' src='./assets/back.png'>
  </div>

  <!--  规则弹框-->
  <Popup v-model:show='modalShow.ruleModal'>
    <img class='rule_bg' src='./assets/ruleBg.png'>
    <div class='close_btn' @click='modalShow.ruleModal =false'>X</div>
    <div class='rule_text' v-html='ruleText'></div>
  </Popup>
  <!--  我的奖品弹框-->
  <Popup v-model:show='modalShow.myGift'>
    <div class='modal'>
      <div class='modal_con'>
        <img class='logo' src='./assets/logo.png'>
      </div>
      <div v-if='giftList.length>0' >
        <div class='gift_box' >
          <div class='gift_til'>
            <div class='gift_mix'>奖品</div>
          </div>
          <div class='gift_til'>
            <div class='gift_mix'>获奖订单号</div>
          </div>
          <div class='gift_til'>
            <div class='gift_mix'>发放状态</div>
          </div>
        </div>
        <div class='gift_List' v-for='item in giftList' :key='item.id'>
          <div class='gift_name'>{{item.giftName}}</div>
          <div class='gift_name'>{{item.orderId}}</div>
          <div class='gift_name'>{{item.giftStatus}}</div>
        </div>
      </div>
      <div class='gift_box' v-else>
        暂无奖品记录...
      </div>
    </div>
  </Popup>
  <!--  入会提醒弹窗-->
  <Popup v-model:show='modalShow.joinRemember'>
    <img class='rule_bg' src='./assets/joinModal.png'>
    <div class='join_btn' @click='joinRemember(actInfo.isMember)'>立即入会 &gt;</div>
  </Popup>
</template>

<script setup lang='ts'>
import { inject, onMounted, reactive, ref } from 'vue';
import { Popup, Toast } from 'vant';
import { BaseInfo } from '@/types/BaseInfo';
import { gotoSkuPage } from '@/utils';
import { joinRemember, luckDraw, getActivityInfo, getRules, findSkus, drawCoupon, giftListType, status } from './hook/tools';

const baseInfo = inject('baseInfo') as BaseInfo;
const isOpenCard = inject('isOpenCard');
// 弹窗
const modalShow = reactive({
  ruleModal: false, // 规则
  myGift: false, // 奖品
  joinRemember: false, // 入会
});
// 活动步骤
const step = ref(1);
// 规则
const ruleText = ref('');
// 奖品数据
const giftList:giftListType[] = reactive([]);
// sku数据
const skuList = ref([]);
// 活动信息
const actInfo:status = ref({});
// 返回首页
const backHome = () => {
  step.value = 1;
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
};
// 参与活动  会员下单按钮
const participationActivities = () => {
  if (!isOpenCard) {
    modalShow.joinRemember = true;
    return;
  }
  if (!actInfo.value.isNewMember) {
    Toast('此活动针对会员新客，您可以参加会员复购活动.');
    return;
  }
  if (!actInfo.value.hasOpenCardBean) {
    Toast('抱歉，奖品已领完，无法继续参与，请您关注其他会员活动.');
  }

  if (skuList.value.length === 0) {
    findSkus(baseInfo).then((res) => {
      skuList.value = res;
      step.value = 2;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  } else {
    step.value = 2;
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
};
// 格式化图片路径
const formatUrl = (url:string) => (url.indexOf('http') > -1 ? url : `https://img10.360buyimg.com/n1${url}`);
// 领取优惠券
const collectCoupons = (id:string) => {
  if (!isOpenCard) {
    modalShow.joinRemember = true;
    return;
  }
  drawCoupon(baseInfo, id);
};
// 查询活动信息
const getInfo = async () => {
  getActivityInfo(baseInfo).then((res:status) => {
    actInfo.value = res;
    if (actInfo.value.orderId) {
      giftList.push({
        giftName: '1000京豆',
        giftStatus: '已发放',
        orderId: actInfo.value.orderId,
      });
    }
  });
};
onMounted(() => {
  getInfo();
  getRules(baseInfo).then((res) => {
    ruleText.value = res;
  });
});
</script>

<style>
html {
  background: #ea433d;
}

.van-popup {
  background: none;
  overflow-y: visible;
}

.van-toast {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
<style lang='scss' scoped>
.kv_img {
  width: 100%;
}
.step1{
  background: url("./assets/kv.png") no-repeat;
  background-size: 100%;
  height: 28rem;
}
.rule_btn {
  position: absolute;
  right: 0;
  top: 1.37rem;
  background-color: #744a4d;
  border-radius: 0.16rem 0 0 .16rem;
  border: solid 0.02rem #ffffff;
  color: #FFF;
  font-size: .22rem;
  padding: .05rem .15rem;
  box-sizing: border-box;

  &:nth-child(2) {
    top: 2rem;
  }
}

.content {
  position: absolute;
  top: 8.3rem;
  padding: 0 0.18rem 0;
  box-sizing: border-box;
}

.coupon_list {
  display: flex;
  margin: .22rem 0;

  img {
    flex: 1;
    width: 50%;

    &:nth-child(1) {
      margin-right: .1rem;
    }
  }
}

.step_img {
  margin-top: .2rem;
}

.btn {
  display: inline-block;
  font-size: 0.31rem;
  color: #fff;
  background-color: #0b78de;
  border: solid 0.02rem #440b0f;
  border-radius: .3rem;
  padding: .1rem .25rem;
  box-sizing: border-box;
  position: absolute;
  top: 1.2rem;
  left: 3.5rem;
}

.btn_coupon50 {
  top: 3.9rem;
  left: 1rem;
  transform: scale(0.6);
}

.btn_coupon100 {
  top: 3.9rem;
  left: 4.7rem;
  transform: scale(0.6);
}

.step1_btn {
  top: 6.15rem;
  left: 2.7rem;
  transform: scale(1.1);
  animation: btnScale 1s infinite linear;
}

.step2_btn {
  top: 12.05rem;
  left: 2.7rem;
  transform: scale(1.1);
  animation: btnScale 1s infinite linear;

}

@keyframes btnScale {
  0% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1.1);
  }
}

.wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.rule_bg {
  width: 6.6rem;
}
.close_btn{
  position: absolute;
  top: -.2rem;
  right: 0;
  border-radius: 50%;
  text-align: center;
  width: .6rem;
  line-height: .6rem;
  font-size: .3rem;
  background: #ff5d00;
  color: #ffc8a8;
}
.rule_text {
  position: absolute;
  top: 1rem;
  max-height: 7.6rem;
  padding: 0 .45rem;
  font-size: 0.3rem;
  line-height: 0.42rem;
  overflow-y: auto;
  color: #5d2f10;
  box-sizing: border-box;
}

.modal {
  width: 6.86rem;
  height: 5.89rem;
  background-color: #fff;
  box-shadow: 0rem 0.2rem 0rem 0rem #ac2c31;
  border: solid 0.04rem #440b0f;
  border-radius: .5rem;

  .modal_con {
    background: #feece2;
    width: 6.36rem;
    height: 5.39rem;
    border-radius: .5rem;
    margin: .25rem;
    box-sizing: border-box;
  }
}

.logo {
  width: 1.97rem;
  position: absolute;
  left: 50%;
  top: .4rem;
  transform: translateX(-50%);
}

.gift_box, .gift_List {
  display: flex;
  position: absolute;
  justify-content: center;
  top: 1.2rem;
  left: .5rem;
  right: .5rem;

  .gift_til {
    flex: 1;
    display: flex;
    color: #fff;
    justify-content: center;

    .gift_mix {
      display: inline-block;
      background: #ff5d00;
      min-width: 1.18rem;
      text-align: center;
      padding: .1rem;
      box-sizing: border-box;

    }
  }
}

.gift_List {
  top: 1.9rem;
  display: flex;
  margin: .1rem 0;
  max-height: 3.5rem;
  overflow-y: auto;

  .gift_name {
    flex: 1;
    text-align: center;
    word-wrap: break-word;
    word-break:break-all;
  }
}

.join_btn {
  position: absolute;
  left: 2rem;
  bottom: 1.1rem;
  font-size: 0.52rem;
  color: #fffcfa;
}

.sku_box {
  width: 100%;

  .sku_title {
    width: 6.1rem;
    margin-top: .28rem;
    margin-left: .7rem;
  }
  .sku_list_box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-direction: row;
    width: 90%;
    margin-left: 5%;
    .sku_list{
      background: #fff;
      width: 49.5%;
      margin-right: 1%;
      padding: .2rem;
      box-sizing: border-box;
      font-size: .24rem;
      border-radius: .1rem;
      &:nth-child(2n){
        margin-right: 0;
      }
      box-sizing: border-box;
      margin-bottom: .2rem;
      img{
        width: 100%;
      }
      .sku_short_name{
        font-size: .26rem;
      }
      .sku_name{
        width:100%;
        font-size: .22rem;
        color: #666;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>
