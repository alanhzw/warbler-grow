<template>
<div class="main-kv">
<!--  规则-->
  <div class="rule-btn" @click="openDialog('ruleState')"></div>
<!--  礼品-->
  <div class="prize-btn" @click="openDialog('prizeState')"></div>
<!--  立即验证-->
  <div v-if="isOpenCarded">
    <div v-if="userInfo.isWin">
      <div v-if="checked" class="main-btn" @click="lottery"></div>
      <div v-else class="main-btn" @click="secretAlert"></div>
    </div>
    <div v-else>
      <div v-if="checked" class="main-btn" @click="noTopAlert"></div>
      <div v-else class="main-btn" @click="secretAlert"></div>
    </div>
  </div>
  <div v-else class="main-btn" @click="openDialog('noMem')"></div>
<!--  同意条款-->
  <Checkbox v-model="checked" shape="square" icon-size=".25rem" class="check-btn"></Checkbox>
<!--  条款展示-->
  <div class="check-info" @click="openDialog('secretState')"></div>
<!--  榜单展示-->
  <div class="top-list">
    <div class="list-item" v-for="item in winningList" :key="item.ranking">
      <span style="width: .5rem;text-align: start;">{{item.ranking}}</span>
      <span style="width: 2rem;text-align: center;margin-right: .1rem;">{{item.nickName}}</span>
    </div>
  </div>
<!--  规则区域-->
  <div class="rule-area">
    <div style="padding-bottom: .5rem;" v-html="rule"></div>
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
        <div class="myPrizeView-area">
          <div v-if="userInfo.isApply" class="myprize-item">
            <div style="width: 1.9rem;">{{userInfo.winTime}}</div>
            <div style="width: 1.2rem;">环球门票</div>
            <div>
              <div v-if="userInfo.isPerfect" class="change-info" @click="gotoFix"></div>
              <div v-else class="add-btn" @click="gotoFix"></div>
            </div>
          </div>
          <div v-else class="noprize-item">暂无中奖记录</div>
        </div>
        <div class="close-btn" @click="closeDialog('prizeState')"></div>
      </div>
    </div>
  </Overlay>
<!--  隐私条款弹窗-->
  <Popup class="overlay" v-model:show="secretShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="secret-view">
        <div class="secret-area">
          <div style="padding-right: .11rem" v-html="secretRule"></div>
        </div>
        <div class="close-btn" @click="closeDialog('secretState')"></div>
      </div>
    </div>
  </Popup>
<!--  未中奖弹窗-->
  <Overlay class="overlay" v-model:show="isOverShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="isOver-view">
        <div class="end-btn" @click="closeDialog('isOver')"></div>
        <div class="close-btn" @click="closeDialog('isOver')"></div>
      </div>
    </div>
  </Overlay>
<!--  已中奖弹窗-->
  <Overlay class="overlay" v-model:show="getLotteryShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="getLottery-view">
        <div class="fix-btn" @click="closeDialog('getLottery');openDialog('userFix')"></div>
        <div class="close-btn" @click="closeDialog('getLottery')"></div>
      </div>
    </div>
  </Overlay>
