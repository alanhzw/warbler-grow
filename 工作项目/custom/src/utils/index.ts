import { Toast } from 'vant';

import constant from '@/utils/constant';
import { reportPV } from '@/utils/trackEvent/jdReport';
import { loadScript, parsePathByPattern } from '@/utils/client';
import { BaseInfo } from '@/types/BaseInfo';
import { ActivityStatus } from '@/types/ActivityStatus';
import { InitRequest } from '@/types/InitRequest';
import { InitResponse } from '@/types/InitResponse';

import ClickTrackingPlugin from '@/plugins/ClickTracking';
import CjwxUtil from './products/cjwx';
import platforms from './platforms';
import { reportPageEnter } from './trackEvent/cjwxReport';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

// 显示控制台
export const enableVConsole = async (): Promise<void> => {
  await loadScript('https://cdn.bootcdn.net/ajax/libs/vConsole/3.7.0/vconsole.min.js');
  if (window.VConsole) {
    const vc = new window.VConsole();
  }
};

// 检查调试状态
async function checkDebug(pathParams: { [propName: string]: string; }) {
  if (isDev) {
    console.log('🚀 ~ init ~ env', process.env);
  }

  console.log('🚀 ~ init ~ pathParams', pathParams);

  if ('debug' in pathParams) {
    await enableVConsole();
  }
}

/**
 * 检查活动状态
 * @param baseInfo 活动信息
 * @param autoUnStart 是否显示未开始页面
 * @param showFinishedPage 是否显示未开始页面
 */
async function checkStatus(baseInfo: BaseInfo, showUnStartPage: boolean, showFinishedPage: boolean) {
  if (isProd) {
    const { status } = baseInfo;
    if (status === ActivityStatus.finish && showFinishedPage) {
      console.log('已结束');
      window.location.href = `/m/common/finished?shopId=${baseInfo.shopId}`;
      throw Error('活动已经结束');
    } else if (status === ActivityStatus.notStarted && showUnStartPage) {
      console.log('未开始');
      window.location.href = `/m/common/not-start?shopId=${baseInfo.shopId}&startTime=${baseInfo.startTime}&from=${encodeURIComponent(window.location.href)}`;
      throw Error('活动尚未开始');
    }
  }
}

// 检查开卡状态
async function getIsOpenCard(checkOpenCard: boolean, venderId: string, activityId: string, openCardLink: string | undefined) {
  const isOpenCard = checkOpenCard && await CjwxUtil.getOpenCardStatus(venderId, activityId);

  console.log('🚀 ~ init ~ isOpenCard', isOpenCard);

  // 如果配置了开卡链接，且用户未开卡的时候自动跳转到配置的开卡页面
  if (!isOpenCard && openCardLink) {
    window.location.href = openCardLink;
    throw Error('去开卡');
  }

  return isOpenCard;
}

// pv埋点
async function pv(config: InitRequest, baseInfo: BaseInfo, pathParams: { [propName: string]: string; }) {
  if (isProd) {
    try {
      const { venderId, activityId, activityType, jdActivityId, shopId, pin } = baseInfo;
      const { adSource, subType } = pathParams;
      const { trackable = true, jdTrackable = true } = config;

      if (trackable) {
      // 超级无线pv
        reportPageEnter({ venderId, activityId, adSource, activityType, subType });
      }
      if (jdTrackable) {
      // 子午线pv
        reportPV({ shopId, pin, jdActivityId, activityType, shareUserId: pathParams.shareUserId });
      }
    } catch (e) {
      console.error(e);
    }
  }
}

// 缓存
function setCache(config: InitRequest, baseInfo: BaseInfo) {
  const { venderId, activityId, shopId, pin, jdActivityId, activityType } = baseInfo;
  const { trackable = true, jdTrackable = true } = config;

  sessionStorage.setItem(constant.LZ_JD_USER_PIN, pin);
  // 商家id
  sessionStorage.setItem(constant.LZ_VENDER_ID, venderId);
  // 店铺id
  sessionStorage.setItem(constant.LZ_SHOP_ID, shopId);
  // 活动id
  sessionStorage.setItem(constant.LZ_ACTIVITY_ID, activityId);
  // 京东活动id
  sessionStorage.setItem(constant.LZ_JD_ACTIVITY_ID, jdActivityId);
  // 活动类型
  sessionStorage.setItem(constant.LZ_ACTIVITY_TYPE, activityType);
  // 京东子午线埋点
  sessionStorage.setItem(constant.LZ_JD_TRACKABLE, jdTrackable.toString());
  // 业务埋点
  sessionStorage.setItem(constant.LZ_TRACKABLE, trackable.toString());
}

/**
 * 初始化页面
 * @param config 页面初始化配置
 * @returns InitResponse
 */
export const init = async (config: InitRequest): Promise<InitResponse> => {
  const { openCardLink, sysCode = 'cjwx', urlPattern, checkOpenCard = true, showUnStartPage = true, showFinishedPage = true } = config;

  try {
    Toast.loading({ message: '加载中...', duration: 0 });

    const pathParams: { [propName: string]: string; } = parsePathByPattern(urlPattern);

    const { venderId, activityId } = pathParams;

    // 检查调试状态
    await checkDebug(pathParams);

    if (sysCode === 'cjwx') {
      // 获取活动基础信息
      const baseInfo: BaseInfo = await CjwxUtil.init(config, pathParams) as BaseInfo;

      console.log('🚀 ~ init ~ baseInfo', baseInfo);

      // 检查活动状态
      checkStatus(baseInfo, showUnStartPage, showFinishedPage);

      // 检查开卡状态
      const isOpenCard = await getIsOpenCard(checkOpenCard, venderId, activityId, openCardLink);

      // 缓存活动信息
      setCache(config, baseInfo);

      // 记录pv数据上报
      pv(config, baseInfo, pathParams);

      return { baseInfo, isOpenCard, pathParams };
    }
  } finally {
    Toast.clear();
  }

  return { baseInfo: null, isOpenCard: null, pathParams: {} };
};

// 点击埋点插件埋点
export const clickTracking = ClickTrackingPlugin;

// 导出platforms里面的方法
export const { gotoSkuPage, gotoShopPage, getToken, setHeaderShare, callShare, getClientType, isMiniProgram } = platforms;

export default {
  // 初始化
  init,
  // 点击埋点插件
  clickTracking,
  // 跳转到sku页面
  gotoSkuPage,
  // 跳转到店铺首页
  gotoShopPage,
  // 设置头部分享
  setHeaderShare,
  // 唤起分享
  callShare,
  // 获取客户端类型
  getClientType,
  // 是否是小程序
  isMiniProgram,
};
