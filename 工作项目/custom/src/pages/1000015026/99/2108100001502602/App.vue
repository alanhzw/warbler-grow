<template>
  <div v-if="!isOrder"
       class="home-page">
    <div class="rule"
         v-html="rule"></div>

    <!-- 领取状态 -->
    <div v-if="status === '0'">
      <div class="noMatch"></div>
    </div>
    <div v-else-if="status === '1'">
      <div class="fillAddress"
           @click="goAddress()"
           v-if="Number(orderCount) > 0"></div>
      <div class="goApply"
           @click="goApply"
           v-else></div>
    </div>
    <div v-else-if="status === '2'">
      <div class="alreadyApply"></div>
    </div>
    <div v-else-if="status === '3'">
      <div class="alreadyGot"></div>
    </div>

    <div class="skuList">
      <div v-for="(it, index) in skuList"
           class="goodsList"
           @click="gotoSku(it.skuid)"
           :key="index">
        <div class="imgList">
          <img :src="it.img" />
        </div>
        <div class="goodsContent">
          <img :src="it.name" />
        </div>
      </div>
    </div>
    <div class="enterShop"
         @click="gotoShop()"></div>

    <!--入会-->
    <van-overlay :show="isMembership">
      <div class="Membership">
        <div class="join"
             @click="gotoOpenCard()"></div>
      </div>
    </van-overlay>

    <!--提交物流-->
    <van-overlay :show="isLogistics">
      <div class="Submit">
        <div class="unknow"
             @click="unknow"></div>
      </div>
    </van-overlay>

    <!--不符合条件-->
    <van-overlay :show="isMatch">
      <div class="isNomatch">
        <div class="rules"
             @click="goHome"></div>
        <div class="noMatchs"></div>
        <div class="matchShop"></div>
        <div class="cryingFace"></div>
        <div class="hotGoods"></div>
        <div class="skuLists">
          <div v-for="(it, index) in skuList"
               class="goodsLists"
               @click="gotoSku(it.skuid)"
               :key="index">
            <div class="imgLists">
              <img :src="it.img" />
            </div>
            <div class="goodsContents">
              <img :src="it.name" />
            </div>
          </div>
        </div>
        <div class="enterShops"
             @click="gotoShop()"></div>
      </div>
    </van-overlay>

    <div class="whiteAddressWrap"
         v-show="isAddress">
      <div class="whiteAddress">
        <div class="ruless"
             @click="goHome"></div>
        <div class="input-view">
          <!--姓名-->
          <div class="contacts"></div>
          <input class="input-formats"
                 v-model="formData.name"
                 maxlength="12"
                 placeholder="请输入姓名" />
          <!--手机号-->
          <div class="number"></div>
          <input class="input-formats"
                 type="tel"
                 maxlength="11"
                 v-model="formData.tel"
                 placeholder="请输入手机号" />
          <!--收货地址-->
          <div class="receivingAddress"></div>
          <input class="input-formats"
                 v-model="address"
                 @click="addressSelects = true"
                 placeholder="请选择"
                 readonly />
          <!--详细地址-->
          <div class="detailedAddress"></div>
          <input class="input-formats"
                 v-model="formData.detailAddress"
                 maxlength="24"
                 placeholder="请输入详细地址" />
          <!--填写品牌-->
          <div class="brandAddress"></div>
          <input class="input-formats"
                 v-model="brand"
                 maxlength="50"
                 placeholder="请输入宝宝曾经喝过的奶粉品牌" />
          <!--选择礼品-->
          <div class="changeGift"></div>
          <input class="input-formats"
                 v-model="giftName"
                 @click="giftSelects = true"
                 placeholder="请选择"
                 readonly />
        </div>

        <div class="click-view"
             @click="submitCheckOuts()"></div>
        <!--地址选择-->
        <van-popup v-model:show="addressSelects"
                   position="bottom"
                   :style="{ height: '40%' }">
          <van-area title="请输入详细地址"
                    :area-list="areaList"
                    @confirm="confirmAddress"
                    @cancel="onCancel" />
        </van-popup>
        <!--礼品选择-->
        <van-popup v-model:show="giftSelects"
                   position="bottom"
                   :style="{ height: '40%' }">
          <van-picker title="请选择礼品"
                      show-toolbar
                      :columns="giftList.values"
                      @confirm="confirmGift"
                      @cancel="onCancel" />
        </van-popup>
      </div>
    </div>

    <!--完善信息-->
    <van-overlay :show="isYbExcess">
      <div class="wrapper">
        <div class="yb-excess">
          <div style="
            width: 1rem;
            height: 1rem;
            position: absolute;
            top: 0rem;
            right: 0;
          "
               @click="closeYb"></div>
          <div class="info-view">
            <!-- 姓名 -->
            <input class="input-format"
                   v-model="name"
                   maxlength="10"
                   style="margin-top: -0.7rem"
                   placeholder="您的姓名" />
            <!-- 手机号 -->
            <input class="input-format"
                   v-model="phone"
                   maxlength="11"
                   placeholder="您的手机号" />
            <!-- 验证码 -->
            <!-- <input class="input-format" v-model="code" placeholder="您的验证码" />
          <div class="code-btn">
            <div
              style="margin: 0.05rem 0.05rem 0 0; font-size: 0.2rem"
              v-if="isVerifyStatusLoading"
            >
              {{ timeText }}s后重试
            </div> -->
            <!-- getVerifyCode -->
            <!-- <div @click="getVerifyCode" v-else class="verify-text">获取验证码</div>
          </div> -->
            <!-- 客户状态 -->
            <div class="de-form"
                 style="margin-top: 0.6rem"
                 @click="stateSelect = true">
              {{ ustate }}
            </div>
            <!-- 日期 -->
            <div class="de-form"
                 style="margin-top: 0.4rem"
                 @click="dateSelect = true">
              {{ udate }}
            </div>
            <!-- 地区 -->
            <div class="de-form"
                 style="margin-top: 0.3rem"
                 @click="addressSelect = true">
              {{ address }}
            </div>
            <!-- 提交 -->
            <div class="info-commit"
                 @click="submitCheckOut()"></div>
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- <span class="hover-icon"
          style="right:0rem;top:6rem;width:1rem;height:1rem;background-image:url('//img10.360buyimg.com/imgzone/jfs/t1/170883/38/22251/702022/61725979E901bb604/6ed4c4c9f8589c27.gif')"
          @click="tracking"></span> -->
    <!--地址选择-->
    <van-popup v-model:show="addressSelect"
               position="bottom"
               :style="{ height: '40%' }">
      <van-area title="请选择"
                :area-list="areaList"
                @confirm="confirmAddress"
                @cancel="onCancel" />
    </van-popup>
    <!--日期类型-->
    <van-popup v-model:show="dateSelect"
               position="bottom"
               :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDate"
                           type="date"
                           title="选择年月日"
                           :min-date="minDate"
                           :max-date="maxDate"
                           @confirm="confirmDate"
                           @cancel="onCancel" />
    </van-popup>
    <!--状态-->
    <van-popup v-model:show="stateSelect"
               position="bottom"
               :style="{ height: '40%' }">
      <van-picker title="状态"
                  show-toolbar
                  :columns="ustateList"
                  @confirm="confirmState"
                  @cancel="onCancel" />
    </van-popup>
  </div>

  <!-- 下单 -->
  <div class="placeOrder"
       v-if="isOrder">
    <div class="rulee"
         @click="goHome"></div>
    <div class='banner'>
      <img src="./assets/banner.png"
           alt="">
    </div>
    <div class="orderBtn"
         @click="goOrder()"></div>
  </div>

