<template>
  <div class="main-kv">
    <!--  礼品-->
    <div class="prize-btn" @click="openDialog('prizeState')"></div>
    <!--  订单-->
    <div class="order-btn" @click="openDialog('orderState')"></div>
    <!--  规则-->
    <div class="rule-btn" @click="openDialog('ruleState')"></div>
    <!--    优惠券-->
    <div class="coupon-btn">
      <div v-if="isOpenCarded" class="opened" @click="gotoCard"></div>
      <div v-else class="unOpen" @click="gotoCard"></div>
    </div>
    <!--    进度条-->
    <div class="grow-process">
      <div class="process-bg">
        <div style="width: 4.5rem;height: .48rem;position: relative;">
          <div class="progress-active" :style="{ width: growWidth+'%'}">
            <div class="price-span"><span style="margin: .07rem auto 0;display: block;height: .413rem">{{nowMoney}}元</span></div>
          </div>
        </div>
      </div>
    </div>
    <!--    商品状态-->
    <div class="prize-area">
      <div v-for="item in prizeStateList" :key="item.id" class="prize-title">
        <div v-if="item.buttonStatus===1">
          <div v-if="item.flag===1" class="have-Prize">
            <div style="height: 100%" v-if="isOpenCarded" @click="collect(item.name, item.showImage)"></div>
            <div style="height: 100%" v-else @click="openDialog('noMem')"></div>
          </div>
          <div v-else class="no-Qualify"></div>
        </div>
        <div v-else-if="item.buttonStatus===2" class="no-Storge"></div>
        <div v-else-if="item.buttonStatus===3" class="had-Prize"></div>
        <div style="margin-top: .15rem">剩余{{item.totalRestNum}}份</div>
      </div>
    </div>
    <!--    金额显示-->
    <div class="show-area">您累积购买已达{{nowMoney}}元，奖品数量有限，赶紧下单抢奖品吧</div>
    <!--    继续下单-->
    <div class="shop-btn" @click="gotoShopPage('1000003570')"></div>
    <!--    展示柜台-->
    <div class="display-area">
      <!--      1-->
      <div>
        <div v-if="isOpenCarded" class="joined gray"></div>
        <div v-else class="iconMem" @click="gotoCard"></div>
      </div>
      <!--      2-->
      <div>
        <div class="joinNow" @click="joinNow"></div>
      </div>
      <!--      3-->
      <div>
        <div class="saveMoney gray" style="margin-top: .7rem;" @click="joinNow2"></div>
