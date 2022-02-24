<template>
  <div class="page-login">
    <div class="bg">
      <img class="bg-pic bg-lt" src="https://ired-1304913895.cos.ap-beijing.myqcloud.com/static/job/bg_lt.png">
      <img class="bg-pic bg-rb" src="https://ired-1304913895.cos.ap-beijing.myqcloud.com/static/job/bg_rb.png">
    </div>
    <div class="login-box">
      <div class="left">
        <img class="logo" src="https://ired-1304913895.cos.ap-beijing.myqcloud.com/static/ims_ired_logo.png">
        <header class="title">IRED就业创业综合服务系统</header>

        <el-tabs v-model="loginType">
          <el-tab-pane label="账号密码登录" name="account">
            <el-form>
              <el-form-item>
                <el-input placeholder="请输入账号" v-model="account.userName" oninput="if(value.length>11)value=value.slice(0,11)">
                  <template #prefix>
                    <el-icon class="el-input__icon"><cellphone /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="请输入密码" maxlength="20" v-model="account.password" type="password"
                  :prefix-icon="Lock">
                </el-input>
                <!-- <p class="tip">忘记密码 - 可联系客服解决13011824722</p> -->
              </el-form-item>
              <el-form-item>
                <el-button class="login-btn" type="primary" @click="loginWithAccount">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="mobile">
            <el-form>
              <el-form-item>
                <el-input placeholder="请输手机号" v-model="codeAccount.mobile" oninput="if(value.length>11)value=value.slice(0,11)">
                  <template #prefix>
                    <el-icon class="el-input__icon"><cellphone /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="请输验证码" v-model="codeAccount.captcha" maxlength="6"
                  :prefix-icon="Lock">
                  <template #suffix>
                    <el-button type="text" @click="sendSMS">{{counterStr}}</el-button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="login-btn" type="primary" @click="loginWithCode">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="right">
        <img class="pic" src="https://ired-1304913895.cos.ap-beijing.myqcloud.com/static/job/pic.png">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { Cellphone, Iphone, Lock } from '@element-plus/icons';
import { CommonService } from '@/service';

import {
  account as codeAccount, counterStr, sendSMS, login as loginWithCode1,
} from '../../components/sign/useVerifyCode';

const loginType = ref('account');

const account = reactive({
  userName: '',
  password: '',
});

const route = useRoute();
const router = useRouter();

const store = useStore();
const loginWithAccount = async () => {
  try {
    const { token, ...userInfo } = await CommonService.login(account);
    store.commit('setToken', token);
    store.commit('user/setUser', userInfo);

    const { returnUrl = userInfo.roles.indexOf('merchant') > -1 || userInfo.roles.indexOf('hr') > -1 ? '/business' : '/' } = route.query;
    if (returnUrl === '') {
      router.back();
    } else {
      router.replace(decodeURIComponent(returnUrl as string));
    }
  } catch (e) {
    ElMessage.error((e as Error).message);
  }
};
const loginWithCode = async () => {
  try {
    const { token, ...userInfo } = await loginWithCode1();
    store.commit('setToken', token);
    store.commit('user/setUser', userInfo);

    const { returnUrl = userInfo.roles.indexOf('merchant') > -1 || userInfo.roles.indexOf('hr') > -1 ? '/business' : '/' } = route.query;
    if (returnUrl === '') {
      router.back();
    } else {
      router.replace(decodeURIComponent(returnUrl as string));
    }
  } catch (e) {
    ElMessage.error((e as Error).message);
  }
};

</script>

<style scoped lang="scss">
.page-login {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  .bg {
    position: relative;
    width: 100%;
    height: 100%;

    .bg-pic {
      position: absolute;

      &.bg-lt {
        top: 0;
        left: 0;
        width: 435rem;
      }

      &.bg-rb {
        right: 0;
        bottom: 0;
        height: 100%;
      }
    }
  }

  .login-box {
    position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
    // width: 85.41%;
    // height: 81.48%;
    // width: 1640px;
    // height: 880px;
    box-sizing: border-box;
    padding: 0 150rem;
    left: 200rem;
    right: 200rem;
    top: 200rem;
    bottom: 200rem;
    background-color: #ffffff;
    border-radius: 40px;
    box-shadow: 0px 10px 30px 1px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    .left {
      width: 370rem;
      // margin-right: 230rem;
      // max-width: 370px;

      .logo {
        height: 63rem;
        padding-top: 30px;
      }
      .title {
	font-size: 36rem;
    font-family: Alibaba PuHuiTi-Heavy,Alibaba PuHuiTi;
    font-weight: 800;
    color: #222;
    line-height: 55rem;
    margin-top: 26rem;
    margin-bottom: 10rem;
      }

      .tip {
        font-size: 12rem;
        color: #999999;
        line-height: 14rem;
        text-align: right;
        margin-top: 12rem;
      }
      .login-btn {
        width: 100%;
      }
      .el-tabs__nav-wrap::after {
        background-color: transparent;
      }
    }
    .right {
      // width: 726.5rem;
      height: 600rem;
      max-height: 69%;
      .pic {
        height: 100%;
      }
    }
  }
}

</style>
<style lang="scss">
.el-tabs__nav-wrap::after {
  background-color: transparent;
}
</style>
