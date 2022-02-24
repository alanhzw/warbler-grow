<template>
  <div class="main" id="main">
    <img style="width: 7.5rem" src="./assets/banner.png"/>

    <van-sticky>
      <div class="tabbar">
        <div class="tab" :class="{'active':tabbarIndex==0}" @click="tabbarIndex=0,switchTab(0)">
          <img class="icon" :src="tabbarIndex===0?posIconActive:posIcon"/>
          <span>亲护1段</span>
        </div>
        <div class="tab" :class="{'active':tabbarIndex==1}" @click="tabbarIndex=1,switchTab(1)">
          <img class="icon" :src="tabbarIndex===1?posIconActive:posIcon"/>
          <span>亲护2段</span>
        </div>
        <div class="tab" :class="{'active':tabbarIndex==3}" @click="tabbarIndex=3,switchTab(3)">
          <img class="icon" :src="tabbarIndex===3?posIconActive:posIcon"/>
          <span>亲护3段</span>
        </div>
        <div class="tab" :class="{'active':tabbarIndex==4}" @click="tabbarIndex=4,switchTab(4)">
          <img class="icon" :src="tabbarIndex===4?posIconActive:posIcon"/>
          <span>早产系列</span>
        </div>
      </div>
    </van-sticky>

    <div class="sku">
      <div class="click-view" v-for="(item,index) in skuArr" :key="index" @click="checkIsPerfectInfo(item,index)">
        <div :id="`click-${index}`" style="position: absolute;top: -.8rem;left: 1rem;width: 1rem;height: 1rem !important;"></div>
        <div class="coupon" @click.stop="getCouponCheck(index)" v-if="index<=3">
          <img :src="couponList[index]?.drawStatus===3?haveDrawBtn:drawBtn" class="draw-btn">
        </div>
      </div>
    </div>

    <div class="member" @click="goToOpenCard()"></div>

  </div>

  <!-- 入会弹窗 -->
  <van-popup class="poupon" v-model:show="dialogShow" :close-on-click-overlay="false">
    <div class="dialog-info" v-if="dialogName === 'info'">
      <!-- 填写信息弹窗 -->
      <div class="fill-view">
        <input v-model="formData.phone" maxlength="11" type="tel" placeholder="请输入您的手机号"/>
        <input v-model="formData.name" maxlength="8" type="text" placeholder="请输入您的姓名"/>
        <input @click="birthdayDialog=true" v-model="formData.birth" readonly placeholder="请选择宝宝预产期或生日"/>
      </div>
      <div @click="getInfoCheck()" class="btn-view"></div>
    </div>

    <div class="dialog-no-new-user" v-if="dialogName === 'noNewUser'">
      <!-- 不符合新用户弹窗 -->
      <div class="operation_btn" @click='goToShop()'></div>
    </div>

    <div class="dialog-dissatisfy" v-if="dialogName === 'dissatisfy'">
      <!-- 不满足条件弹窗 -->
      <div class="operation_btn" @click='goToShop()'></div>
    </div>

    <div class="dialog-none" v-if="dialogName === 'none'">
      <!-- 已抢光弹窗 -->
      <div class="operation_btn" @click='closeDialog()'></div>
    </div>

    <div class="dialog-success" v-if="dialogName === 'success'">
      <!-- 领取成功弹窗 -->
      <div class="operation_btn" @click='closeDialog()'></div>
    </div>

    <div class="dialog-fail" v-if="dialogName === 'fail'">
      <!-- 已领取过弹窗 -->
      <div class="operation_btn" @click='closeDialog()'></div>
    </div>

    <div class="close-btn" @click='closeDialog()'></div>
  </van-popup>

  <!-- 生日弹窗 -->
  <van-popup v-model:show="birthdayDialog" position="bottom">
    <van-datetime-picker
      v-model="currentDate"
      title="生日"
      type="date"
      :min-date="new Date(1900, 0, 1)"
      :max-date="new Date(2030,0,1)"
      @confirm="dateConfirm"
      @cancel="onCancel"
    ></van-datetime-picker>
  </van-popup>
</template>