</template>

<script lang='ts' setup>
import {
  ref, inject, reactive, onMounted,
} from 'vue';
// import Vue from 'vue';
import {
  Toast,
  Overlay as vanOverlay,
  Popup as vanPopup,
  Area as vanArea,
  DatetimePicker as vanDatetimePicker,
  Picker as vanPicker,
  AddressList,
} from 'vant';
import { areaList } from '@vant/area-data';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import './css/index.css';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const openCard: boolean = inject('isOpenCard') as boolean;

// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;
function tracking() {
  window.location.href = 'https://lzkj-isv.isvjcloud.com/wxAssemblePage/largeSign';
}
// 设置页面title
document.title = actName;

let giftId = '';
const rule = ref('');
const giftList = reactive([]);
const giftName = ref('请选择');
const brand = ref('');
const orderCount = ref('');
const status = ref('0');
const isAddress = ref(false);
const isLogistics = ref(false);
const isMembership = ref(false);
const isMatch = ref(false);
const isOrder = ref(false);
const isYbExcess = ref(false);
const addressSelect = ref(false);
const addressSelects = ref(false);
const stateSelect = ref(false);
const dateSelect = ref(false);
const giftSelects = ref(false);
const isVerifyStatusLoading = ref(false);
const formData = reactive({
  name: '',
  tel: '',
  addressCode: '', // 区地址编码
  detailAddress: '', // 详细地址
});
const address = ref('请选择');
const vanAdress = {
  province: '',
  city: '',
  area: '',
};
const name = ref('');
const udate = ref('请输入');
const phone = ref('');
const code = ref('');
const ustateList = ['孕期', '已有宝宝'];
const ustate = ref('请输入');
const minDate = new Date(2000, 1, 1);
const maxDate = new Date(2050, 12, 31);
const currentDate = new Date();
const countdownStartTime = ref(60);
const timeText = ref(60);
const skuList = reactive([
  {
    img: '//img10.360buyimg.com/imgzone/jfs/t1/182246/11/13124/25602/60e54c52E38a45ae9/7c4d79bfb3d40e52.png',
    name: '//img10.360buyimg.com/imgzone/jfs/t1/186078/24/13172/2055/60e54c52E6b916c49/1f7eeaf2e676902f.png',
    skuid: '1950744',
  },
  {
    img: '//img10.360buyimg.com/imgzone/jfs/t1/175092/11/18712/26347/60e54c52Eccf1b121/7a8d52a5409fa9da.png',
    name: '//img10.360buyimg.com/imgzone/jfs/t1/179353/4/12848/2071/60e54c52Ec974ff45/c78838374f2040a1.png',
    skuid: '1950749',
  },
  {
    img: '//img10.360buyimg.com/imgzone/jfs/t1/196285/7/12112/26442/60e54c52E8ed6d457/2f841403475a6046.png',
    name: '//img10.360buyimg.com/imgzone/jfs/t1/36698/32/15335/2037/60e54c52E93cb32ab/97aea6d10942bb66.png',
    skuid: '4548245',
  },
  {
    img: '//img10.360buyimg.com/imgzone/jfs/t1/194452/35/11177/25988/60e54c52E12cc6275/a8391f21ca75bc40.png',
    name: '//img10.360buyimg.com/imgzone/jfs/t1/194859/24/11919/2334/60e54c52Efbf73a1b/1a14b6f1c5a06a6b.png',
    skuid: '100009652703',
  },
]);

