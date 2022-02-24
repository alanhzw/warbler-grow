<template>
  <!--  kv部分-->
  <div class="main-kv"></div>
  <div class="prize-area">
    <img src="//img10.360buyimg.com/imgzone/jfs/t1/19457/4/10914/5530/5c8b0b3cE54a61b0a/3446c49b18f18aef.png"/>
    <div class="prize-title">
      <span class="red">50</span>店铺积分
    </div>
  </div>
  <div class="fix-area">
    <div class="fix-title">填写资料</div>
    <div class="input-area">
      <div>姓名</div>
      <div v-if="nameMask" class="data-format">{{formData.name}}</div>
      <input
        v-else
        class="data-format"
        type="text"
        v-model="formData.name"
        maxlength="20"
      />
    </div>
    <div class="input-area">
      <div>性别</div>
      <div v-if="sexMask" class="data-format">{{sexText}}</div>
      <input
        v-else
        class="data-format"
        placeholder="选择性别"
        type="text"
        v-model="sexShow"
        readonly="readonly"
        @click="sexSelects = true"
      />
    </div>
    <div class="input-area">
      <div>生日</div>
      <div v-if="birthMask" class="data-format">{{formData.birthday}}</div>
      <input
        v-else
        class="data-format"
        placeholder="请选择我的生日"
        type="text"
        v-model="formData.birthday"
        readonly="readonly"
        @click="birthSelects = true"
      />
    </div>
    <div class="input-area">
      <div style="width: 2rem">地址（选填）</div>
      <!--    <div v-if="addMask" class="data-format">{{addressCode}}</div>-->
      <input
        class="data-format"
        type="text"
        v-model="addressCode"
        readonly="readonly"
        @click="addressSelects = true"
      />
    </div>
    <div class="collect-btn" @click="submitCheckOut">领取奖品</div>
<!--    <checkbox class="attend-btn" v-model="attendChecked">同时关注CeraVe适乐肤京东自营旗舰店</checkbox>-->
  </div>
  <div class="rule-area">
    <div class="rule-text" v-html="rule"></div>
  </div>
<!--  <Popup v-model:show="addressSelects" position="bottom" teleport="body">-->
<!--    <Area-->
<!--      title="请输入详细地址"-->
<!--      :area-list="areaList"-->
<!--      @confirm="confirmAddress"-->
<!--      @cancel="onCancel"-->
<!--    />-->
<!--  </Popup>-->
  <!--  弹窗组件-->
  <Popup class="popup" v-model:show="maskShow" :close-on-click-overlay="false">
    <open-card-window @openCard="toOpen" @closeMem="closeWindow" v-if="windowName === 'openWin'"></open-card-window>
  </Popup>
  <Popup v-model:show="sexSelects" position="bottom" teleport="body">
    <Picker
      title="性别"
      :columns="sexArray"
      @confirm="confirmSex"
      @cancel="onCancel"
    />
  </Popup>
  <Popup v-model:show="birthSelects" position="bottom" teleport="body">
    <DatetimePicker
      v-model="currentDate"
      type="date"
      title="生日"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="confirmBirth"
      @cancel="onCancel"
    />
  </Popup>
  <!-- 地址级联选择-->
  <Popup v-model:show='addressSelects' round position="bottom" style="background-color: white;">
    <Cascader
      v-model="currentAddress"
      title="请选择所在地区"
      :options="addressOptions"
      :field-names="{
        text: 'value',
        value: 'seqCode',
        children: 'children',
      }"
      @close="onCancel"
      @change="onAddressChange"
    />
  </Popup>
</template>

<script lang='ts' setup>
import { computed, inject, nextTick, Ref, ref, watch } from 'vue';
import { Popup, Toast, Area, Picker, DatetimePicker, Cascader, Checkbox } from 'vant';
import dayjs from 'dayjs';
import { areaList } from '@vant/area-data';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { callShare, gotoShopPage, gotoSkuPage } from '@/utils';
import { reportClick } from '@/utils/trackEvent/jdReport';
import './css/common.scss';
import OpenCardWindow from './components/opencardWindow.vue';

