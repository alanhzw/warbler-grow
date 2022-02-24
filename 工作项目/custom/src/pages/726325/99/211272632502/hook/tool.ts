/**
 * @Description:caoshijie
 * @Date: 2021/12/22
 * @Description: 帝亚吉欧满额有礼
 * @FilePath:src\pages\726325\99\211272632502\hook\tool.ts
*/
import { Toast } from 'vant';
import { reactive, ref } from 'vue';
import { cjwxRequest } from '@/utils/service';
import { BaseInfo } from '@/types/BaseInfo';

export const privacyClause = `帝亚吉欧会员俱乐部会员服务及个人信息授权协议
<br/>浏览此内容前，请确认您已年满18 周岁。禁止上传不理性饮酒、未成年人内容、违反社会公序良俗及侵权内容，并保留删除此类内容的权利。请勿向未成年人分享此内容。 欢乐无限 饮酒有度  www.DrinkIQ.com
<br/>《帝亚吉欧会员俱乐部会员服务及个人信息授权协议》（以下简称“本协议”）是帝亚吉欧洋酒贸易（上海）有限公司（以下简称“帝亚吉欧”或“我们”）与用户（以下简称“您”）所订立的有效协议。请您务必仔细阅读、透彻了解并完全同意本协议，尤其是本协议第二部分有关个人信息授权及第三部分有关推广营销的约定。
<br/>您通过网络页面确认接受本协议，则将视为您同意接受本协议的全部内容。如您拒绝同意本协议的，则您将无法获得帝亚吉欧会员俱乐部会员身份或使用帝亚吉欧会员俱乐部会员服务，且您不应继续向我们提供或配合收集您的个人信息，或者我们委托第三方处理您提交的个人信息。
<br/>一、会员服务
<br/>1.1 会员注册
<br/>您通过天猫【帝亚吉欧洋酒官方旗舰店】、【百利官方旗舰店】、【尊尼获加官方旗舰店】，京东【帝亚吉欧洋酒官方旗舰店】、【尊尼获加洋酒官方旗舰店】、【帝亚吉欧京东自营专区】、【百利（Baileys）京东自营旗舰店】，微信小程序【帝亚吉欧会员俱乐部】及抖音【帝亚吉欧官方旗舰店】（以下统称“全渠道”）完成注册及授权，即可成为帝亚吉欧会员俱乐部会员，享受相应的会员权益。如您在以上多个渠道注册会员并进行购买（收货人信息与您注册信息一致），您将激活全域会员，即您的会员积分和权益会在以上已注册的渠道实现互通。
<br/>1.2 会员等级规则
<br/>【会员等级】帝亚吉欧会员俱乐部会员按等级由低到高分为：普通会员、黄金会员、铂金会员、钻石会员；帝亚吉欧会员俱乐部会员等级可在帝亚吉欧官方渠道（见1.1会员注册所列渠道）实现互通，统一管理您的会员信息，并享受同等价值会员权益。
<br/>【会员等级计算周期】普通会员升级后，其会员等级计算周期由最近一次升级之日起开始计算，至升级之后12个月底，根据期间累积消费金额评估，如满足当前等级门槛则保级，不满足按实际消费金额降级至对应等级，最低降至黄金会员。
<br/>【普通会员】在帝亚吉欧官方渠道完成会员注册，即可成为普通会员。除非本规则变更或终止，普通会员无会员有效期限制。
<br/>【黄金会员】在帝亚吉欧官方渠道完成会员注册，任意消费，即可成为黄金会员。黄金会员无会员有效期限制。
  <br/>保级：铂金会员在等级有效期内累计消费满600元，即可保级；铂金资格从上一个有效期结束次日起延续至次年当月月底有效。
  <br/>降级：铂金会员等级有效期到期后，会员等级将根据上个有效期内（即自升级为铂金会员日起至次年当月月底内）累计消费金额重新计算，如不满足铂金会员门槛，则将降至黄金会员。
<br/>【钻石会员】在帝亚吉欧官方渠道完成会员注册，在会员等级计算周期内累计消费满2400元，即可升级成为钻石会员。钻石会员资格有效期自升级日起至次年当月月底。
  保级：钻石会员在等级有效期内累计消费满2400元，即可保级；钻石资格从上一个有效期结束次日起延续至次年当月月底有效。
  降级：钻石会员等级有效期到期后，会员等级将根据上个有效期内（即自升级为钻石会员日起至次年当月月底内）累计消费金额重新计算，如不满足钻石会员门槛，将降至铂金会员；如仍不满足铂金会员门槛，将依序降至黄金会员。
<br/>1.3 会员积分规则
<br/>1.3.1 积分获取
<br/>1)在帝亚吉欧官方渠道内的消费，会根据消费金额获得相应的购买积分。
<br/>2)购买积分在会员确认收货后积分自动到账。
<br/>3)参与指定会员互动，可获得相应互动积分。指定互动任务及相应获取的积分值以品牌公布为准；互动积分根据平台自动计入会员积分账户。
<br/>4）不足1元不予计算积分，积分向上取整不计小数。
<br/>1.3.2 积分有效期
<br/>每笔积分自获得之日起至次年的12月31日清零。
<br/>1.3.3 积分兑换
<br/>会员可使用有效积分进行兑礼及参与积分兑换活动（具体活动以官方渠道为准）。
<br/>1.3.4 积分查询及兑换渠道
<br/>支持在以下任一帝亚吉欧官方渠道会员中心进行积分查询及兑换：
<br/>1)微信小程序：【帝亚吉欧会员俱乐部】
<br/>2)天猫：【帝亚吉欧洋酒官方旗舰店】、【百利官方旗舰店】、【尊尼获加官方旗舰店】
<br/>3)京东：【帝亚吉欧洋酒官方旗舰店】、【尊尼获加洋酒官方旗舰店】、【帝亚吉欧京东自营专区】、【百利（Baileys）京东自营旗舰店】
<br/>4）抖音：【帝亚吉欧官方旗舰店】
<br/>1.3.5 积分使用限制
<br/>1、会员可使用有效积分进行礼品、优惠券或增值服务的兑换，具体兑换项目以店铺或品牌活动为准；
<br/>2、一旦兑换成功，相应积分即刻扣除，此操作无法取消或更改；
<br/>3、积分不兑现金、不找零、不可转让或赠予；
<br/>4、优惠券和积分抵扣金额将不可用于开具发票。
<br/>1.4 会员权益
<br/>以下为会员基本权益，帝亚吉欧保留对于会员权益的更新和调整
<br/>【普通会员权益】：
<br/> 入会礼-平台优惠券
<br/> 生日礼500积分
<br/> 积分兑券
<br/>【黄金会员权益】：
<br/> 生日礼：750积分
<br/> 升级礼：300积分
<br/> 积分兑券
<br/> 积分兑礼
<br/>【铂金会员权益】：
<br/> 生日礼：1000积分
<br/> 升级礼：750积分
<br/> 积分兑券
<br/> 积分兑礼
<br/>【钻石会员权益】：
<br/> 生日礼：1500积分
<br/> 升级礼：1500积分
<br/> 积分加倍：钻石会员消费按1.5倍计算积分
<br/> 积分兑券
<br/> 积分兑礼
<br/>1.5 会员注销
<br/>您可通过全渠道客服或发送邮件致 supiaopiao@ekzc.com提交您的问题。
<br/>二、个人信息授权
<br/>2.1我们收集个人信息的目的及范围
<br/>您同意，为了识别您的会员身份，计算和确定您的会员积分及您的会员等级，向您提供会员权益及向您进行推广营销的目的（以下简称“目的”），我们将自行收集：（1）会员身份信息数据：您的头像、昵称、手机号码及手机号码归属地信息（包括您注册会员使用的手机号码、兑换会员礼品使用的收货人手机号码、您在全渠道的第三方互动插件中登记的手机号码等）、生日信息（包括您注册会员登记的生日信息和您在全渠道的第三方互动插件中登记的生日信息）、所在地信息；（2）会员交易订单数据：兑换会员礼品使用的收货人姓名和地址及您通过帝亚吉欧授权渠道购买帝亚吉欧产品的订单（包括您入注册会员之前和之后的订单，以下简称 “消费订单”）的时间、内容、金额、收货地址、收货人手机号码信息及手机号码归属地信息；以及（3）会员互动行为数据：您在帝亚吉欧授权渠道进行互动行为（包括会员浏览、收藏、加购、签到、抽奖、领券、买赠、试用、积分兑换等）产生的记录，并委托第三方根据您的个人信息进行优化和产品推广。
<br/>2.2我们如何收集和使用您的个人信息
<br/>我们收集、使用您的个人信息将遵循合法、正当、必要的原则。
<br/>2.2.1 我们如何收集您的个人信息
<br/>您同意，我们可能要求您向我们或我们委托的第三方服务提供商提供个人信息，或者由有权收集、存储您个人信息的主体，依据与您的约定向我们或我们委托的第三方服务提供商处理您的个人信息。
<br/>2.2.2 我们如何使用您的个人信息
<br/>您同意，为目的之所需，我们可以自行或委托第三方服务提供商以下述方式使用您的个人信息：
<br/>（1）为了识别您的会员身份，我们将基于您的手机号码对于您在帝亚吉欧授权渠道提交的个人信息进行比对和整合；
<br/>（2）为了准确计算您的会员积分、确定您的会员等级并据此向您提供完善的会员权益，我们将分析您的消费订单信息，包括订单的时间、内容及金额；
<br/>（3）为了向您进行推广营销，我们将对于您的消费订单信息进行分析，并使用您的个人信息向您发送营销信息或进行个性化展示。
<br/>2.3我们如何披露您的个人信息
<br/>2.3.1 依法披露
<br/>我们不会向任何公司、组织和个人分享您的个人信息。但是，您确认同意，我们可在以下任一情况下您的个人信息：
<br/>（1）在法定情形下：我们可能会根据法律法规规定，或按行政、司法或其他主管政府机关依法提出的要求，对其披露您的个人信息；
<br/>（2）在争议解决程序中：为保护帝亚吉欧或您的合法权益，我们可能会在诉讼、仲裁或其他争议解决程序中向法院、仲裁委员会及相关当事方披露您的个人信息；
<br/>（3）向第三方服务提供商：为实现合法营销目的之所需，以第三方服务提供商遵守法律法规及本协议为前提，我们可能会向第三方服务提供商披露您的个人信息；
<br/>（4）在帝亚吉欧内部：为实现合法经营目的之所需，以信息接收方遵守法律法规及本协议为前提，我们可能会在帝亚吉欧内部的实体或员工之间在中国境内披露您的个人信息；
<br/>（5）在获取同意的其他情况下：在获得您的同意的其他合法情形下，我们可能会与其他方披露您的个人信息。
<br/>2.3.2承继
<br/>我们不会将您的个人信息转让给任何公司、组织和个人。但是，您确认同意以下方式：
<br/>（1）在获取同意的情况下：在获得您的同意后，其他方将合法承继您的个人信息；
<br/>（2）在涉及合并、收购、重组、解散、注销或破产清算时，其他方将会合法承继我司的一切财产及相关权利，包括客户您的个人信息；如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本协议的约束，否则我们将要求该公司、组织重新向您征求授权同意。
<br/>2.3.3 公开披露
<br/>我们不会公开披露您的个人信息。但是，您确认同意，我们可在以下任一情况下公开披露您的个人信息：
<br/>（1）经您确认同意或基于您的主动选择，进行公开披露；
<br/>（2）根据法律的有关规定，或者行政或司法机构的强制性要求，进行公开披露。
<br/>根据第2.3.1条和第2.3.2条进行的依法披露和承继不视为个人信息的公开披露。
<br/>2.4 特殊处理
<br/>如我们对您的个人信息采取技术措施或其他必要措施进行处理，使得处理后的数据的接收方无法重新识别特定个人且无法复原的，则此类处理后数据的处理、使用、披露无需另行向您通知或征得您的同意。
<br/>2.5 我们如何管理您的个人信息
<br/>2.5.1 安全保障
<br/>我们将采取适当的技术手段，自行或委托第三方保证收集到的有关于您的个人信息的安全性。
<br/>（1）我们重视信息安全。帝亚吉欧在现有的技术水平下采取合理适当的物理、电子和行政管理措施来保护您的个人信息，防止个人信息遭到未经授权访问、披露、使用、修改、损坏或丢失。我们会采取合理可行的措施，保护您的信息安全。
<br/>（2）我们会尽力保护您的个人信息，但请您理解，由于技术的限制以及可能存在的各种恶意手段，即便我们尽力采取上述措施，仍不可能始终保证个人信息百分之百的安全。您需要了解，您的个人信息有可能因计算机病毒、恶意入侵或其他我们可控范围外的因素而被泄露、毁损或灭失。
<br/>2.5.2 信息安全事件
<br/>在发生信息安全事件时，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们会及时将事件相关情况以邮件、信函、电话通知、公告等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。
<br/>2.5.3 个人信息的删除
<br/>在下述情形下，您有权要求我们删除您的个人信息：
<br/>(1) 您决定注销您的帝亚吉欧会员俱乐部会员身份；或
<br/>(2) 我们违反本协议收集、使用您的个人信息；
<br/>在要求我们删除您的个人信息时，您应当向我们发送书面通知并注明要求删除的原因，我们将在接到您通知后的合理期限内进行响应并采取措施将相关个人信息予以删除或进行匿名化、去标识化处理。请您注意，对于经过匿名化、去标识化处理，且不含有您个人信息的任何信息和数据，我们有权保留并予以使用。
<br/>请您注意，注销帝亚吉欧会员俱乐部会员身份将使得您无法再继续享有任何帝亚吉欧会员俱乐部会员权益。
<br/>三、推广营销
<br/>您同意，我们可以自行或委托第三方服务提供商基于您的个人信息向您进行定向的或非定向的、个性化的或通用化的营销推广及展示，包括向您发送促销信息、品牌活动信息或其他旨在推广帝亚吉欧品牌、产品或服务的信息。如您不希望收到任何营销推广及展示信息，您可以按照我们指定的方式退订或者通过联系我们取消该项服务。
<br/>四、其他
<br/>4.1本协议的法律适用
<br/>本协议的订立、生效、解释、执行、管辖、争议的解决均适用中华人民共和国法律。如您与帝亚吉欧因本协议的订立或履行产生任何争议的，帝亚吉欧与您均有权向帝亚吉欧所在的上海市具有管辖权的人民法院提起诉讼。
<br/>4.2本协议的更新
<br/>我们保留不时更新或修改本协议的权利。如果修改造成您在本政策下权利的实质减少，我们会通过邮件、信函、电话通知、公告、软件内推送等方式向您发送变更通知。
<br/>若您收到变更通知，但不同意修改后的本协议约定，您应立即书面通知我们或注销您的帝亚吉欧会员俱乐部会员身份，反之则视为您接受我们对本协议相关条款所做的修改。您收到变更通知后继续使用帝亚吉欧会员俱乐部会员服务、向我们或我们委托的第三方提供或配合收集您的个人信息的，视为您接受我们对本协议相关条款所做的修改。
<br/>4.3本协议的独立性
<br/>请您理解，本协议为您与帝亚吉欧之间有关帝亚吉欧会员俱乐部会员服务及个人信息授权的单独约定，独立于您与其他第三方之间的约定。即便您与前述第三方之间的约定已经终止或解除，例如您选择注销您在第三方电子商务平台注册的账户，亦不影响本协议的有效性，除非您决定注销您的帝亚吉欧会员俱乐部会员身份。
<br/>4.4联系我们
<br/>如果您对本协议存有任何疑问，可以发送邮件致supiaopiao@ekzc.com，我们会尽快审核并回复您的问题。`;
export interface previousType {
  startTime:string,
  updateTime:string,
  giftName:string,
}
export interface addressForm {
  activityId?: string,
  phone?: string,
  name?: string,
  applyType?: string,
  province?: string,
  city?: string,
  region?: string,
  address?: string,
  postalCode?: string,
  [propName:string] :string | undefined
}
export interface giftType {
  giftName?:string,
  skuId?:string,
  memberCnt?:string,
  imageUrl?:string,
  money?:string,
  [propName:string] :string | undefined
}
export interface locationType extends addressForm{
  id?:string,
  rewardStatus?:string,
}
export interface activityInfoType {
  stage?:any,
  [propName:string] :any
}
export interface skuListType {
  skuId?:string,
  logo?:string,
  skuName?:string,
  skuNameShort?:string,
  stock?:boolean,
  [propName:string] :any
}
// 更多活动
export const goMore = () => {
  window.location.href = 'https://sale.jd.com/m/h5/nvjqrbcqh884.html';
};
// 申领接口
export const insertAddress = async (form: addressForm, activityId?:string, gift?:giftType, activityInfo?:any, nickName?:string, venderId?:string) => {
  let res;
  const regName = /[^\u4e00-\u9fa5a-zA-Z\d· ]+/;
  // 表情符号
  const faceWord = /[\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/;
  // 特殊字符
  const reg = new RegExp("[`~!@#$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*|{}【】‘；：”“'、？]");
  if (!form.name) {
    Toast('请输入姓名');
  } else if (regName.test(form.name)) {
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
      // 通过创建时间判断 是修改还是新增
      if (form.createTime) {
        res = await cjwxRequest.post('/diageo/premiumzon/modifyTheAddress', {
          ...form,
        });
      } else {
        delete gift?.imageUrl;
        res = await cjwxRequest.post('/diageo/premiumzon/insertAddress', {
          ...form,
          ...gift,
          stage: activityInfo.stage,
          startDate: activityInfo.startDate,
          endDate: activityInfo.endDate,
          venderId,
          activityId,
          nickName,
        });
      }

      Toast.clear();
      if (!res.result) {
        Toast.fail(res.errorMessage);
      }
    } catch (error) {
      console.log(error);
      if (error && error.message) {
        Toast.fail(error.message);
      }
    }
  }
  return res.data.succeed ?? res.result;
};