// 主接口 获取活动信息;
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

// 打开填写地址弹窗
const goAddress = () => {
  isAddress.value = true;
};
// 关闭信息提交弹窗
const unknow = () => {
  isLogistics.value = false;
};
// 关闭不符合条件
const goHome = () => {
  isMatch.value = false;
  isAddress.value = false;
  isOrder.value = false;
  document.body.scrollTop = 400;
};

// interface contentItem {
//   text: string,
//   key: string,
// }
const getStatus = () => {
  cjwxRequest
    .post('/a2Cross/deliveryPackage/activityContent', {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
    })
    .then((data) => {
      if (data.result) {
        status.value = String(data.data.status);
        orderCount.value = String(data.data.orderCount);
        // eslint-disable-next-line array-callback-return
        giftList.values = data.data.list.map(
          (item: { name: string; giftId: string }) => ({
            text: item.name,
            key: item.giftId,
          }),
        );
        giftName.value = data.data.list[0].name;
        giftId = data.data.list[0].giftId;
        console.log(giftList.values);
        if (status.value === '0') {
          isMatch.value = true;
        } else if (status.value === '1' && orderCount.value === '0') {
          isOrder.value = true;
        } else if (Number(orderCount.value) > 0) {
          isOrder.value = false;
        }
      } else {
        Toast(data.errorMessage);
      }
    });
};