<script lang='ts' setup>
import { inject, nextTick, onMounted, ref } from 'vue';
import { Toast, Sticky as vanSticky, Popup as vanPopup, DatetimePicker as vanDatetimePicker } from 'vant';
import dayjs from 'dayjs';
import { getClientType } from '@/utils/platforms/clientType';
import { gotoSkuPage } from '@/utils/platforms';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import posIcon from './assets/pos-icon.png';
import posIconActive from './assets/pos-icon-active.png';
import haveDrawBtn from './assets/draw-ok.png';
import drawBtn from './assets/go-draw.png';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;

// 获取基本信息
const { activityId, actName, pin, venderId } = baseInfo;

// 设置页面title
document.title = actName;

// 获取链接参数
const { adSource } = inject('pathParams');
// 是否开卡
const isOpenCarded = inject('isOpenCard');

const isFillFlg = ref(false); // 是否可以填写信息
const isNewFlg = ref(false); // 是否新客

const skuArr = [100025251094, 100025188052, 100023170984, 100023170982, 813926, 100010002446];

interface couponItem {
  drawStatus?: number,
}

const couponList = ref([]);
const couponObject = ref({});

const skuIdIndex = ref(0);
const tabbarIndex = ref(0);
const switchTab = (index: number) => {
  tabbarIndex.value = index;
  // document.getElementsByClassName('click-view')[index].scrollIntoView();
  // console.log(document.getElementsByClassName('click-view')[index].);
  document.getElementById(`click-${index}`).scrollIntoView();
};

const currentDate = new Date(1995, 0, 1);
const formData = ref({
  phone: '',
  name: '',
  birth: '',
});

const dialogShow = ref(false);
const dialogName = ref('');
const openDialog = (name: string) => {
  dialogName.value = name;
  dialogShow.value = true;
};
const closeDialog = () => {
  dialogShow.value = false;
  setTimeout(() => {
    formData.value = {
      phone: '',
      name: '',
      birth: '',
    };
  }, 500);
};

const birthdayDialog = ref(false);
const dateConfirm = (value: string) => {
  formData.value.birth = dayjs(value).format('YYYY-MM-DD');
  birthdayDialog.value = false;
};

const onCancel = () => {
  birthdayDialog.value = false;
};

// 加购商品
const addCart = (skuId: number, isDialog: boolean) => {
  cjwxRequest.post('/common/pointRedeem/addCart', {
    skuId,
    activityId,
    type: 99,
  }).then((res) => {
    if (res.result) {
      if (!isDialog) {
        Toast('加购成功！');
      }
      setTimeout(() => {
        window.location.href = 'https://p.m.jd.com/cart/cart.action?fromnav=1';
      }, 800);
    } else {
      Toast(res.errorMessage);
    }
  });
};

// 点击商品时判断是否完善信息
const checkIsPerfectInfo = (skuId: number, index: number) => {
  skuIdIndex.value = index;
  // 判断是否需要填写信息
  if (isFillFlg.value) {
    openDialog('info');
  } else if (index >= 4) {
    if (isNewFlg.value) {
      // 判断是否新客
      // 加购 && 跳转购物车
      addCart(skuId, false);
    } else {
      openDialog('noNewUser');
    }
  } else {
    gotoSkuPage(skuId);
  }
};

// 埋点
const addAccessLog = () => {
// 获取客户端类型
  const clientType = getClientType();
  cjwxRequest.post('/common/accessLog', {
    venderId,
    activityId,
    pin,
    code: 99,
    pageUrl: '1',
    adSource,
    subType: clientType,
  }).then((res) => {
    console.log(res, '埋点--');
  });
};

