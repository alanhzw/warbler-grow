/**
 * @Description:caoshijie
 * @Date: 2022/1/19
 * @Description: 羽西首购送京豆
 * @FilePath:src\pages\1000002744\99\2201100000274401\tools\tools.ts
*/
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

export const joinMember = () => {
  // window.location.href = `https://shopmember.m.jd.com/shopcard/?venderId=599119&shopId=590943&returnUrl=${window.location.href}`;
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000002744&channel=401&returnUrl=${window.location.href}`;
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
    rule = res.data?.rule?.replace(/\r\n/g, '<br/>');
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  }
  return rule;
};
// 获取活动信息
export const getActInfo = async (baseInfo:BaseInfo) => {
  let res;
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    res = await cjwxRequest.post('/yuesai/order/activityContent', {
      activityId: baseInfo.activityId,
    });
    Toast.clear();
    // if (!res.result) {
    //   Toast.fail(res.errorMessage);
    // }
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  }
  return res.result;
};

// 查询奖品信息
export const getMyPrize = async (baseInfo:BaseInfo) => {
  let res;
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    res = await cjwxRequest.post('/yuesai/order/myPrize', {
      activityId: baseInfo.activityId,
    });
    Toast.clear();
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  }
  return res.data;
};