const submitApplys = () => {
  Toast.loading({ message: '提交中', forbidClick: true });
  cjwxRequest
    .post('/a2Cross/deliveryPackage/receivePrize', {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
      phone: formData.tel,
      receiver: formData.name, // 姓名
      province: vanAdress.province,
      city: vanAdress.city,
      area: vanAdress.area,
      address: formData.detailAddress ? formData.detailAddress : '', // 详细地址
      giftId,
      boughtBrand: brand.value,
    })
    .then((data) => {
      if (data.result) {
        setTimeout(() => {
          Toast.clear();
          isAddress.value = false;
          isLogistics.value = true;
        }, 300);
        getStatus();
      } else {
        Toast.clear();
        Toast(data.errorMessage);
      }
    });
};

const submitApply = () => {
  Toast.loading({ message: '提交中', forbidClick: true });
  cjwxRequest
    .post('/a2Cross/savePer', {
      venderId: baseInfo.venderId,
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
      phone: phone.value,
      name: name.value,
      status: ustate.value,
      babyBirthday: udate.value,
      province: vanAdress.province,
      city: vanAdress.city,
      county: vanAdress.area,
      address: address.value,
      // code: code.value,
    })
    .then((data) => {
      Toast.clear();
      if (data.result) {
        getStatus();
        Toast('填写信息成功!');
        isYbExcess.value = false;
      } else {
        Toast(data.errorMessage);
      }
    });
};

const pageTrackLogCommon = (elementId: string) => {
  cjwxRequest.post('/crm/pageVisit/insertCrmPageVisit', {
    venderId: baseInfo.venderId,
    elementId,
    pageId: baseInfo.activityId,
    pin: baseInfo.pin,
  });
};

// 填写地址校验
const submitCheckOuts = () => {
  const regu = /[^\u4e00-\u9fa5a-zA-Z\d,.，。（）() - - ! ！? ？]+/;
  const re = new RegExp(regu);
  const reg2 = /\s/;
  if (!formData.name) {
    Toast('请输入姓名');
  } else if (re.test(formData.name)) {
    Toast('姓名不可以存在特殊字符');
  } else if (!formData.addressCode) {
    Toast('请选择省市区');
  } else if (!formData.detailAddress) {
    Toast('请输入详细地址');
  } else if (!brand.value) {
    Toast('请输入宝宝曾经喝过的奶粉品牌');
  } else if (giftName.value === '请选择') {
    Toast('请选择礼品');
  } else {
    submitApplys();
  }
};

// 信息验证
const submitCheckOut = () => {
  const regu = /[^\u4e00-\u9fa5a-zA-Z\d,.，。（）() - - ! ！? ？]+/;
  const re = new RegExp(regu);
  if (!name.value) {
    Toast('请输入姓名');
  } else if (re.test(name.value)) {
    Toast('姓名不可以存在特殊字符');
  } else if (ustate.value === '请输入') {
    Toast('请选择状态');
  } else if (udate.value === '请输入') {
    Toast('请选择日期');
  } else if (address.value === '请输入') {
    Toast('请选择地区');
  } else {
    submitApply();
  }
};

interface AddressItem {
  name: string;
}

// 地址确认三级联动地址
const confirmAddress = (addressItemList: AddressItem[]) => {
  address.value = addressItemList.map((item) => item.name).join(' ');
  vanAdress.province = addressItemList[0].name;
  vanAdress.city = addressItemList[1].name;
  vanAdress.area = addressItemList[2].name;
  formData.addressCode = addressItemList[2].name;
  addressSelect.value = false;
  addressSelects.value = false;
};

const confirmGift = (gift: { text: string; key: string }) => {
  giftName.value = gift.text;
  giftId = gift.key;
  giftSelects.value = false;
};

const confirmState = (ustateItem: string) => {
  ustate.value = ustateItem;
  stateSelect.value = false;
};

