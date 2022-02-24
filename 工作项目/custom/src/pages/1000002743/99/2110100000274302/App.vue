/**
 * @Description:caoshijie
 * @Date: 2021/10/13
 * @Description: 【珀莱雅自营】 复购有礼
 * @FilePath:src\pages\1000002743\99\2110100000274302\App.vue
*/
<template>
  <div class="rePurchasePage"
       v-if="baseInfo.status < 3">
    <!-- ··················规则页面····················· -->
    <div class="first-step"
         v-if="step === 1">
      <!-- 规则区域 -->
      <div class="rule"
           v-html="rule"></div>
      <!-- 即刻领取按钮 -->
      <div class="draw-now"
           @click="getToken">立即领取&nbsp;&gt;</div>
    </div>

    <!-- ················领取成功页面···················· -->
    <div class="second-step"
         v-if="step === 2">
      <!-- 查看领取攻略按钮 -->
      <div class="check-draw-method"
           @click="go2Step1"></div>

      <exposure-goods :base-url="baseUrl"
                      :skus-list="skusList"
                      @go2Shop="gotoShopPage(baseInfo.venderId)"></exposure-goods>
    </div>

    <!-- ···················已领取页面··················· -->
    <div class="third-step"
         v-if="step === 3">
      <!-- 查看领取攻略按钮 -->
      <div class="check-draw-method"
           @click="go2Step1"></div>
      <exposure-goods :base-url="baseUrl"
                      :skus-list="skusList"
                      @go2Shop="gotoShopPage(baseInfo.venderId)"></exposure-goods>
    </div>

    <!-- ···················不符合规则页面··············· -->
    <div class="fourth-step"
         v-if="step === 4">
      <div class='reason'>
        <p>非常抱歉</p>
        <p>您未满足活动条件，感谢您对珀莱雅的喜欢与支持</p>
        <p>您不满足活动条件的原因如下：</p>
        <p v-html="dataInfo"></p>
      </div>
      <!-- 领取更多权益按钮 -->
      <div class="draw-more"
           @click="gotoShopPage(baseInfo.venderId)">参与更多会员活动 &nbsp;&gt;&nbsp;&gt;</div>
    </div>

    <!-- 购物车按钮 -->
    <!--    <div @click="go2Car"-->
    <!--         class="car"-->
    <!--         v-if="step === 3 || step === 2"></div>-->

    <!-- 非品牌新客弹窗 -->
    <!--    <van-popup v-model:show="showDialog">-->
    <!--      <div class="rule-box">-->
    <!--        <img src="//img10.360buyimg.com/imgzone/jfs/t1/197505/20/7580/664526/61397ae4E0ea6427b/e98b96e5044af9da.png"-->
    <!--             class="rule-popup" />-->
    <!--      </div>-->
    <!--    </van-popup>-->
  </div>

  <!-- 活动已结束 -->
  <div class="activity-over"
       v-else>
    <img src="./assets/activity_end.jpg"
         class="activity-over-img" />
    <div class="activity-over-text1">您来晚了,活动已经结束了</div>
    <div class="activity-over-text2">下次记得早点来哦~</div>
    <div class="activity-over-btn"
         @click="gotoShopPage(baseInfo.venderId)">进店逛逛</div>
  </div>
</template>

<script setup lang='ts'>
import { Toast, Popup as VanPopup } from 'vant';
import {
  inject, onMounted, ref,
} from 'vue';
import { BaseInfo } from '@/types/BaseInfo';
import { cjwxRequest } from '@/utils/service';
import { gotoShopPage } from '@/utils/platforms';
import useFindSkus from './hooks/useFindSkus';
import ExposureGoods from './components/ExposureGoods.vue';

// 基本信息
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const isOpenCard: boolean = inject('isOpenCard') as boolean;

// 显示哪个页面 1:规则页面 2:领取成功页面 3:已领取页面  4:不符合规则页面
const step = ref(1);
const dataInfo = `1、每个会员ID仅享1次，若近9个月内未购买正装商品满100元且确认收货的订单无法使用<br/>2、大促期不可使用（包括但不限于38、618、99、1111、1212等）
3、同一ID在同一天付款多笔订单仅计算一笔，无法在同一天同时享受首购礼及复购礼<br/>4、复购权益隶属于珀莱雅品牌会员，珀莱雅自营店与珀莱雅官方旗舰店共享品牌权益，2家品牌上述权益一个用户ID仅可领取一次.<br/>5、首购订单以下单时间为准，取消、收获前退款的正装商品订单均不计算为满足活动条件的订单.`;
// 跳转至规则页面
const go2Step1 = () => {
  step.value = 1;
};

// 活动规则
const rule = ref('');

