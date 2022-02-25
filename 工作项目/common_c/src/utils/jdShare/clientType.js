import { Jdsdk } from './jdsdk';

// eslint-disable-next-line no-shadow
export const CLIENT_TYPE = {
  JDAPP: 'JDApp',
  WECHAT: 'WeChat',
  QQ: 'QQ',
  OTHER: 'other',
};

export default CLIENT_TYPE;

/**
 * 获取当前的客户端类型
 * 这块主要是参照原先三合一工程中wxcomponents.js的判断方式
 * TODO: 微信小程序的相关支持可能需要在这里添加一些处理
 */
export const getClientType = () => {
  // 先试用jdsdk判断一下
  if (Jdsdk.Client.isJDApp()) {
    // return CLIENT_TYPE_JDAPP;
    return CLIENT_TYPE.JDAPP;
  }
  if (Jdsdk.Client.isWeixin()) {
    return CLIENT_TYPE.WECHAT;
  }
  if (Jdsdk.Client.isQQ()) {
    return CLIENT_TYPE.QQ;
  }
  // jdsdk没判断出来结果，再根据UA判断一下
  const ua = navigator.userAgent;
  if (/jdapp/i.test(ua)) {
    return CLIENT_TYPE.JDAPP;
  }
  if (/MicroMessenger/i.test(ua)) {
    return CLIENT_TYPE.WECHAT;
  }
  if (/MQQBrowser/i.test(ua)) {
    return CLIENT_TYPE.QQ;
  }
  return CLIENT_TYPE.OTHER;
};

/**
 * 判断是否是PC端(区分pc端模拟)
 * */
export function isPC() {
  // 检测平台
  const p = navigator.platform;
  const pc1 = p.indexOf('Win') === 0;
  const pc2 = p.indexOf('Mac') === 0;
  return pc1 || pc2;
}
