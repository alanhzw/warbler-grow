/**
 * @Description:caoshijie
 * @Date: 2022/1/18
 * @Description:小糊涂仙 0元试饮重启 2022年1月
 * @FilePath:src\pages\1000088382\99\2111100008838202\hook\tools.ts
 */
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

export interface addressForm {
  activityId: string,
  phone: string,
  receiver: string,
  applyType: string,
  province: string,
  city: string,
  district: string,
  address: string,
  postalCode: string,
}
export const goDetails = () => {
  window.location.href = 'https://pro.m.jd.com/mall/active/2RSY9As3TKAF88sGYyzim9hJEKBb/index.html';
};
export const goMore = () => {
  window.location.href = 'https://pro.m.jd.com/mall/active/2sonFetL3mCuiZQKyM9pqQ4WpTK/index.html';
};
export const joinMember = () => {
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000088382&channel=9678&returnUrl=${window.location.href}`;
};
// 申领接口
export const subForm = async (form: addressForm, activityId: string) => {
  let res;
  const regName = /[^\u4e00-\u9fa5a-zA-Z\d· ]+/;
  if (!form.receiver) {
    Toast('请输入姓名');
  } else if (regName.test(form.receiver)) {
    Toast('姓名不可以存在特殊字符');
  } else if (!/^1[3456789]\d{9}$/.test(form.phone)) {
    Toast('请填写正确的手机号码');
  } else if (!form.province) {
    Toast('请选择地区');
  } else if (!form.address) {
    Toast('请填写详细地址');
  } else if (regName.test(form.address)) {
    Toast('详细地址不能包含表情');
  } else if (!/^\d{6}$/.test(form.postalCode)) {
    Toast('请填写正确的邮编');
  } else {
    // 调接口
    try {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0,
      });
      res = await cjwxRequest.post('/wx/xhtx/tasting/applyJudgeInformation', {
        ...form,
        activityId,
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
  }
  return res;
};
// 查询是否已申领过
export const getApplyStatue = async (applyType: string, activityId: string) => {
  let res;
  // 调接口
  try {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    });
    res = await cjwxRequest.post('/wx/xhtx/tasting/tryJudgeInformation', {
      applyType,
      activityId,
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
  return res;
};
// 活动规则
export const getRules = async (baseInfo: BaseInfo) => {
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
