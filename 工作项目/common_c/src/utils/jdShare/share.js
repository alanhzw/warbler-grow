// eslint-disable-next-line import/no-named-as-default
import DOMAIN, { exchangeSubStr } from './domain';
import { isMiniProgram } from './wx';
import clientType, { getClientType } from './clientType';
import ShareType from './shareType';
import { Jdsdk } from './jdsdk';

const constant = {
  // 用户pin
  LZ_JD_USER_PIN: 'LZ_JD_USER_PIN',
  // 京东登录token
  LZ_JD_CUSTOMER_TOKEN: 'LZ_JD_CUSTOMER_TOKEN',
  // 商家id
  LZ_VENDER_ID: 'LZ_VENDER_ID',
  // 店铺id
  LZ_SHOP_ID: 'LZ_SHOP_ID',
  // 活动id
  LZ_ACTIVITY_ID: 'LZ_ACTIVITY_ID',
  // 活动类型
  LZ_ACTIVITY_TYPE: 'LZ_ACTIVITY_TYPE',
  // 京东活动id
  LZ_JD_ACTIVITY_ID: 'LZ_JD_ACTIVITY_ID',
  // 京东子午线埋点
  LZ_JD_TRACKABLE: 'LZ_JD_TRACKABLE',
  // 业务埋点
  LZ_TRACKABLE: 'LZ_TRACKABLE',
  // 分享类型
  LZ_SHARE_TYPE: 'LZ_SHARE_TYPE',
};

/**
 * 加载脚本
 *
 * @export
 * @param {string} src 脚本资源地址
 * @return {*}  {Promise<void>}异步promise
 */
export function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = () => {
      resolve();
    };
    script.src = src;
    document.body.appendChild(script);
  });
}

const defaultShareImg = 'http://img10.360buyimg.com/imgzone/jfs/t1/163534/34/4106/101460/600e2292Ed3609887/824e50f6ac5477dd.jpg';
const defaultShareChannel = 'Wxfriends';

const getShareUrl = (config) => {
  const url = config.shareUrl || `${window.location.origin}/rights/mobile/index.html${window.location.hash}`;
  return exchangeSubStr(url, DOMAIN.PROTECT, DOMAIN.COMMON);
};

// 获取京口令分享配置
const getCMDShareConfig = (config = {}) => {
  console.log('getCMDShareConfig in');
  const title = config.title || '请您参与活动';
  const content = config.content || title;
  const url = getShareUrl(config);
  const img = config.imageUrl || defaultShareImg;
  const endTime = Date.now() + 3 * 60 * 60 * 24 * 1000;
  const callback = config.afterShare || (() => console.log('share'));
  const clickcallback = config.beforeShare || (() => console.log('click callback'));
  const channel = config.channel || defaultShareChannel;
  const openAppParams = {
    category: 'jump',
    des: 'jdreactcommon',
    modulename: 'JDReactCollectJDBeans',
    appname: 'JDReactCollectJDBeans',
    param: {
      page: 'collectJDBeansHomePage',
      transparentenable: true,
    },
  };
  // 口令参数集合,由客户端透传h5参数，便于拓展,类型字符串
  const keyparam = {
    url, // 分享url，类型字符串,V8.3.6add，必传，与keyOpenapp二者至少填写一个，两个都传，优先支持openAppp,h5作为兜底
    keyEndTime: JSON.stringify(endTime), // 活动结束时间，类型字符串,V8.3.6add,单位：毫秒，必传
    keyChannel: channel, // 分享渠道 //分享渠道，客户端使用，服务端无用 ，类型字符串,V8.3.6add，必传
    sourceCode: 'isv', // 业务方来源，例如 babel，类型字符串,V8.3.6add，必传
    keyImg: img, // 分享图片，类型字符串,V8.3.6add，必传
    keyId: url, // 活动标识，每个具体活动唯一，类型字符串,V8.3.6add,必传
    keyTitle: title, // 分享标题,类型字符串,V.3.6add，必传,
    keyContent: content, // 口令内容文案,V8.3.6add，必传，口令可以掺插在内容中间，需用在对应位置使用占位符“@@@@”，否则口令接在文案结尾
    keyOpenapp: `openapp.jdmobile://virtual?params=${JSON.stringify(openAppParams)}`, // 原生openApp协议，与url二者至少填写一个
    // acrossClient: '0', // 跨客户端支持 老：0:不可以，1:可以,非必传，默认不支持， 由0、1组成6位数字，每一位数字代表一个支持兑换口令的客户端,数字枚举值为：1-支持兑换/0-不支持兑换,数字安排为（从左至右）：第一位-京东商城，第二位-京东金融，第三位-京喜。后三位为拓展,如"100000"表示仅支持商城app打开
    // keySkuid: '', // skuId,V8.4.4 add，非必传 v8.4.4 add,如果非空，则强制不能跨客户端使用口令
    // keyVer: '', // 版本限制,原生必传,不传仅支持h5，格式{client1:version1,client2:version2},client指的是各个客户端对于android和ios的标识,version 支持起始版本，不填的client仅支持h5
    // keyType: 1, // v9.2.0 add 为1的时候，下发简版口令,默认下发带文案
  };
  const shareConfig = {
    title, // 分享标题
    content, // 分享内容
    url, // 分享链接
    img, // 分享图片
    channel, // 发送给微信好友
    callback, // 分享回调 // 点击微信/朋友圈/QQ等图标之后触发，不保证完成分享流程
    clickcallback, // 点击回调
    appCode: 'jApp', //  jApp - 商城 jXi - 京喜 jFinance - 京东金融 jLite - 京东极速版 liwo - 梨涡
    keyparam,
  };
  console.log('获取京口令分享配置', shareConfig);
  return shareConfig;
};

