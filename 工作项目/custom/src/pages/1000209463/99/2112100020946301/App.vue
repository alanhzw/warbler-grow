<template>
  <div class="inxex" v-cloak>
    <div class="form">
      <div class="box" style="margin-top: 1.4rem; height: .6rem">
        <!--        <spFan>姓名（必填）</span>-->
        <input class="name-input" type="text" :maxlength="10" v-model="formData.name" placeholder="请输入姓名"/>
        <div v-if="nameMask" class="forbidden-name"></div>
      </div>
      <div v-if="sexMask" class="box">
<!--        {{sexText}}-->
        <RadioGroup style="margin-left: 1rem;" direction="horizontal" v-model="formData.sex" disabled>
          <Radio name="M" shape="square" style="font-weight: 600">男</Radio>
          <Radio style="margin-left: .5rem;font-weight: 600" name="F" shape="square">女</Radio>
          <!--          <Radio style="margin-left: .5rem;" name="U" shape="square">保密</Radio>-->
        </RadioGroup>
      </div>
      <div v-else class="box">
        <!--        <span>性别（必填）</span>-->
        <RadioGroup style="margin-left: 1rem;font-weight: 600" direction="horizontal" v-model="formData.sex">
          <Radio name="M" shape="square" style="font-weight: 600">男</Radio>
          <Radio style="margin-left: .5rem;font-weight: 600" name="F" shape="square">女</Radio>
<!--          <Radio style="margin-left: .5rem;" name="U" shape="square">保密</Radio>-->
        </RadioGroup>
      </div>
      <div class="box" style="margin-top: .6rem">
        <!--        <span>生日（必填）</span>-->
        <input @click="birthHasPerTimes?pickerShow('birthday'):''" v-model="formData.birthday" placeholder="请输入生日 >" readonly/>
<!--          {{ formData.birthday }}-->
      </div>
      <div v-if="addMask" class="box" style="margin: 0.7rem 0 0 1rem;">{{addressCode}}</div>
      <div v-else class="box" @click='addressSelects=true' style="margin-top: .7rem">
        <input class="input-black" type='text' readonly v-model='addressCode' placeholder="请选择地区 >">
      </div>
      <div v-if="locationMask" class="box" style="margin: 0.5rem 0 0 1rem;">{{formData.location}}</div>
      <div v-else class="box" style="margin-top: .55rem">
        <input type='text' v-model='formData.location' placeholder="***路**号**室">
      </div>
      <div style="margin-top: .5rem;color: #a7a7a7;font-size: .2rem;font-weight: 500;width: 100%;">
        注：若姓名、性别和地址相关信息已在品牌其他渠道进行过填写，此处将默认为已填信息，无法进行修改。</div>
    </div>
    <div class="confirm-button">
      <div class="confirm" @click="confirm"></div>
<!--      <div class="skip" @click="skip"></div>-->
    </div>
  </div>
  <!-- 入会弹窗 -->
  <Popup v-model:show="overlay.openCard" :close-on-click-overlay="false">
    <div>
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/214947/13/8516/72581/61c1483dEa43892f1/f4ba605250f1ecb0.png"
        class="open-card-img"
      />
      <div class="open-card-close" @click="overlay.openCard = false"></div>
      <div class="go-open-card" @click="gotoOpenCard"></div>
    </div>
  </Popup>
  <!-- 性别弹窗 -->
<!--  <Popup v-model:show="overlay.sex" position="bottom">-->
<!--    <Picker title="性别" :columns="sexColumns" @confirm="sexConfirm" @cancel="onCancel"></Picker>-->
<!--  </Popup>-->
  <!-- 生日弹窗 -->
  <Popup v-model:show="overlay.birthday" position="bottom">
    <DatetimePicker
      v-model="currentDate"
      title="生日"
      type="date"
      :min-date="new Date(1900, 1, 1)"
      :max-date="new Date()"
      @confirm="dateConfirm"
      @cancel="onCancel"
    ></DatetimePicker>
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
      @close="addressSelects = false"
      @change="onAddressChange"
    />
  </Popup>
</template>

<script lang='ts' setup>
import {
  ref, inject, reactive, computed,
} from 'vue';
import {
  Toast,
  Popup,
  Area,
  Picker,
  DatetimePicker,
  Cascader,
  RadioGroup,
  Radio,
} from 'vant';
import dayjs from 'dayjs';
// import { areaList } from '@vant/area-data';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import './css/index.scss';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const openCard: boolean = inject('isOpenCard') as boolean;
// const openCard = true;
// let openCard = false;
// 选择地区
const addressSelects = ref(false);
const addressCode = ref('');

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