// 主接口
const activityContent = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('abbott/newCustomer/activityContent', { activityId }).then((res) => {
    if (res.result) {
      isNewFlg.value = res.data.newFlg;
      isFillFlg.value = res.data.fillFlg;
      couponList.value = res.data.couponList;
    } else {
      Toast(res.errorMessage);
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 领取优惠券
const getCoupon = () => {
  const { id, couponType } = couponObject.value;
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post(`/abbott/newCustomer/drawCoupon/${adSource}`, {
    activityId,
    couponId: id,
    couponType,
    phone: formData.value.phone,
    name: formData.value.name,
    birth: formData.value.birth,
  }).then((res) => {
    if (res.result) {
      if (couponObject.value.drawStatus === 1) {
        openDialog('success');
      }
      activityContent();
    } else if (couponObject.value.drawStatus === 1) {
      Toast(res.errorMessage);
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 优惠券状态判断
const getCouponStatusCheck = () => {
  if (couponObject.value.drawStatus === 0) {
    openDialog('dissatisfy');
  } else if (couponObject.value.drawStatus === 2) {
    openDialog('none');
  } else if (couponObject.value.drawStatus === 3) {
    openDialog('fail');
  } else if (couponObject.value.drawStatus === 4) {
    openDialog('fail');
  }
  getCoupon();
};

// 信息校验规则
const checkRule = () => {
  let check = false;
  // 特殊字符
  const spcWord = /[^\u4e00-\u9fa5a-zA-Z\d,.，。（）() - - ! ！? ？]+/;
  // 空格
  const whitespace = /\s+/g;
  // 表情符号
  const faceWord = /[\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/;

  if (!formData.value.phone) {
    Toast('请输入手机号');
  } else if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(formData.value.phone))) {
    Toast('请输入正确的手机号');
  } else if (!formData.value.name) {
    Toast('姓名不能为空');
  } else if (spcWord.test(formData.value.name)) {
    Toast('姓名不能包含特殊符号');
  } else if (faceWord.test(formData.value.name)) {
    Toast('姓名不能包含表情符号');
  } else if (whitespace.test(formData.value.name)) {
    Toast('姓名不能包含空格');
  } else if (!formData.value.birth) {
    Toast('请选择宝宝预产期或生日');
  } else {
    check = true;
  }

  return check;
};

// 仅提交信息接口
const onlyCommitInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post(`abbott/newCustomer/fillPersonInfo/${adSource}`, {
    activityId,
    phone: formData.value.phone,
    name: formData.value.name,
    birth: formData.value.birth,
  }).then((res) => {
    if (res.result) {
      if (isNewFlg.value) {
        closeDialog();
        Toast('提交成功，已帮您加入购物车~');
        // 判断是否新客
        // 加购 && 跳转购物车
        setTimeout(() => {
          addCart(skuArr[skuIdIndex.value], true);
        }, 500);
      } else {
        openDialog('noNewUser');
      }
      activityContent();
    } else {
      Toast(res.errorMessage);
    }
  }).finally(() => {
    Toast.clear();
  });
};

// 完善信息校验
const getInfoCheck = () => {
  if (checkRule()) {
    if (skuIdIndex.value >= 4) {
      onlyCommitInfo();
    } else {
      getCouponStatusCheck();
    }
  }
};

// 领取优惠券校验
const getCouponCheck = (index: number) => {
  couponObject.value = couponList.value[index];
  if (isFillFlg.value) {
    // 没有完善信息
    openDialog('info');
  } else if (isNewFlg.value) {
    // 领取优惠券
    getCouponStatusCheck();
  } else {
    // 不满足活动条件
    openDialog('dissatisfy');
  }
};

// 店铺首页
const goToShop = () => {
  console.log(11);
  window.location.href = `https://shop.m.jd.com/?shopId=${venderId}`;
};

// 开卡链接
const goToOpenCard = () => {
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000001582&shopId=1000001582&venderType=5&channel=7034&returnUrl=${window.location.href}`;
};

if (!isOpenCarded && process.env.NODE_ENV !== 'development') {
  goToOpenCard();
}

const onScroll = () => {
  let scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }

  if (scrollTop > 800 && scrollTop <= 1700) {
    tabbarIndex.value = 1;
  } else if (scrollTop > 1700 && scrollTop < 2200) {
    tabbarIndex.value = 3;
  } else if (scrollTop >= 2200) {
    tabbarIndex.value = 4;
  } else {
    tabbarIndex.value = 0;
  }
};

window.onscroll = function () {
  onScroll();
};

// onMounted(() => {
//   nextTick(() => {
//     window.addEventListener('scroll', onScroll, true);
//   });
// });

activityContent();
addAccessLog();

</script>

<style lang='scss'>
html {
  background: #ffcada;
}

.poupon {
  background-color: unset !important;
}

.main {
  width: 7.5rem;
  margin: 0 auto;

  .tabbar {
    display: flex;
    background-color: #ffcada;
    justify-content: space-evenly;

    .tab {
      width: 1.5rem;
      color: #d1059b;
      font-size: .26rem;
      font-weight: 600;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: .6rem;
      line-height: .6rem;
      padding: .2rem .2rem;

      .icon {
        width: .25rem;
      }
    }

    .active {
      color: #FFFFFF !important;
      background-color: #d1059b !important;
    }
  }

  .aasdasd {
    color: #FFFFFF;
  }

  .sku :nth-child(1) {
    height: 9rem !important;
  }

  .sku :nth-child(2) {
    height: 8.57rem !important;
  }

  .sku :nth-child(3) {
    height: 8.8rem !important;
  }

  .sku :nth-child(4) {
    height: 8.83rem !important;
  }

  .sku :nth-child(6) {
    height: 7.5rem !important;
  }

  .sku {
    width: 7.5rem;
    height: 51.24rem;
    box-sizing: border-box;
    background: {
      image: url("./assets/info.png");
      repeat: no-repeat;
      size: contain;
    };

    .click-view {
      width: 7.5rem;
      height: 8.5rem;
      position: relative;

      .coupon {
        position: absolute;
        bottom: 1rem;
        left: 0.7rem;
        width: 6rem;
        height: 1.3rem !important;

        .draw-btn {
          width: .9rem;
          height: unset !important;
          position: absolute;
          top: 0.2rem;
          right: 0.3rem;
        }
      }
    }
  }

  .member {
    width: 7.5rem;
    height: 5.4rem;
    background: {
      image: url("./assets/member.png");
      repeat: no-repeat;
      size: contain;
    };
  }
}

.dialog-info {
  width: 6.5rem;
  height: 5.2rem;
  position: relative;
  background: {
    image: url("./assets/dialog/commit-info.png");
    repeat: no-repeat;
    size: contain;
  };

  .fill-view {
    width: 3.7rem;
    position: absolute;
    top: 1.58rem;
    right: .7rem;

    input {
      width: 100%;
      height: .4rem;
      line-height: .4rem;
      padding-top: .05rem;
      margin-top: .05rem;
      font-size: .25rem;
      background-color: transparent;
      border: transparent;
      text-align: right;
    }
  }

  .btn-view {
    width: 3rem;
    height: 0.7rem;
    position: absolute;
    bottom: .6rem;
    left: 1.8rem;
  }
}

.dialog-no-new-user {
  width: 6.5rem;
  height: 5.20rem;
  position: relative;
  background: {
    image: url("./assets/dialog/new-user.png");
    repeat: no-repeat;
    size: contain;
  };
}

.dialog-dissatisfy {
  width: 6.5rem;
  height: 5.2rem;
  position: relative;
  background: {
    image: url("./assets/dialog/dissatisfy.png");
    repeat: no-repeat;
    size: contain;
  };
}

.dialog-none {
  width: 6.5rem;
  height: 5.2rem;
  position: relative;
  background: {
    image: url("./assets/dialog/draw-none.png");
    repeat: no-repeat;
    size: contain;
  };
}

.dialog-success {
  width: 6.5rem;
  height: 5.2rem;
  position: relative;
  background: {
    image: url("./assets/dialog/draw-ok.png");
    repeat: no-repeat;
    size: contain;
  };
}

.dialog-fail {
  width: 6.5rem;
  height: 5.2rem;
  position: relative;
  background: {
    image: url("./assets/dialog/have-draw.png");
    repeat: no-repeat;
    size: contain;
  };
}

.close-btn {
  width: 1rem;
  height: 1rem;
  margin: .5rem auto;
  background: {
    image: url("//img10.360buyimg.com/imgzone/jfs/t1/87550/12/19913/2273/61ce6147Ef7494309/aa5cbda0764da83f.png");
    repeat: no-repeat;
    size: contain;
  };
}

.operation_btn {
  width: 3rem;
  height: 1rem;
  position: absolute;
  bottom: 0.5rem;
  left: 1.7rem;
}
</style>
