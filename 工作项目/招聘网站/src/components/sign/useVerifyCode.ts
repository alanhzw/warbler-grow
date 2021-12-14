import {
  ref, Ref, reactive, computed,
} from 'vue';
import { CommonService } from '@/service';

export const account = reactive({
  captcha: '',
  mobile: '',
});

const counter: Ref<number> = ref(-1);

export const counterStr = computed(() => {
  if (counter.value < 0) {
    return '获取验证码';
  } if (counter.value === 0) {
    return '重新获取';
  }
  return `${counter.value}s`;
});

const startCD = (seconds = 60) => {
  counter.value = seconds;
  const interval = setInterval(() => {
    if (counter.value > 0) {
      counter.value -= 1;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

export const sendSMS = async () => {
  if (counter.value > 0) return;
  await CommonService.sendSMS({
    mobile: account.mobile,
  });
  startCD();
};

export const login = async () => {
  const result = await CommonService.loginWithCode(account);
  return result;
};

// {
//   // const { token, ...userInfo } =
//   // store.commit('setToken', token);
//   // console.log('🚀 ~ login ~ store', store);
//   // store.commit('user/setUser', userInfo);
//   // return { token, ...userInfo };
//   return
// };