<!--        <div>敬请期待</div>-->
      </div>
      <!--      4-->
      <div class="mask">
        <!--        <div class="openNow gray"></div>-->
        <div>敬请期待</div>
      </div>
      <!--      5-->
      <div>
        <div class="saveMoney" style="margin-top: .9rem" @click="saveMoney2"></div>
      </div>
      <!--      6-->
      <div>
        <div class="seeNow" @click="saveMoney1"></div>
      </div>
    </div>
    <!--    曝光商品-->
    <div class="sku-area">
      <div v-for="item in skus" :key="item.id">
        <!--        <img :src="item.myimg"/>-->
        <!--        <div style="font-size: .2rem;width: 2.8rem;margin: .1rem 0 0 .2rem;word-break: break-all;overflow:hidden;text-overflow: ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">{{item.skuName}}</div>-->
        <!--        <div style="font-size: .3rem;color: #ce0037;width: 100%;text-align: center;margin-top: .1rem;">￥{{item.jdPrice}}</div>-->
        <div class="sku-btn" @click="gotoSkuPage(item)"></div>
      </div>
    </div>
    <!--    底栏-->
    <div class="bottom-area">
      <div style="width: 50%;height: 100%;" @click="backTop"></div>
      <div style="width: 50%;height: 100%;" @click="gotoShopPage('1000003570')"></div>
    </div>
    <!--非会员弹窗-->
    <Overlay class="overlay" v-model:show="noMemberShow" :close-on-click-overlay="false">
      <div class="wrapper">
        <div class="noMem-view">
          <div class="gotoOpen" @click="gotoCard"></div>
          <div class="close-btn" @click="closeDialog('noMem')"></div>
        </div>
      </div>
    </Overlay>
    <!--  规则弹窗-->
    <Popup class="overlay" v-model:show="rulesShow" :close-on-click-overlay="false">
      <div class="wrapper">
        <div class="rules-view">
          <div class="ruleView-area">
            <div style="padding-right: .11rem" v-html="rule"></div>
          </div>
          <div class="close-btn" @click="closeDialog('ruleState')"></div>
        </div>
      </div>
    </Popup>
    <!--  奖品弹窗-->
    <Overlay class="overlay" v-model:show="myPrizeShow" :close-on-click-overlay="false">
      <div class="wrapper">
        <div class="myPrize-view">
          <div class="prize-alert">点击奖品名称可修改地址</div>
          <div class="myPrizeView-area">
            <div v-if="myPrizeList.length > 0">
              <div v-for="item in myPrizeList" :key="item.id">
                <div class="myprize-item">
                  <div style="width: 2rem;">{{item.createTime}}</div>
                  <div style="width: 3.5rem;margin-left: .3rem;overflow:hidden; white-space:nowrap; text-overflow:ellipsis;" @click="changeInfo(item.giftId)">{{item.giftId}}</div>
                </div>
              </div>
            </div>
            <div v-else class="noprize-item">暂无获奖记录</div>
          </div>
          <div class="close-btn" @click="closeDialog('prizeState')"></div>
        </div>
      </div>
    </Overlay>
    <!--  订单弹窗-->
    <Popup class="overlay" v-model:show="myOrderShow" :close-on-click-overlay="false">
      <div class="wrapper">
        <div class="myOrder-view">
          <div class="myOrder-area">
            <div v-if="orderList.length > 0">
              <div v-for="item in orderList" :key="item.orderId">
                <div class="myorder-item">
                  <div>{{item.orderCreated}}</div>
                  <div>{{item.orderId}}</div>
                  <div>{{item.orderPrice}}元</div>
                </div>
              </div>
            </div>
            <div v-else class="noorder-item">暂无获奖记录</div>
          </div>
          <div class="close-btn" @click="closeDialog('orderState')"></div>
        </div>
      </div>
    </Popup>
    <!--  已中奖弹窗-->
    <Overlay class="overlay" v-model:show="getLotteryShow" :close-on-click-overlay="false">
      <div class="wrapper">
        <div class="getLottery-view">
          <img :src="nowImg" class="prize-img"/>
          <div class="prize-name">您获得{{nowPrize}}</div>
          <div class="fix-btn" @click="closeDialog('getLottery');openDialog('userFix')"></div>
          <!--          <div class="close-btn" @click="closeDialog('getLottery')"></div>-->
        </div>
      </div>
    </Overlay>
    <!-- 填写地址弹窗 -->
    <Popup class="overlay" v-model:show="fixInfoShow" :close-on-click-overlay="false">
      <div class="wrapper">
        <div class="fixInfo-view">
          <div class="address-formData">
            <input
              type="text"
              v-model="formData.receiver"
              placeholder="收货人姓名"
              maxlength="10"
            />
            <input
              type="text"
              v-model="formData.phone"
              placeholder="收货人手机号"
              oninput="value=value.replace(/[^\d]/g,'')"
              maxlength="11"
            />
            <input
              type="text"
              v-model="addressCode"
              readonly="readonly"
              placeholder="选择省/市/区"
              @click="addressSelects = true"
            />
            <input
              type="text"
              v-model="formData.address"
              placeholder="街道门牌号"
              maxlength="30"
            />
            <!--          <input
                        type="text"
                        v-model="formData.postalCode"
                        placeholder="邮政编码"
                        style="width: 82%"
                        oninput="value=value.replace(/[^\d]/g,'')"
                        maxlength="6"
                      />
                      <input
                        type="text"
                        v-model="formData.personalID"
                        placeholder="身份证18位"
                        style="width: 82%;"
                        onkeyup="value=value.replace(/[^0-9xX]/g,'');value=value.toUpperCase()"
                        maxlength="18"
                      />-->
          </div>
          <div class="submit-btn" @click="submitCheckOut"></div>
          <!--          <div class="close-btn" @click="closeDialog('userFix')"></div>-->
        </div>
      </div>
    </Popup>
    <!--地址选择-->
    <Popup v-model:show="addressSelects" position="bottom">
      <Area
        title="请输入详细地址"
        :area-list="areaList"
        @confirm="confirmAddress"
        @cancel="onCancel"
      />
    </Popup>
  </div>
</template>

