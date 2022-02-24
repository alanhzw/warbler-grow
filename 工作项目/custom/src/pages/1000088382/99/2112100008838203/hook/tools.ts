/**
 * @Description:caoshijie
 * @Date: 2021/12/15
 * @Description: 小糊涂仙 重启
 * @FilePath:src\pages\1000088382\99\2112100008838203\hook\tools.ts
*/
import { Toast } from 'vant';
import { cjwxRequest } from '@/utils/service';

export const ruleText = '一、活动时间：<br/>2021年12月20日00:00-2021年12月22日23:59<br/>二、活动说明：<br/>京东自营小糊涂仙旗舰店会员参与活动，非会员可入会参与。每位用户仅可申请一次，每次仅可申请一款酒品，每期试用活动无法重复参与。<br/>三、奖品说明：<br/>1.每档活动结束后将在所有申请名单中随机抽取20名用户赠送普仙小酒52度100ml ，抽取5名用户赠送典藏52度500ml，抽取3名用户赠送仙酿礼盒。<br/>活动结束后请在会员中心页中查看获奖名单，奖品将在名单公布后的十五个工作日内安排发放。<br/>2.凡以不正当手段（如作弊领取、恶意套取、刷信誉、虚假交易、扰乱系统、实施网络攻击等）参与本次活动的用户，商家有权终止其参与活动，并取消其获奖资格（如奖品已发放，商家有权追回），如给商家造成损失的，商家将保留向违规用户继续追索的权利。<br/>3.如因特殊原因未填写地址的中奖用户，在获奖名单公布三日内，请及时联系客服人员手动登记，超过日期未补填地址的用户均视为自动放弃奖品，后期不予补发。<br/>4.京东自营小糊涂仙旗舰店在法律允许范围内对本次活动规则及未尽事宜拥有解释权。';

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
// 申领接口
export const subForm = async (form: addressForm, activityId:string) => {
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
export const getApplyStatue = async (applyType:string, activityId:string) => {
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
