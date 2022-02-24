/**
 * @Description:caoshijie
 * @Date: 2022/1/7
 * @Description: 水井坊复购送小酒
 * @FilePath:src\pages\1000086084\99\2201100008608401\hook\tool.ts
*/
import { Toast } from 'vant';
import { reactive, ref } from 'vue';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

export interface actInfoType {
  buttonStatus?:number, // (0：可以领取；1：尚未解锁；2：已领取；3：已领光；4：已解锁（置灰）)
  giftId:number,
  giftName?: string,
  limitPrice?:number,
  totalNum?:number,
}
export interface addressForm {
  phone?: string,
  receiver?: string,
  province?: string,
  city?: string,
  county?: string,
  address?: string,
}
export interface geftType {
  createTime?: string,
  giftId?: number,
  giftName?:string,
}
export const openCard = (isOpenCard:boolean) => {
  if (isOpenCard) {
    Toast('您已经是会员啦~');
    return;
  }
  window.location.href = 'https://shopmember.m.jd.com/shopcard?venderId=100000000000485&channel=401';
};
// 活动规则
export const getRules = async (baseInfo:BaseInfo) => {
  let rule;
  try {
    const res = await cjwxRequest.get(`common/brand/getFullActInfoVo?activityId=${baseInfo.activityId}`);
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
    rule = res.data?.rule.replace(/\r\n/g, '<br/>');
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
    res = await cjwxRequest.post('/swellfun/repurchaseGift/activityContent', {
      activityId: baseInfo.activityId,
    });
    if (!res.result) {
      Toast.fail(res.errorMessage ?? '操作失败');
    }
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  }
  return res?.data;
};
// 获取我的奖品
export const getMyPrize = async (baseInfo:BaseInfo) => {
  let res;
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    res = await cjwxRequest.post('/swellfun/repurchaseGift/getMyPrize', {
      activityId: baseInfo.activityId,
    });
    Toast.clear();
    if (!res.result) {
      Toast.fail(res.errorMessage ?? '操作失败');
    }
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  }
  return res.data;
};
// 领取奖品
export const convertPrize = async (baseInfo:BaseInfo, giftId:number) => {
  let res;
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    res = await cjwxRequest.post('/swellfun/repurchaseGift/convertPrize', {
      activityId: baseInfo.activityId,
      giftId,
    });
    Toast.clear();
    if (!res.result) {
      Toast.fail(res.errorMessage ?? '操作失败');
    }
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  }
  return res.data;
};
// 申领接口
export const insertAddress = async (form: addressForm, generateId:string) => {
  let res;
  const regName = /[^\u4e00-\u9fa5a-zA-Z\d· ]+/;
  // 表情符号
  const faceWord = /[\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/;
  // 特殊字符
  const reg = new RegExp("[`~!@#$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*|{}【】‘；：”“'、？]");
  if (!form.receiver) {
    Toast('请输入姓名');
  } else if (regName.test(form.receiver)) {
    Toast('姓名不可以存在特殊字符');
  } else if (!/^1[3456789]\d{9}$/.test(<string>form.phone)) {
    Toast('请填写正确的手机号码');
  } else if (!form.province) {
    Toast('请选择省/市/区');
  } else if (!form.address) {
    Toast('请填写详细地址');
  } else if (faceWord.test(form.address)) {
    Toast('详细地址不能包含表情符号');
  } else if (reg.test(form.address)) {
    Toast('详细地址不能包含特殊字符');
  } else {
    // 调接口
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      res = await cjwxRequest.post('/swellfun/repurchaseGift/saveAddress', {
        ...form,
        generateId,
      });
      Toast.clear();
      if (!res.result) {
        Toast.fail(res.errorMessage ?? '操作失败');
      }
    } catch (error) {
      console.log(error);
      if (error && error.message) {
        Toast.fail(error.message);
      }
    }
  }
  return res;
};
// 领取优惠券
export const drawGrantTypeCoupon = async (baseInfo:BaseInfo) => {
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    const res = await cjwxRequest.post('/swellfun/repurchaseGift/drawGrantTypeCoupon', {
      activityId: baseInfo.activityId,
    });
    Toast.clear();
    if (!res.result) {
      Toast.fail(res.errorMessage ?? '操作失败');
    } else {
      Toast.success('领取成功');
    }
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  }
};
// 查询地址信息
export const getGiftAddress = async (baseInfo:BaseInfo) => {
  let res;
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    res = await cjwxRequest.post('/swellfun/repurchaseGift/getGiftAddress', {
      activityId: baseInfo.activityId,
    });
    Toast.clear();
    if (!res.result) {
      Toast.fail(res.errorMessage ?? '操作失败');
    }
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  }
  return res;
};
