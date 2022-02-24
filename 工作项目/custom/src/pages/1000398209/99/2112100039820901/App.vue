<template>
  <!--  kv部分-->
  <div class="main-kv">
    <div class="fix-area">
    <div class="input-area">
      <div>姓名（必填）</div>
      <div v-if="nameMask" class="data-format" style="border: 0">{{formData.name}}</div>
      <input
        v-else
        class="data-format"
        type="text"
        v-model="formData.name"
        maxlength="20"
      />
    </div>
      <div class="input-area">
        <div>性别（必填）</div>
        <div v-if="sexMask" class="data-format" style="border: 0">{{sexText}}</div>
        <input
          v-else
          class="data-format"
          style="width: 2.65rem"
          placeholder="选择性别"
          type="text"
          v-model="sexShow"
          readonly="readonly"
          @click="sexSelects = true"
        />
        <div class="icon-triangle" v-if="!sexMask">
        <img
          v-if="!sexMask"
          class="icon"
          :class="{ 'active': sexSelects }"
          src="./assets/triangle1.png"
          @click="sexSelects = true"
        />
        </div>
      </div>
    <div class="input-area">
      <div>生日（必填）</div>
      <div v-if="!birthHasPerTimes" class="data-format" style="border: 0">{{formData.birthday}}</div>
      <input
        v-else
        class="data-format"
        style="width: 2.65rem"
        placeholder="请选择我的生日"
        type="text"
        v-model="formData.birthday"
        readonly="readonly"
        @click="birthHasPerTimes?pickerShow('birthday'):''"
      />
      <div class="icon-triangle" v-if="birthHasPerTimes">
        <img
          class="icon"
          :class="{ 'active': birthSelects }"
          src="./assets/triangle1.png"
          @click="birthSelects = true"
        />
      </div>
    </div>
    <div class="collect-btn" @click="submitCheckOut"></div>
  </div>
  </div>
  <!--  弹窗组件-->
  <Popup class="popup" v-model:show="maskShow" :close-on-click-overlay="false">
    <open-card-window @openCard="gotoOpenCard" @closeMem="closeWindow" v-if="windowName === 'openWin'"></open-card-window>
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
<!--  <Popup v-model:show='addressSelects' round position="bottom" style="background-color: white;">-->
<!--    <Cascader-->
<!--      v-model="currentAddress"-->
<!--      title="请选择所在地区"-->
<!--      :options="addressOptions"-->
<!--      :field-names="{-->
<!--        text: 'value',-->
<!--        value: 'seqCode',-->
<!--        children: 'children',-->
<!--      }"-->
<!--      @close="onCancel"-->
<!--      @change="onAddressChange"-->
<!--    />-->
<!--  </Popup>-->
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
// 完善信息内容
const formData = ref({
  activityId,
  venderId,
  pin: userPin.value,
  name: '',
  // location: '',
  // provinceCode: '',
  // cityCode: '',
  // countyCode: '',
  sex: '',
  birthday: '',
});
// 省市区地址
const addressCode = ref('');
// 地址上拉弹窗
const addressSelects = ref(false);
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
const pickerShow = (type: string) => {
  // if (type === 'sex') {
  //   if (record.value.sex) return;
  //   overlay.value.sex = true;
  // }
  if (type === 'birthday') {
    if (formData.value.birthday) return;
    birthSelects.value = true;
  }
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
  text: '未知',
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
  U: '未知',
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
// 获取地址
// const getAddress = async (seqCode = 0): Promise<any[]> => {
//   const { data } = await cjwxRequest.post('/crm/cerave/perfec/getAddress', {
//     pin: userPin.value,
//     activityId,
//     seqCode,
//   });
//   return data;
// };
// 提交个人信息
const submit = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/crm/shu/perfec/save', formData.value)
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
// const initAdress = async (searchValue: any, compareCode: any) => {
//   const Options: any[] = await getAddress(searchValue);
//   const realArray: any[] = Options.filter((item) => item.seqCode === compareCode);
//   return realArray;
// };
// 活动信息
const activityContent = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/shu/perfec/activityContent', {
    pin: userPin.value,
    activityId,
  })
    .then((data) => {
      if (data.result) {
        birthHasPerTimes.value = data.data.birthHasPerTimes;
        if (!data.data.record) return;
        if (data.data.record.name) {
          formData.value.name = data.data.record.name;
          nameMask.value = true;
        }
        if (data.data.record.sex) {
          formData.value.sex = data.data.record.sex;
          sexMask.value = true;
        }
        if (data.data.record.birthday) {
          formData.value.birthday = data.data.record.birthday;
          birthMask.value = true;
        }
      }
      Toast.clear();
    });
};
const gotoOpenCard = () => {
  const returnUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000398209&channel=401&returnUrl=${returnUrl}`;
};
// const getOpenCard = () => {
//   cjwxRequest.post('/crmCard/common/coupon/getOpenCardStatusWithOutSelf', {
//     venderId: 599119,
//     activityId,
//   }).then((res) => {
//     isOpenCarded = res.openCard;
//     if (!isOpenCarded) {
//       openWindow('openWin');
//     }
//   });
// };
if (!isOpenCarded) {
  openWindow('openWin');
}
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
  height: 13.34rem;
  background: url("./assets/main-kv.png") no-repeat;
  background-size: 100%;

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
  font-size: 0.23rem;
  color: #FFFFFF;
  margin-top: 7.65rem;

  .fix-title{
    height: 0.84rem;
    width: 7.1rem;
    margin: 0 0 0.1rem .4rem;
    display: flex;
  }
  .input-area{
    height: 0.84rem;
    margin-left: 1.3rem;
    display: flex;
    align-items: center;
    /* border-bottom: 1px solid #b3b3b32b; */
    //justify-content: space-between;

    >input{
      border: none;
      background: none;
      color: #FFFFFF;
    }
    .data-format{
      width: 3.2rem;
      overflow: hidden;
      white-space: nowrap;
      word-break: keep-all;
      text-align: right;
      border: 1px solid;
      border-radius: 0;
      padding: 0.1rem;
      margin-left: 0.1rem;
      height: .3rem;
    }
    .icon-triangle{
      width: 0.5rem;
      height: 0.5rem;
      border: .02rem solid;
      border-left-width: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .icon{
        width: .16rem;
      }
    }
    .active{
      transition: 0.5s;
      transform: rotate(180deg);
    }
  }
  .collect-btn{
    background: url("./assets/button.png") no-repeat;
    background-size: 100%;
    width: 1.78rem;
    height: 0.56rem;
    margin: 1.7rem auto 0;
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
}

</style>