<script lang='ts' setup>
import { ref, inject, computed } from 'vue';
import {
  Popup, Toast, Overlay, Checkbox, Area,
} from 'vant';
import { areaList } from '@vant/area-data';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { gotoShopPage, gotoSkuPage } from '@/utils/platforms';

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 规则
const rule = ref('');
// 是否开卡表示是否注册
const isOpenCarded: boolean = inject('isOpenCard') as boolean;
// const isOpenCarded = true;
// 开卡弹窗
const noMemberShow = ref(false);
// 规则弹窗
const rulesShow = ref(false);
// 奖品弹窗
const myPrizeShow = ref(false);
// 订单弹窗
const myOrderShow = ref(false);
// 已中奖弹窗
const getLotteryShow = ref(false);
// 未中奖弹窗
const isOverShow = ref(false);
// 完善信息弹窗
const fixInfoShow = ref(false);
// 完善信息内容
const formData = ref({
  giftRecordId: '',
  receiver: '',
  phone: '',
  address: '',
  postalCode: '',
  personalID: '',
  province: '',
  city: '',
  district: '',
});
// 省市区地址
const addressCode = ref('');
// 地址上拉弹窗
const addressSelects = ref(false);
// 获取活动id
const activityId = ref<string>(baseInfo.activityId);
// 获取店铺id
const shopId = ref<string>(baseInfo.shopId);
// 用户Pin
const userPin = ref<string>(baseInfo.pin);
// 用户信息
const userInfo = ref({});
// 奖品状态信息
const prizeStateList = ref([]);
// 奖品1
const flag1 = ref('');
// 奖品2
const flag2 = ref('');
// 奖品3
const flag3 = ref('');
// 用户消费金额
const memMoney = ref('');
// 真实消费金额
const nowMoney = ref('');
// 进度条计算
// const growWidth = computed(() => 100 - ((memMoney.value / 10000) * 100));
const growWidth = computed(() => (memMoney.value / 16999) * 100);
// 暂存奖品名称
const nowPrize = ref('');
// 暂存奖品图片
const nowImg = ref('');
// 获奖记录
const myPrizeList = ref([]);
// 订单记录
const orderList = ref([]);
// 曝光商品列表
const skusList = ref([]);
// 曝光商品sku
const skus = [100005053382, 100013322746, 100014612406, 100005853206];
/*--------------------------------------------------------------------------------------------*/
// 开启弹窗
const openDialog = (status: string) => {
  if (status === 'noMem') {
    noMemberShow.value = true;
  } else if (status === 'ruleState') {
    rulesShow.value = true;
  } else if (status === 'prizeState') {
    myPrizeShow.value = true;
  } else if (status === 'orderState') {
    myOrderShow.value = true;
  } else if (status === 'getLottery') {
    getLotteryShow.value = true;
  } else if (status === 'userFix') {
    fixInfoShow.value = true;
  }
};
// 关闭弹窗
const closeDialog = (status: string) => {
  if (status === 'noMem') {
    noMemberShow.value = false;
  } else if (status === 'ruleState') {
    rulesShow.value = false;
  } else if (status === 'prizeState') {
    myPrizeShow.value = false;
  } else if (status === 'orderState') {
    myOrderShow.value = false;
  } else if (status === 'getLottery') {
    getLotteryShow.value = false;
  } else if (status === 'userFix') {
    fixInfoShow.value = false;
  }
};
/*--------------------------------------------------------------------------------------------*/
// 更改信息
const changeInfo = (giftId) => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wx/yili/amountgift/getAddressInfo', {
    activityId: activityId.value,
    pin: userPin.value,
    giftName: giftId,
  }).then((res) => {
    if (res.result) {
      if (res.data.length > 0) {
        formData.value.receiver = res.data[0].receiver;
        formData.value.phone = res.data[0].phone;
        addressCode.value = `${res.data[0].province}/${res.data[0].city}/${res.data[0].district}`;
        formData.value.province = res.data[0].province;
        formData.value.city = res.data[0].city;
        formData.value.district = res.data[0].district;
        formData.value.address = res.data[0].address;
      }
      nowPrize.value = giftId;
      openDialog('userFix');
      closeDialog('prizeState');
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 回顶部
const backTop = () => {
  window.scrollTo(0, 0);
};
// 时间戳转换
const appendZero = (obj) => {
  if (obj < 10) {
    return `0${obj}`;
  }
  return obj;
};
// eslint-disable-next-line consistent-return
const dataChange = (date) => {
  if (date === null) {
    return '';
  }
  const time = date;
  const now = new Date(time);
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const dateStr = `${year}/${appendZero(month)}/${appendZero(day)}`;
  return dateStr;
};
// 跳转
const saveMoney1 = () => {
  window.location.href = 'https://pro.m.jd.com/mall/active/3ACncGPjWypMKgKCq1mhTapWbz9h/index.html';
};
const saveMoney2 = () => {
  window.location.href = 'https://pro.m.jd.com/mall/active/3kYNHJZu9QKhZTP81cx3JwKSywwU/index.html';
};
const joinNow = () => {
  window.location.href = 'https://lzkjdz-isv.isvjcloud.com/yili/returnBean/activity?activityId=2111100000357001';
};
const joinNow2 = () => {
  window.location.href = 'https://lzkjdz-isv.isvjcloud.com/yili/inviteNew/activity/1213?activityId=2110100000357002';
};
// 获取商品订单
const getOrderList = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wx/yili/amountgift/getOrderList', {
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      res.data.forEach((i, n) => {
        i.orderCreated = dataChange(i.orderCreated);
      });
      orderList.value = res.data;
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 获取sku商品
const getSkuList = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/act/common/findSkus', {
    actId: activityId.value,
    userId: shopId.value,
    type: 99,
  }).then((res) => {
    if (res.isOk) {
      skusList.value = res.skus;
      // skusList.value[0].myimg = '//img10.360buyimg.com/imgzone/jfs/t1/211673/11/4976/315665/61653a2cE61b09f34/6f7470ac871ebd3f.png';
      // skusList.value[1].myimg = '//img10.360buyimg.com/imgzone/jfs/t1/216218/40/28/317458/61654820Eabaa51ca/1f298983be8e98a5.png';
      // skusList.value[2].myimg = '//img10.360buyimg.com/imgzone/jfs/t1/199571/8/12660/70450/61653a2cE41090888/ab0d13cb2ce6dde8.jpg';
      // skusList.value[3].myimg = '//img10.360buyimg.com/imgzone/jfs/t1/215898/11/16/245956/61653a2cE03951d2a/94261c53bce4c697.png';
    } else {
      Toast(res.msg);
    }
  });
};
// 获取奖品状态
const getPrizeStatus = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wx/yili/amountgift/getTotalAmount', {
    activityId: activityId.value,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      prizeStateList.value = res.data.crmGiftInfoList;
      prizeStateList.value[0].flag = res.data.flag1;
      prizeStateList.value[1].flag = res.data.flag2;
      prizeStateList.value[2].flag = res.data.flag3;
      nowMoney.value = res.data.totalAmount;
      if (res.data.totalAmount > 16999) {
        memMoney.value = 16999;
      } else {
        memMoney.value = res.data.totalAmount;
      }
      // eslint-disable-next-line no-use-before-define
      getMyprizeInfo();
      getOrderList();
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 点击领取
// const getThePrize = (prizeName, prizeImg) => {
//   getLotteryShow.value = true;
//   nowPrize.value = prizeName;
//   nowImg.value = prizeImg;
//   // eslint-disable-next-line no-use-before-define
//   collect();
// };
// 领取商品
const collect = (prizeName, prizeImg) => {
  cjwxRequest.post('/wx/yili/amountgift/getPrize', {
    activityId: activityId.value,
    pin: userPin.value,
    giftName: prizeName,
  }).then((res) => {
    if (res.result) {
      // OK
      getLotteryShow.value = true;
      nowPrize.value = prizeName;
      nowImg.value = prizeImg;
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 奖品名单
const getMyprizeInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wx/yili/amountgift/myPrize', {
    activityId: activityId.value,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      res.data.forEach((i, n) => {
        i.createTime = dataChange(i.createTime);
      });
      myPrizeList.value = res.data;
      console.log(myPrizeList.value);
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 关闭三联地址框
const onCancel = () => {
  addressSelects.value = false;
};
// 确认三联地址信息
const confirmAddress = (addressItemList: any[]) => {
  formData.value.province = addressItemList[0].name;
  formData.value.city = addressItemList[1].name;
  formData.value.district = addressItemList[2].name;
  addressCode.value = addressItemList.map((item) => item.name).join('/');
  addressSelects.value = false;
};
// 置空信息内容
const formDataEmpty = () => {
  formData.value = {
    giftRecordId: '',
    receiver: '',
    phone: '',
    address: '',
    postalCode: '',
    personalID: '',
    province: '',
    city: '',
    district: '',
  };
  addressCode.value = '';
};
// 开卡判断
const openCardStatus = () => {
  if (!isOpenCarded) {
    openDialog('noMem');
  }
};
// 去开卡
const gotoCard = () => {
  const returnUrl = encodeURIComponent(`https://${window.location.host}/m/1000003570/99/2109100000357002/`);
  window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=1000003570&shopId=1000003570&venderType=5&channel=7005&returnUrl=${returnUrl}`;
};
// 提交用户信息
const recordInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wx/yili/amountgift/insertPrizeInfo', {
    activityId: activityId.value,
    pin: userPin.value,
    giftName: nowPrize.value,
    province: formData.value.province,
    city: formData.value.city,
    district: formData.value.district,
    receiver: formData.value.receiver,
    phone: formData.value.phone,
    address: formData.value.address,
  }).then((res) => {
    if (res.result) {
      closeDialog('userFix');
      formDataEmpty();
      getPrizeStatus();
      Toast('提交成功');
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 信息校验
const submitCheckOut = () => {
  // 特殊字符
  const spcWord = /[^\u4e00-\u9fa5a-zA-Z\d,.，。（）() - - ! ！? ？]+/;
  // 空格
  const whitespace = /\s+/g;
  // 表情符号
  const faceWord = /[\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/;
  if (!formData.value.receiver) {
    Toast('姓名不能为空');
  } else if (spcWord.test(formData.value.receiver)) {
    Toast('姓名不能包含特殊符号');
  } else if (faceWord.test(formData.value.receiver)) {
    Toast('姓名不能包含表情符号');
  } else if (whitespace.test(formData.value.receiver)) {
    Toast('姓名不能包含空格');
  } else if (!(/^1(3|4|5|7|8|9)\d{9}$/.test(formData.value.phone))) {
    Toast('请输入正确的手机号');
  } else if (!addressCode.value) {
    Toast('请选择地区');
  } else if (!formData.value.address) {
    Toast('详细地址不能为空');
  } else if (faceWord.test(formData.value.address)) {
    Toast('详细地址不能包含表情符号');
  } else if (whitespace.test(formData.value.address)) {
    Toast('详细地址不能包含空格');
  } else {
    recordInfo();
  }/* else if (!(/^\d{6}$/.test(formData.value.postalCode))) {
    Toast('请输入正确邮编');
  } else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(formData.value.personalID))) {
    Toast('请输入有效身份证号');
  } */
};
// 获取活动信息;
const getActivityInfo = () => {
  cjwxRequest
    .get(`/common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`)
    .then((res) => {
      if (res.data) {
        const rules = res.data.rule.split('\r');
        rule.value = rules.join('<br/>');
      }
    });
};
getActivityInfo();
getPrizeStatus();
getSkuList();
openCardStatus();
</script>

<style lang='scss'>
html {
  max-width: 750px;
  margin: 0 auto;
  background: #770000;
}
.gray {
  /*grayscale(val):val值越大灰度就越深*/
  /* -webkit-filter: grayscale(100%) brightness(1);
   -moz-filter: grayscale(100%) brightness(1);
   -ms-filter: grayscale(100%) brightness(1);
   -o-filter: grayscale(100%) brightness(1);
   filter: grayscale(100%) brightness(1);
   filter: gray brightness;*/
  filter: grayscale(1);
}
.van-popup {
  background: none;
  overflow: hidden;
}
.van-toast {
  background-color: rgba(0,0,0,.7);
  min-width: max-content;
}
.main-kv{
  position: relative;
  background: url("./assets/main-kv.png") no-repeat;
  background-size: cover;
  height: 37.9rem;

  .order-btn{
    position: absolute;
    width: 1.2rem;
    height: 0.45rem;
    top: 7.48rem;
    right: 0;
  }
  .rule-btn{
    position: absolute;
    width: 1.2rem;
    height: 0.45rem;
    top: 8rem;
    right: 0;
  }
  .prize-btn{
    position: absolute;
    width: 1.2rem;
    height: 0.5rem;
    top: 6.94rem;
    right: 0;
  }
  .coupon-btn{
    position: absolute;
    top: 10.5rem;
    left: 1.1rem;
    width: 2.72rem;
    height: 0.7rem;

    .unOpen{
      background: url("./assets/coupon-btn.png") no-repeat;
      background-size: 100%;
      width: 100%;
      height: 100%;
    }
    .opened{
      background: url("./assets/coupon-btn.png") no-repeat;
      background-size: 100%;
      width: 100%;
      height: 100%;
    }
  }
  .grow-process{
    position: absolute;
    width: 100%;
    height: 1.4rem;
    top: 15rem;

    .process-bg{
      width: 4.68rem;
      height: 0.59rem;
      background: url("./assets/process-cover.png") no-repeat;
      background-size: 100% 100%;
      margin: 0.73rem 0 0 1.45rem;
      position: relative;

      .progress-active{
        width: 100%;
        height: 0.48rem;
        border-radius: 0.2rem;
        background-image: linear-gradient(#fbf8da, #ffc092, #ffc092);
        transition-duration: 0.5s;
        transition-timing-function: linear;
        position: relative;
        top: 0.06rem;
        left: .1rem;

        .price-span{
          background: url("./assets/process-title.png") no-repeat;
          background-size: 100% 100%;
          width: 1.36rem;
          height: .52rem;
          margin-top: -.6rem;
          margin-right: -.6rem;
          text-align: center;
          color: #ffffff;
          overflow-x: scroll;
          white-space:nowrap;
          word-break:keep-all;
          font-size: .2rem;
          right: 0;
          position: absolute;
        }
      }
    }
  }
  .prize-area{
    position: absolute;
    width: 100%;
    height: 0.5rem;
    top: 17.7rem;
    display: flex;
    justify-content: flex-start;
    font-size: .2rem;
    font-weight: bold;
    text-align: center;

    .prize-title{
      height: 1rem;
      color: #faedd3;

      &:nth-child(1){
        margin-left: 1.2rem;
      }
      &:nth-child(2){
        margin-left: .68rem;
      }
      &:nth-child(3){
        margin-left: .7rem;
      }
      >div{
        margin-top: .05rem;
      }
      .no-Storge{
        background: url("./assets/noStorge.png") no-repeat;
        background-size: 100% 100%;
        width: 1.35rem;
        height: .37rem;
      }
      .have-Prize{
        background: url("./assets/havePrize.png") no-repeat;
        background-size: 100% 100%;
        width: 1.35rem;
        height: .37rem;
      }
      .no-Qualify{
        background: url("./assets/noQuality.png") no-repeat;
        background-size: 100% 100%;
        width: 1.35rem;
        height: .37rem;
      }
      .had-Prize{
        background: url("./assets/hadPrize.png") no-repeat;
        background-size: 100% 100%;
        width: 1.35rem;
        height: .37rem;
      }
    }
    .noprize-title{
      background: url("./assets/noprize-btn.png") no-repeat;
      background-size: 100% 100%;
      width: 1.35rem;
      height: .37rem;
    }
  }
  .show-area{
    position: absolute;
    width: 87%;
    height: 0.4rem;
    top: 18.8rem;
    left: 0.45rem;
    color: #fffbf4;
    font-size: 0.2rem;
    text-align: center;
  }
  .shop-btn{
    position: absolute;
    width: 6.24rem;
    height: 1rem;
    top: 19.22rem;
    left: .64rem;
  }
  .display-area{
    position: absolute;
    width: 7.15rem;
    height: 4.88rem;
    top: 21.15rem;
    left: 0.15rem;
    display: flex;
    flex-wrap: wrap;

    >div{
      width: 50%;
      height: 1.6rem;
    }
    .iconMem{
      background: url("./assets/joinMem.png") no-repeat;
      background-size: 100%;
      width: 1.17rem;
      height: .38rem;
      margin: .75rem auto 0;
    }
    .joined{
      background: url("./assets/joined.png") no-repeat;
      background-size: 100%;
      width: 1.17rem;
      height: .38rem;
      margin: .75rem auto 0;
    }
    .joinNow{
      //background: url("./assets/joinNow.png") no-repeat;
      background-size: 100%;
      width: 1.17rem;
      height: .38rem;
      margin: .75rem auto 0;
    }
    .saveMoney{
      //background: url("./assets/saveMoney.png") no-repeat;
      background-size: 100%;
      width: 1.17rem;
      height: .38rem;
      margin: 0.65rem auto 0;
    }
    .seeNow{
      //background: url("./assets/seeNow.png") no-repeat;
      background-size: 100%;
      width: 1.17rem;
      height: .38rem;
      margin: 1rem auto 0;
    }
    .openNow{
      //background: url("./assets/openNow.png") no-repeat;
      background-size: 100%;
      width: 1.17rem;
      height: .38rem;
      margin: .65rem auto 0;
    }
    .mask{
      background: rgba(0, 0, 0, 0.6);
      z-index: 999;

      >div{
        text-align: center;
        margin: 0.5rem auto 0;
        height: 1.1rem;
        color: #FFFFFF;
        font-size: 0.3rem;
        opacity: 0.8;
      }
    }
  }
  .sku-area{
    position: absolute;
    width: 6.77rem;
    height: 9.05rem;
    top: 27.35rem;
    left: 0.34rem;
    display: flex;
    flex-wrap: wrap;

    >div{
      width: 50%;
      height: 45%;
      display: flex;
      flex-wrap: wrap;
      /* padding-right: 0.13rem; */
      padding-top: 0.05rem;
      align-content: flex-start;

      img{
        width: 100%;
        height: 3.3rem;
      }
    }
    .sku-btn{
      background-size: 100%;
      width: 100%;
      height: 0.7rem;
      margin: 3.5rem auto 0;
    }
  }
  .bottom-area{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1rem;
    display: flex;
  }
  .check-btn{
    position: absolute;
    top: 13.28rem;
    left: 2.26rem;
  }
  .check-info{
    position: absolute;
    width: 2.7rem;
    height: 0.5rem;
    top: 13.28rem;
    left: 2.55rem;
  }
  .top-list {
    position: absolute;
    top: 15.65rem;
    left: 1.15rem;
    width: 5.2rem;
    height: 11.3rem;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    align-items: center;

    .list-item {
      width: 100%;
      height: .65rem;
      display: flex;
      justify-content: space-around;
      //background: url("./assets/item.png") no-repeat;
      background-size: 100%;
      color: #00af78;
      align-items: center;

      span {
        margin-left: -.5rem;
      }
    }
  }
  .rule-area{
    position: absolute;
    width: 86%;
    height: 2rem;
    top: 29rem;
    left: .6rem;
    color: #ffffff;
    font-size: .25rem;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .noMem-view{
    background: url("./assets/noMem.png") no-repeat;
    background-size: 100%;
    width: 5.39rem;
    height: 7.67rem;
    position: relative;

    .gotoOpen{
      width: 3.58rem;
      height: 0.8rem;
      position: absolute;
      top: 4.95rem;
      left: .9rem;
    }
    .close-btn{
      width: 0.55rem;
      height: 0.55rem;
      position: absolute;
      top: 6.65rem;
      left: 2.42rem;
    }
  }
  .rules-view{
    background: url("./assets/rule.png") no-repeat;
    background-size: 100%;
    width: 6.13rem;
    height: 8.17rem;
    position: relative;

    .ruleView-area{
      position: absolute;
      top: 1rem;
      left: 0.4rem;
      height: 5.7rem;
      width: 5.55rem;
      overflow: scroll;
      color: #faedd3;
      font-size: 0.23rem;
    }
    .close-btn{
      width: 0.65rem;
      height: 0.65rem;
      position: absolute;
      top: 7.55rem;
      left: 2.75rem;
    }
  }
  .myOrder-view{
    background: url("./assets/myOrder.png") no-repeat;
    background-size: 100%;
    width: 6.13rem;
    height: 8.17rem;
    position: relative;

    .myOrder-area{
      position: absolute;
      top: 1.8rem;
      left: 0.4rem;
      height: 4.75rem;
      width: 5.3rem;
      overflow: scroll;
      padding-right: .11rem;

      .myorder-item{
        display: flex;
        font-size: 0.28rem;
        color: #faedd3;
        align-items: center;
        text-align: center;
        justify-content: space-between;
      }
      .noorder-item{
        width: 100%;
        text-align: center;
        margin: 2rem auto;
        color: gray;
      }
    }
    .close-btn{
      width: 0.65rem;
      height: 0.65rem;
      position: absolute;
      top: 7.55rem;
      left: 2.75rem;
    }
  }
  .myPrize-view{
    background: url("./assets/prizeInfo.png") no-repeat;
    background-size: 100%;
    width: 6.13rem;
    height: 8.17rem;
    position: relative;

    .prize-alert{
      position: absolute;
      top: 1.8rem;
      font-size: 0.28rem;
      color: #faedd3;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
    .myPrizeView-area{
      position: absolute;
      top: 2.3rem;
      left: 0.4rem;
      height: 4.4rem;
      width: 5.3rem;
      overflow: scroll;

      .myprize-item{
        display: flex;
        font-size: 0.28rem;
        color: #faedd3;
        align-items: center;
        text-align: right;
        margin-bottom: .1rem;

        .add-btn{
          //background: url("./assets/fix-btn.png") no-repeat;
          background-size: 100%;
          width: 1rem;
          height: 0.3rem;
          margin: .1rem auto;
        }
        .change-info{
          //background: url("./assets/change-btn.png") no-repeat;
          background-size: 100%;
          width: 1rem;
          height: 0.3rem;
          margin: .1rem auto;
        }
      }
      .noprize-item{
        width: 100%;
        text-align: center;
        margin: 2rem auto;
        color: gray;
      }
    }
    .close-btn{
      width: 0.65rem;
      height: 0.65rem;
      position: absolute;
      top: 7.55rem;
      left: 2.75rem;
    }
  }
  .secret-view{
    //background: url("./assets/secret.png") no-repeat;
    background-size: 100%;
    width: 8.39rem;
    height: 9.5rem;
    position: relative;

    .secret-area{
      position: absolute;
      top: 3.2rem;
      left: 1.9rem;
      height: 4.6rem;
      width: 4.8rem;
      overflow: scroll;
      color: #24a978;
      font-size: 0.23rem;
    }
    .close-btn{
      width: 0.6rem;
      height: 0.6rem;
      position: absolute;
      top: 8.65rem;
      left: 3.89rem;
    }
  }
  .isOver-view{
    //background: url("./assets/no-lottery.png") no-repeat;
    background-size: 100%;
    width: 100%;
    height: 8.5rem;
    position: relative;

    .end-btn{
      width: 2.35rem;
      height: 0.7rem;
      position: absolute;
      top: 6.15rem;
      left: 2.5rem;
    }
    .close-btn{
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      top: 7.8rem;
      left: 3.53rem;
    }
  }
  .getLottery-view{
    background: url("./assets/wish.png") no-repeat;
    background-size: 100%;
    width: 6.13rem;
    height: 7.08rem;
    position: relative;

    .prize-img{
      width: 3.5rem;
      height: 3.5rem;
      position: absolute;
      top: 1.3rem;
      left: 1.3rem;
    }
    .prize-name{
      width: 5.5rem;
      height: .5rem;
      position: absolute;
      top: 5rem;
      left: .3rem;
      color: #faedd3;
      text-align: center;
    }
    .fix-btn{
      width: 4.1rem;
      height: 0.9rem;
      position: absolute;
      top: 5.65rem;
      left: 1rem;
    }
    .close-btn{
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      top: 6.6rem;
      left: 2.5rem;
    }
  }
  .fixInfo-view{
    background: url("./assets/fixInfo.png") no-repeat;
    background-size: 100%;
    width: 6.13rem;
    height: 6.68rem;
    position: relative;

    .submit-btn{
      width: 4.05rem;
      height: .91rem;
      position: absolute;
      top: 5.18rem;
      left: 1.03rem;
    }
    .close-btn{
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      top: 6.6rem;
      left: 2.5rem;
    }
    .address-formData {
      position: absolute;
      top: 1.42rem;
      left: 1.85rem;
      width: 3.8rem;
      text-align: end;
    }
    .address-formData input {
      width: 95%;
      height: 0.59rem;
      border: none;
      background: none;
      color: #e8d8b8;
      font-size: 0.2rem;
      padding: 0 0 0.21rem 0;
    }
    input::-webkit-input-placeholder {
      color: #e8d8b8;
    }
  }
  .upOK-view{
    //background: url("./assets/fixed.png") no-repeat;
    background-size: 100%;
    width: 8rem;
    height: 8.67rem;
    position: relative;

    .over-btn{
      width: 2.05rem;
      height: 0.7rem;
      position: absolute;
      top: 5.55rem;
      left: 2.65rem;
    }
    .close-btn{
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      top: 7.8rem;
      left: 3.54rem;
    }
  }
}
</style>