// 分享渠道
// const shareChannel = ['Wxfriends', 'Wxmoments', 'Sinaweibo', 'QQfriends', 'QQzone'];
// 遮罩
const maskShow = ref(false);
// 弹窗名称
const windowName = ref('');
// 规则
const rule = ref('');
// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const { activityId, venderId, shopId, endTime } = baseInfo;
// 是否开卡表示是否注册
const isOpenCarded: boolean = inject('isOpenCard') as boolean;
// const isOpenCarded = true;
// let isOpenCarded = false;
// 用户Pin
const userPin = ref<string>(baseInfo.pin);
// 自身Id
// const myUuid = ref('');
// 完善信息内容
const formData = ref({
  activityId,
  venderId,
  pin: userPin.value,
  name: '',
  location: '',
  provinceCode: '',
  cityCode: '',
  countyCode: '',
  sex: '',
  birthday: '',
});
// 省市区地址
const addressCode = ref('');
// 地址上拉弹窗
const addressSelects = ref(false);
// 确认三联地址信息
// const confirmAddress = (addressItemList: any[]) => {
//   formData.value.provinceCode = addressItemList[0].name;
//   formData.value.cityCode = addressItemList[1].name;
//   formData.value.countyCode = addressItemList[2].name;
//   addressCode.value = addressItemList.map((item) => item.name).join('/');
//   addressSelects.value = false;
// };
// 生日上拉弹窗
const birthSelects = ref(false);
// 当前生日
const currentDate = ref(new Date());
// 最小生日
const minDate = new Date(1900, 1, 1);
// 最大生日
const maxDate = new Date();
// 时间转换
const add0 = (num: number) => (num < 10 ? `0${num}` : num);
const getDateFormat = (date: number) => {
  // console.log(date.substring(0, date.length - 2));
  const time = new Date(date);
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  // const h = time.getHours();
  // const mm = time.getMinutes();
  // const s = time.getSeconds();
  return `${y}-${add0(m)}-${add0(d)}`;
};
// 确认生日
const confirmBirth = (birth: number) => {
  formData.value.birthday = getDateFormat(birth);
  birthSelects.value = false;
};
// 性别上拉弹窗
const sexSelects = ref(false);
// 性别显示
const sexShow = ref('');
const sexArray = [{
  text: '男',
  key: 'M',
}, {
  text: '女',
  key: 'F',
}, {
  text: '保密',
  key: 'U',
}];
// 确认性别
const confirmSex = (sex) => {
  formData.value.sex = sex.key;
  sexShow.value = sex.text;
  sexSelects.value = false;
};
// 关闭上拉框
const onCancel = () => {
  addressSelects.value = false;
  birthSelects.value = false;
  sexSelects.value = false;
};
// 地址控件
const addressOptions = ref<any[]>([]);
// 能否填写生日
const birthHasPerTimes = ref(false);
// 当前选中的地址
const currentAddress = ref('');
// 关注按钮
const attendChecked = ref(false);
// 姓名遮罩
const nameMask = ref(false);
// 性别遮罩
const sexMask = ref(false);
// 省市区遮罩
// const addMask = ref(false);
// 生日遮罩
const birthMask = ref(false);
// 详细地址遮罩
// const locationMask = ref(false);

