/*
 * @Author: YC
 * @Date: 2021-07-12 08:48:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-26 10:10:45
 * @Description: 超级无线（定制）工程中的工具方法
 */
import constant from '@/utils/constant';
import JD from '@/utils/platforms';
import { cjwxRequest } from '@/utils/service';
import { ActivityBaseInfo } from '@/types/ActivityBaseInfo';
import { ActivityStatus } from '@/types/ActivityStatus';
import { BaseInfo } from '@/types/BaseInfo';
import { InitRequest } from '@/types/InitRequest';
import { PinRequestParams } from './types/PinRequestParams';
import { PinResponse } from './types/PinResponse';
import { SystemConfig } from './types/SystemConfig';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

/**
 * 获取pin
 * @param params
 */
const getJdPin = async (params: PinRequestParams): Promise<PinResponse> => {
  const { data } = await cjwxRequest.post('/customer/getMyPing', {
    token: params.token,
    fromType: params.fromType,
    userId: params.venderId,
  });
  // 风控用户跳转
  if (data === '400001') {
    window.location.href = `${window.location.origin}/common/riskInfo?shopId=${params.venderId}`;
  }
  return {
    pin: data.secretPin,
    nickname: data.nickname,
  };
};

/**
 * 启动时通过一个Get请求获取鉴权相关cookie信息
 */
export const startUp = (): Promise<void> => cjwxRequest.get('/wxCommonInfo/token');

/**
 * 获取活动信息
 * @param activityId 活动ID
 */
async function getActivityBaseInfo(activityId: string): Promise<ActivityBaseInfo> {
  const { data } = await cjwxRequest.get('/common/brand/getSimpleActInfoVo', { params: { activityId } });
  return data;
}

/**
 * 设置京口令/H5页面数据信息
 * false:京口令
 * true:H5
 * @param activityId
 * @param activityType
 * @return
 */
async function getSystemConfig(activityId: string, activityType: string): Promise<SystemConfig> {
  const { data } = await cjwxRequest.post('/wxCommonInfo/getSystemConfigForNew', { activityId, activityType });
  return data;
}

/**
 * 获取活动状态
 * @param baseInfo
 * @returns 0:
 */
function getActivityStatus(baseInfo: ActivityBaseInfo): ActivityStatus {
  const time = new Date().getTime();
  if (time > baseInfo.endTime) {
    return ActivityStatus.finish;
  }
  if (time < baseInfo.startTime) {
    return ActivityStatus.notStarted;
  }
  return ActivityStatus.normal;
}

// 获取分享方式
// 参考： https://lucidata.yuque.com/docs/share/e4a5adf6-b3c3-440b-829d-721dc936ce04
async function getShareType(activityId: string, activityType: string): Promise<string> {
  try {
    const systemConfig: SystemConfig = await getSystemConfig(activityId, activityType);
    console.log('systemConfig', systemConfig);
    // 0--京口令，1--h5，2--小程序，masterSwitch--总开关，activitySwitch--单独活动开关(默认为-1，也就是没有启用开关)
    if (systemConfig.activitySwitch === -1) {
      if (systemConfig.activityTypeSwitch === -1) {
        return systemConfig.masterSwitch.toString();
      }
      return systemConfig.activityTypeSwitch.toString();
    }
    return systemConfig.activitySwitch.toString();
  } catch (e) {
    console.error(e);
    return '0';
  }
}

// 分享拦截器
async function shareInterceptor(shareType: string, activityId: string) {
  if (isProd) {
    if (shareType === JD.SHARE_TYPE.MINIAPP && (JD.getClientType() === JD.CLIENT_TYPE.WECHAT)) {
      const isMiniProgram = await JD.isMiniProgram();
      console.log('isMiniProgram', isMiniProgram);
      // 并且不是微信的小程序里面
      if (!isMiniProgram) {
        console.log('小程序落地页');
        window.location.href = `${process.env.VUE_APP_HOST}/miniProInfo/indexPage?activityId=${activityId}&mpUrl=${encodeURIComponent(window.location.href)}`;
        throw Error('小程序落地页');
      }
    } else if (shareType === JD.SHARE_TYPE.CMD && (JD.getClientType() === JD.CLIENT_TYPE.WECHAT)) {
      console.log('H5落地页');
      window.location.href = `${process.env.VUE_APP_HOST}/miniProInfo/indexPageDzNew/${activityId}/?activityId=${activityId}&mpUrl=${encodeURIComponent(window.location.href)}`;
      throw Error('H5落地页');
    }
  }
}

// 获取PING
export async function getPin(venderId: string) {
  if (isDev) {
    return {
      pin: process.env.VUE_APP_MOCK_PIN,
      nickname: process.env.VUE_APP_MOCK_NANE,
    };
  }
  // 获取getPin所需参数
  const params = await JD.getToken();

  // 获取pin
  const pinResponse = await getJdPin({ ...params, venderId });

  console.log('pinResponse', pinResponse);

  return pinResponse;
}

/**
 * 判断是否开卡
 */
async function getOpenCardStatus(venderId: string, activityId: string): Promise<boolean> {
  const res = await cjwxRequest.post('/crmCard/common/coupon/getOpenCardStatusWithOutSelf', { venderId, activityId });
  return res.openCard;
}

// 初始化
async function init(config: InitRequest, pathParams: { [propName: string]: string }): Promise<BaseInfo> {
  // 启动检查
  await startUp();

  // 活动ID
  const activityId: string = config.activityId ?? pathParams.activityId;

  // 活动类型
  const activityType: string = config.activityType ?? pathParams.activityType ?? '99';

  // venderId
  const venderId: string = config.venderId ?? pathParams.venderId;

  // 获取用户pin
  const userPin = await getPin(venderId);

  // 分享方式（京口令，H5，小程序）
  const shareType = await getShareType(activityId, activityType);

  // 分享拦截器
  await shareInterceptor(shareType, activityId);

  // 获取活动的基础信息
  const activityBaseInfo: ActivityBaseInfo = await getActivityBaseInfo(activityId);

  // 缓存分享方式
  window.sessionStorage.setItem(constant.LZ_SHARE_TYPE, shareType);

  // 将用户的pin填入sessionStorage
  window.sessionStorage.setItem(constant.LZ_JD_USER_PIN, userPin.pin);

  return {
    ...activityBaseInfo,
    ...userPin,
    status: getActivityStatus(activityBaseInfo),
    activityId,
    venderId,
    shareType,
  };
}

export default {
  init,
  startUp,
  getPin,
  getOpenCardStatus,
};
