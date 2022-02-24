<template>
  <div class="all" @click.stop="handleSideBar(false)" v-cloak>
    <!-- 首页 -->
    <div class="home" v-show="isShowType===1 || isShowType ===3">
      <div class="info">
        <div class="message">{{ ruleInfo.simpleRule }}</div>
      </div>
      <div class="btn">
        <img src="./assets/home/btn.png" @click="apply()" style="width: 2.78rem"/>
      </div>
      <div style="text-align: center;font-size: .15rem;line-height: .8rem">*2款礼包不可同享，1个ID仅限领取1份礼赠</div>
    </div>

    <!-- 不满足领取条件 -->
    <div class="fail-condition" v-show="isShowType===0">
      <div class="info">
        <div class="btn">
          <img src="./assets/condition/btn.png" @click="goToShop()" style="width: 4.6rem"/>
        </div>
        <div class="message">
          <div style="text-align: center">您不满足活动条件的原因可能如下所示，<br/>您在首次入会后：</div>
          {{ ruleInfo.noSatisfyRUle }}
        </div>
      </div>
    </div>

    <!-- 申领成功 -->
    <div class="apply-success" v-show="isShowType===2">
      <img src="./assets/apply/btn.png" @click.stop="handleSideBar(true)" class="btn"/>
      <div class="info">
        <img src="./assets/apply/info-bg.png" style="width: 6rem;padding-top: .8rem"/>
      </div>
      <div style="text-align: center;font-size: .23rem;margin-top: .2rem">
        *购物车领取时间: 2021年12月31日20:00-2021年1月31日23:59
      </div>
      <div class="sku">
        <div class="view" v-for="(item) in skusList" :key="item.id" @click="gotoSkuPage(item.skuId)">
          <img :src="getSkuImg(item.logo)" style="width: 3rem"/>
          <div class="sku-name">{{ item.skuNameShort }}</div>
          <div class="price-btn">
            <div style="width: 1rem;text-align: center">￥{{ getSkuPrizeFormat(item.jdPrice) }}</div>
          </div>
        </div>
      </div>
      <img src="./assets/apply/go-shop.png" @click="gotoShopPage()" style="width: 2.66rem;padding-bottom: .5rem"/>
    </div>

    <img src="./assets/rule-btn.png" class="rule-btn" v-if="isShowType!==2" @click.stop="handleSideBar(true)"/>

    <van-popup class="popup" v-model:show="dialogShow" :close-on-click-overlay="false">
      <FuseDialog @closeDialog="closeDialog" v-if="dialogName === 'fuse'"></FuseDialog>
      <FinishDialog @closeDialog="closeDialog" v-if="dialogName === 'finish'"></FinishDialog>
    </van-popup>
  </div>
  <ruleSideBar :showSideBar="isShowSideBar"></ruleSideBar>
</template>

