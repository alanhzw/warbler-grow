<template>
  <div class="inxex">
    <div class="piaodai">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/210427/10/10889/60897/61a43ff0Eb4390a72/63b42749967ed7ce.png"
      />
    </div>
    <div class="piaodai2">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/210427/10/10889/60897/61a43ff0Eb4390a72/63b42749967ed7ce.png"
      />
    </div>
    <div class="logo">
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/138123/10/26879/188861/61a43ff1E8ef04abe/0632cf04b121202a.png"
      />
    </div>
    <div class="form">
      <div class="box">
        <span>姓名（必填）</span>
        <input type="text" :maxlength="10" v-model="formData.name" :disabled="record.name" />
      </div>
      <div class="box">
        <span>性别（必填）</span>
        <p @click="pickerShow('sex')">
          {{ sexText }}
          <img
            src="//img10.360buyimg.com/imgzone/jfs/t1/221605/27/4210/210/61a43ff1E464c44a4/c9c575a874215ded.png"
            :class="{ 'active': overlay.sex }"
            class="animation"
          />
        </p>
      </div>
      <div class="box">
        <span>生日（必填）</span>
        <p @click="pickerShow('birthday')">
          {{ formData.birthday }}
          <img
            src="//img10.360buyimg.com/imgzone/jfs/t1/221605/27/4210/210/61a43ff1E464c44a4/c9c575a874215ded.png"
            :class="{ 'active': overlay.birthday }"
            class="animation"
          />
        </p>
      </div>
    </div>
    <div>
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/158980/37/21166/45720/61a43ff0E1aa2636c/bbc6200b64cd0768.png"
        class="confirm"
        @click="confirm"
      />
    </div>
  </div>
  <!-- 入会弹窗 -->
  <van-popup v-model:show="overlay.openCard" :close-on-click-overlay="false">
    <div>
      <img
        src="//img10.360buyimg.com/imgzone/jfs/t1/204712/36/15939/25496/61a43ff1E98d2b80f/abc772baf489461c.jpg"
        class="open-card-img"
      />
      <div class="open-card-close" @click="overlay.openCard = false"></div>
      <div class="go-open-card" @click="gotoOpenCard"></div>
    </div>
  </van-popup>
  <!-- 性别弹窗 -->
  <van-popup v-model:show="overlay.sex" position="bottom">
    <van-picker title="性别" :columns="sexColumns" @confirm="sexConfirm" @cancel="onCancel"></van-picker>
  </van-popup>
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
</template>

<script lang='ts' setup>
import {
  ref, inject, reactive, computed,
} from 'vue';
import {
  Toast,
  Popup as vanPopup,
  Picker as vanPicker,
  DatetimePicker as vanDatetimePicker,
} from 'vant';
import dayjs from 'dayjs';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import './css/index.scss';

const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const openCard: boolean = inject('isOpenCard') as boolean;
// let openCard = false;
// 获取基本信息
const {
  activityId, actName, pin, venderId,
} = baseInfo;

// 设置页面title
document.title = actName;

// 主接口 获取规则;
const rule = ref('');
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

const overlay = ref({
  sex: false,
  birthday: false,
  openCard: false,
});
const sexColumns = [{ text: '男', key: 'M' }, { text: '女', key: 'F' }, { text: '保密', key: 'U' }];
const currentDate = new Date(1995, 0, 1);
const formData = ref({
  activityId,
  venderId,
  pin,
  name: '',
  sex: '',
  birthday: '',
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
});
let hasPer = false;
let sendPoint = 0;

const sexText = computed(() => {
  if (formData.value.sex) {
    return sex[formData.value.sex];
  }
  return '';
});

const sexConfirm = (value: any) => {
  formData.value.sex = value.key;
  overlay.value.sex = false;
};

const gotoOpenCard = () => {
  const returnUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000396688&channel=401&returnUrl=${returnUrl}`;
};

const dateConfirm = (value: string) => {
  formData.value.birthday = dayjs(value).format('YYYY-MM-DD');
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
const activityContent = (callback: ((res: any) => void) | any) => {
  cjwxRequest.post('/crm/ysl/perfec/activityContent', {
    pin,
    activityId,
  }).then((data) => {
    if (data.result) {
      hasPer = !data.data.hasPerfec;
      sendPoint = data.data.record.sendPoint;
      if (!data.data.record) return;
      if (data.data.record.name) {
        formData.value.name = data.data.record.name;
        record.value.name = true;
      }
      if (data.data.record.sex) {
        formData.value.sex = data.data.record.sex;
        record.value.sex = true;
      }
      if (data.data.record.birthday) {
        formData.value.birthday = data.data.record.birthday;
        record.value.birthday = !data.data.birthHasPerTimes;
      }
    }
    callback(data);
  }).finally(() => {
    Toast.clear();
  });
};

const submit = () => {
  Toast.loading({
    message: '提交中...',
    forbidClick: true,
    duration: 0,
  });
  cjwxRequest.post('/crm/ysl/perfec/save', formData.value).then((data) => {
    if (data.result) {
      activityContent(() => {
        if (sendPoint === 0) {
          Toast.success('成功领取50积分！');
        } else {
          Toast.success('填写成功！');
        }
      });
    } else if (data.errorMessage === '重复请求:improveMember') {
      Toast.fail('您的操作太过频繁，请稍后再试！');
    } else {
      Toast.fail(data.errorMessage);
    }
  }).catch((data) => {
    Toast.fail('哎呀，服务器有点小问题，稍后再试吧');
  });
};

const confirm = () => {
  if (!openCard) {
    overlay.value.openCard = true;
    return;
  }
  if (hasPer) {
    Toast('您已提交过信息');
    return;
  }
  const regu = /[^\u4e00-\u9fa5a-zA-Z\d·]+/;
  const re = new RegExp(regu);
  if (!formData.value.name) {
    Toast('请输入姓名');
  } else if (!formData.value.sex) {
    Toast('请选择性别');
  } else if (!formData.value.birthday) {
    Toast('请选择生日');
  } else {
    submit();
  }
};

// const getOpenCard = () => {
//   cjwxRequest.post('/crmCard/common/coupon/getOpenCardStatusWithOutSelf', {
//     venderId: 599119,
//     activityId,
//   }).then((res) => {
//     openCard = res.openCard;
//     if (!openCard) {
//       overlay.value.openCard = true;
//     }
//   });
// };
Toast.loading({
  message: '加载中...',
  forbidClick: true,
  duration: 0,
});
activityContent(() => {
  if (!openCard) {
    overlay.value.openCard = true;
    console.log(openCard);
  }
  Toast.clear();
});
// getActivityInfo();
// getOpenCard();
</script>

<style lang="scss">
</style>
