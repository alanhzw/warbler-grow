<template>
  <div class="index-header">
    <img
      src="//img10.360buyimg.com/imgzone/jfs/t1/100578/36/17179/885284/6143fd2eE4d8e526b/e1bdfb3df5d96e05.png"
      class="index-banner"
    />
    <img
      src="//img10.360buyimg.com/imgzone/jfs/t1/141644/38/24060/4270/6143fd19E287370ff/8adaa6f1397b33e5.png"
      class="show-rule"
      @click="overlayRule = true"
    />
    <img
      src="//img10.360buyimg.com/imgzone/jfs/t1/200471/3/8833/4403/6143fd19E97c1a1ec/7710139b2ca36963.png"
      class="show-mygift"
      @click="getMyPrize"
    />
  </div>
  <div class="index">
    <div class="coupon">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/200867/9/17345/50587/61a081a1E8e27106f/a6bf78553be1d7a8.png"
      />
      <div
        class="coupon-button"
        @click="getPrize(preizeList[0].name, preizeList[0].type, preizeList[0].value)"
      ></div>
    </div>
    <img
      src="//img10.360buyimg.com/imgzone/jfs/t1/169081/19/25344/37566/61a081a1Ecef9109f/00c1d4d59a75e3e1.png"
      class="gift-list-title"
    />
    <div class="gift-list">
      <div class="gift-bolck" v-for="item,index in preizeList.slice(1)" :key="index">
        <img :src="item.showImage" class="gift-bolck-img" />
        <p class="gift-bolck-name">{{ item.name }}</p>
        <div class="gift-bolck-text">
          <span>{{ item.value }}积分</span>
          <span>剩余{{ item.totalRestNum }}份</span>
        </div>
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/66402/31/17256/4139/6143f69fEe07ea818/5da5ee56c052907e.png"
          v-if="item.buttonStatus === 0"
          class="gift-exchange"
          @click="getPrize(item.name, item.type, item.value)"
        />
        <img
          src="//img10.360buyimg.com/imgzone/jfs/t1/66402/31/17256/4139/6143f69fEe07ea818/5da5ee56c052907e.png"
          v-else
          class="gift-exchange filter-gray"
        />
      </div>
    </div>
    <div class="go-shop-page" @click="goPage">
      <img src="//img10.360buyimg.com/imgzone/jfs/t1/202082/34/16856/15870/61a08901Eb314fd69/b6c136990344550e.png"/>
    </div>
  </div>
  <!-- 规则弹窗 -->
  <van-popup v-model:show="overlayRule">
    <div class="rule">
      <div class="close-rule" @click="overlayRule = false"></div>
      <div v-html="rule" class="rule-text"></div>
    </div>
  </van-popup>
  <!-- 我的奖品弹窗 -->
  <van-popup v-model:show="overlayMyGift">
    <div class="mygift">
      <div class="close-mygift" @click="overlayMyGift = false"></div>
      <div class="mygift-list">
        <div class="mygift-list-gift" v-for="item,index in myGifts" :key="index">
          <img :src="item.showImage" class="mygift-img" />
          <div class="mygift-text">
            <p>{{ item.giftId }}</p>
            <p>{{ getLocalTime(item.createTime) }}</p>
          </div>
          <div class="mygift-button" v-if="item.giftType === 7" @click="changeAddress(index)">修改地址</div>
          <div class="mygift-button" style="background: none;color: #666;" v-else>已领取</div>
        </div>
        <div class="more">没有更多了...</div>
        <!-- <div class="mygift-empty">
          没有更多了...
        </div>-->
      </div>
    </div>
  </van-popup>
  <!-- 入会弹窗 -->
  <van-popup v-model:show="overlayOpenCard" :close-on-click-overlay="false">
    <div>
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/6989/17/9456/310120/612734f5E1f0c8379/f7e0fa689de76b95.png"
        class="open-card-img"
        @click="gotoOpenCard"
      />
    </div>
  </van-popup>
  <!-- 确认弹窗 -->
  <van-popup v-model:show="overlayConfirm">
    <div>
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/107723/14/19873/98633/614d8faaE0b007313/ae02fa0e68e3508e.png"
        class="confirm-img"
      />
      <div class="confirm-name">【{{ giftName }}】</div>
      <div class="confirm-integral">确认消耗{{ integral }}积分兑换</div>
      <div class="confirm-close" @click="overlayConfirm = false"></div>
      <div class="confirm-button" @click="getPrizeConfirm"></div>
    </div>
  </van-popup>
  <!-- 填写地址 -->
  <van-popup v-model:show="overlayAddress">
    <img
      src="//img10.360buyimg.com/imgzone/jfs/t1/196970/40/8856/79950/614451baEd4235d99/88d76f28c6891e8c.png"
      class="address-img"
    />
    <div class="address-formdata">
      <input type="text" :maxlength="10" v-model="formData.receiver" />
      <input
        type="text"
        :maxlength="11"
        v-model="formData.phone"
        oninput="value=value.replace(/[^\d]/g,'')"
      />
      <input type="text" :readonly="true" v-model="addressCode" @click="addressSelects = true" />
      <input type="text" v-model="formData.address" />
      <input
        type="text"
        :maxlength="6"
        v-model="formData.postalCode"
        oninput="value=value.replace(/[^\d]/g,'')"
      />
    </div>
    <div class="address-submit" @click="submitCheckOut"></div>
  </van-popup>
  <!-- 获奖弹窗 -->
  <van-popup v-model:show="overlayGift">
    <div>
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/184124/2/21258/138180/612734f5E3928d7d0/b1697bf06a1fb8aa.png"
        class="gift-img"
      />
      <div class="gift-name">恭喜您获得{{ giftName }}</div>
      <div class="close-gift" @click="overlayGift = false"></div>
    </div>
  </van-popup>
  <!--地址选择-->
  <van-popup v-model:show="addressSelects" position="bottom">
    <van-area title="请输入详细地址" :area-list="areaList" @confirm="confirmAddress" @cancel="onCancel" />
  </van-popup>