// const sexColumns = [{
//   text: '男',
//   key: 'M',
// }, {
//   text: '女',
//   key: 'F',
// }, {
//   text: '保密',
//   key: 'U',
// }];
const currentDate = new Date();
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
  // U: '保密',
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
const birthHasPerTimes = ref(false);
const radio = ref('');
// 姓名遮罩
const nameMask = ref(false);
// 性别遮罩
const sexMask = ref(false);
// 当前选中的地址
const currentAddress = ref('');
// 地址遮罩
const addMask = ref(false);
// 详细地址遮罩
const locationMask = ref(false);
// 地址控件
const addressOptions = ref<any[]>([]);

const sexText = computed(() => {
  if (formData.value.sex) {
    return sex[formData.value.sex];
  }
  return '';
});

// 获取地址
const getAddress = async (seqCode: number): Promise<any[]> => {
  const { data } = await cjwxRequest.post('/crm/lorealpro/perfec/getAddress', {
    pin,
    activityId,
    seqCode,
  });
  return data;
};

// 当地址控件选择改变的时候触发
const onAddressChange = async ({
  value,
  selectedOptions,
  tabIndex,
}) => {
  if (!selectedOptions[tabIndex].children) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    // 先获取 获取数据
    const addressArr = await getAddress(value);
    if (addressArr.length !== 0 && tabIndex < 2) {
      selectedOptions[tabIndex].children = await getAddress(value);
    } else {
      const values = selectedOptions.map((o: any) => o.value);
      const seqCodes = selectedOptions.map((o: any) => o.seqCode);
      const [provinceCode, cityCode, countyCode] = seqCodes;

      formData.value.provinceCode = provinceCode;
      formData.value.cityCode = cityCode;
      formData.value.countyCode = countyCode;
      addressSelects.value = false;
      addressCode.value = values.join(' ');
      // console.log('provinceCode, cityCode, countyCode', provinceCode, cityCode, countyCode);
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
// const getOpenCard = () => {
//   cjwxRequest.post('/crmCard/common/coupon/getOpenCardStatusWithOutSelf', {
//     venderId: 599119,
//     activityId,
//   }).then((res) => {
//     openCard = res.openCard;
//     if (!openCard) {
//       // overlay.value.openCard = true;
//       // eslint-disable-next-line no-use-before-define
//       gotoOpenCard();
//     }
//   });
// };

// const sexConfirm = (value: any) => {
//   formData.value.sex = value.key;
//   overlay.value.sex = false;
// };

const gotoOpenCard = () => {
  const returnUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000209463&channel=401&returnUrl=${returnUrl}`;
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
    // sex: false,
    birthday: false,
    openCard: false,
  };
};

const pickerShow = (type: string) => {
  // if (type === 'sex') {
  //   if (record.value.sex) return;
  //   overlay.value.sex = true;
  // }
  if (type === 'birthday') {
    if (record.value.birthday) return;
    overlay.value.birthday = true;
  }
};

const submit = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/crm/lorealpro/perfec/save', formData.value)
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
  // if (!openCard) {
  //   overlay.value.openCard = true;
  //   return;
  // }
  const regu = /[^\u4e00-\u9fa5a-zA-Z\d·]+/;
  const re = new RegExp(regu);
  // submit();
  if (!formData.value.name) {
    Toast('请输入姓名');
  } else if (!formData.value.sex) {
    Toast('请选择性别');
  } else if (!formData.value.birthday) {
    Toast('请选择生日');
  } else if (!formData.value.provinceCode || !formData.value.cityCode) {
    Toast('请选择地区');
  } else {
    submit();
  }
// else if (re.test(formData.value.name)) {
//     Toast('姓名不可以存在特殊字符');
//   }
};
// 回显地址
const initAdress = async (searchValue: any, compareCode: any) => {
  const Options: any[] = await getAddress(searchValue);
  const realArray: any[] = Options.filter((item) => item.seqCode === compareCode);
  return realArray;
};
const activityContent = async () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/lorealpro/perfec/activityContent', {
    pin,
    activityId,
  })
    .then(async (data) => {
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
        }
        if (data.data.record.location) {
          formData.value.location = data.data.record.location;
          locationMask.value = true;
        }
        if (data.data.record.provinceCode) {
          addMask.value = true;
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
        // console.log(textProvince);
      }
      // console.log(data);
      Toast.clear();
    });
};

// 初始化地址库-省
const initProvince = async () => {
  let province = await getAddress(0);
  province = province.filter((item) => item.seqCode !== 'ACX-000');
  province = province.filter((item) => item.seqCode !== 'EC');
  province = province.filter((item) => item.seqCode !== 'QT');
  addressOptions.value = province;
};

// 判开卡弹窗
if (!openCard) {
  overlay.value.openCard = true;
}
// 初始化地址库
initProvince();
activityContent();
// getOpenCard();

// getActivityInfo();
</script>

<style lang="scss">
</style>