// 获取h5分享配置
const getH5ShareConfig = (config = {}) => {
  console.log('getH5ShareConfig', config);
  const title = config.title || '请您参与活动';
  const content = config.content || title;
  const url = getShareUrl(config);
  const img = config.imageUrl || defaultShareImg;
  const callback = config.afterShare || (() => console.log('share'));
  const clickcallback = config.beforeShare || (() => console.log('click callback'));
  const channel = config.channel || defaultShareChannel;
  const shareConfig = {
    title, // 分享标题
    content, // 分享内容
    url, // 分享链接
    img, // 分享图片
    channel, // 发送给微信好友
    callback, // 分享回调 // 点击微信/朋友圈/QQ等图标之后触发，不保证完成分享流程
    clickcallback, // 点击回调
    qrparam: null, // 二维码参数？？？
    timeline_title: title, // 朋友圈标题
  };
  console.log('获取JDh5分享配置', shareConfig);
  return shareConfig;
};

// 获取小程序分享配置
const getMiniAppShareConfig = (config = {}) => {
  console.log('getMiniAppShareConfig');
  const title = config.title || '请您参与活动';
  const content = config.content || title;
  const url = getShareUrl(config);
  const img = config.imageUrl || defaultShareImg;
  const callback = config.afterShare || (() => console.log('share'));
  const clickcallback = config.beforeShare || (() => console.log('click callback'));
  const shareUrl = encodeURIComponent(url);
  const channel = config.channel || defaultShareChannel;
  const shareConfig = {
    title,
    content,
    url: shareUrl,
    img,
    channel,
    callback,
    clickcallback,
    qrparam: null,
    timeline_title: '',
    mpId: 'gh_45b306365c3d',
    mpIconUrl: img, // 微信小程序分享的图片
    mpPath: `pages/h5_wv/sns/index?encode_url=${shareUrl}`,
    mpType: '0',
  };
  console.log('获取JD小程序分享配置', shareConfig);
  return shareConfig;
};

// 获取分享配置
const getShareConfig = (config = {}) => {
  const type = config.type || sessionStorage.getItem(constant.LZ_SHARE_TYPE) || ShareType.CMD;
  console.log(`获取分享配置,type:${type}`);
  switch (type) {
    case ShareType.CMD:
      return getCMDShareConfig(config);
    case ShareType.MINIAPP:
      return getMiniAppShareConfig(config);
    case ShareType.H5:
      return getH5ShareConfig(config);
    default:
      return getH5ShareConfig(config);
  }
};

/**
 * 加载并返回京东分享SDK
 *
 * @return {*}  {Promise<any>}
 */
const getJDShare = async () => {
  console.log('加载并返回京东分享SDK');
  if (!window.jdshare) {
    await loadScript('//h5static.m.jd.com/act/jm-jdshare/2.3.0/jm-jdshare.js');
  }
  return window.jdshare;
};

// 设置京口令分享
const shareWithCmdword = async (config = {}) => {
  console.log('设置京口令分享', config);
  const jdshare = await getJDShare();
  const shareConfig = getCMDShareConfig(config);
  jdshare.callSharePane(shareConfig);
};

// 设置H5分享
const shareH5 = async (config = {}) => {
  console.log('设置H5分享', config);
  const jdshare = await getJDShare();
  const shareConfig = getH5ShareConfig(config);
  jdshare.callSharePane(shareConfig);
};

// 设置H5分享
const shareH5WithSDK = async (config = {}) => {
  console.log('设置H5WithSDK分享', config);
  const title = config.title || '请您参与活动';
  const content = config.content || title;
  const url = getShareUrl(config);
  const img = config.imageUrl || defaultShareImg;
  const callback = config.afterShare || (() => console.log('share'));
  console.log('Jdsdk.WebView.callSharePanel');
  Jdsdk.WebView.callSharePanel({
    title,
    content,
    shareUrl: url,
    channel: '',
    iconUrl: img,
    callfunc: callback,
  });
};

