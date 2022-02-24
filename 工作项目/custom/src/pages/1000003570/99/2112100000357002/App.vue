<template>
  <div class="background">
    <!-- 我的奖品 -->
    <div class="my-prize" @click="getMyPrize()"></div>
    <!-- 活动规则 -->
    <div class="act-rule" @click="openBottomDialog('rule')"></div>
    <!-- 我的订单 -->
    <div class="my-order" @click="getMyOrder()"></div>
    <!-- 奖品区 -->
    <div class="pirze-view">
      <div class="luck-bag small" @click="openBottomDialog('small')">
        <div class="title"><span style="font-size: .2rem">会员单笔订单实付满1199元</span><br/>加赠【专利金喜】福袋</div>
        <div class="message" style="line-height:.37rem;color: #ff6839">内含随机3款礼品：</div>
        <div class="message" style="width:1.8rem;color: #6a3932">点击福袋<br/>查看礼品详情</div>
        <img @click.stop="openCenterDialog('small')" class="btn" :src="Url.luckbagStatusUrl[drawLittleBagStatus]"/>
        <div class="remain">库存:{{ littleStock }}</div>
      </div>
      <div class="luck-bag big" @click="openBottomDialog('big')">
        <div class="title"><span style="font-size: .2rem">会员单笔订单实付满1999元</span><br/>加赠【领冠贺岁】福袋</div>
        <div class="message" style="line-height:.37rem;color: #ff6839">内含随机3款礼品：</div>
        <div class="message" style="width:1.99rem;color: #6a3932">点击福袋<br/>查看礼品详情</div>
        <img @click.stop="openCenterDialog('big')" class="btn" :src="Url.luckbagStatusUrl[drawBigBagStatus]"/>
        <div class="remain">库存:{{ bigStock }}</div>
      </div>
      <div class="goOrder" @click="gotoShopPage"></div>
    </div>
    <!-- 会员福利区 -->
    <div class="member-view">
      <template v-for="(item,index) in Url.linkArr" :key="index">
        <a :href="item">
          <div class="click-view"></div>
        </a>
      </template>
    </div>
    <!-- 曝光商品 -->
    <div class="sku-view">
      <template v-for="(item) in skusList" :key="item.id">
        <div class="sku-bg" @click="gotoSkuPage(item.skuId)">
          <!--sku图片-->
          <img :src="getSkuImg(item.logo)" class="sku-img"/>
          <!--会员专享价-->
          <div class="sku-tip">{{ item.promoPrice }}</div>
          <!--sku名字-->
          <div style="padding: .2rem">
            <div class="sku-name">{{ item.skuNameShort }}</div>
          </div>
          <!--京东价-->
          <div style="display: flex;justify-content: space-around;align-items: center">
            <div class="sku-jd-prize">京东价：{{ item.jdPrice }}</div>
            <img src="./assets/index/buy-icon.png" style="width:.61rem"/>
          </div>

        </div>
      </template>
    </div>
    <!-- 返回顶部 || 进店逛逛 -->
    <div class="btn-group">
      <a href="javascript:scrollTo(0,0)"><img src="./assets/index/btn-top.png"/></a>
      <a><img @click="gotoShopPage" src="./assets/index/btn-shop.png"/> </a>
    </div>
  </div>

  <van-popup class="popup" position="bottom" v-model:show="bottomDialogShow" :style="{ height: '100%' }"
             :close-on-click-overlay="false">
    <RuleDialog v-if="bottomDialogName==='rule'" :rule="rule" @closeDialog="closeDialog"></RuleDialog>
    <LuckBagDialog v-if="bottomDialogName==='luckbag'" :bagSize="luckbagSize" :luckbagPrizeArr="luckbagPrizeArr"
                   @openBottomDialog="openBottomDialog" @closeDialog="closeDialog"></LuckBagDialog>
    <AddressDialog v-if="bottomDialogName==='address'" @closeDialog="closeDialog" :addressInfo="addressInfo"
                   @commitAddInfo="commitAddInfo"></AddressDialog>
    <MyPrizeDialog v-if="bottomDialogName==='prize'" :myPrizeArr="myPrizeArr" @openBottomDialog="openBottomDialog"
                   @closeDialog="closeDialog"></MyPrizeDialog>
    <MyOrderDialog v-if="bottomDialogName==='order'" :myOrderArr="myOrderArr"
                   @closeDialog="closeDialog"></MyOrderDialog>
  </van-popup>

  <van-popup class="popup" v-model:show="centerDialogShow" :close-on-click-overlay="false">
    <SureDialog v-if="centerDialogName === 'sure'" :bagSize="luckbagSize" @sureDraw="sureDrawBag"
                @closeDialog="closeDialog"></SureDialog>
    <WinningDialog v-if="centerDialogName === 'winning'" :drawPrizes="drawPrizes"
                   @closeDialog="closeDialog" @openBottomDialog="openBottomDialog"></WinningDialog>
  </van-popup>

