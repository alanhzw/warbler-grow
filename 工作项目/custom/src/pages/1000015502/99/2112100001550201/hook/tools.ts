/**
 * @Description:caoshijie
 * @Date: 2021/12/10
 * @Description: 洋河 新客福利站 方法
 * @FilePath:src\pages\1000015502\99\2112100001550201\hook\tools.ts
 */

import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';
// 入会
export const joinRemember = (isMember:boolean) => {
  if (isMember) return;
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000015502&shopId=1000015502&venderType=5&channel=7983&returnUrl=${window.location.href}`;
};
// 去抽奖
export const luckDraw = () => {
  window.location.href = 'https://cjhy-isv.isvjcloud.com/mc/orderPayDrawView/wx/orderGift/forC/indexPage?venderId=1000015502&activityId=7a6ce61ff1ec4468af795a2891e93344';
};
export interface status {
  isNewMember:boolean, // 是否新客,
  hasOpenCardBean:boolean, // 是否有剩余京豆,
  hasSendPoint:boolean, // 是否已发放开卡积分,
  orderId:string, // 获奖订单
  isMember:boolean, // 是否会员
}
export interface activityInfoType {
  result:boolean,
  errorMessage:string,
  data:status,
  [props:string]:any
}
export interface giftListType {
  giftName: string,
  giftStatus: string,
  orderId: string,
}
// 活动详情
export const getActivityInfo = async (baseInfo:BaseInfo): Promise<status> => {
  let res;
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    res = await cjwxRequest.post('/wx/yanghe/newcus/activityContent', {
      activityId: baseInfo.activityId,
    });
    Toast.clear();
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
  } catch (error) {
    if (error && error.message) {
      console.log(error);
      Toast.fail(error.message);
    }
  }
  return res.data;
};
// 活动规则
export const getRules = async (baseInfo:BaseInfo) => {
  let rule;
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.get(`common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`);
    Toast.clear();
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
    rule = res.data?.rule.replace(/\r\n/g, '<br/>');
  } catch (error) {
    if (error && error.message) {
      console.log(error);
      Toast.fail(error.message);
    }
  }
  return rule;
};
// 曝光商品
export const findSkus = async (baseInfo:BaseInfo) => {
  let skusList;
  try {
    // Toast.loading({
    //   message: '加载中...',
    //   forbidClick: true,
    //   duration: 0,
    // });
    const res = await cjwxRequest.post('/act/common/findSkus', {
      actId: baseInfo.activityId,
      userId: baseInfo.venderId,
      type: baseInfo.activityType,
    });
    skusList = res.skus;
    if (!res.isOk) {
      Toast.fail(res.msg);
    }
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  }
  return skusList;
};
// 兑换优惠券
export const drawCoupon = async (baseInfo:BaseInfo, couponId:string) => {
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post('/wx/yanghe/newcus/drawCoupon', {
      activityId: baseInfo.activityId,
      couponId,
    });
    Toast.clear();
    if (!res.result) {
      Toast.fail(res.errorMessage ?? '操作失败');
      return;
    }
    Toast.success('领取成功。');
  } catch (error) {
    if (error?.message) {
      Toast.fail(error.message);
    }
  }
};
