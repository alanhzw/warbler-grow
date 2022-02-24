/*
 * @Author: YC
 * @Date: 2020-12-14 10:44:56
 * @LastEditors: YC
 * @LastEditTime: 2020-12-14 15:17:45
 * @Description:开发环境下所须的crm接口
 */

export default {
  //  登录到crmb
  login: {
    url: '/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },

  //  获取登录账户的基本信息
  getAccountInfo: {
    url: '/get_token_info',
    method: 'GET',
  },

  //  绑定店铺
  bindShop: {
    url: '/assetBean/useDefaultshop',
    method: 'POST',
  },

  // 获取SSO token
  getSSOToken: {
    url: '/ssoToken/getSsoToken',
    method: 'GET',
  },
};