<!--  提交成功弹窗-->
  <Overlay class="overlay" v-model:show="upOKShow" :close-on-click-overlay="false">
    <div class="wrapper">
      <div class="upOK-view">
        <div class="over-btn" @click="closeDialog('upOK')"></div>
        <div class="close-btn" @click="closeDialog('upOK')"></div>
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
          style="width: 82%"
        />
        <input
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
        />
        </div>
        <div class="submit-btn" @click="submitCheckOut"></div>
        <div class="close-btn" @click="closeDialog('userFix')"></div>
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
import { ref, inject } from 'vue';
import {
  Popup, Toast, Overlay, Checkbox, Area,
} from 'vant';
import { areaList } from '@vant/area-data';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { secretRule } from './assets/secretMessage';

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
// 是否同意
const checked = ref(false);
// 规则
const rule = ref('');
// 是否开卡表示是否注册
const isOpenCarded: boolean = inject('isOpenCard') as boolean;
// const isOpenCarded = false;
// 开卡弹窗
const noMemberShow = ref(false);
// 规则弹窗
const rulesShow = ref(false);
// 奖品弹窗
const myPrizeShow = ref(false);
// 隐私条款弹窗
const secretShow = ref(false);
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
// 提交信息成功弹窗
const upOKShow = ref(false);
// 获取活动id
const activityId = ref<string>(baseInfo.activityId);
// 用户Pin
const userPin = ref<string>(baseInfo.pin);
// 用户信息
const userInfo = ref({});
// 榜单
const winningList = ref([]);
/*--------------------------------------------------------------------------------------------*/
// 开启弹窗
const openDialog = (status: string) => {
  if (status === 'noMem') {
    noMemberShow.value = true;
  } else if (status === 'ruleState') {
    rulesShow.value = true;
  } else if (status === 'prizeState') {
    myPrizeShow.value = true;
  } else if (status === 'getLottery') {
    getLotteryShow.value = true;
  } else if (status === 'userFix') {
    fixInfoShow.value = true;
  } else if (status === 'upOK') {
    upOKShow.value = true;
  } else if (status === 'isOver') {
    isOverShow.value = true;
  } else if (status === 'secretState') {
    secretShow.value = true;
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
  } else if (status === 'getLottery') {
    getLotteryShow.value = false;
  } else if (status === 'userFix') {
    fixInfoShow.value = false;
  } else if (status === 'upOK') {
    upOKShow.value = false;
  } else if (status === 'isOver') {
    isOverShow.value = false;
  } else if (status === 'secretState') {
    secretShow.value = false;
  }
};
/*--------------------------------------------------------------------------------------------*/
// 已领奖去完善信息
const gotoFix = () => {
  closeDialog('prizeState');
  openDialog('userFix');
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
const noTopAlert = () => {
  openDialog('isOver');
  // eslint-disable-next-line no-use-before-define
  activityContent();
};
const secretAlert = () => {
  Toast('请先勾选隐私声明');
};
// 开卡判断
const openCardStatus = () => {
  if (!isOpenCarded) {
    openDialog('noMem');
  }
};
// 去开卡
const gotoCard = () => {
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000014803&shopId=1000014803&venderType=5&channel=7090&returnUrl=${window.location.href}`;
};
// 获取获奖名单及用户状态
const activityContent = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/mengniu/topN/getActivityContent', {
    activityId: activityId.value,
    pin: userPin.value,
  }).then((res) => {
    if (res.result) {
      userInfo.value = res.data;
      winningList.value = res.data.winningList;
      if (res.data.isPerfect) {
        formData.value.address = res.data.giftAddress.address;
        formData.value.city = res.data.giftAddress.city;
        formData.value.district = res.data.giftAddress.district;
        formData.value.personalID = res.data.giftAddress.giftRecordId;
        formData.value.phone = res.data.giftAddress.phone;
        formData.value.postalCode = res.data.giftAddress.postalCode;
        formData.value.province = res.data.giftAddress.province;
        formData.value.receiver = res.data.giftAddress.receiver;
        addressCode.value = `${res.data.giftAddress.province}/${res.data.giftAddress.city}/${res.data.giftAddress.district}`;
      }
      // console.log(userInfo.value);
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 抽奖
const lottery = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/mengniu/topN/convertPrize', {
    activityId: activityId.value,
    pin: userPin.value,
  }).then((res) => {
    console.log(res);
    if (res.result) {
      activityContent();
      openDialog('getLottery');
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 提交用户信息
const recordInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/mengniu/topN/recordReciverInfo', {
    activityId: activityId.value,
    pin: userPin.value,
    province: formData.value.province,
    city: formData.value.city,
    district: formData.value.district,
    receiver: formData.value.receiver,
    phone: formData.value.phone,
    address: formData.value.address,
    giftRecordId: formData.value.personalID,
    postalCode: formData.value.postalCode,
  }).then((res) => {
    if (res.result) {
      closeDialog('userFix');
      formDataEmpty();
      openDialog('upOK');
      activityContent();
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
    Toast('街道门牌号不能为空');
  } else if (faceWord.test(formData.value.address)) {
    Toast('街道门牌号不能包含表情符号');
  } else if (whitespace.test(formData.value.address)) {
    Toast('街道门牌号不能包含空格');
  } else if (!(/^\d{6}$/.test(formData.value.postalCode))) {
    Toast('请输入正确邮编');
  } else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(formData.value.personalID))) {
    Toast('请输入有效身份证号');
  } else {
    recordInfo();
  }
};
// 获取活动信息;
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
getActivityInfo();
activityContent();
openCardStatus();
</script>

<style lang='scss'>
html {
  max-width: 750px;
  margin: 0 auto;
  background: #0b2988;
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
  background: url("./assets/main.png") no-repeat;
  background-size: cover;
  height: 33rem;

  .main-btn{
    position: absolute;
    background: url("./assets/main-btn.png") no-repeat;
    background-size: 100%;
    width: 3.6rem;
    height: 1.35rem;
    top: 11.8rem;
    left: 2rem;
  }
  .rule-btn{
    position: absolute;
    width: 1.4rem;
    height: 0.5rem;
    top: .55rem;
    right: 0;
  }
  .prize-btn{
    position: absolute;
    width: 1.4rem;
    height: 0.5rem;
    top: 1.34rem;
    right: 0;
  }
  .van-checkbox__icon{
    background-color: #0b2988;
  }
  .van-checkbox__icon--checked .van-icon{
    background-color: #0b2988;
  }
  .van-checkbox__label{
    color: #FFFFFF;
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
  .top-list{
    position: absolute;
    top: 15.65rem;
    left: 1.15rem;
    width: 5.2rem;
    height: 11.3rem;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    align-items: center;

    .list-item{
      width: 100%;
      height: .65rem;
      display: flex;
      justify-content: space-around;
      background: url("./assets/item.png") no-repeat;
      background-size: 100%;
      color: #00af78;
      align-items: center;

      span{
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
      width: 2.3rem;
      height: 0.7rem;
      position: absolute;
      top: 4.9rem;
      left: 1.5rem;
    }
    .close-btn{
      width: 0.5rem;
      height: 0.5rem;
      position: absolute;
      top: 6.53rem;
      left: 2.44rem;
    }
  }
  .rules-view{
    background: url("./assets/rules.png") no-repeat;
    background-size: 100%;
    width: 5.39rem;
    height: 7.67rem;
    position: relative;

    .ruleView-area{
      position: absolute;
      top: 1.3rem;
      left: 0.5rem;
      height: 4.6rem;
      width: 4.6rem;
      overflow: scroll;
      color: #24a978;
      font-size: 0.23rem;
    }
    .close-btn{
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      top: 6.6rem;
      left: 2.5rem;
    }
  }
  .myPrize-view{
    background: url("./assets/myPrize.png") no-repeat;
    background-size: 100%;
    width: 8rem;
    height: 8.3rem;
    position: relative;

    .myPrizeView-area{
      position: absolute;
      top: 3.4rem;
      left: 1.7rem;
      height: 3.75rem;
      width: 4.1rem;
      overflow: scroll;

      .myprize-item{
        display: flex;
        font-size: .2rem;
        color: #00af78;
        align-items: center;

        .add-btn{
          background: url("./assets/fix-btn.png") no-repeat;
          background-size: 100%;
          width: 1rem;
          height: 0.3rem;
          margin: .1rem auto;
        }
        .change-info{
          background: url("./assets/change-btn.png") no-repeat;
          background-size: 100%;
          width: 1rem;
          height: 0.3rem;
          margin: .1rem auto;
        }
      }
      .noprize-item{
        width: 100%;
        text-align: center;
        margin: 1.3rem auto;
        color: gray;
      }
    }
    .close-btn{
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      top: 7.8rem;
      left: 3.54rem;
    }
  }
  .secret-view{
    background: url("./assets/secret.png") no-repeat;
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
    background: url("./assets/no-lottery.png") no-repeat;
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
    background: url("./assets/lottery-get.png") no-repeat;
    background-size: 100%;
    width: 5.39rem;
    height: 7.67rem;
    position: relative;

    .fix-btn{
      width: 2.5rem;
      height: 0.7rem;
      position: absolute;
      top: 5.04rem;
      left: 1.4rem;
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
    background: url("./assets/fix-info.png") no-repeat;
    background-size: 100%;
    width: 5.39rem;
    height: 7.67rem;
    position: relative;

    .submit-btn{
      width: 2.2rem;
      height: 0.7rem;
      position: absolute;
      top: 5.24rem;
      left: 1.55rem;
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
      top: 1.25rem;
      left: 1.75rem;
      width: 3.2rem;
      text-align: end;
    }
    .address-formData input {
      width: 100%;
      height: 0.59rem;
      border: none;
      background: none;
      color: #0c3680;
      font-size: 0.24rem;
      padding: 0.06rem 0 0 0;
    }
    input::-webkit-input-placeholder {
      color: #0c3680;
    }
  }
  .upOK-view{
    background: url("./assets/fixed.png") no-repeat;
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
