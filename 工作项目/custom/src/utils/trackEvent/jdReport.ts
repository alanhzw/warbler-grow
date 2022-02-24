import CLIENT_TYPE, { getClientType } from '@/utils/platforms/clientType';
import { loadScript } from '@/utils/client';
import { isMiniProgram } from '@/utils/platforms/wx';
import constant from '../constant';
import { getJdActivityType } from './activityTypeUtils';

export interface ReportClickArgsType {
  eventId?: string,
  shopId: string | number | null,
  pin: string | null,
  jdActivityId: string | null,
  skuId?: string | number | null,
  shareUserId?: string | null,
  reportInfo?: string | null,
  activityType?: string | number | null
}

export interface ReportPVArgsType {
  shopId: string,
  pin: string,
  jdActivityId: string,
  activityType: string,
  shareUserId: string
}

// 加载getMPing
const getMPing = async (): Promise<MPing> => {
  console.log('getMPing');
  if (!window.MPing) {
    await loadScript('https://wl.jd.com/unify.min.js');
  }
  return window.MPing as MPing;
};

export async function getChannel() {
  const type = getClientType();
  if (type === CLIENT_TYPE.JDAPP) {
    return 'app';
  }
  if (type === CLIENT_TYPE.WECHAT) {
    const isMp = await isMiniProgram();
    if (isMp) {
      return 'gouwu_applet';
    }
    return 'wechat_h5';
  }
  if (type === CLIENT_TYPE.QQ) {
    return 'qq';
  }
  return 'other';
}

/**
 * 子午线埋点 上报点击次数
 * @param eventId
 * @param args
 */
export async function reportClick(eventId: string, args: ReportClickArgsType) {
  // 只有开启了子午线埋点的才执行
  if (sessionStorage.getItem(constant.LZ_JD_TRACKABLE) === 'true') {
    try {
      const parsms = typeof eventId === 'object' ? eventId : args;
      const MPingClass = await getMPing();
      const click = new MPingClass.inputs.Click(eventId || parsms.eventId);
      click.shopid = parsms.shopId;
      click.type = getJdActivityType(parsms.activityType);
      click.userpin = parsms.pin;
      click.activityid = parsms.jdActivityId;
      click.channel = await getChannel();
      click.skuid = parsms.skuId;
      click.shareuserid = parsms.shareUserId;
      if (parsms.reportInfo) {
        click.extinfo = JSON.stringify({
          vv_channel: parsms.reportInfo, // 扩展字段（自定义上报内容）【本次新增】
          key2: '',
        });
      }
      click.updateEventSeries(); // 更新时间串
      console.log('reportClick', click);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const mping = new MPingClass();
      mping.send(click);
    } catch (e) {
      console.error(e);
    }
  }
}

/**
 * 子午线埋点 上报PV
 * @param args
 */
export async function reportPV(args: ReportPVArgsType) {
  // 只有开启了子午线埋点的才执行
  if (sessionStorage.getItem(constant.LZ_JD_TRACKABLE) === 'true') {
    try {
      const MPingClass = await getMPing();
      const pv = new MPingClass.inputs.PV();
      pv.shopid = args.shopId;
      pv.userpin = args.pin;
      pv.type = getJdActivityType(args.activityType);
      pv.activityid = args.jdActivityId;
      pv.shareuserid = args.shareUserId;
      pv.channel = await getChannel();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const mping = new MPingClass();
      mping.send(pv);
      console.log('reportPV', pv);
    } catch (e) {
      console.error(e);
    }
  }
}

// 固定的埋点参数
function getCommonParams() {
  return {
    shopId: sessionStorage.getItem(constant.LZ_SHOP_ID),
    pin: sessionStorage.getItem(constant.LZ_JD_USER_PIN),
    jdActivityId: sessionStorage.getItem(constant.LZ_JD_ACTIVITY_ID),
    activityType: sessionStorage.getItem(constant.LZ_ACTIVITY_TYPE),
  };
}

/**
 * 上报参与按钮点击时间
 */
export function reportJoinEvent() {
  const commonParams = getCommonParams();
  reportClick('join', commonParams);
}

/**
 * 上报分享按钮点击时间
 */
export function reportShareEvent() {
  const commonParams = getCommonParams();
  reportClick('share', commonParams);
}

/**
 * 上报助力按钮点击时间
 * @param shareUserId
 */
export function reportAssistEvent(shareUserId: string) {
  const commonParams = getCommonParams();
  reportClick('assist', { ...commonParams, shareUserId });
}

/**
 * 上报浏览店铺点击时间
 * @param shopId
 */
export function reportViewShopEvent(shopId: string | number | null) {
  const commonParams = getCommonParams();
  reportClick('v_shop', { ...commonParams, shopId });
}

/**
 * 上报浏览商品点击时间
 * @param skuId
 */
export function reportViewSkuEvent(skuId: string | number) {
  const commonParams = getCommonParams();
  reportClick('v_sku', { ...commonParams, skuId });
}

/**
 * 上报浏览频道点击时间
 * @param reportInfo
 */
export function reportViewChannelEvent(reportInfo?: any) {
  const commonParams = getCommonParams();
  reportClick('v_channel', { ...commonParams, reportInfo });
}

/**
 * 关注店铺点击事件
 */
export function reportFollowShopEvent() {
  const commonParams = getCommonParams();
  reportClick('f_shop', commonParams);
}

/**
 * 关注商品点击事件
 * @param skuId
 */
export function reportFollowSkuEvent(skuId: string | number) {
  const commonParams = getCommonParams();
  reportClick('f_sku', { ...commonParams, skuId });
}

/**
 * 加购点击事件
 * @param skuId
 */
export function reportAddCarEvent(skuId: string | number) {
  const commonParams = getCommonParams();
  reportClick('add_car', { ...commonParams, skuId });
}

/**
 * 预约商品点击事件
 * @param skuId
 */
export function reportOrderSkuEvent(skuId: string | number) {
  const commonParams = getCommonParams();
  reportClick('order_sku', { ...commonParams, skuId });
}

/**
 * 点赞点击事件
 */
export function reportLikeEvent() {
  const commonParams = getCommonParams();
  reportClick('like', commonParams);
}

/**
 * 评论点击事件
 */
export function reportEvaluateEvent() {
  const commonParams = getCommonParams();
  reportClick('evaluate', commonParams);
}

export default {
  reportPV,
  reportClick,
  reportJoinEvent,
  reportLikeEvent,
  reportAddCarEvent,
  reportAssistEvent,
  reportEvaluateEvent,
  reportFollowShopEvent,
  reportFollowSkuEvent,
  reportOrderSkuEvent,
  reportShareEvent,
  reportViewChannelEvent,
  reportViewShopEvent,
  reportViewSkuEvent,
};
