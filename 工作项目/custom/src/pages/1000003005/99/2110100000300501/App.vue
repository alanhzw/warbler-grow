/**
* @Description:caoshijie
* @Date: 2021/10/18
* @Description: 欧乐B首购有礼
* @FilePath:src\pages\1000003005\99\2110100000300501\App.vue
*/
<template>
  <div v-if="step =='0'" class='rule-page'>
    <div class='rule-text' v-html='ruleText'></div>
    <div class='joinBtn' @click='join'>立即参与</div>
  </div>
  <div v-if="step =='1'" class='suc-page'>
    <div class='show-rule-btn' @click="step ='0'">活动规则</div>
    <skus-list class='skuBox' :skuList='skuList'></skus-list>
  </div>
  <!--  活动结束弹框-->
  <div class='box'>
    <van-popup v-model:show='showPopUp'>
      <div class='popBox'>
        <div v-if='status==0'>
          <img class='popBg' src='./assets/ACEdnBg.png'>
          <div class='popTitle'>
            您未满足条件，感谢您对欧乐B的喜爱和支持
          </div>
          <div class='popTips'>您不满足活动条件的原因如下：您自2020年1月1日 起至今有过购物正装商品且确认收货的订单（订单时间以下单时间为准，购买正装商品 且确认收货的订单包括收货后退货的正装商品订单）
          </div>
        </div>
        <div v-if='status==1'>
          <img class='popBg' src='./assets/failBg.png'>
          <div class='popTitle'>
            您已申领过，不可重复申领哦！
          </div>
        </div>
        <div class='pop-go-shop' @click='goPage'>查看其他会员优惠</div>
        <div class='close-btn' @click='showPopUp =false'></div>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang='ts'>
import { inject, onMounted, ref } from 'vue';
import { Popup as VanPopup } from 'vant';
import { BaseInfo } from '@/types/BaseInfo';
import tools from './hook/tools';
import skusList from './components/skuList.vue';

const showPopUp = ref(false);
const baseInfo = inject('baseInfo') as BaseInfo;
// 展示步骤 ：0 规则 1 曝光商品
const step = ref('0');
// 弹窗框展示 0 不满足条件 1 已领取过
const status = ref('0');
// 规则文本
const ruleText = ref('');
// 是否可以参与活动
const isCanJoin = ref(false);
// 是否已经参加过
const isJoin = ref(false);

const goPage = () => {
  window.location.href = 'https://pro.m.jd.com/mall/active/3DveLbwQ2at6dRZUS6c65YjS2RWa/index.html';
};
const {
  getActivityInfo,
  activityInfo,
  finSkuList,
  joinActive,
  skuList,
} = tools(baseInfo);

const join = async () => {
  if (isJoin.value) {
    step.value = '1';
    return;
  }
  if (!isCanJoin.value) {
    showPopUp.value = true;
    status.value = '0';
    return;
  }
  const res = await joinActive();
  if (res) {
    step.value = '1';
  }
};
onMounted(async () => {
  await getActivityInfo();
  await finSkuList();
  const {
    can,
    rule,
  } = activityInfo.value;
  ruleText.value = rule.replace(/\n/g, '<br/>');
  isCanJoin.value = can;
  isJoin.value = activityInfo.value.isJoin;
});

</script>
<style>
html {
  background: #b7e0fa;
}
/*修改滚动条样式*/
div::-webkit-scrollbar{
 display: none;
}

</style>
<style lang='scss' scoped>
.rule-page {
  background-image: url('./assets/ruleBg.png');
  background-repeat: no-repeat;
  background-size: 100%;
  height: 13.81rem;
  position: relative;
}

.joinBtn {
  position: absolute;
  top: 12.75rem;
  left: 50%;
  transform: translateX(-50%);
  color: #192f56;
  font-size: 0.4rem;
  width: 3.19rem;
  line-height: .72rem;
  text-align: center;
  font-weight: normal;
}

.rule-text {
  position: absolute;
  width: 6.37rem;
  left: 0.58rem;
  top: 9.5rem;
  max-height: 2.6rem;
  overflow-y: auto;
  line-height: 0.27rem;
  color: #06427e;
  font-size: 0.2rem;
}

.suc-page {
  background-image: url(./assets/sucPageBg.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
  height: 13.34rem;
  position: relative;
}

.show-rule-btn {
  position: absolute;
  top: .85rem;
  width: 1.19rem;
  background-color: #072273;
  border-radius: 0 0.22rem 0.22rem 0;
  font-size: 0.2rem;
  font-weight: normal;
  line-height: 0.43rem;
  color: #ffffff;
  text-align: center;
}

.skuBox {
  width: 6.4rem;
  max-height: 9.4rem;
  overflow-y: auto;
  position: absolute;
  top: 3.53rem;
  left: .56rem;
}

.popBox {
  position: relative;
}

.popBg {
  width: 6.72rem;
  display: block;
}

.pop-icon {
  width: 0.72rem;
  height: 0.76rem;
  position: absolute;
  left: 2.7rem;
  top: 2.2rem;
}

.pop-go-shop {
  width: 3.17rem;
  line-height: 0.72rem;
  background-image: linear-gradient(-90deg,
    #fcf2cb 0%,
    #e9c88f 100%),
  linear-gradient(
      #192f56,
      #192f56);
  background-blend-mode: normal,
  normal;
  box-shadow: 0.01rem 0.02rem 0.09rem 0rem #13426e;
  border-radius: 0.35rem;
  font-size: 0.3rem;
  letter-spacing: 0.01rem;
  color: #192f56;
  text-align: center;
  position: absolute;
  left: 1.88rem;
  top: 5.3rem;
  font-weight: 600;

  &:after {
    width: 0;
    height: 0;
    content: '';
    border-top: .12rem solid transparent;
    border-bottom: .12rem solid transparent;
    border-left: .12rem solid #06427e;
    position: absolute;
    right: .1rem;
    top: 50%;
    transform: translateY(-50%);
  }
}

.popTitle {
  text-align: center;
  width: 6.1rem;
  line-height: 0.3rem;
  font-size: 0.3rem;
  font-weight: 600;
  color: #034078;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 3.77rem;
}

.popTips {
  width: 6.1rem;
  font-size: 0.2rem;
  letter-spacing: 0rem;
  color: #034078;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 4.2rem;
}

.close-btn {
  position: absolute;
  left: 3.12rem;
  top: 6.9rem;
  width: .5rem;
  height: .5rem;
}

.box {
  ::v-deep .van-popup {
    background: none;
    overflow: hidden;
  }
}

///deep/ .van-toast {
//  background-color: rgba(0, 0, 0, 0.7);
//}
</style>