// 设置微信h5分享
const shareH5inWeChat = async (config = {}) => {
  console.log('设置微信h5分享', config);
  const title = config.title || '请您参与活动';
  const callback = config.afterShare || (() => console.log('share'));
  const shareConfig = {
    title, // 分享标题
    desc: config.content || title, // 分享描述
    link: config.shareUrl || window.location.href, // 分享链接
    imgUrl: config.imageUrl || defaultShareImg,
    success: () => callback(),
    fail: () => {
      console.log('fail', error);
    },
  };
  // const wxSDK = await getWXSDK();
  // await wxSdkConfig();
  // wxSDK.updateAppMessageShareData(shareConfig);
  // wxSDK.updateTimelineShareData(shareConfig);
  // wxSDK.onMenuShareWeibo(shareConfig);
  // 修改引用js已注册的wxsdk方法; 判断是否是小程序时已经注册了 这里不需要重复注册
  // const JDWxSdk = await getJDWxSdk();
  // JDWxSdk.wxapi.ready(() => {
  //   // @ts-ignore
  //   // 分享给朋友
  //   wx.onMenuShareAppMessage(shareConfig);
  //   // @ts-ignore
  //   // 分享到朋友圈
  //   wx.onMenuShareTimeline(shareConfig);
  // });
  // 分享给朋友
  // @ts-ignore
  wx.onMenuShareAppMessage(shareConfig);
  // @ts-ignore
  // 分享到朋友圈
  wx.onMenuShareTimeline(shareConfig);
  // @ts-ignore
  // 分享到QQ
  wx.onMenuShareQQ(shareConfig);
  // @ts-ignore
  // 分享到QQ空间
  wx.onMenuShareQZone(shareConfig);
};

// 小程序分享
const shareInMiniProgram = async (config = {}) => {
  console.log('设置微信小程序分享', config);
  const title = config.title || '请您参与活动';
  let url = getShareUrl(config);
  const img = config.imageUrl || defaultShareImg;
  const callback = config.afterShare || (() => console.log('share'));
  const userPin = sessionStorage.getItem(constant.LZ_JD_USER_PIN) || '';

  if (url.indexOf('shareuserid4minipg') < 0) {
    if (url.indexOf('?') > 0) {
      url = `${url}&shareuserid4minipg=${encodeURIComponent(userPin)}`;
    } else {
      url = `${url}?shareuserid4minipg=${encodeURIComponent(userPin)}`;
    }
  }

  // 小程序分享页面氛围图片尺寸：670*470
  const atmosimgurl = `${img.replace('/jfs/', '/s670x470_jfs/')}!cc_670x470`;

  // 小程序分享出去的围图片尺寸：500*400
  const shareimgurl = `${img.replace('/jfs/', '/s500x400_jfs/')}!cc_500x400`;

  // const wxSDK = await getWXSDK();

  const mpUrl = `/pages/h5share/index/index?atmosimgurl=${encodeURIComponent(atmosimgurl)}&sharetitle=${encodeURIComponent(title)}&shareurl=${encodeURIComponent(url)}&shareimgurl=${encodeURIComponent(shareimgurl)}&isautoback=1&noneBtnBg=0`;

  console.log('mpUrl', mpUrl);

  // @ts-ignore
  wx.miniProgram.navigateTo({
    url: mpUrl,
  });
  callback();
};

// 设置小程序分享
const shareToMiniApp = async (config = {}) => {
  console.log('设置小程序分享', config);
  const jdshare = await getJDShare();
  const shareConfig = getMiniAppShareConfig(config);
  jdshare.callSharePane(shareConfig);
};

// 设置头部分享
export const setHeaderShare = async (config = {}) => {
  try {
    const client = getClientType();
    if (client === clientType.WECHAT) {
      const isMp = await isMiniProgram();
      console.log(isMp);
      if (isMp) {
        console.log('小程序');
        shareH5WithSDK(config);
      } else {
        console.log('微信');
        shareH5inWeChat(config);
      }
    } else if (client === clientType.JDAPP) {
      console.log('京东APP 设置头部分享');
      const jdshare = await getJDShare();
      const shareConfig = getShareConfig(config);
      jdshare.setShareInfo(shareConfig);
    }
  } catch (e) {
    console.error(e);
  }
};

// 唤起分享
export const callShare = async (config = {}) => {
  console.log('根据客户端和分享渠道，自动设置分享');
  const client = getClientType();
  console.log('clientType', client);
  try {
    if (client === clientType.WECHAT) {
      const isMp = await isMiniProgram();
      if (isMp) {
        console.log('小程序');
        shareInMiniProgram(config);
      } else {
        console.log('微信');
        shareH5inWeChat(config);
      }
    } else if (client === clientType.JDAPP) {
      console.log('京东APP');
      const jdshare = await getJDShare();
      jdshare.callSharePane(getShareConfig(config));
    }
  } catch (e) {
    console.error(e);
  }
};
