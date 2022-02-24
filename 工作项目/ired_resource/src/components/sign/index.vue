<!--
 * @Descripttion:
 * @Author: yang chenglin
 * @Date: 2021-11-21 12:40:35
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-21 21:34:09
-->
<template>
  <div class="sign-box"
       v-show="!logined">
    <header class="sign-header">获取更多职位信息</header>
    <div class="sign-item">
      <label for="mobile">手机号：</label>
      <input class="input"
             name="mobile"
             v-model="account.mobile"
             placeholder="请输入手机号">
    </div>
    <div class="sign-item">
      <label for="code">验证码：</label>
      <input class="input"
             name="code"
             v-model="account.captcha"
             placeholder="请输入验证码">
      <el-button @click="sendSMS"
                 type="text">{{counterStr}}</el-button>

    </div>
    <button class="sign-item button"
            @click="loginWithCode">登录/注册</button>
    <p class="tip">注册代表你已同意「用户协议」及「隐私保护政策」</p>
  </div>
</template>

<script setup lang="ts">
import {
  ref, Ref, reactive, computed,
} from 'vue';
import { useStore } from 'vuex';
import { CommonService } from '@/service';

import {
  account, counterStr, sendSMS, login,
} from './useVerifyCode';

const store = useStore();
const logined = computed(() => typeof store.state.token === 'string' && store.state.token !== '');

const loginWithCode = async () => {
  const { token, ...userInfo } = await login();
  store.commit('setToken', token);
  store.commit('user/setUser', userInfo);
};
</script>

<style scoped lang="scss">
@import 'styles/_variables.scss';
.sign-box {
  background-color: $MAIN_COLOR;
  padding: 40px 30px 20px;
  .sign-header {
    color: #ffffff;
    font-size: 32px;
    font-weight: 800;
    text-align: center;
    letter-spacing: 1px;
    font-family: Alibaba PuHuiTi-Heavy;
  }
  .sign-item {
    margin-top: 20px;
    height:46px;
    line-height: 46px;
    padding: 0 20px;
    border-radius: 8px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    label {
      width: 56px;
      font-size: 14px;
      font-weight: 400;
      color: #222222;
    }
    .input {
      flex: 1;
      font-size: 14px;
      border: 0;
      outline: 0;
      height: 90%;
      background-color: transparent!important;;
    }

    &.button {
      width: 100%;
      display: inline-block;
      border: 0;
      background-color: #FFEBEB;
      color: $MAIN_COLOR;
      font-size: 14px;
      box-sizing: border-box;
      .btn-submit {
        width: 100%;
        border: 0px;
        outline: 0px;
        background-color: transparent;
        color: #ED263D;
      }
    }
  }
  .tip {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 300;
    color: #FFEBEB;
    line-height: 28px;
  }
}
</style>
