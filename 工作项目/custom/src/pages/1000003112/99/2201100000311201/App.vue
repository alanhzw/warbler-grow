<template>
  <div class="main-kv">
    <div class="question-one-bg">
      <div class="select-area">
        <CheckboxGroup v-model="selectText" ref="checkboxGroup">
          <Checkbox name="早产儿">
            早产儿
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </Checkbox>
          <Checkbox name="乳糖不耐受（腹泻）">
            乳糖不耐受<span class="small-font">（腹泻）</span>
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </Checkbox>
          <Checkbox name="小敏感（皮肤红疹、经常打喷嚏、流鼻涕或鼻塞、便便异常、经常放屁、频繁吐奶、经常揉鼻子或揉眼睛）">
            小敏感<span class="small-font">（皮肤红疹、经常打喷嚏、流鼻涕或
            鼻塞、便便异常、经常放屁、频繁吐奶、经常揉
            鼻子或揉眼睛）</span>
            <template #icon="props">
              <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            </template>
          </Checkbox>
        </CheckboxGroup>
        <Checkbox name="无" v-model="noneText" @click="revertAll">
          无
          <template #icon="props">
            <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
          </template>
        </Checkbox>
      </div>
    </div>
    <div class="question-two-bg">
      <div class="question-two-text">
        <div @click="birthSelects = true" class="data-format">
          <input
            type="text"
            v-model="dateArray[0]"
            readonly="readonly"
          />
          年
          <input
            type="text"
            v-model="dateArray[1]"
            readonly="readonly"
          />
          月
          <input
            type="text"
            v-model="dateArray[2]"
            readonly="readonly"
          />
          日
        </div>
      </div>
    </div>
    <div class="commit-btn" @click="checkInfo"></div>
  </div>
  <!--  弹窗组件-->
  <Popup class="popup" v-model:show="maskShow" :close-on-click-overlay="false">
    <open-card-window @openCard="toOpen" @closeMem="closeWindow" v-if="windowName === 'openWin'"></open-card-window>
    <no-lottery-window @closeNoL="closeWindow" @openOrder="goOrderPage" v-if="windowName === 'noLotteryWin'"></no-lottery-window>
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
</template>

<script lang='ts' setup>
import VueDanmaku from 'vue3-danmaku';
import { computed, inject, nextTick, Ref, ref, getCurrentInstance, watch, onMounted } from 'vue';
import { CountDown, Popup, Toast, Checkbox, CheckboxGroup, DatetimePicker } from 'vant';
import Swiper, { Autoplay } from 'swiper';
import dayjs from 'dayjs';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
import { callShare, gotoShopPage, gotoSkuPage } from '@/utils';
import { reportClick } from '@/utils/trackEvent/jdReport';
import OpenCardWindow from './components/opencardWindow.vue';
import NoLotteryWindow from './components/noLottery.vue';
import './assets/css/style.scss';

// 实例对象
const { proxy } = getCurrentInstance();
// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
const { activityId, venderId, shopId, endTime, actName, pin } = baseInfo;
// 设置页面title
document.title = actName;
// 分享渠道
const shareChannel = ['Wxfriends', 'Wxmoments', 'Sinaweibo', 'QQfriends', 'QQzone'];
// 遮罩
const maskShow = ref(false);
// 弹窗名称
const windowName = ref('');
// 是否下单
const hasOrder = ref(false);
// 是否开卡表示是否注册
// const isOpenCarded: boolean = inject('isOpenCard') as boolean;
const isOpenCarded = ref(false);
// 完善信息内容
const formData = ref({
  birthday: '',
});
// 开启弹窗
const openWindow = (name: string) => {
  windowName.value = name;
  maskShow.value = true;
};
// 关闭弹窗
const closeWindow = () => {
  maskShow.value = false;
};
// 选项内容
const selectText = ref([]);
// 选项无
const noneText = ref(false);
// 选择后图标
const activeIcon = 'https://img10.360buyimg.com/imgzone/jfs/t1/175142/13/26627/8212/61e62b72E305900f7/0a8610b3d4f1c531.png';
const inactiveIcon = 'https://img10.360buyimg.com/imgzone/jfs/t1/162638/31/26318/748/61e62b72Ec3959dc8/90a05e95602fcc23.png';
// 反选
const revertAll = () => {
  proxy.$refs.checkboxGroup.toggleAll(false);
};
onMounted(() => {
  watch(() => proxy.$refs.checkboxGroup.modelValue, () => {
    if (proxy.$refs.checkboxGroup.modelValue.length > 0) {
      noneText.value = false;
    }
  });
});
// 生日上拉弹窗
const birthSelects = ref(false);
// 最小生日
const minDate = new Date(1900, 0, 1);
// 最大生日
const maxDate = new Date();
// 当前生日
const currentDate = new Date(2000, 0, 1);
// 年月日组
const dateArray = ref([]);
// 关闭上拉框
const onCancel = () => {
  birthSelects.value = false;
};
// 时间转换
const add0 = (num: number) => (num < 10 ? `0${num}` : num);
const getDateFormat = (date: number) => {
  const time = new Date(date);
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  // const h = time.getHours();
  // const mm = time.getMinutes();
  // const s = time.getSeconds();
  return `${y} ${add0(m)} ${add0(d)} `;
};
// 确认生日
const confirmBirth = (birth: number) => {
  formData.value.birthday = getDateFormat(birth);
  dateArray.value = formData.value.birthday.split(' ');
  birthSelects.value = false;
};
// 跳转开卡
const toOpen = () => {
  const returnUrl = encodeURIComponent(window.location.href);
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000003112&shopId=1000003112&venderType=5&channel=1004&returnUrl=${returnUrl}`;
};
const goOrderPage = () => {
  window.location.href = 'https://pro.m.jd.com/mall/active/2QHtmwEvhGwoqAtz65CCG2Qed8Lv/index.html';
};
// 提交个人信息
const commitInfo = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/nestle/surveys/saveSurveys', {
    activityId,
    pin,
    venderId,
    topic: '您的宝宝是否有以下情况？',
    answer: selectText.value.length > 0 ? (selectText.value).toString() : '无',
    babyBirthday: formData.value.birthday ? dayjs(formData.value.birthday).format('YYYY-MM-DD') : '',
  }).then((res) => {
    if (res.data.isOk) {
      Toast('提交成功');
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 是否有订单
const isOrder = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/nestle/surveys/getJosOrder', {
    pin,
  }).then((res) => {
    if (res.result) {
      hasOrder.value = res.data.isOk;
      if (!hasOrder.value) {
        openWindow('noLotteryWin');
      }
    } else {
      Toast(res.errorMessage);
    }
  });
};
// 开卡状态
const checkOpenStatus = () => {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  cjwxRequest.post('/crmCard/common/coupon/getOpenCardStatusWithOutSelf', {
    venderId,
    activityId,
  }).then((res) => {
    isOpenCarded.value = res.openCard;
    if (!isOpenCarded.value) {
      openWindow('openWin');
    } else {
      isOrder();
    }
  });
};
const checkInfo = () => {
  if (noneText.value === false && selectText.value.length <= 0) {
    Toast('请填写问题');
  } else {
    commitInfo();
  }
};
// getActivityInfo();
// if (!isOpenCarded) {
//   openWindow('openWin');
// } else if () {
//
// }
checkOpenStatus();
</script>

<style lang='scss'></style>
