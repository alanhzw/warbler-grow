import constant from '@/utils/constant';
import { cjwxRequest } from '@/utils/service';

/**
 * 超级无线PV埋点
 * @param params
 */
export function reportPageEnter(params: { venderId: string, activityType: string, activityId: string, subType: string, adSource: string }) {
  try {
    cjwxRequest.post('/common/accessLogWithAD', {
      venderId: params.venderId,
      code: params.activityType,
      activityId: params.activityId,
      subType: params.subType,
      adSource: params.adSource,
      pageUrl: window.location.href,
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * 页面跳转记录埋点
 * @param type // 4: 浏览店铺，5: 浏览商品
 * @param params
 */
export function writePersonInfo(type:number, jdActivityId: string, pin: string, venderId: string, activityId: string) {
  try {
    if (sessionStorage.getItem(constant.LZ_TRACKABLE) === 'true') {
      cjwxRequest.post('/interaction/write/writePersonInfo', {
        actionType: type,
        jdActivityId,
        pin,
        venderId,
        activityId,
      });
    }
  } catch (e) {
    console.error(e);
  }
}

/**
 * 点击埋点
 * @param data
 */
export function insertCrmPageVisit(data: { elementId:string, pageId:string, venderId:string }) {
  cjwxRequest.post('/crm/pageVisit/insertCrmPageVisit', data);
}

export default {
  reportPageEnter,
  writePersonInfo,
};