// 是否可以领取令牌 "0":不可领取 "1":可领取 "2":已领取过 "3":库存不足
const status = ref(0);
// 查询活动规则
const getRules = async () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  const res = await cjwxRequest.get(`common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`);
  rule.value = res.data.rule.split('\n').join('<br/>');
  if (!res.result) {
    Toast.fail(res.errorMessage);
  }
  Toast.clear();
};
// 获取活动信息
const getActivityInfo = async () => {
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post('wx/proya/purchase/activityContent', {
      activityId: baseInfo.activityId,
    });
    status.value = res.data;
    // 测试代码
    // status.value = 3;
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  } finally {
    Toast.clear();
  }
};
const { skusList, baseUrl, findSkus } = useFindSkus(baseInfo);

// 获取令牌
const getToken = async () => {
  try {
    if (status.value === 3) {
      Toast.fail('奖品已经被领完了。');
      return;
    }
    if (status.value === 2) {
      await findSkus();
      step.value = 3;
      return;
    }
    console.log(status.value);
    if (status.value === 0) {
      step.value = 4;
      return;
    }
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });

    const res = await cjwxRequest.post('/wx/proya/purchase/getToken', {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
    });

    if (res.result) {
      await findSkus();
      step.value = 2;
    }
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  } finally {
    Toast.clear();
  }
};

// 展示领取攻略
const showDialog = ref(false);

onMounted(async () => {
  getActivityInfo();
  getRules();
});

</script>

<style lang="scss">
html,
body {
  height: 100%;
  background: #f0f0f0;
}

#app {
  height: 100%;
  background: #eef2fb;
}

.rePurchasePage {
  width: 7.5rem;
  height: 100%;
}

.rule-box {
  background-color: transparent;
  .rule-popup {
    width: 7.2rem;
     background-color: transparent;
  }
}

.first-step,
.second-step,
.third-step,
.fourth-step {
  width: 7.5rem;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
}

.first-step {
  background-image: url("./assets/first.png");
  height: 13.34rem;

  .draw-now {
    position: absolute;
    width: 2.92rem;
    line-height: 0.53rem;
    background-image: linear-gradient(-50deg,#c00100 22%,#d20100 65%,#e30100 100%),
    linear-gradient( #c00100, #c00100);
    background-blend-mode: normal,normal;
    color: #fff;
    font-size: .3rem;
    border-radius: 0.26rem;
    text-align: center;
    bottom:1.04rem ;
    left: 50%;
    transform: translate(-50%);
  }

  .rule {
    position: absolute;
    top: 9.6rem;
    left: 0.3rem;
    width: 6.9rem;
    overflow: auto;
    font-size: .24rem;
    max-height: 1.8rem;
  }
}
.second-step {
  background-image: url("./assets/second.png");
  height: 13.34rem;

  .check-draw-method {
    position: absolute;
    width: 2rem;
    height: 0.8rem;
    right: 0rem;
    top: 0.5rem;
  }
}
.third-step {
  background-image: url("./assets/third.png");
  height: 13.34rem;

  .check-draw-method {
    position: absolute;
    width: 2rem;
    height: 0.8rem;
    right: 0rem;
    top: 0.5rem;
  }
}
.fourth-step {
  background-image: url("./assets/fourth.png");
  height: 13.34rem;

  .draw-more {
    color: #fff;
    width: 3.87rem;
    line-height: 0.58rem;
    text-align: center;
    background-image: linear-gradient(-50deg,#c00100 22%,#d20100 65%,#e30100 100%),
    linear-gradient( #c00100, #c00100);
    background-blend-mode: normal,normal;
    border-radius: 0.29rem;
    font-size: 0.29rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top:10.2rem;
  }
}
.activity-over {
  width: 100vw;
  margin-top: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .activity-over-img {
    width: 4.5rem;
    height: 4.5rem;
  }
  .activity-over-text1 {
    margin-top: 0.5rem;
  }
  .activity-over-text2 {
    margin-top: 0.2rem;
    font-size: 0.4rem;
    color: rgb(102, 102, 102);
  }
  .activity-over-btn {
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
.car {
  background-image: url("./assets/float-icon.png");
  background-repeat: no-repeat;
  background-size: 100%;
  position: fixed;
  width: 1rem;
  height: 1.5rem;
  right: 0rem;
  top: 4.5rem;
}
.reason{
  position: absolute;
  top: 3rem;
  left: .6rem;
  width: 6.3rem;
  text-align: center;
  white-space: break-spaces;

  p:nth-child(1){
  font-size:.54rem ;
  line-height:1rem;;
    font-weight: normal;
}
  p:nth-child(2){
    font-size: 0.28rem;
    font-weight: 500;
    line-height: 0.35rem;
    color: #1d1d1d;
  }
  p:nth-child(3){
    margin-top: .8rem;
    font-size: 0.28rem;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0.36rem;
    color: #1d1d1d;
  }
  p:nth-child(4){
    font-size: 0.23rem;
    font-weight: normal;
    line-height: 0.38rem;
    color: #1d1d1d;
    text-align: left;
  }
}
</style>