<script lang='ts' setup>
import { ref, inject } from 'vue';
import { Popup as VanPopup, Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { gotoSkuPage } from '@/utils/platforms';
import ruleSideBar from './components/RuleSideBar.vue';
import ruleInfo from './assets/ts/rules';
import FuseDialog from './components/FuseDialog.vue';
import FinishDialog from './components/FinishDialog.vue';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;

// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;

// 设置页面title
document.title = actName;
// 是否开卡
const isOpenCarded = inject('isOpenCard');

// 曝光商品
const skusList = ref([]);
// 用户是否满足条件 0 不满足条件 1 满足条件 2 已申领 3 已抢光
const isShowType = ref(1);
const portType = ref(0);
const isFuse = ref(false);

// 活动弹窗
const dialogShow = ref(false);
const dialogName = ref('');
const openDialog = (name: string) => {
  dialogShow.value = true;
  dialogName.value = name;
};
const closeDialog = () => {
  dialogShow.value = false;
};

// 规则侧窗
const isShowSideBar = ref(false);
// 操作侧窗
const handleSideBar = (isShow: boolean) => {
  console.log(isShow);
  isShowSideBar.value = isShow;
};

// 获取SkuImg
const getSkuImg = (url: string) => {
  const isAllUrl = url.includes('360buyimg');

  return isAllUrl ? url : `https://img10.360buyimg.com/imgzone${url}`;
};

// 店铺首页
const goToShop = () => {
  window.location.href = 'https://pro.m.jd.com/mall/active/3dJ9fyEwUvzz5xiS9DqGMQvMhwFb/index.html';
};

// 开卡链接
const goToOpenCard = () => {
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000306683&shopId=1000306683&venderType=5&channel=401&returnUrl=${window.location.href}`;
};

const gotoShopPage = () => {
  window.location.href = 'https://shop.m.jd.com/?shopId=1000306683';
};

// sku价格 格式化
const getSkuPrizeFormat = (price: string) => price.slice(0, price.length - 3);

// 申领
const apply = () => {
  if (!isOpenCarded) {
    goToOpenCard();
  } else if (portType.value === 1) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    cjwxRequest.post('/wx/lancome/purchase/getToken', { activityId, pin }).then((res) => {
      if (res.result) {
        // 活动是否熔断
        if (!res.data.isFuse) {
          // 奖品是否已领光
          if (res.data.status === 3) {
            openDialog('finish');
          } else {
            // 申领成功
            isShowType.value = 2;
          }
        } else {
          openDialog('fuse');
          isFuse.value = true;
        }
      } else {
        Toast(res.errorMessage);
      }
    }).finally(
      Toast.clear,
    );
  } else if (!isFuse.value) {
    // if (portType.value === 2) {
    //   isShowType.value = 0;
    // } else {
    isShowType.value = portType.value;
    // }
  }
};

// 主接口
const activityContent = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/wx/lancome/purchase/activityContent', { activityId, pin }).then((res) => {
    if (res.result) {
      // 活动是否熔断
      if (!res.data.isFuse) {
        // 奖品是否已领光
        if (res.data.status === 3) {
          openDialog('finish');
        }
        portType.value = res.data.status;
      } else {
        openDialog('fuse');
        isFuse.value = true;
      }
      isShowType.value = 1;
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

activityContent();
getSkusList();

</script>

<style lang='scss'>
[v-cloak] {
  display: none;
}

html {
  background: #f3e9e9;
}

.van-popup {
  background-color: unset !important;
}

.van-toast {
  background: rgba(0, 0, 0, 0.7) !important;
}

.all {
  height: 100vh;

  .home {
    width: 7.5rem;
    min-height: 100vh;
    background: {
      image: url("./assets/home/background.png");
      repeat: no-repeat;
      size: contain;
    };
    margin: 0 auto;
    background-color: #fcfaf7;
    padding-top: 8rem;
    box-sizing: border-box;

    .info {
      width: 6.66rem;
      height: 4.2rem;
      margin: 0 auto;
      padding-top: .15rem;
      position: relative;
      background: {
        image: url("./assets/home/info-bg.png");
        repeat: no-repeat;
        size: contain;
      };

      .message {
        width: 100%;
        height: 4rem;
        font-size: .25rem;
        color: #000000;
        padding: .2rem;
        box-sizing: border-box;
        overflow-y: auto;
        white-space: pre-line;
      }
    }

    .btn {
      width: 100%;
      margin-top: .2rem;
      //position: absolute;
      //bottom: .32rem;
      text-align: center;
    }
  }

  .fail-condition {
    width: 7.5rem;
    height: 13rem;
    background: {
      image: url("./assets/condition/background.png");
      repeat: no-repeat;
      size: contain;
    };
    margin: 0 auto;
    padding-top: 4.49rem;
    box-sizing: border-box;
    background-color: #f3e9e9;

    .info {
      width: 6.54rem;
      height: 6.14rem;
      margin: 0 auto;
      position: relative;
      background: {
        image: url("./assets/condition/info-bg.png");
        repeat: no-repeat;
        size: contain;
      };

      .message {
        width: 100%;
        height: 4.7rem;
        line-height: .45rem;
        font-size: .25rem;
        color: #000000;
        padding: .1rem .2rem;
        box-sizing: border-box;
        overflow-y: auto;
        white-space: pre-line;
        margin-top: .2rem;
      }

      .btn {
        width: 100%;
        position: absolute;
        bottom: .32rem;
        text-align: center;
      }
    }
  }

  .apply-success {
    width: 7.5rem;
    background: {
      image: url("./assets/apply/background.png");
      repeat: no-repeat;
      size: contain;
    };
    margin: 0 auto;
    padding-top: 0.6rem;
    box-sizing: border-box;
    background-color: #f3e9e9;
    position: relative;
    text-align: center;
    padding-bottom: .5rem;

    .info {
      width: 7.06rem;
      height: 4.2rem;
      background-color: #FFFFFF;
      border-radius: 0.12rem;
      margin: 0 auto;
      position: relative;
      text-align: center;
    }

    .sku {
      padding: .2rem;
      display: flex;
      flex-wrap: wrap;

      .view {
        width: 3rem;
        margin: .25rem;

        .sku-name {
          font-size: .25rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .price-btn {
          width: 2.5rem;
          height: .4rem;
          line-height: .4rem;
          background: {
            image: url("./assets/apply/buy-btn.png");
            repeat: no-repeat;
            size: contain;
          };
          padding-left: .05rem;
          padding-top: .02rem;
          font-size: .24rem;
          font-weight: 600;
          margin: .1rem auto;
        }
      }
    }

    .btn {
      width: 2.45rem;
      position: absolute;
      right: 0;
      top: .3rem;
      z-index: 9;
    }
  }

  .rule-btn {
    width: 0.62rem;
    height: 2.19rem;
    position: absolute;
    top: 3rem;
    right: 0;
  }

}

</style>