</template>

<script lang='ts' setup>
import {
  ref, inject, reactive, Ref,
} from 'vue';
import {
  Toast,
  Overlay as vanOverlay,
  Popup as vanPopup,
  Area as vanArea,
} from 'vant';
import { areaList } from '@vant/area-data';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import JD, { gotoShopPage } from '@/utils/platforms';
import './css/index.css';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const openCard: boolean = inject('isOpenCard') as boolean;

// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;

// 设置页面title
document.title = actName;

const overlayOpenCard = ref(false);
const overlayGift = ref(false);
const overlayRule = ref(false);
const overlayMyGift = ref(false);
const overlayConfirm = ref(false);
const overlayAddress = ref(false);
const addressSelects = ref(false);
const rule = ref('');
let finishInfo = 0;
const myGifts: Ref<{ showImage: string; giftId: string; createTime: string; giftType: number; }[]> = ref([]);
const integral = ref('');
const giftName = ref('');
let giftType = 0;
const giftList = reactive([]);
const formData = ref({
  activityId,
  pin,
  giftName: '',
  receiver: '',
  phone: '',
  address: '',
  postalCode: '',
  province: '',
  city: '',
  district: '',
});
const addressCode = ref('');
const preizeList: Ref<{ name: string; value: string; totalRestNum: number; buttonStatus: number; type: number; showImage: string; }[]> = ref([]);

const formDataEmpty = () => {
  formData.value = {
    activityId,
    pin,
    giftName: '',
    receiver: '',
    phone: '',
    address: '',
    postalCode: '',
    province: '',
    city: '',
    district: '',
  };
  addressCode.value = '';
};

const getLocalTime = (r: string) => {
  const year = String(new Date(r).getFullYear());
  const month = String(new Date(r).getMonth() + 1);
  const date = String(new Date(r).getDate());
  const hour = String(new Date(r).getHours());
  let minute = String(new Date(r).getMinutes());
  if (minute.length === 1) {
    minute = `0${minute}`;
  }
  return `${year}-${month}-${date} ${hour}:${minute}`;
};

// 主接口 获取规则;
const getActivityInfo = () => {
  if (!openCard) {
    overlayOpenCard.value = true;
  }
  cjwxRequest
    .get(`/common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`)
    .then((res) => {
      if (res.data) {
        const rules = res.data.rule.split('\n');
        rule.value = rules.join('<br/>');
      }
    });
};

const getFinishInfoResult = () => {
  cjwxRequest.post('/wx/sanyuan/redeem/finishInfoResult', {
    activityId,
    pin,
  }).then((res) => {
    if (res.result) {
      finishInfo = res.data;
      finishInfo = 1;
    }
  });
};

const getPrizeStatus = () => {
  cjwxRequest.post('/wx/sanyuan/redeem/prizeStatus', { activityId }).then((data) => {
    if (data.result) {
      preizeList.value = data.data;
    } else {
      Toast(data.errorMessage);
    }
  });
};

