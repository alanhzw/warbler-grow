<template>
  <div class="inxex">
    <div class="form">
      <div class="box" style="margin-top: 1.5rem">
        <!--        <span>姓名（必填）</span>-->
        <input type="text" :maxlength="10" v-model.trim="formData.name" />
      </div>
      <div class="box">
        <!--        <span>性别（必填）</span>-->
        <p @click="pickerShow('sex')">
          {{ sexText }}
          <img
            src="//img10.360buyimg.com/imgzone/jfs/t1/221605/27/4210/210/61a43ff1E464c44a4/c9c575a874215ded.png"
            :class="{ active: overlay.sex }"
            class="animation"
          />
        </p>
      </div>
      <div class="box" style="margin-top: 0.5rem">
        <!--        <span>生日（必填）</span>-->
        <p @click="birthHasPerTimes ? pickerShow('birthday') : ''">
          {{ formData.birthday }}
          <img
            src="//img10.360buyimg.com/imgzone/jfs/t1/221605/27/4210/210/61a43ff1E464c44a4/c9c575a874215ded.png"
            :class="{ active: overlay.birthday && birthHasPerTimes }"
            class="animation"
          />
        </p>
      </div>
      <div
        class="box"
        @click="addressSelects = true"
        style="margin-top: 0.5rem"
      >
        <input
          type="text"
          style="
            text-align: left;
            width: 3rem;
            margin-left: -0.4rem;
            border: 1px solid transparent;
            line-height: 0.4rem;
            height: 0.4rem;
          "
          readonly
          v-model="addressCode"
        />
        <span class="little-icon">
          <img
            src="//img10.360buyimg.com/imgzone/jfs/t1/221605/27/4210/210/61a43ff1E464c44a4/c9c575a874215ded.png"
            :class="{ active: addressSelects }"
            class="animation"
          />
        </span>
      </div>
      <div class="box" style="margin-top: 0.55rem">
        <input type="text" v-model="formData.location" />
      </div>
    </div>
    <div>
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/198393/2/20477/1532/61b85416Ee1aaa036/6b327a02d80f810d.png"
        class="confirm"
        @click="confirm"
      />
    </div>
  </div>
  <!--  &lt;!&ndash;地址选择&ndash;&gt;-->
  <!--  <vanPopup v-model:show='addressSelects' position='bottom'>-->
  <!--    <vanArea-->
  <!--      title='请输入详细地址'-->
  <!--      :area-list='areaList'-->
  <!--      @confirm='confirmAddress'-->
  <!--      @cancel='addressSelects = false'-->
  <!--    />-->
  <!--  </vanPopup>-->
  <!-- 入会弹窗 -->
  <vanPopup v-model:show="openCard" :close-on-click-overlay="false">
    <div>
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/201350/20/19046/137982/61b95195E2301a13b/72affa32a936da4d.png"
        class="open-card-img"
      />
      <div class="open-card-close" @click="openCard = false"></div>
      <div class="go-open-card" @click="gotoOpenCard"></div>
    </div>
  </vanPopup>
  <!-- 性别弹窗 -->
  <vanPopup v-model:show="overlay.sex" position="bottom">
    <van-picker
      title="性别"
      :columns="sexColumns"
      @confirm="sexConfirm"
      @cancel="onCancel"
    ></van-picker>
  </vanPopup>
  <!-- 生日弹窗 -->
  <van-popup v-model:show="overlay.birthday" position="bottom">
    <van-datetime-picker
      v-model="currentDate"
      title="生日"
      type="date"
      :min-date="new Date(1900, 0, 1)"
      :max-date="new Date()"
      @confirm="dateConfirm"
      @cancel="onCancel"
    ></van-datetime-picker>
  </van-popup>

  <!-- 地址级联选择-->
  <van-popup
    v-model:show="addressSelects"
    round
    position="bottom"
    style="background-color: white"
  >
    <van-cascader
      v-model="currentAddress"
      title="请选择所在地区"
      :options="addressOptions"
      :field-names="{
        text: 'value',
        value: 'seqCode',
        children: 'children',
      }"
      @close="addressSelects = false"
      @change="onAddressChange"
    />
  </van-popup>
</template>

<script lang='ts' setup>
import {
  ref, inject, reactive, computed,
} from 'vue';
import {
  Toast,
  Popup as vanPopup,
  Area as vanArea,
  Picker as vanPicker,
  DatetimePicker as vanDatetimePicker,
  Cascader as vanCascader,
} from 'vant';
import dayjs from 'dayjs';
import { areaList } from '@vant/area-data';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import './css/index.scss';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const isOpenCard: boolean = inject('isOpenCard') as boolean;
const openCard = ref(false);

// 选择地区
const addressSelects = ref(false);
const addressCode = ref('');
const isErrorMember = ref(true);

// 获取基本信息
const {
  activityId,
  actName,
  pin,
  venderId,
} = baseInfo;

// 设置页面title
document.title = actName;

// 主接口 获取规则;
const rule = ref('');
const overlay = ref({
  sex: false,
  birthday: false,
  openCard: false,
});