const sex = {
  M: '男',
  F: '女',
  U: '保密',
};
const sexText = computed(() => {
  if (formData.value.sex) {
    return sex[formData.value.sex];
  }
  return '';
});
// ·································
// 开启弹窗
const openWindow = (name: string) => {
  windowName.value = name;
  maskShow.value = true;
};
// 关闭弹窗
const closeWindow = () => {
  maskShow.value = false;
};
// 获取活动信息;
const getActivityInfo = () => {
  cjwxRequest
    .get(`/common/brand/getFullActInfoVo?activityId=${activityId}`)
    .then((res: { data: { rule: string; }; }) => {
      if (res.data.rule) {
        const rules = res.data.rule.split('\r');
        rule.value = rules.join('<br/>');
      }
    });
};
// 跳转开卡
const toOpen = () => {
  const returnUrl = encodeURIComponent(`${window.location.origin}/m/1000224204/99/2112100022420401/`);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000224204&channel=401&returnUrl=${returnUrl}`;
  // window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=599119&shopId=590943&returnUrl=${returnUrl}`;
};
// 获取地址
const getAddress = async (seqCode = 0): Promise<any[]> => {
  const { data } = await cjwxRequest.post('/crm/cerave/perfec/getAddress', {
    pin: userPin.value,
    activityId,
    seqCode,
  });
  return data;
};
// 提交个人信息
const submit = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/crm/cerave/perfec/save', formData.value)
    .then((data) => {
      if (data.result) {
        Toast('填写成功！');
        setTimeout(() => {
          // eslint-disable-next-line no-use-before-define
          activityContent();
        }, 1000);
      } else if (data.errorMessage === '重复请求:improveMember') {
        Toast.fail('您的操作太过频繁，请稍后再试！');
      } else {
        Toast.fail(data.errorMessage);
      }
    });
};
// 信息校验
const submitCheckOut = () => {
  if (!isOpenCarded) {
    openWindow('openWin');
    return;
  }
  // 特殊字符
  const spcWord = /[^\u4e00-\u9fa5a-zA-Z\d,.，。（）() - - ! ！? ？]+/;
  // 空格
  const whitespace = /\s+/g;
  // 表情符号
  const faceWord = /[\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/;
  if (!formData.value.name) {
    Toast('姓名不能为空');
  } else if (!formData.value.sex) {
    Toast('性别不能为空');
  } else if (!formData.value.birthday) {
    Toast('生日不能为空');
  } else {
    submit();
  }
// else if (spcWord.test(formData.value.name)) {
//     Toast('姓名不能包含特殊符号');
//   } else if (faceWord.test(formData.value.name)) {
//     Toast('姓名不能包含表情符号');
//   } else if (whitespace.test(formData.value.name)) {
//     Toast('姓名不能包含空格');
//   }
};
// 回显地址
const initAdress = async (searchValue: any, compareCode: any) => {
  const Options: any[] = await getAddress(searchValue);
  const realArray: any[] = Options.filter((item) => item.seqCode === compareCode);
  return realArray;
};
// 活动信息
const activityContent = async () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/cerave/perfec/activityContent', {
    pin: userPin.value,
    activityId,
  })
    .then(async (data) => {
      if (data.result) {
        birthHasPerTimes.value = data.data.birthHasPerTimes;
        console.log(data.data.birthHasPerTimes);
        if (!data.data.record) return;
        if (data.data.record.name) {
          formData.value.name = data.data.record.name;
          nameMask.value = true;
        }
        if (data.data.record.sex) {
          formData.value.sex = data.data.record.sex;
          sexMask.value = true;
        }
        if (!data.data.birthHasPerTimes) {
          birthMask.value = true;
        }
        if (data.data.record.birthday) {
          formData.value.birthday = data.data.record.birthday;
        }
        if (data.data.record.provinceCode) {
          // addMask.value = true;
          formData.value.provinceCode = data.data.record.provinceCode;
          formData.value.cityCode = data.data.record.cityCode;
          formData.value.countyCode = data.data.record.countyCode;
          const textProvince = await initAdress(0, formData.value.provinceCode);
          const textCity = await initAdress(textProvince[0].seqCode, data.data.record.cityCode);
          const textCounty = await initAdress(textCity[0].seqCode, formData.value.countyCode);
          if (textCounty.length > 0) {
            addressCode.value = `${textProvince[0].value} ${textCity[0].value} ${textCounty[0].value}`;
          } else {
            addressCode.value = `${textProvince[0].value} ${textCity[0].value}`;
          }
        }
      }
      Toast.clear();
    });
};
// 初始化地址库-省
const initProvince = async () => {
  addressOptions.value = await getAddress(0);
  let province = await getAddress(0);
  province = province.filter((item) => item.seqCode !== 'ACX-000');
  province = province.filter((item) => item.seqCode !== 'EC');
  addressOptions.value = province;
};
// 当地址控件选择改变的时候触发
const onAddressChange = async ({ value, selectedOptions, tabIndex }) => {
  if (!selectedOptions[tabIndex].children) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    // 先获取 获取数据
    const addressArr = await getAddress(value);
    // 判断数据情况
    if (addressArr.length !== 0 && tabIndex < 2) {
      selectedOptions[tabIndex].children = addressArr;
    } else {
      const values = selectedOptions.map((o: any) => o.value);
      const seqCodes = selectedOptions.map((o: any) => o.seqCode);
      const [provinceCode, cityCode, countyCode] = seqCodes;

      formData.value.provinceCode = provinceCode;
      formData.value.cityCode = cityCode;
      formData.value.countyCode = countyCode;
      addressSelects.value = false;
      addressCode.value = values.join(' ');
      console.log('provinceCode, cityCode, countyCode', provinceCode, cityCode, countyCode);
    }
    Toast.clear();
  }
};
// 关注店铺
const followShop = () => {
  if (!isOpenCarded) {
    openWindow('openWin');
    attendChecked.value = false;
    return;
  }
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/wxActionCommon/followShop', {
    userId: shopId,
    buyerNick: userPin.value,
    activityId,
    activityType: 42,
  }).then((res) => {
    if (res.result) {
      if (res.data) {
        Toast('关注成功');
      }
    } else {
      Toast(res.errorMessage);
    }
  });
};
watch(() => attendChecked.value, (newValue, oldValue) => {
  if (newValue) {
    followShop();
  }
});
// const getOpenCard = () => {
//   cjwxRequest.post('/crmCard/common/coupon/getOpenCardStatusWithOutSelf', {
//     venderId: 599119,
//     activityId,
//   }).then((res) => {
//     isOpenCarded = res.openCard;
//     if (!isOpenCarded) {
//       // overlay.value.openCard = true;
//       // eslint-disable-next-line no-use-before-define
//       openWindow('openWin');
//     }
//   });
// };
// 判开卡弹窗
if (!isOpenCarded) {
  openWindow('openWin');
}
initProvince();
getActivityInfo();
activityContent();
// getOpenCard();
</script>