const getPrizeConfirm = () => {
  overlayConfirm.value = false;
  Toast.loading({ forbidClick: true });
  cjwxRequest.post('/wx/sanyuan/redeem/getPrize', {
    activityId,
    pin,
    giftName: giftName.value,
  }).then((res) => {
    Toast.clear();
    if (res.result) {
      if (giftType === 7) {
        formDataEmpty();
        formData.value.giftName = giftName.value;
        overlayAddress.value = true;
        Toast('兑换成功，请填写地址');
      } else {
        overlayGift.value = true;
      }
      overlayConfirm.value = false;
    } else {
      Toast(res.errorMessage);
    }
  });
};

const getPrize = (getGiftName: string, type: number, needIntegral: string) => {
  if (openCard) {
    if (finishInfo === 1) {
      giftName.value = getGiftName;
      giftType = type;
      integral.value = needIntegral;
      overlayConfirm.value = true;
    } else {
      Toast('请完善信息');
      setTimeout(() => {
        window.location.href = `https://${window.location.host}/sanyuan/common/saveUserInfo?activityId=${activityId}`;
      }, 2000);
    }
  } else {
    overlayOpenCard.value = true;
  }
};

const getMyPrize = () => {
  overlayMyGift.value = true;
  Toast.loading({ forbidClick: true });
  cjwxRequest.post('/wx/sanyuan/redeem/myPrize', {
    activityId,
    pin,
  }).then((data) => {
    Toast.clear();
    if (data.result) {
      myGifts.value = data.data;
    } else {
      Toast(data.errorMessage);
    }
  });
};

const changeAddress = (index: number) => {
  formDataEmpty();
  formData.value.giftName = (myGifts as any).value[index].giftId;
  Toast.loading({ forbidClick: true });
  cjwxRequest.post('/wx/sanyuan/redeem/getAddressInfo', {
    activityId,
    pin,
    giftName: formData.value.giftName,
  }).then((data) => {
    Toast.clear();
    if (data.result) {
      if (data.data !== []) {
        formData.value.receiver = data.data[0].receiver;
        formData.value.phone = data.data[0].phone;
        formData.value.province = data.data[0].province;
        formData.value.city = data.data[0].city;
        formData.value.district = data.data[0].district;
        formData.value.address = data.data[0].address;
        formData.value.postalCode = data.data[0].postalCode;
        addressCode.value = `${data.data[0].province}/${data.data[0].city}/${data.data[0].district}`;
      }
    }
  });
  overlayMyGift.value = false;
  overlayAddress.value = true;
};

const gotoOpenCard = () => {
  const returnUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000123965&shopId=1000123965&venderType=1&channel=7006&returnUrl=${returnUrl}`;
};

const goPage = () => {
  gotoShopPage(venderId);
};

const submitAddress = () => {
  Toast.loading({ message: '提交中', forbidClick: true });
  setTimeout(() => {
    cjwxRequest
      .post('/wx/sanyuan/redeem/insertPrizeInfo', formData.value)
      .then((res) => {
        Toast.clear();
        if (res.result) {
          overlayAddress.value = false;
          Toast('提交成功');
        } else {
          Toast(res.errorMessage);
        }
      });
  }, 1000);
};

const submitCheckOut = () => {
  const regu = /[^\u4e00-\u9fa5a-zA-Z\d,.，。（）() - - ! ！? ？]+/;
  const reg = /^\d{11}$/;
  const re = new RegExp(regu);
  if (!formData.value.receiver) {
    Toast('请输入姓名');
  } else if (re.test(formData.value.receiver)) {
    Toast('姓名不可以存在特殊字符');
  } else if (!/^1[3456789]\d{9}$/.test(formData.value.phone)) {
    Toast('请填写正确的手机号码');
  } else if (addressCode.value === '') {
    Toast('请选择地区');
  } else if (!formData.value.address) {
    Toast('请填写详细地址');
  } else if (!/^\d{6}$/.test(formData.value.postalCode)) {
    Toast('请填写正确的邮编');
  } else {
    submitAddress();
  }
};

interface AddressItem {
  name: string;
}
// 地址确认三级联动地址
const confirmAddress = (addressItemList: AddressItem[]) => {
  formData.value.province = addressItemList[0].name;
  formData.value.city = addressItemList[1].name;
  formData.value.district = addressItemList[2].name;
  addressCode.value = addressItemList.map((item) => item.name).join('/');
  addressSelects.value = false;
};

const onCancel = () => {
  addressSelects.value = false;
};

getActivityInfo();
getFinishInfoResult();
getPrizeStatus();
</script>

<style lang="scss">
</style>
