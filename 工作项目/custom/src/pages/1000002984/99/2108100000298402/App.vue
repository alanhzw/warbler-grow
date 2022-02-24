<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-08-23 10:54:37
 * @LastEditTime: 2021-09-18 16:41:28
 * @FilePath: \custom\src\pages\1000002984\99\2108100000298402\App.vue
-->

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
           @click='showDialog = true'></div>

      <exposure-goods :base-url='baseUrl'
                      :skus-list='skusList'
                      @go2Shop='go2Shop'></exposure-goods>
    </div>

    <!-- ···················已领取页面··················· -->
    <div class='third-step'
         v-if='step === 3'>
      <!-- 查看领取攻略按钮 -->
      <div class='check-draw-method'
           @click='showDialog = true'></div>
      <exposure-goods :base-url='baseUrl'
                      :skus-list='skusList'
                      @go2Shop='go2Shop'></exposure-goods>
    </div>

    <!-- ···················不符合规则页面··············· -->
    <div class='fourth-step'
         v-if='step === 4'>
      <!-- 领取更多权益按钮 -->
      <div class='draw-more'
           @click='drawMore'></div>
    </div>

    <!-- 购物车按钮 -->
    <div @click='go2Car'
         class='car'
         v-if='step === 3 || step === 2'></div>

    <!-- 非品牌新客弹窗 -->
    <van-popup v-model:show='showDialog'>
      <div class='rule-box'>
        <img src='./assets/dialog.png'
             class='rule-popup' />
      </div>
    </van-popup>
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
import { gotoShopPage } from '@/utils/index';
import useFindSkus from './hooks/useFindSkus';
import ExposureGoods from './components/ExposureGoods.vue';

// 基本信息
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const isOpenCard: boolean = inject('isOpenCard') as boolean;

// 显示哪个页面 1:规则页面 2:领取成功页面 3:已领取页面  4:不符合规则页面
const step = ref(1);

// 跳转至规则页面
const go2Step1 = () => {
  step.value = 1;
};

// 进店逛逛
const go2Shop = () => {
  gotoShopPage(baseInfo.shopId);
  // window.location.href = 'https://shop.m.jd.com/?shopId=1000002984';
};

// 领取更多权益
const drawMore = () => {
  gotoShopPage(baseInfo.shopId);
  // window.location.href = 'https://shop.m.jd.com/?shopId=1000002984';
};

// 跳转至购物车
const go2Car = () => {
  window.location.href = 'https://p.m.jd.com/cart/cart.action?fromnav=1';
};

// 开卡
const go2OpenCard = () => {
  if (!isOpenCard) {
    window.location.href = 'https://shopmember.m.jd.com/shopcard?venderId=1000002984&channel=401';
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
    const res = await cjwxRequest.post('/wx/loccitane/purchase/activityContent', {
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
    if (status.value === 2) {
      step.value = 3;
      return;
    }
    if (status.value === 0) {
      step.value = 4;
      return;
    }
    if (status.value === 3) {
      Toast.fail('奖品已经领完');
      return;
    }
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });

    const res = await cjwxRequest.post('/wx/loccitane/purchase/getToken', {
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
  go2OpenCard();
  findSkus();
  getActivityInfo();
});

</script>

<style lang='scss'>
html,
body {
  height: 100%;
  background: #9abdea;
}

#app {
  height: 100%;
}

.rePurchasePage {
  width: 7.5rem;
  height: 100%;
}

.van-popup {
  background-color: transparent;
}
.van-toast {
  background-color: rgba(0, 0, 0, 0.7);
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
  background-image: url("./assets/first2.png");
  height: 13.5rem;

  .draw-now {
    position: absolute;
    width: 3.5rem;
    height: 1rem;
    left: 2rem;
    bottom: 0.9rem;
  }

  .rule {
    position: absolute;
    top: 7.3rem;
    left: 0.3rem;
    width: 6.9rem;
    height: 3.4rem;
    overflow: auto;
  }
}

.second-step {
  background-image: url("./assets/second.png");
  height: 14.12rem;

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
  height: 14.12rem;

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
  height: 13.42rem;

  .draw-more {
    position: absolute;
    width: 4.5rem;
    height: 1rem;
    left: 1.5rem;
    bottom: 1.3rem;
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
  left: 0rem;
  top: 4.5rem;
}
</style>
