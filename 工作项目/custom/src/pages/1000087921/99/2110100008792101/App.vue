<!--
 * @Description:米其林-会员专享好礼
 * @Date: 2021-08-30 10:46:57
 * @FilePath: \custom\src\pages\1000087921\2109100008792101\App.vue
-->
<template>
  <div class="miqilin">
    <!-- 背景图片 -->
    <img src="./assets/background.png"
         class='background'>

    <!-- 活动规则按钮 -->
    <div class="rule-btn" @click="openDialog('ruleDialog')"></div>
    <!-- 申领记录按钮 -->
    <div class="apply-btn" @click="getUserApplyRecord"></div>

    <!-- 会员购买米其林非耐越系列 -->
    <div class="product-view">
      <!-- 非耐越背景图 -->
      <div class="product-normal fny-bg"></div>

      <!-- 非耐越按钮 -->
      <div class="product-btn-group">
        <div class="product-btn"
             :class="getBtnGray(list[0]?.prizeStatus)"
             @click="getBtnCheck(list[0])">{{ getBtnStatus(list[0]?.prizeStatus) }} >
        </div>
        <div class="product-btn"
             :class="getBtnGray(list[1]?.prizeStatus)"
             @click="getBtnCheck(list[1])" style="margin-left: .3rem">
          {{ getBtnStatus(list[1]?.prizeStatus) }} >
        </div>
      </div>
    </div>

    <!-- 活动规则 - 更多福利按钮 - 页面 -->
    <div class="member-rule-view">
      <!-- 活动规则 -->
      <img src="./assets/member-rule.png" class="rule-img"/>
      <!-- 更多福利按钮 -->
      <img src="./assets/more-welfare.png" @click="moreWelfareBtn" class="more-btn"/>
    </div>
  </div>

  <van-popup class="popup" v-model:show="dialogShow" :close-on-click-overlay="false">
    <RuleDialog @closeDialog="closeDialog" :rule="rule" v-if="dialogName === 'ruleDialog'"></RuleDialog>
    <ApplyDialog @closeDialog="closeDialog" :applyRecordObj="applyRecordObj"
                 v-if="dialogName === 'applyDialog'"></ApplyDialog>
    <MemberDialog @closeDialog="closeDialog" v-if="dialogName === 'memberDialog'"></MemberDialog>
    <CommitDialog @closeDialog="closeDialog" @commitInfo="commitInfo"
                  v-if="dialogName === 'commitDialog'"></CommitDialog>
    <ConfirmDialog @closeDialog="closeDialog" @openDialog="openDialog"
                   v-if="dialogName === 'confirmDialog'"></ConfirmDialog>
    <SuccessDialog @closeDialog="closeDialog" v-if="dialogName === 'successDialog'"></SuccessDialog>
  </van-popup>
</template>

<script lang='ts' setup>
import {
  ref, reactive, inject, onMounted, Ref,
} from 'vue';
import { Popup as vanPopup, Toast } from 'vant';
import { filterFiles } from 'vant/es/uploader/utils';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

import RuleDialog from './components/RuleDialog.vue';
import ApplyDialog from './components/ApplyDialog.vue';
import MemberDialog from './components/MemberDialog.vue';
import CommitDialog from './components/CommitDialog.vue';
import ConfirmDialog from './components/ConfirmDialog.vue';
import SuccessDialog from './components/SuccessDialog.vue';

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 获取活动id
const activityId = ref<string>(baseInfo.activityId);
// 是否开卡表示是否注册
const isOpenCarded = inject('isOpenCard');
// 申领记录数据
const applyRecordObj = ref({});
// 活动规则
const rule = ref('');
// 奖品类型
let prizeType = '';
// 下单时间
let prizeDate = '';
// 订单号
let orderId = '';

/* ---------------------------------  dialog  ------------------------------- */
// 弹窗是否显示
const dialogShow = ref(false);
// 显示的弹窗标示位
const dialogName = ref('');

// 打开弹窗
const openDialog = (name: string) => {
  dialogName.value = name;
  dialogShow.value = true;
};

/* --------------------------------------------------------------------------- */

