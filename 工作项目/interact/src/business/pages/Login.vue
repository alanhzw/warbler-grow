<!--
 * @Author: YC
 * @Date: 2020-12-11 11:27:10
 * @LastEditors: YC
 * @LastEditTime: 2020-12-21 20:13:08
 * @Description: 用于模拟登录
-->
<template>
  <div class="login-form">
    <lz-form ref="form" :model="form">
      <lz-form-item>
        <lz-input placeholder="账户" v-model="form.username"></lz-input>
      </lz-form-item>
      <lz-form-item>
        <lz-input placeholder="密码" v-model="form.password"></lz-input>
      </lz-form-item>
      <lz-form-item style="margin-bottom: 0">
        <lz-button type="primary" @click="onSubmit">登录</lz-button>
      </lz-form-item>
    </lz-form>
  </div>
</template>
<script>
import { CrmbService } from '@/business/service';
import Qs from 'qs';
import CONST from '@/utils/constant';
import { Message } from 'lz-element-ui';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async onSubmit() {
      // 登录
      const tokenRes = await CrmbService.login(Qs.stringify(this.form));
      // 写入token
      localStorage.setItem(CONST.LZ_CRM_BIZ_TOKEN, tokenRes.data);
      // 获取账户信息
      const infoRes = await CrmbService.getAccountInfo();
      if (Array.isArray(infoRes.data.shops) && infoRes.data.shops.length > 0) {
        // 如果账户下有店铺就获取对应店铺的SSO
        const shopId = infoRes.data.shops[0].shopId;
        await CrmbService.bindShop({ shopId });
        this.$router.replace('/square');
      } else {
        Message.warning('此账户下无关联店铺');
        // alert('此账户下无关联店铺');
      }
    },
  },
};
</script>

<style lang="scss">
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  background-color: #ffffff;
  transform: translate(-50%, -50%);
  padding: 30px;
  border-radius: 4px;
  .el-button {
    width: 100%;
  }
}
</style>
