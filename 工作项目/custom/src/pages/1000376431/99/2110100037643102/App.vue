/**
* @Description:caoshijie
* @Date: 2021/10/11
* @Description: 【倩碧自营】 复购有礼
* @FilePath:src\pages\1000376431\99\2110100037643102\App.vue
*/
<template>
  <div class='rePurchasePage'
       v-if='baseInfo.status < 3'>
    <!-- ··················规则页面····················· -->
    <div class='first-step'
         v-if='step === 1'>
      <!-- 规则区域 -->
      <div class='rule'
           v-html='rule'></div>
      <!-- 即刻领取按钮 -->
      <div class='draw-now'
           @click='getToken'></div>
    </div>

    <!-- ················领取成功页面···················· -->
    <div class='second-step'
         v-if='step === 2'>
      <!-- 查看领取攻略按钮 -->
      <div class='check-draw-method'
           @click='go2Step1'></div>

      <exposure-goods :base-url='baseUrl'
                      :skus-list='skusList'
                      @go2Shop='go2Shop'></exposure-goods>
    </div>

    <!-- ···················已领取页面··················· -->
    <div class='third-step'
         v-if='step === 3'>
      <!-- 查看领取攻略按钮 -->
      <div class='check-draw-method'
           @click='go2Step1'></div>
      <exposure-goods :base-url='baseUrl'
                      :skus-list='skusList'
                      @go2Shop='go2Shop'></exposure-goods>
    </div>

    <!-- ···················不符合规则页面··············· -->
    <div class='fourth-step'
         v-if='step === 4'>
      <div class='reason'>
        <p>您不满足活动条件的原因如下：</p>
        <p v-html='dataInfo'></p>
        <p v-html='tips'></p>
      </div>
      <!-- 领取更多权益按钮 -->
      <div class='draw-more'
           @click='drawMore'>领取更多会员权益&gt;&gt;
      </div>
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
  <div class='activity-over'
       v-else>
    <img src='./assets/activity_end.jpg'
         class='activity-over-img' />
    <div class='activity-over-text1'>您来晚了,活动已经结束了</div>
    <div class='activity-over-text2'>下次记得早点来哦~</div>
    <div class='activity-over-btn'
         @click='go2Shop'>进店逛逛
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Toast, Popup as VanPopup } from 'vant';
import { inject, onMounted, ref } from 'vue';
import { BaseInfo } from '@/types/BaseInfo';
import { cjwxRequest } from '@/utils/service';
import useFindSkus from './hooks/useFindSkus';
import ExposureGoods from './components/ExposureGoods.vue';

// 基本信息
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const isOpenCard: boolean = inject('isOpenCard') as boolean;

// 显示哪个页面 1:规则页面 2:领取成功页面 3:已领取页面  4:不符合规则页面
const step = ref(1);
const dataInfo = '您在2021.07.01 00:00:00 - 2021.09.30 23:59:59<br/>期间未购买过正装商品且确认收货的订单';
const tips = '（订单时间以下单时间为准，购买正装商品的订单不包括取消、<br/>收货前退款的正装商品未完成订单，包括收货后退货的正装商品订单）';
// 跳转至规则页面
const go2Step1 = () => {
  step.value = 1;
};

// 进店逛逛
const go2Shop = () => {
  window.location.href = 'https://shop.m.jd.com/?shopId=1000376431';
};

// 领取更多权益
const drawMore = () => {
  window.location.href = 'https://prodev.m.jd.com/mall/active/4LT3YrXdiU47dbhsG1xwKEbUaFtN/index.html';
};

// 跳转至购物车
const go2Car = () => {
  window.location.href = 'https://p.m.jd.com/cart/cart.action?fromnav=1';
};

// 开卡
const go2OpenCard = () => {
  if (!isOpenCard) {
    setTimeout(() => {
      window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=1000376431&channel=7036&returnUrl=${window.location.href}`;
    }, 300);
  }
};

// 活动规则
const rule = ref('');

// 是否可以领取令牌 "0":不可领取 "1":可领取 "2":已领取过 "3":库存不足
const status = ref(0);

// 获取活动信息
const getActivityInfo = async () => {
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });

    const res = await cjwxRequest.post('/crm/clinique/purchase/activityContent', {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
    });
    const { data } = res;
    status.value = data.status;
    rule.value = data.rule.split('\n')
      .join('<br/>');
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
const {
  skusList,
  baseUrl,
  findSkus,
} = useFindSkus(baseInfo);

// 获取令牌
const getToken = async () => {
  try {
    if (status.value === 3) {
      Toast.fail('奖品已经被领完了。');
      return;
    }
    if (status.value === 2) {
      step.value = 3;
      return;
    }
    if (status.value === 0) {
      step.value = 4;
      return;
    }
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });

    const res = await cjwxRequest.post('/crm/clinique/purchase/getToken', {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
    });

    if (res.result) {
      step.value = 2;
      getActivityInfo();
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
  // go2OpenCard();
  findSkus();
  getActivityInfo();
});

</script>

<style lang='scss'>
html,
body {
  height: 100%;
  background: #f0f0f0;
}

#app {
  height: 100%;
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
  height: 14.61rem;

  .draw-now {
    position: absolute;
    width: 5.5rem;
    height: 1rem;
    left: 1rem;
    bottom: 0.1rem;
  }

  .rule {
    position: absolute;
    top: 10.4rem;
    left: 0.3rem;
    width: 6.9rem;
    height: 2.7rem;
    overflow: auto;
    //white-space: break-spaces;
    font-size: .24rem;
  }
}

.second-step {
  background-image: url("./assets/second.png");
  height: 14rem;

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
  height: 14rem;

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
  height: 14rem;

  .draw-more {
    position: absolute;
    width: 5.78rem;
    line-height: 0.67rem;
    background-color: #000000;
    border-radius: 0.1rem;
    color: #fff;
    text-align: center;
    font-size: .33rem;
    margin-left: .86rem;
    top: 10rem;
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

.reason {
  position: absolute;
  top: 4.5rem;
  left: .8rem;
  width: 6rem;
  text-align: center;
  white-space: break-spaces;

  p:nth-child(1) {
    font-size: .26rem;
    font-weight: 600;
    line-height: 1rem;
  }

  p:nth-child(2) {
    font-size: .22rem;
    line-height: .42rem;
  }

  p:nth-child(3) {
    margin-top: .2rem;
    font-size: .19rem;
    line-height: .34rem;
    color: #959595;
  }
}
</style>
