/*
 * @Author: YC
 * @Date: 2020-12-14 15:28:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-22 15:51:53
 * @Description:
 */

console.log('process.env.VUE_APP_PLATEFORM: ', process.env);

export default {
  LZ_CRM_BIZ_TOKEN: 'LZ_CRM_BIZ_TOKEN',
  LZ_CRM_CUSTOMER_TOKEN: 'LZ_CRM_CUSTOMER_TOKEN',
  LZ_SSO_TOKEN: 'LZ_SSO_TOKEN',
  LZ_JD_CUSTOMER_TOKEN: 'LZ_JD_CUSTOMER_TOKEN',
  LZ_DECO_CUSTOMER_TOKEN: 'LZ_DECO_CUSTOMER_TOKEN',
  LZ_DECO_CUSTOMER_SHOPID: 'LZ_DECO_CUSTOMER_SHOPID',
  LZ_CRM_BIZ_USER: 'LZ_CRM_BIZ_USER',
  // sso 过期通信
  LZ_EVENT_SSO_TOKEN_EXPIRE: 'LZ_EVENT_SSO_TOKEN_EXPIRE',
  // 京东图片空间前缀，pc端暂时使用主图的，这个地方可以按照需要的尺寸
  IMAGE_PREFIX: process.env.VUE_APP_PLATEFORM === 'tmall' ? '' : 'https://img10.360buyimg.com/imgzone/',
  IMAGE_PREFIX_340: process.env.VUE_APP_PLATEFORM === 'tmall' ? '' : 'https://img10.360buyimg.com/n1/',
  IMAGE_PREFIX_160: process.env.VUE_APP_PLATEFORM === 'tmall' ? '' : 'https://img10.360buyimg.com/n2/',
  IMAGE_PREFIX_130: process.env.VUE_APP_PLATEFORM === 'tmall' ? '' : 'https://img10.360buyimg.com/n3/',
  IMAGE_PREFIX_100: process.env.VUE_APP_PLATEFORM === 'tmall' ? '' : 'https://img10.360buyimg.com/n4/',
  IMAGE_PREFIX_50: process.env.VUE_APP_PLATEFORM === 'tmall' ? '' : 'https://img10.360buyimg.com/n5/',
  IMAGE_PREFIX_240: process.env.VUE_APP_PLATEFORM === 'tmall' ? '' : 'https://img10.360buyimg.com/n6/',
  IMAGE_PREFIX_220: process.env.VUE_APP_PLATEFORM === 'tmall' ? '' : 'https://img10.360buyimg.com/n7/',
  IMAGE_PREFIX_N8: process.env.VUE_APP_PLATEFORM === 'tmall' ? '' : 'https://img10.360buyimg.com/n8/'
};
