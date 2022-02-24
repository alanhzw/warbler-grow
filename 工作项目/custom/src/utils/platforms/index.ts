import CLIENT_TYPE, { getClientType } from './clientType';
import SHARE_TYPE from './shareType';
import { getToken } from './auth';
import { isMiniProgram } from './wx';
import { callShare, setHeaderShare } from './share';
import { reportViewShopEvent, reportViewSkuEvent } from '../trackEvent/jdReport';
import { writePersonInfo } from '../trackEvent/cjwxReport';
import constant from '../constant';

/**
 * 跳转到店铺首页
 * @param shopId
 * @returns {string}
 */
export async function gotoShopPage(shopId: string): Promise<void> {
  if (shopId) {
    const LZ_JD_USER_PIN = sessionStorage.getItem(constant.LZ_JD_USER_PIN) || '';
    const LZ_JD_ACTIVITY_ID = sessionStorage.getItem(constant.LZ_JD_ACTIVITY_ID) || '';
    const LZ_VENDER_ID = sessionStorage.getItem(constant.LZ_VENDER_ID) || '';
    const LZ_ACTIVITY_ID = sessionStorage.getItem(constant.LZ_ACTIVITY_ID) || '';
    writePersonInfo(4, LZ_JD_ACTIVITY_ID, LZ_JD_USER_PIN, LZ_VENDER_ID, LZ_ACTIVITY_ID);
    reportViewShopEvent(shopId);
    const client = getClientType();
    if (client === CLIENT_TYPE.WECHAT) {
      window.location.href = `https://wq.jd.com/mshop/gethomepage/?shopId=${shopId}`;
    } else {
      window.location.href = `https://shop.m.jd.com/?shopId=${shopId}`;
    }
  }
}

/**
 * 跳转到商品详情页面
 * @param skuId
 * @returns {string}
 */
export async function gotoSkuPage(skuId: string | number): Promise<void> {
  if (skuId) {
    const LZ_JD_USER_PIN = sessionStorage.getItem(constant.LZ_JD_USER_PIN) || '';
    const LZ_JD_ACTIVITY_ID = sessionStorage.getItem(constant.LZ_JD_ACTIVITY_ID) || '';
    const LZ_VENDER_ID = sessionStorage.getItem(constant.LZ_VENDER_ID) || '';
    const LZ_SHOP_ID = sessionStorage.getItem(constant.LZ_SHOP_ID) || '';
    const LZ_ACTIVITY_ID = sessionStorage.getItem(constant.LZ_ACTIVITY_ID) || '';
    writePersonInfo(5, LZ_JD_ACTIVITY_ID, LZ_JD_USER_PIN, LZ_VENDER_ID, LZ_ACTIVITY_ID);
    reportViewSkuEvent(skuId);
    const client = getClientType();
    if (client === CLIENT_TYPE.WECHAT) {
      window.location.href = `https://wq.jd.com/item/view/?sku=${skuId}`;
    } else {
      window.location.href = `https://item.m.jd.com/product/${skuId}.html?wjfrom=ISV_2180A2AFA5B2452F9061C01C053C4756_WX&wjwxpubid=wxd9fd3549c5fdb283&wjunionid=&wjopenid=`;
    }
  }
}

export default {
  gotoShopPage,
  gotoSkuPage,
  getToken,
  setHeaderShare,
  callShare,
  getClientType,
  isMiniProgram,
  CLIENT_TYPE,
  SHARE_TYPE,
};