</template>

<script lang='ts' setup>
import { ref, inject } from 'vue';
import { Popup as VanPopup, Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { gotoSkuPage } from '@/utils/platforms';
import Url from './assets/static/imgUrl';
import RuleDialog from './components/RuleDialog.vue';
import SureDialog from './components/SureDialog.vue';
import WinningDialog from './components/WinningDialog.vue';
import AddressDialog from './components/AddressDialog.vue';
import MyPrizeDialog from './components/MyPrizeDialog.vue';
import LuckBagDialog from './components/LuckBagDialog.vue';
import MyOrderDialog from './components/MyOrderDialog.vue';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;

// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;

// 设置页面title
document.title = actName;
// 是否开卡
const isOpenCarded = inject('isOpenCard');
// 活动规则
const rule = ref('');
// 曝光商品
const skusList = ref([]);
// 我的奖品
const myPrizeArr = ref([]);
// 我的订单
const myOrderArr = ref([]);
// 福袋库存
const littleStock = ref(0);
const bigStock = ref(0);
// 是否可以领取福袋
const buttonStatus = ['不满足条件', '立即领取', '已领取', '已抢光'];
const drawBigBagStatus = ref(0);
const drawLittleBagStatus = ref(0);
// 福袋大小详情
const luckbagSize = ref(1);
// 福袋奖品信息
const luckbagPrizeArr = ref([]);
// generateId
let generateId = '';
// 地址信息
const addressInfo = ref({});
// 中奖福袋列表信息
const drawPrizes = ref([]);

// 中间弹窗
const centerDialogName = ref('');
const centerDialogShow = ref(false);
const openCenterDialog = (name: string) => {
  // 如果是福袋弹窗，需要判断是大小福袋
  if (name === 'big' || name === 'small') {
    centerDialogName.value = 'sure';
    if (name === 'small' && drawLittleBagStatus.value === 1) {
      luckbagSize.value = 1;
      centerDialogShow.value = true;
    } else if (name === 'big' && drawBigBagStatus.value === 1) {
      luckbagSize.value = 2;
      centerDialogShow.value = true;
    }
  } else {
    centerDialogName.value = name;
    centerDialogShow.value = true;
  }
};
// 底部弹窗
const bottomDialogShow = ref(false);
const bottomDialogName = ref('');
const openBottomDialog = (name: string) => {
  // 如果是福袋弹窗，需要判断是大小福袋
  if (name === 'big' || name === 'small') {
    luckbagSize.value = name === 'small' ? 1 : 2;
    bottomDialogName.value = 'luckbag';
  } else {
    bottomDialogName.value = name;
  }
  bottomDialogShow.value = true;
};
const closeDialog = () => {
  bottomDialogShow.value = false;
  centerDialogShow.value = false;
};

// 地址选择
const addressSelect = ref(false);
const openAddressSelect = (e: any) => {
  addressSelect.value = true;
};

// 获取SkuImg
const getSkuImg = (url: string) => {
  const isAllUrl = url.includes('360buyimg');

  return isAllUrl ? url : `https://img10.360buyimg.com/imgzone${url}`;
};

// 开卡链接
const goToOpenCard = () => {
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000003570&shopId=1000003570&venderType=5&channel=401&returnUrl=${window.location.href}`;
};

const gotoShopPage = () => {
  window.location.href = 'https://shop.m.jd.com/?shopId=1000003570';
};

// sku价格 格式化
const getSkuPrizeFormat = (price: string) => price.slice(0, price.length - 3);

// 收货地址提交
const commitAddInfo = (addInfo: any) => {
  const { phone, receiver, address, province, city, county } = addInfo.value;
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/wx/yili/memberGift/saveAddress', {
    activityId,
    venderId,
    generateId,
    phone,
    receiver,
    province,
    city,
    county,
    address,
    postalCode: '000000',
  })
    .then((res) => {
      if (res.result) {
        Toast('提交成功');
        closeDialog('address');
      } else {
        Toast(res.errorMessage);
      }
    }).finally(
      Toast.clear,
    );
};

// 福袋状态判断
const bagCheck = (data: any, type: number) => {
  let status = 0;
  // 是否领取过福袋
  if (!data.hasDraw) {
    // 没有领取过
    if (type === 1) {
      // 小福袋
      if (data.canDrawLittleBag && data.hasLittle) {
        // 小福袋 可领取 && 有剩余
        status = 1;
      } else if (!data.canDrawLittleBag) {
        // 小福袋 条件不足
        status = 0;
      } else if (!data.hasLittle) {
        // 小福袋 已抢光
        status = 3;
      }
    } else if (type === 2) {
      // 大福袋
      if (data.canDrawBigBag && data.hasBig) {
        // 大福袋 可领取 && 有剩余
        status = 1;
      } else if (!data.canDrawBigBag) {
        // 大福袋 条件不足
        status = 0;
      } else if (!data.hasBig) {
        // 大福袋 已抢光
        status = 3;
      }
    }
  } else {
    // 已领取过其中一个 显示已领取
    status = 2;
  }
  return status;
};

// 确认领取福袋
const sureDrawBag = (bagType: number) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/wx/yili/memberGift/getBlessingBag', { activityId, bagType }).then((res) => {
    if (res.result) {
      if (res.data.generateId) {
        // 存在 generateId 则证明领取成功
        generateId = res.data.generateId;
        drawPrizes.value = res.data.userDrawPrizes;
        openCenterDialog('winning');
        // 福袋库存信息
        littleStock.value = res.data.littleStock;
        bigStock.value = res.data.bigStock;
        // 更新福袋领取按钮状态
        drawBigBagStatus.value = bagCheck(res.data, 2);
        drawLittleBagStatus.value = bagCheck(res.data, 1);
      } else {
        // 不满足领取条件，获取不满足原因
        Toast(buttonStatus.value[bagCheck(res.data, 1)]);
        closeDialog();
      }
    } else {
      Toast(res.errorMessage);
    }
  }).finally(
    Toast.clear,
  );
};

// 根据 generateId 获取已填写地址信息
const getAddressInfo = () => {
  cjwxRequest.post('/wxAddress/getAddressByGenerateId', { generateId }).then((res) => {
    if (res.result) {
      addressInfo.value = res.data;
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 我的奖品
const getMyPrize = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/wx/yili/memberGift/getMyPrize', { activityId }).then((res) => {
    if (res.result) {
      myPrizeArr.value = res.data;
      if (generateId) {
        getAddressInfo();
      }
      openBottomDialog('prize');
    } else {
      Toast(res.errorMessage);
    }
  }).finally(
    Toast.clear,
  );
};

// 我的奖品
const getMyOrder = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/wx/yili/memberGift/getMyOrder', { activityId }).then((res) => {
    if (res.result) {
      myOrderArr.value = res.data;
      openBottomDialog('order');
    } else {
      Toast(res.errorMessage);
    }
  }).finally(
    Toast.clear,
  );
};

// 主接口 获取规则;
const getActivityInfo = () => {
  cjwxRequest
    .get(`/common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`)
    .then((res) => {
      if (res.data) {
        const rules = res.data.rule.split('\n');
        rule.value = rules.join('<br/>');
      }
    });
};

// 主接口
const activityContent = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/wx/yili/memberGift/activityContent', { activityId }).then((res) => {
    if (res.result) {
      const d = res.data;
      generateId = d.generateId;
      luckbagPrizeArr.value = d.drawInfoList;
      // 福袋库存信息
      littleStock.value = d.littleStock;
      bigStock.value = d.bigStock;
      // 福袋按钮状态
      drawBigBagStatus.value = bagCheck(d, 2);
      drawLittleBagStatus.value = bagCheck(d, 1);

      getActivityInfo();
    } else {
      Toast(res.errorMessage);
    }
  }).finally(
    Toast.clear,
  );
};

// 获取曝光商品
const getSkusList = () => {
  cjwxRequest.post('/act/common/findSkus',
    {
      actId: activityId,
      userId: venderId,
      type: 99,
    })
    .then((res) => {
      if (res.isOk) {
        skusList.value = res.skus;
      } else {
        Toast(res.errorMessage);
      }
    });
};
getSkusList();

if (!isOpenCarded) {
  goToOpenCard();
} else {
  activityContent();
}

</script>

<style lang='scss'>
[v-cloak] {
  display: none;
}

html {
  max-width: 750px;
  background: #ff7837;
}

.van-popup {
  background-color: transparent;
}

.van-toast {
  background-color: var(--van-toast-background-color);
}

.background {
  width: 7.5rem;
  height: 37.8rem;
  position: relative;
  padding-top: 7rem;
  box-sizing: border-box;
  background: {
    image: url("./assets/index/background.png");
    repeat: no-repeat;
    size: contain;
  };

  .my-prize {
    width: 1.3rem;
    height: 1.3rem;
    position: absolute;
    top: 4.76rem;
    left: .21rem;
    background: {
      image: url("./assets/index/my-prize.png");
      repeat: no-repeat;
      size: contain;
    };
  }

  .my-order,
  .act-rule {
    width: 1.38rem;
    height: .51rem;
    position: absolute;
    right: .29rem;
    background: {
      repeat: no-repeat;
      size: contain;
    };
  }

  .act-rule {
    background-image: url("./assets/index/act-rule.png");
    top: 4.66rem;
  }

  .my-order {
    background-image: url("./assets/index/my-order.png");
    top: 5.32rem;
  }

  .pirze-view {
    width: 7.35rem;
    height: 5.7rem;
    padding-top: .8rem;
    box-sizing: border-box;
    margin: 0 auto;
    background: {
      image: url("./assets/index/prize-view.png");
      repeat: no-repeat;
      size: contain;
    };

    .luck-bag {
      width: 6.4rem;
      height: 1.8rem;
      margin: 0 auto;
      box-sizing: border-box;
      padding: .1rem 0 .25rem 2.27rem;
      position: relative;
      background: {
        repeat: no-repeat;
        size: contain;
      };

      .title {
        font-family: PingFang-SC-Bold;
        font-size: 0.24rem;
        font-weight: 600;
        color: #e93627;
      }

      .message {
        font-family: PingFang-SC-Medium;
        font-size: 0.2rem;
      }

      .btn {
        width: 1.4rem;
        position: absolute;
        right: .25rem;
        bottom: .5rem;
      }

      .remain {
        width: 1.4rem;
        position: absolute;
        right: .25rem;
        bottom: .12rem;
        text-align: center;
        font-size: .23rem;
        color: #555555;
      }
    }

    .big {
      background-image: url("./assets/index/big-luck-bag.gif");
      margin-top: .2rem;
    }

    .small {
      background-image: url("./assets/index/small-luck-bag.gif");
    }

    .goOrder {
      width: 80%;
      height: .8rem;
      margin: .2rem auto;
    }
  }

  .member-view {
    width: 7.35rem;
    height: 5.2rem;
    margin: .2rem auto;
    padding: .7rem .25rem .4rem .25rem;
    box-sizing: border-box;
    background: {
      image: url("./assets/index/member-view.png");
      repeat: no-repeat;
      size: contain;
    };

    .click-view {
      float: left;
      margin: .1rem 0;
      width: 3.35rem;
      height: 1.8rem;
    }
  }

  .sku-view {
    width: 7.35rem;
    height: 16.4rem;
    margin: .2rem auto;
    padding: .7rem .4rem .4rem .4rem;
    box-sizing: border-box;
    background: {
      image: url("./assets/index/sku-view.png");
      repeat: no-repeat;
      size: contain;
    };

    .sku-bg {
      width: 3.15rem;
      height: 4.85rem;
      margin: .06rem;
      padding-top: .2rem;
      text-align: center;
      float: left;
      box-sizing: border-box;
      position: relative;
      background: {
        image: url("./assets/index/sku-bg.png");
        repeat: no-repeat;
        size: contain;
      };

      .sku-img {
        width: 2.7rem;
      }

      .sku-tip {
        width: 3.11rem;
        height: .5rem;
        padding: .08rem 0 .08rem .15rem;
        text-align: left;
        font-size: .35rem;
        color: #FFFFFF;
        box-sizing: border-box;
        position: absolute;
        top: 2.63rem;
        left: 0;
        background: {
          image: url("./assets/index/sku-tip.png");
          repeat: no-repeat;
          size: contain;
        };
      }

      .sku-name {
        font-size: .27rem;
        color: #333333;
        font-family: PingFang-SC-Bold;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .sku-jd-prize {
        font-family: PingFang-SC-Medium;
        font-size: 0.24rem;
        color: #ac7b28;
        text-decoration: line-through;
      }
    }
  }

  .btn-group {
    display: flex;
    justify-content: space-evenly;

    img {
      width: 3.4rem;
    }
  }
}

</style>