// 主接口 获取活动信息;
const getActivityInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.get(`/common/brand/getFullActInfoVo?activityId=${activityId.value}`).then((res) => {
    if (res.data) {
      const rules = res.data.rule.split('\n');
      rule.value = rules.join('<br/>');
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 去下单
const toPlaceOrderBtn = (index: number) => {
  if (index === 1 || index === 2) {
    // https://h5.m.jd.com/dev/RLVegkgjdNJoM4Y1WsvAnKLD7Qw/index.html?appurl=https%3A%2F%2Fshop.m.jd.com%3FshopId%3D1000087921%26utm_source%3Dpdappwakeupup_20170002
    window.location.href = 'https://shop.m.jd.com/?shopId=1000087921';
  } else {
    window.location.href = 'https://pro.m.jd.com/mall/active/2ndPHpB6BDpVXz3PdJxYQL2UCmTx/index.html';
  }
};

// 更多福利
const moreWelfareBtn = () => {
  window.location.href = 'https://pro.m.jd.com/mall/active/4EhdkNDkz1votPRvFoY3CWwd96yc/index.html';
};

/* ---------------------------------  btn  ------------------------------- */
const btnStatusObject = [
  '',
  '已申领', // 1:
  '已申请其他奖品', // 2:
  '立即下单', // 3:
  '今日已领光', // 4:
  '立即申领', // 5:
  '立即开卡', // 6:
];

interface OrderStatus {
  prizeType: number,

  [propName: string]: any;
}

// 获取用户订单状态
const list: Ref<OrderStatus[] | null> = ref([]);

const getOrderStatusList = (orderStatusList: OrderStatus []): OrderStatus[] => {
  const orderList: OrderStatus[] = [];

  for (let i = 1; i <= 4; i += 1) {
    for (let y = 0; y < orderStatusList.length; y += 1) {
      if (orderStatusList[y].prizeType === i) {
        orderList.push(orderStatusList[y]);
        break;
      }
    }
  }

  return orderList;
};

const getOrderStatus = () => {
  cjwxRequest.post('/michelin/memberOrders/getUserStatus', {
    activityId: activityId.value,
  }).then((res) => {
    if (res.result) {
      list.value = getOrderStatusList(res.data);
    } else {
      Toast(res.errorMessage);
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 按钮是否置灰
const getBtnGray = (status: any) => {
  let bg = '';
  if (status === 1 || status === 2 || status === 4) {
    bg = 'gray';
  } else if (status === 5) {
    bg = 'blue';
  }
  return bg;
};

// 获取按钮文案
const getBtnStatus = (status: never) => {
  let btnName = '';
  if (!isOpenCarded) {
    btnName = '立即入会';
  } else {
    btnName = btnStatusObject[status];
  }
  return btnName;
};

// 点击按钮校验
const getBtnCheck = (obj: any) => {
  // 如果没入会，点击按钮 先弹窗入会
  if (!isOpenCarded) {
    openDialog('memberDialog');
  } else if (obj.prizeStatus === 3) {
    toPlaceOrderBtn(obj.prizeType);
  } else if (obj.prizeStatus === 5) {
    openDialog('confirmDialog');
    prizeType = obj.prizeType;
    prizeDate = obj.prizeDate;
    orderId = obj.orderId;
  }
};

// 关闭弹窗 - 子组件返回
const closeDialog = (name: string) => {
  console.log(name);
  if (name === 'successDialog') {
    getOrderStatus();
  }
  dialogShow.value = false;
};

/* --------------------------------------------------------------------------- */

// 提交接口
const commitInfo = (info: any) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  const {
    userName, phone, province, city, district, address,
  } = info.value;
  cjwxRequest.post('/michelin/memberOrders/editUserApply', {
    activityId: activityId.value,
    userName,
    phone,
    province,
    city,
    district,
    address,
    prizeType,
    orderId,
    prizeDate,
  }).then((res) => {
    if (res.result) {
      getOrderStatus();
      openDialog('successDialog');
    } else {
      Toast(res.errorMessage);
    }
  }).finally(() => {
    Toast.clear();
  });
};

/* -----------------------------  获取用户申请记录  ------------------------------ */
const getUserApplyRecord = () => {
  // applyRecordList.value = [1, 2];
  // openDialog('applyDialog');
  cjwxRequest.post('/michelin/memberOrders/getUserApplyRecord', {
    activityId: activityId.value,
  }).then((res) => {
    if (res.result) {
      applyRecordObj.value = res.data;
      openDialog('applyDialog');
    } else {
      Toast(res.errorMessage);
    }
  }).finally(() => {
    Toast.clear();
  });
};
/* --------------------------------------------------------------------------- */

/* ---------------------------------  埋点  ----------------------------------- */
const saveUserRecord = () => {
  cjwxRequest.post('/michelin/memberOrders/saveUserRecord', {
    activityId: activityId.value,
  });
};
/* --------------------------------------------------------------------------- */

// 如果没入会，点击按钮 先跳转入会
if (!isOpenCarded) {
  openDialog('memberDialog');
}

// 调用埋点接口
saveUserRecord();
// 调用获取订单状态接口
getOrderStatus();
// 调用活动信息接口
getActivityInfo();

</script>

<style lang='scss'>
html {
  max-width: 750px;
  margin: 0 auto;
  background: #1c1d1c;
}

.miqilin {
  text-align: center;
  position: relative;

  .background {
    width: 100%;
  }

  .rule-btn {
    position: absolute;
    top: .4rem;
    right: 0;
    width: 1.5rem;
    height: .4rem;
  }

  .apply-btn {
    position: absolute;
    top: .9rem;
    right: 0;
    width: 1.5rem;
    height: .4rem;
  }

  .product-view {
    width: 100%;
    position: absolute;
    top: 11.2rem;

    .product-normal {
      width: 6.96rem;
      height: 8rem;
      margin: 0 auto;
      position: relative;
    }

    .ny-bg {
      background: url('./assets/ny.png') no-repeat;
      background-size: cover;
    }

    .fny-bg {
      background: url('./assets/not-ny.png') no-repeat;
      background-size: cover;
    }

    .product-btn-group {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      width: 100%;
      position: absolute;
      bottom: 1.5rem;

      .product-btn {
        background: url("./assets/normal-btn-bg.png") no-repeat;
        background-size: cover;
        width: 1.85rem;
        height: .49rem;
        line-height: .49rem;
        color: #000000;
        font-size: .2rem;
      }
    }
  }

  .member-rule-view {
    width: 100%;
    position: absolute;
    top: 19.6rem;
    margin: 0 auto;

    .rule-img {
      width: 6.96rem;
    }

    .more-btn {
      margin: 0.3rem 0;
      width: 2.29rem;
    }
  }
}

.gray {
  /*grayscale(val):val值越大灰度就越深*/
  -webkit-filter: grayscale(100%) brightness(1);
  -moz-filter: grayscale(100%) brightness(1);
  -ms-filter: grayscale(100%) brightness(1);
  -o-filter: grayscale(100%) brightness(1);
  filter: grayscale(100%) brightness(1);
  filter: gray brightness;
}

.blue {
  background: #130aa0 !important;
  border-radius: 2rem !important;
  color: #ffffff !important;
}

.popup {
  background: unset !important;
}
</style>