const confirmDate = (udateItem: Date) => {
  const year = String(udateItem.getFullYear());
  let month = String(udateItem.getMonth() + 1);
  let strDate = String(udateItem.getDate());
  if (month.length === 1) {
    month = `0${month}`;
  }
  if (strDate.length === 1) {
    strDate = `0${strDate}`;
  }
  udate.value = `${year}-${month}-${strDate}`;
  dateSelect.value = false;
};

// 去申领
const goApply = () => {
  isOrder.value = true;
};

const closeYb = () => {
  isYbExcess.value = false;
  name.value = '';
  ustate.value = '请输入';
  udate.value = '请输入';
  address.value = '请输入';
  phone.value = '';
  code.value = '';
};

const onCancel = () => {
  stateSelect.value = false;
  dateSelect.value = false;
  addressSelect.value = false;
  addressSelects.value = false;
  giftSelects.value = false;
};

let timer: any = null;
let tik = 60;

// 倒计时
const countDown = () => {
  isVerifyStatusLoading.value = true;
  timer = setInterval(() => {
    tik -= 1;
    if (tik <= 0) {
      clearInterval(timer);
      timer = null;
      isVerifyStatusLoading.value = false;
      tik = 60;
    }
    timeText.value = tik;
    console.log(timeText.value);
  }, 1000);
};

// 获取验证码btn
// eslint-disable-next-line consistent-return
const getVerifyCode = () => {
  Toast.loading({ message: '获取验证码', forbidClick: true });
  cjwxRequest
    .post('/common/pointRedeem/sendIdentifyCode', {
      venderId: baseInfo.venderId,
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
      phone: phone.value,
      brand: 'a2Cross',
      content:
        '【a2海外京东自营旗舰店】您的验证码是#验证码#。有效期30分钟，请正确填写个人信息，以及时参加活动',
    })
    .then((data) => {
      if (data.isOk) {
        Toast.clear();
        isVerifyStatusLoading.value = true;
        countDown();
      } else {
        Toast.clear();
        isVerifyStatusLoading.value = true;
        countDown();
        Toast(data.msg);
      }
    });
};

const orderCourtesy = () => {
  cjwxRequest
    .post('/a2Cross/orderCourtesy', {
      activityId: baseInfo.activityId,
      pin: baseInfo.pin,
    })
    .then((data) => {
      if (data.result) {
        if (!data.data.opFg) {
          isMembership.value = true;
        } else if (!data.data.perFg) {
          isYbExcess.value = true;
        } else {
          getStatus();
        }
      }
    });
};
const goOrder = () => {
  pageTrackLogCommon('gotoShop');
  window.location.href = 'https://shop.m.jd.com/?shopId=1000015026';
};
const gotoSku = (skuId: string) => {
  pageTrackLogCommon(skuId);
  window.location.href = `https://item.m.jd.com/product/${skuId}.html`;
};
const gotoShop = () => {
  pageTrackLogCommon('gotoShop');
  window.location.href = 'https://shop.m.jd.com/?shopId=1000015026';
};
// 开卡链接
const gotoOpenCard = () => {
  pageTrackLogCommon('openCard');
  const returnUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000015026&shopId=1000015026&venderType=1&channel=7015&returnUrl=${returnUrl}`;
};

orderCourtesy();
getActivityInfo();
// onMounted(() => {

// });
</script>

<style lang='scss'>
.hover-icon {
  position: fixed;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.home-page{
  background: url(./assets/appBg.png) #967ccd no-repeat;
  background-size: 100%;
  height: 32.35rem;
  position: relative;

}
.placeOrder {
  background: url(./assets/placeOrderBg.png) #967ccd no-repeat;
  background-size: 100%;
  width: 7.5rem;
  height: 14rem;
  position: absolute;
  z-index: 4;
  top: 0rem;
  overflow-y: auto;
}
.whiteAddress {
  background: url(./assets/whiteAddressBg.png) no-repeat;
  background-size: 100% 100%;
  width: 7.5rem;
  /*height: 100vh;*/
  height: 16.96rem;
  position: relative;
}
</style>