const sexColumns = [{
  text: '男',
  key: 'M',
}, {
  text: '女',
  key: 'F',
}, {
  text: '保密',
  key: 'U',
}];
const currentDate = new Date(1995, 0, 1);
const formData = ref({
  activityId,
  venderId,
  pin,
  name: '',
  sex: '',
  birthday: '',
  provinceCode: '',
  cityCode: '',
  countyCode: '',
  location: '',
});
const sex = {
  M: '男',
  F: '女',
  U: '保密',
};
const record = ref({
  name: false,
  sex: false,
  birthday: false,
  provinceCode: false,
  cityCode: false,
  countyCode: false,
  location: false,
});
let birthHasPerTimes = false;

// 当前选中的地址
const currentAddress = ref('');

// 地址控件
const addressOptions = ref<any[]>([]);

const sexText = computed(() => {
  if (formData.value.sex) {
    return sex[formData.value.sex];
  }
  return '';
});

// 获取地址
const getAddress = async (seqCode = 0): Promise<any[]> => {
  const { data } = await cjwxRequest.post('/crm/atelier/perfec/getAddress', {
    pin,
    activityId,
    seqCode,
  });
  return data;
};

// 回显地址
const initAdress = async (searchValue: any, compareCode: any) => {
  const Options: any[] = await getAddress(searchValue);
  const realArray: any[] = Options.filter((item) => item.seqCode === compareCode);
  return realArray;
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

const getActivityInfo = () => {
  cjwxRequest
    .get(`/common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`)
    .then((res) => {
      if (res.data) {
        if (!res.data.rule) return;
        const rules = res.data.rule.split('\n');
        rule.value = rules.join('<br/>');
      }
    });
};

const sexConfirm = (value: any) => {
  formData.value.sex = value.key;
  overlay.value.sex = false;
};

const gotoOpenCard = () => {
  const returnUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000397147&channel=401&returnUrl=${returnUrl}`;
};

// 地址确认三级联动地址4
// const confirmAddress = (addressItemList: any) => {
//   formData.value.province = addressItemList[0].name;
//   formData.value.city = addressItemList[1].name;
//   formData.value.district = addressItemList[2].name;
//   addressCode.value = addressItemList.map((item: any) => item.name)
//     .join('/');
//   addressSelects.value = false;
// };

const dateConfirm = (value: string) => {
  formData.value.birthday = dayjs(value)
    .format('YYYY-MM-DD');
  overlay.value.birthday = false;
};

const onCancel = () => {
  overlay.value = {
    sex: false,
    birthday: false,
    openCard: false,
  };
};

const pickerShow = (type: string) => {
  if (type === 'sex') {
    if (record.value.sex) return;
    overlay.value.sex = true;
  } else if (type === 'birthday') {
    if (record.value.birthday) return;
    overlay.value.birthday = true;
  }
};

const activityContent = async () => {
  cjwxRequest.post('/crm/atelier/perfec/activityContent', { pin, activityId })
    .then(async (data) => {
      if (data.result) {
        birthHasPerTimes = data.data.birthHasPerTimes;
        if (!data.data.record) return;
        if (data.data.record.name) {
          formData.value.name = data.data.record.name;
        }
        if (data.data.record.sex) {
          formData.value.sex = data.data.record.sex;
        }
        if (data.data.record.birthday) {
          formData.value.birthday = data.data.record.birthday;
        }
        if (data.data.record.location) {
          formData.value.location = data.data.record.location;
        }
        if (data.data.record.provinceCode) {
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
      } else if (isOpenCard && isErrorMember.value) {
        activityContent();
        isErrorMember.value = false;
      } else if (isOpenCard) {
        Toast(data.errorMessage);
      }
    });
};

const submit = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/crm/atelier/perfec/save', formData.value)
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

const confirm = () => {
  if (!isOpenCard) {
    openCard.value = true;
    return;
  }
  const regu = /[^\u4e00-\u9fa5a-zA-Z\d·]+/;
  const re = new RegExp(regu);
  if (!formData.value.sex) {
    Toast('请选择性别');
  } else if (!formData.value.birthday) {
    Toast('请选择生日');
  } else if (!formData.value.provinceCode || !formData.value.cityCode) {
    Toast('请选择省/市/区');
  } else {
    submit();
  }
};

// 初始化地址库-省
const initProvince = async () => {
  addressOptions.value = await getAddress(0);
  let province = await getAddress(0);
  province = province.filter((item) => item.seqCode !== 'ACX-000');
  province = province.filter((item) => item.seqCode !== 'EC');
  addressOptions.value = province;
};

// 判断开卡
// const isOpenCard = () => {
//   Toast.loading({
//     message: '加载中...',
//     forbidClick: true,
//   });
//   cjwxRequest.post('/crmCard/common/coupon/getOpenCardStatusWithOutSelf', {
//     activityId,
//     venderId: 599119,
//     pin,
//   })
//     .then((data) => {
//       if (data.isOk) {
//         openCard.value = data.openCard;
//         if (!openCard.value) {
//           overlay.value.openCard = true;
//         }
//       }
//     });
// };

// 初始化地址库
initProvince();
activityContent();
if (!isOpenCard) {
  openCard.value = true;
}
// isOpenCard();

// getActivityInfo();
</script>

<style lang="scss">
</style>