<style lang='scss'>
//::-webkit-input-placeholder {
//  color: whitesmoke;
//  font-size: .2rem;
//  font-weight: bolder;
//}

//.gray {
//  filter: grayscale(1);
//}

.main-kv {
  position: relative;
  width: 100%;
  height: 2.4rem;
  background: url("//img10.360buyimg.com/imgzone/jfs/t1/32833/26/6046/12237/5c8b0b3cEfa58430b/df276979be6c3c03.png") no-repeat;
  background-size: 100%;
}
.prize-area{
  width: 100%;
  height: 1.8rem;
  background: #FFFFFF;
  display: flex;
  align-items: center;
  margin-bottom: .2rem;

  >img {
    width: 2.4rem;
    height: 1.5rem;
  }
  .prize-title{
    margin-left: .5rem;
    font-size: .33rem;

    .red{
      color: #f23c3c;
      font-size: .4rem;
    }
  }
}
.fix-area{
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #FFFFFF;
  font-size: .26rem;

  .fix-title{
    height: 0.84rem;
    width: 7.1rem;
    margin: 0 0 0.1rem .4rem;
    display: flex;
    align-items: center;
  }
  .input-area{
    height: 0.84rem;
    line-height: .84rem;
    width: 7.1rem;
    margin-left: 0.4rem;
    display: flex;
    align-items: center;
    white-space: nowrap;
    word-break: keep-all;
    overflow: hidden;
    border-bottom: 1px solid #b3b3b32b;
    justify-content: space-between;

    >input{
      border: none;
      background: none;
      color: #000;
    }
    .data-format{
      margin-right: 0.2rem;
      width: 5rem;
      overflow: hidden;
      white-space: nowrap;
      word-break: keep-all;
      text-align: right;
      line-height: .84rem;
    }
  }
  .collect-btn{
    background: url("//img10.360buyimg.com/imgzone/jfs/t1/25324/16/11234/19579/5c8e81e2Eb51dc8d4/3acf51a4fadbd97e.png") no-repeat;
    background-size: 100%;
    width: 6.7rem;
    height: 0.88rem;
    margin: .3rem auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
  }
  .attend-btn{
    justify-content: center;
    margin: 0.2rem auto;
  }
}
.rule-area{
  position: relative;
  margin-top: .2rem;
  width: 100%;
  height: 4rem;
  background-color: #FFFFFF;
}
//
//.live-area {
//  position: relative;
//  width: 100%;
//  display: flex;
//  flex-direction: column;
//  align-items: center;
//
//  .live-title {
//    background: url("//img10.360buyimg.com/imgzone/jfs/t1/204962/17/17073/31285/61a9c155E464cdfb4/680db21fc30c9200.png") no-repeat;
//    background-size: 100%;
//    width: 5.42rem;
//    height: 1.45rem;
//  }
//
//  .live-title-text {
//    color: #FFFFFF;
//    margin-bottom: 0.1rem;
//    font-size: .26rem;
//    text-align: center;
//  }
//
//  .live-house {
//    width: 6.86rem;
//    height: 3.35rem;
//    border-radius: 0.1rem;
//    border-bottom: 0.1rem solid #de300b;
//
//    .live-house-mask{
//      width: 100%;
//      height: 100%;
//      background-color: black;
//      opacity: .7;
//      display: flex;
//      justify-content: center;
//      align-items: center;
//
//      .live-house-icon{
//        background: url("//img10.360buyimg.com/imgzone/jfs/t1/171640/8/23006/2461/61b17bb4E27da16f5/f459a0f02614ab4e.png") no-repeat;
//        background-size: 100%;
//        width: .9rem;
//        height: .9rem;
//      }
//    }
//  }
//}
//
//.video-area {
//  position: relative;
//  display: flex;
//  flex-direction: column;
//  background-color: #de300b;
//  width: 7rem;
//  height: 2.83rem;
//  justify-content: center;
//  align-items: center;
//  margin-top: 2.8rem;
//  border-radius: 0.1rem;
//  border-bottom: 0.1rem solid #ffc50b;
//
//  .video-area-bg-title {
//    background: url("//img10.360buyimg.com/imgzone/jfs/t1/156654/16/26910/37007/61b0495dE8b8af091/bedc8a6c15faf633.png") no-repeat;
//    background-size: 100%;
//    width: 7rem;
//    height: 3rem;
//    margin-top: -4.5rem;
//  }
//
//  .video-area-title {
//    color: #FFFFFF;
//    font-size: .26rem;
//    position: absolute;
//    top: -.7rem;
//  }
//
//  .video-list {
//    position: absolute;
//    width: 6.6rem;
//    display: flex;
//    align-items: stretch;
//    flex-direction: row;
//    overflow-x: scroll;
//    top: .6rem;
//    height: 2.05rem;
//    //column-gap: .1rem;
//    .video-style {
//      margin-right: .1rem;
//      //padding-bottom: .27rem;
//      width: 3rem;
//      flex-grow: 0;
//      flex-shrink: 0;
//      border-radius: .2rem .2rem 0 0;
//      overflow: hidden;
//      //background-color: #e5fe42;
//    }
//  }
//}
//
//.book-mem {
//  background: url("//img10.360buyimg.com/imgzone/jfs/t1/141057/30/21807/31591/61ac63efEa903314b/2b08771b1675a3a6.png") no-repeat;
//  background-size: 100%;
//  width: 7rem;
//  height: 4.45rem;
//  margin-top: .5rem;
//  position: relative;
//
//  .book-list {
//    background: url("//img10.360buyimg.com/imgzone/jfs/t1/172365/14/22393/8496/61ac661bE9ce17507/58e87d935f78de62.png") no-repeat;
//    background-size: 100%;
//    width: 6.38rem;
//    height: 1.01rem;
//    position: relative;
//    margin: 2.2rem auto 0;
//    display: flex;
//    align-items: center;
//
//    .book-item-text {
//      text-align: center;
//      width: 4rem;
//      font-size: .26rem;
//      margin-left: .25rem;
//      font-weight: 500;
//
//      span {
//        color: #de300b;
//      }
//    }
//
//    .book-btn {
//      width: 1.7rem;
//      height: 0.5rem;
//      border-radius: 1rem;
//      background-color: #3b8732;
//      border: 2px solid black;
//      display: flex;
//      align-items: center;
//      justify-content: center;
//      text-shadow: 0 0 0 black, 1px 1px black, -1px 1px black, 1px -1px black, -1px -1px black;
//      color: #ffffff;
//      margin-left: 0.1rem;
//      font-size: 0.25rem;
//      white-space: nowrap;
//      word-break: keep-all;
//    }
//  }
//}
//
//.surprise-one {
//  background: url("//img10.360buyimg.com/imgzone/jfs/t1/219497/1/6555/33203/61a9eff8E8fb13f9e/53ff0150593d5852.png") no-repeat;
//  background-size: 100%;
//  width: 7rem;
//  height: 6.54rem;
//  margin-top: .5rem;
//  position: relative;
//
//  .surprise-one-title {
//    margin: 1.3rem auto 0;
//    text-align: center;
//    color: #ffffff;
//    font-size: .26rem;
//  }
//
//  .my-laugh-sore {
//    text-align: center;
//    margin-top: 0.5rem;
//    color: #ffc50b;
//    text-shadow: 0 0 0 black, 1px 1px black, -1px 1px black, 1px -1px black, -1px -1px black;
//    font-style: oblique;
//
//    span {
//      text-shadow: none;
//    }
//  }
//
//  .grow-process {
//    position: absolute;
//    //width: 100%;
//    //height: 1.4rem;
//    top: 3.3rem;
//    left: -1.1rem;
//
//    .process-bg {
//      width: 5.5rem;
//      height: 0.2rem;
//      background-color: #e0231f;
//      background-size: 100% 100%;
//      margin: 0.73rem 0 0 1.45rem;
//      position: relative;
//      border-radius: 1rem;
//      border: 3px solid black;
//
//      .progress-active {
//        width: 100%;
//        height: 100%;
//        border-radius: 1rem;
//        background-image: linear-gradient(#fad385, #fe9829, #ff5c35);
//        transition-duration: 0.5s;
//        transition-timing-function: linear;
//        position: relative;
//        top: -0.02rem;
//        left: 0;
//
//        .price-span {
//          background: url("//img10.360buyimg.com/imgzone/jfs/t1/218680/39/6732/7212/61ac48b6E6473cbfe/3ac9e3201f6373a1.png") no-repeat;
//          background-size: 100% 100%;
//          /* width: 1.9rem; */
//          padding: 0 .1rem;
//          height: 0.58rem;
//          margin-top: -0.75rem;
//          margin-right: -1.12rem;
//          text-align: center;
//          color: #de300b;
//          white-space: nowrap;
//          word-break: keep-all;
//          font-size: 0.2rem;
//          right: 0;
//          position: absolute;
//          display: flex;
//          align-items: center;
//          overflow: hidden;
//        }
//
//        .shining-span {
//          background: url("//img10.360buyimg.com/imgzone/jfs/t1/137671/26/22187/32181/61ac526fEcb215b7a/d4a9c940bf2eb9a2.png") no-repeat;
//          background-size: 100% 100%;
//          width: 1.47rem;
//          height: 1.46rem;
//          margin-top: -0.65rem;
//          margin-right: -0.7rem;
//          right: 0;
//          position: absolute;
//        }
//      }
//    }
//  }
//
//  .process-end {
//    background: url("//img10.360buyimg.com/imgzone/jfs/t1/130776/8/23840/7764/61ac5b50Ec360df12/3137d197b3da73b8.png") no-repeat;
//    background-size: 100%;
//    width: 1.47rem;
//    height: .55rem;
//    position: absolute;
//    right: -.7rem;
//    top: .6rem;
//  }
//
//  .get-chance {
//    background: url("//img10.360buyimg.com/imgzone/jfs/t1/161181/23/27361/25723/61ac8be9E549a2170/89bbd551f9fd14c2.png") no-repeat;
//    background-size: 100%;
//    width: 4.16rem;
//    height: .79rem;
//    margin: 1.55rem auto 0;
//  }
//
//  .got-chance {
//    background: url("//img10.360buyimg.com/imgzone/jfs/t1/214297/17/6847/27084/61af300dE60277057/294f70f3f9b6e063.png") no-repeat;
//    background-size: 100%;
//    width: 4.16rem;
//    height: .79rem;
//    margin: 1.55rem auto 0;
//  }
//}
//
//.chance-btns {
//  display: flex;
//  justify-content: center;
//  margin-top: .2rem;
//
//  .chance-open {
//    display: flex;
//    flex-direction: column;
//    align-items: center;
//
//    .chance-open-btn {
//      background: url("//img10.360buyimg.com/imgzone/jfs/t1/173279/4/21989/18012/61ac9182E752eaa09/cbdf2ee2f0b9e1c4.png") no-repeat;
//      background-size: 100%;
//      width: 2.97rem;
//      height: .79rem;
//    }
//
//    .chance-open-text {
//      background: url("//img10.360buyimg.com/imgzone/jfs/t1/200872/11/18157/6193/61ac9183Ef07c229d/c98112f66a11c7ca.png") no-repeat;
//      background-size: 100%;
//      width: 1.69rem;
//      height: .3rem;
//    }
//  }
//
//  .chance-book {
//    display: flex;
//    flex-direction: column;
//    align-items: center;
//
//    .chance-book-btn {
//      background: url("//img10.360buyimg.com/imgzone/jfs/t1/137589/29/22508/19252/61ac9182Eeb022c9b/bdbb4bf1550b933e.png") no-repeat;
//      background-size: 100%;
//      width: 2.97rem;
//      height: .79rem;
//    }
//
//    .chance-book-text {
//      background: url("//img10.360buyimg.com/imgzone/jfs/t1/163962/4/21002/6100/61ac9182E0fdd88ee/68cad05ed013aaf2.png") no-repeat;
//      background-size: 100%;
//      width: 1.69rem;
//      height: .3rem;
//    }
//  }
//}
//
////惊喜二
//.surprise-two {
//  background: url("//img10.360buyimg.com/imgzone/jfs/t1/140915/24/22707/47321/61af43d8E1e28c8ac/b7a337c266508735.png") no-repeat;
//  background-size: 100%;
//  width: 7rem;
//  height: 7.55rem;
//  margin-top: .5rem;
//  position: relative;
//
//  .surprise-two-title {
//    margin: 1.2rem auto 0;
//    text-align: center;
//    color: #ffc50b;
//    font-size: .26rem;
//  }
//
//  .guess-bg {
//    background: url("//img10.360buyimg.com/imgzone/jfs/t1/214617/8/6838/21863/61aca568E1d9883f5/fe2c9675203abb78.png") no-repeat;
//    background-size: 100%;
//    width: 6.22rem;
//    height: 3.89rem;
//    margin: 0.18rem auto 0;
//    position: relative;
//    display: flex;
//    flex-direction: column;
//    align-items: center;
//
//    .guess-text {
//      margin-top: .95rem;
//      margin-left: 1.2rem;
//      color: #ffc50b;
//      font-size: .26rem;
//    }
//
//    .group-list {
//      width: 95%;
//      height: 53%;
//      display: flex;
//      justify-content: space-between;
//      margin-top: 0.3rem;
//      margin-right: .1rem;
//      overflow-x: scroll;
//
//      .group-item {
//        display: flex;
//        flex-direction: column;
//        align-items: center;
//        justify-content: space-between;
//
//        .group-item-img {
//          width: 1.94rem;
//          height: 1.46rem;
//          display: flex;
//          justify-content: center;
//          align-items: center;
//          padding-bottom: .5rem;
//        }
//
//        .group-item-btn {
//          background-color: #ffc50b;
//          border-radius: 1rem;
//          border: 2px solid black;
//          width: 1.68rem;
//          height: .38rem;
//          display: flex;
//          justify-content: center;
//          align-items: center;
//        }
//      }
//    }
//  }
//}
//
////惊喜三
//.surprise-three {
//  background: url("//img10.360buyimg.com/imgzone/jfs/t1/213413/9/6864/181738/61acb662E9f16f480/d1649525279dc020.png") no-repeat;
//  background-size: 100%;
//  width: 7rem;
//  height: 8.55rem;
//  margin-top: .5rem;
//  position: relative;
//
//  .surprise-three-title {
//    margin: 5.65rem auto 0;
//    text-align: center;
//    color: #1d7bdf;
//    font-size: .26rem;
//  }
//}
//
////惊喜四
//.surprise-four {
//  background: url("//img10.360buyimg.com/imgzone/jfs/t1/219929/10/6623/33224/61acb9a4E2f54cb0b/0b29315eb8f55bba.png") no-repeat;
//  background-size: 100%;
//  width: 7rem;
//  height: 10rem;
//  margin-top: .5rem;
//  position: relative;
//
//  .surprise-four-prize-list {
//    width: 6.39rem;
//    height: 2.9rem;
//    background: url("//img10.360buyimg.com/imgzone/jfs/t1/210285/9/11168/13935/61acbc6aE7c8a7d65/634afdeb1f564456.png") no-repeat;
//    background-size: 100%;
//    margin: 2.2rem auto 0;
//  }
//
//  .surprise-four-prize-area {
//    position: absolute;
//    top: 3rem;
//    left: .15rem;
//    width: 6.55rem;
//    display: flex;
//    justify-content: space-around;
//
//    .surprise-four-prize-item {
//      width: 1.5rem;
//
//      img {
//        width: 1.2rem;
//        height: 1.4rem;
//        display: flex;
//        justify-content: center;
//        align-items: center;
//      }
//
//      > div {
//        font-size: .26rem;
//        text-align: center;
//        //margin-top: -.15rem;
//        word-break: break-all;
//        overflow: hidden;
//        text-overflow: ellipsis;
//        display: -webkit-box;
//        -webkit-line-clamp: 1;
//        -webkit-box-orient: vertical;
//      }
//    }
//  }
//
//  .surprise-four-rank-title {
//    background: url("//img10.360buyimg.com/imgzone/jfs/t1/172700/7/21505/7710/61ad768dE9726a463/02cd33039bdde02b.png") no-repeat;
//    background-size: 100%;
//    width: 5.09rem;
//    height: .44rem;
//    margin: .5rem auto 0;
//  }
//
//  .surprise-four-rank-myRank {
//    position: absolute;
//    bottom: 1rem;
//    width: 3rem;
//    left: .5rem;
//    color: #ffc50b;
//    text-shadow: 0 0 0 black, 1px 1px black, -1px 1px black, 1px -1px black, -1px -1px black;
//    font-style: oblique;
//    font-size: .26rem;
//  }
//
//  .surprise-four-rank-myLaugh {
//    position: absolute;
//    bottom: 1rem;
//    width: 3rem;
//    right: .5rem;
//    color: #ffc50b;
//    text-shadow: 0 0 0 black, 1px 1px black, -1px 1px black, 1px -1px black, -1px -1px black;
//    font-style: oblique;
//    text-align: right;
//    font-size: .26rem;
//  }
//}
//
//.surprise-four-rank-list {
//  width: 100%;
//  height: 1.82rem;
//  overflow: hidden;
//  position: absolute;
//  top: 6.2rem;
//}
//
//.winner {
//  display: flex;
//  align-items: center;
//  justify-content: space-around;
//  padding: 0.05rem 0 0;
//  margin: .11rem 0 0 .6rem;
//  width: 6rem;
//  border: 2px solid black;
//
//  &:nth-child(3n+1) {
//    background-color: #fb6d01;
//  }
//
//  &:nth-child(3n+2) {
//    background-color: #0e5337;
//  }
//
//  &:nth-child(3n+3) {
//    background-color: #1a5ebf;
//  }
//}
//
//.winner img {
//  width: 0.6rem;
//  height: 0.6rem;
//  object-fit: cover;
//  border-radius: 1.2rem;
//}
//
//.winner span {
//  display: block;
//  font-size: 0.28rem;
//  color: #FFFFFF;
//  text-align: center;
//  overflow: hidden;
//  text-overflow: ellipsis;
//  white-space: nowrap;
//  vertical-align: baseline;
//}
//
//.winner-null {
//  text-align: center;
//  line-height: 1.75rem;
//  font-size: 0.3rem;
//  color: #ffffff;
//  font-weight: 500;
//}
//
////做任务领取爆笑值
//.surprise-getPrize-List-bg {
//  background: url("//img10.360buyimg.com/imgzone/jfs/t1/199353/12/19369/31946/61adb5d6E826035ed/3bcaa4141e9b736d.png") no-repeat;
//  background-size: 100%;
//  width: 7rem;
//  height: 7.5rem;
//  margin-top: 0.5rem;
//  position: relative;
//
//  .surprise-getPrize-List {
//    display: flex;
//    flex-direction: column;
//    align-items: center;
//    justify-content: center;
//    margin-top: 2.2rem;
//
//    > div {
//      background: url("//img10.360buyimg.com/imgzone/jfs/t1/210822/33/11777/7735/61adb99aE6781d886/1384b6486dcc3b93.png") no-repeat;
//      background-size: 100%;
//      width: 6.38rem;
//      height: 1rem;
//      display: flex;
//      align-items: center;
//      margin-bottom: .2rem;
//
//      > div {
//        width: 4rem;
//        font-size: 0.24rem;
//        margin-left: 0.5rem;
//        font-weight: 500;
//
//        span {
//          color: #de300b;
//        }
//      }
//
//      > button {
//        width: 1.5rem;
//        height: 0.5rem;
//        border: 2px solid black;
//        font-size: .23rem;
//        border-radius: 1rem;
//        background-color: #3b8732;
//        color: #ffffff;
//      }
//    }
//  }
//}
//// 爱奇艺图标
//.iqy-icon{
//  background: url("//img10.360buyimg.com/imgzone/jfs/t1/137673/9/22480/16941/61b02661E4906b620/eb3f820a42f797d7.png") no-repeat;
//  background-size: 100%;
//  width: 7rem;
//  height: 1.5rem;
//  margin-top: 0.3rem;
//  position: relative;
//}
////曝光商品
//.sku-bg {
//  //background: url("//img10.360buyimg.com/imgzone/jfs/t1/206810/29/11733/25489/61adca77E5603061f/5d6ef27a0c4cb58b.png") no-repeat;
//  //background-size: 100%;
//  background-color: #de300b;
//  width: 6.8rem;
//  margin: 1.5rem auto 0.5rem;
//  position: relative;
//  display: flex;
//  flex-direction: column;
//  align-items: center;
//  border-radius: .1rem;
//  border-bottom: .1rem solid #ffc50b;
//
//  .sku-bg-title {
//    background: url("//img10.360buyimg.com/imgzone/jfs/t1/160298/4/22492/18520/61b02661E7ef56dd8/bb5abe971287d5e8.png") no-repeat;
//    background-size: 100%;
//    width: 7rem;
//    height: 2rem;
//    margin-top: -1.4rem;
//  }
//
//  .sku-area {
//    width: 96%;
//    margin: .1rem auto .3rem;
//    display: flex;
//    flex-wrap: wrap;
//    justify-content: center;
//    align-items: center;
//
//    .sku-item {
//      background: url("//img10.360buyimg.com/imgzone/jfs/t1/212308/21/6801/5843/61adcb43E3a1a9065/cf5789c5cc35e357.png") no-repeat;
//      background-size: 100%;
//      width: 3.1rem;
//      height: 3.98rem;
//      display: flex;
//      flex-direction: column;
//      align-items: center;
//      margin-top: .1rem;
//
//      > img {
//        width: 70%;
//        margin-top: 0.2rem;
//      }
//
//      .sku-top {
//        word-break: break-all;
//        overflow: hidden;
//        text-overflow: ellipsis;
//        display: -webkit-box;
//        -webkit-line-clamp: 2;
//        -webkit-box-orient: vertical;
//        width: 90%;
//        font-size: .25rem;
//        margin-top: .1rem;
//      }
//
//      .sku-bottom {
//        display: flex;
//        align-items: center;
//
//        .sku-price {
//          width: 1.3rem;
//          color: red;
//          font-weight: 500;
//          font-size: .25rem;
//        }
//
//        .sku-btn {
//          width: 1.4rem;
//          height: 0.5rem;
//          border: 2px solid black;
//          font-size: 0.22rem;
//          border-radius: 1rem;
//          background-color: #3b8732;
//          color: #ffffff;
//        }
//      }
//    }
//  }
//}
//
//.join-mem {
//  position: absolute;
//  width: 3rem;
//  height: 1rem;
//  top: 9.1rem;
//  left: 3.5rem;
//  text-align: center;
//  color: #ffffff;
//  font-weight: 500;
//}
//
//.join-btn {
//  width: 1.8rem;
//  height: 0.6rem;
//  background-color: #112c49;
//  border-radius: 1rem;
//  position: absolute;
//  left: 4rem;
//  top: 10.1rem;
//  color: #FFFFFF;
//  display: flex;
//  justify-content: center;
//  align-items: center;
//  font-size: .25rem;
//}
//
//.wrapper {
//  display: flex;
//  align-items: center;
//  justify-content: center;
//  height: 100%;
//  width: 7.5rem;
//}

</style>