// 查询曝光商品
export const findSkus = async (baseInfo:BaseInfo) => {
  const skuList = ref([]);
  try {
    const res = await cjwxRequest.post('/act/common/findSkus', {
      actId: baseInfo.activityId,
      userId: baseInfo.venderId,
      type: baseInfo.activityType,
    });
    skuList.value = res?.skus;
    if (!res.isOk) {
      Toast.fail(res.msg);
    }
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  }
  return skuList.value;
};
// 查询往期活动
export const findPreviousActInfo = async (activityId:string) => {
  const actInfoList = ref([]);
  try {
    const res = await cjwxRequest.post('/diageo/premiumzon/getPastGift', {
      activityId,
    });
    actInfoList.value = res?.data;
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
  } catch (error) {
    if (error && error.message) {
      Toast.fail(error.message);
    }
  }
  return actInfoList.value;
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
      console.log(error);
      Toast.fail(error.message);
    }
  }
  return rule;
};
// 获取活动信息
export const getActInfo = async () => {
  let res;
  try {
    res = await cjwxRequest.post('/diageo/premiumzon/pageInformation');
    if (!res.result) {
      Toast.fail(res.errorMessage);
    }
  } catch (error) {
    if (error && error.message) {
      console.log(error);
      Toast.fail(error.message);
    }
  }
  return res.data.object;
};
// 查询申请记录
export const getLicationInfor = async (baseInfo:BaseInfo) => {
  let res;
  try {
    res = await cjwxRequest.post('/diageo/premiumzon/applicationInformation', {
      activityId: baseInfo.activityId,
    });
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
// 判断礼物是否申请过
export const putInStatus = async (baseInfo:BaseInfo, stage:number, skuId:string) => {
  let res;
  try {
    res = await cjwxRequest.post('/diageo/premiumzon/putInStatus', {
      activityId: baseInfo.activityId,
      stage,
      skuId,
    });
  } catch (error) {
    if (error && error.message) {
      console.log(error);
      Toast.fail(error.message);
    }
  }
  return res.result;
};
// 判断是否弹过窗
export const getIsShwoDialog = async (baseInfo:BaseInfo, stage:number) => {
  let res;
  try {
    res = await cjwxRequest.post('diageo/premiumzon/getPopupWindowControl', {
      activityId: baseInfo.activityId,
      stage,
    });
  } catch (error) {
    if (error && error.message) {
      console.log(error);
      Toast.fail(error.message);
    }
  }
  return res.data > 0;// 值为0未弹过,大于0弹过
};
