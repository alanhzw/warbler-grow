import { ShareConfig } from '@/types/ShareConfig';
import DOMAIN, { exchangeSubStr } from './domain';
import { getWXSDK, isMiniProgram } from './wx';
import clientType, { getClientType } from './clientType';
import { loadScript } from '../client';
import ShareType from './shareType';
import { reportShareEvent } from '../trackEvent/jdReport';
import constant from '../constant';
import { Jdsdk } from './jdsdk';

const defaultShareImg = 'http://img10.360buyimg.com/imgzone/jfs/t1/163534/34/4106/101460/600e2292Ed3609887/824e50f6ac5477dd.jpg';
const defaultShareChannel = 'Wxfriends';

// 获取京口令分享配置
const getCMDShareConfig = (config: ShareConfig = {}) => {
  console.log('getCMDShareConfig');
  const title = config.title ?? '请您参与活动';
  const content = config.content ?? title;
  const originUrl = config.shareUrl ?? window.location.href;
  const url = exchangeSubStr(originUrl, DOMAIN.PROTECT, DOMAIN.COMMON);
  const img = config.imageUrl ?? defaultShareImg;
  const endTime = Date.now() + 3 * 60 * 60 * 24 * 1000;
  const callback = config.afterShare ?? (() => console.log('share'));
  const clickcallback = config.beforeShare ?? (() => console.log('click callback'));
  const channel = config.channel ?? defaultShareChannel;
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
const getH5ShareConfig = (config: ShareConfig = {}) => {
  console.log('getH5ShareConfig');
  const title = config.title ?? '请您参与活动';
  const content = config.content ?? title;
  const orginUrl = config.shareUrl ?? window.location.href;
  const url = exchangeSubStr(orginUrl, DOMAIN.PROTECT, DOMAIN.COMMON);
  const img = config.imageUrl ?? defaultShareImg;
  const callback = config.afterShare ?? (() => console.log('share'));
  const clickcallback = config.beforeShare ?? (() => console.log('click callback'));
  const channel = config.channel ?? defaultShareChannel;
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
const getMiniAppShareConfig = (config: ShareConfig = {}) => {
  console.log('getMiniAppShareConfig');
  const title = config.title ?? '请您参与活动';
  const content = config.content ?? title;
  const originUrl = config.shareUrl ?? window.location.href;
  const url = exchangeSubStr(originUrl, DOMAIN.PROTECT, DOMAIN.COMMON);
  const img = config.imageUrl ?? defaultShareImg;
  const callback = config.afterShare ?? (() => console.log('share'));
  const clickcallback = config.beforeShare ?? (() => console.log('click callback'));
  const shareUrl = encodeURIComponent(url);
  const channel = config.channel ?? defaultShareChannel;
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
const getShareConfig = (config: ShareConfig = {}) => {
  const type = config.type ?? sessionStorage.getItem(constant.LZ_SHARE_TYPE) ?? ShareType.CMD;
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
const getJDShare = async (): Promise<JDShare> => {
  console.log('加载并返回京东分享SDK');
  if (!window.jdshare) {
    await loadScript('//h5static.m.jd.com/act/jm-jdshare/2.3.0/jm-jdshare.js');
  }
  return window.jdshare as JDShare;
};

// 设置京口令分享
const shareWithCmdword: (config: ShareConfig) => Promise<void> = async (config = {}) => {
  console.log('设置京口令分享', config);
  const jdshare = await getJDShare();
  const shareConfig = getCMDShareConfig(config);
  jdshare.callSharePane(shareConfig);
};

// 设置H5分享
const shareH5: (config: ShareConfig) => Promise<void> = async (config = {}) => {
  console.log('设置H5分享', config);
  const jdshare = await getJDShare();
  const shareConfig = getH5ShareConfig(config);
  jdshare.callSharePane(shareConfig);
};

// 设置H5分享
const shareH5WithSDK: (config: ShareConfig) => Promise<void> = async (config = {}) => {
  console.log('设置H5WithSDK分享', config);
  const title = config.title ?? '请您参与活动';
  const content = config.content ?? title;
  const originUrl = config.shareUrl ?? window.location.href;
  const url = exchangeSubStr(originUrl, DOMAIN.PROTECT, DOMAIN.COMMON);
  const img = config.imageUrl ?? defaultShareImg;
  const callback = config.afterShare ?? (() => console.log('share'));
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
const shareH5inWeChat: (config: ShareConfig) => Promise<void> = async (config = {}) => {
  console.log('设置微信h5分享', config);
  const title = config.title ?? '请您参与活动';
  const callback = config.afterShare ?? (() => console.log('share'));
  const shareConfig = {
    title, // 分享标题
    desc: config.content ?? title, // 分享描述
    link: config.shareUrl ?? window.location.href, // 分享链接
    imgUrl: config.imageUrl ?? defaultShareImg,
    success: () => callback(),
    fail: (error: any) => {
      console.log('fail', error);
    },
  };
  // 分享给朋友
  window.wx?.onMenuShareAppMessage(shareConfig);
  // 分享到朋友圈
  window.wx?.onMenuShareTimeline(shareConfig);
  // 分享到QQ
  window.wx?.onMenuShareQQ(shareConfig);
  // 分享到QQ空间
  window.wx?.onMenuShareQZone(shareConfig);
};

// 小程序分享
const shareInMiniProgram: (config: ShareConfig) => Promise<void> = async (config = {}) => {
  console.log('设置微信小程序分享', config);
  const title = config.title ?? '请您参与活动';
  const originUrl = config.shareUrl ?? window.location.href;
  let url = exchangeSubStr(originUrl, DOMAIN.PROTECT, DOMAIN.COMMON);
  const img = config.imageUrl ?? defaultShareImg;
  const callback = config.afterShare ?? (() => console.log('share'));
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
const shareToMiniApp: (config: ShareConfig) => Promise<void> = async (config = {}) => {
  console.log('设置小程序分享', config);
  const jdshare = await getJDShare();
  const shareConfig = getMiniAppShareConfig(config);
  jdshare.callSharePane(shareConfig);
};

// 设置头部分享
export const setHeaderShare: (config: ShareConfig) => Promise<void> = async (config = {}) => {
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
export const callShare: (config: ShareConfig) => Promise<void> = async (config = {}) => {
  console.log('根据客户端和分享渠道，自动设置分享');
  const client: string = getClientType();
  console.log('clientType', client);
  reportShareEvent();
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
