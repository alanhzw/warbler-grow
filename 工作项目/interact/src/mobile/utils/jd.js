/**
 * 京东相关功能的封装
 */
// 京东sdk 这个是从原三合一工程中一直过来的，，
// 版本未知，貌似jd侧也没找到最新的版本下载地址
import Qs from 'qs';
import getJDSDK from '@/mobile/lib/jd-sdk';
// import router from '@/router';
import CONST from '@/utils/constant';

// 这个京东sdk导出的是个方法。。。
// 通过这个方法可以获取，对应的jdsdk的api
// Maybe 我打开的方式不对。。。

// alert('util jd')
console.log('util jd');
export const JDSDK = getJDSDK();

/**
 * 获取当前的客户端类型
 * 这块主要是参照原先三合一工程中wxcomponents.js的判断方式
 * TODO: 微信小程序的相关支持可能需要在这里添加一些处理
 */
const getClientType = () => {
  // 先试用jdsdk判断一下
  if (JDSDK.Client.isJDApp()) {
    return CONST.CLIENT_TYPE.JDAPP;
  } else if (JDSDK.Client.isWeixin()) {
    return CONST.CLIENT_TYPE.WECHAT;
  } else if (JDSDK.Client.isQQ()) {
    return CONST.CLIENT_TYPE.OTHER;
  }
  // jdsdk没判断出来结果，再根据UA判断一下
  const ua = navigator.userAgent;
  if (/jdapp/i.test(ua)) {
    return CONST.CLIENT_TYPE.JDAPP;
  } else if (/MicroMessenger/i.test(ua)) {
    return CONST.CLIENT_TYPE.WECHAT;
  } else if (/MQQBrowser/i.test(ua)) {
    return CONST.CLIENT_TYPE.QQ;
  }

  return CONST.CLIENT_TYPE.OTHER;
};


const loginJDApp = () => new Promise((resolve, reject) => {
  console.log('loginJDApp -> loginJDApp');
  // 先判断用户是否登陆
  JDSDK.Isv.isAppLogin((res) => {
    console.log('loginJDApp -> res', res);
    if (res.data == 1) {
      resolve();
      console.log('loginJDApp -> loginJDApp resolve 1');
    } else {
      JDSDK.Isv.requestLogin((res) => {
        console.log('loginJDApp -> res', res);
        if (res.data == 1) {
          console.log('loginJDApp -> loginJDApp resolve 2');
          resolve();
        } else {
          console.log('loginJDApp -> loginJDApp reject');
          reject();
        }
      });
    }
  });
});

/**
 * 获取用户在京东侧的token
 * 此处返回的是一个Promise，token信息会被传入resolve中
 * 如果是wechat、qq的跳页面的认证方式则可能需要使用跳转页面的方式然后在queryString中获取对应的token信息
 */
const getToken = () => {
  // alert('util jd getToken')
  console.log('util jd getToken');
  return new Promise((resolve, reject) => {
    // 先从页面的链接中检测有没有相关信息
    const searchParams = Qs.parse(window.location.href.split('?')[1] || '');
    if (searchParams.token && searchParams.token !== '') {
      const jdTokenInSearch = searchParams.token;
      // 将相关信息写入sessionStorage
      sessionStorage.setItem(CONST.LZ_JD_CUSTOMER_TOKEN, searchParams.token);
      localStorage.setItem(CONST.LZ_JD_CUSTOMER_TOKEN, searchParams.token);
      // 删除链接中的token信息，这是为了一旦分享页面当前链接会带上用户的token信息
      delete searchParams.token;
      // 本来想用router.currentRoute可以比较简单
      // router.currentRoute 这个货并不能获取到当前的路由信息
      // 因为这个方法作为一个通用的方法不一定在哪个地方调用
      // 如果不是在具体的页面组件中调用所以大概率获取不到相关信息
      // so 手动从页面的url中获取路由信息
      const hashStr = window.location.hash.split('?')[0];
      const queryStr = Object.keys(searchParams).length > 0 ? `?${Qs.stringify(searchParams)}` : '';
      // router.replace(`${hashStr}${queryStr}`); // 奇奇怪怪的不生效
      // 使用window.location.href会造成页面的刷新，会出现多次请求后台的问题，所以修改为使用replaceState的办法
      // window.location.href = `${window.location.origin}${window.location.pathname}${hashStr}${queryStr}`;

      // 使用replaceState的方式没法去掉search里面的token
      // window.history.replaceState(history.state, '', `${window.location.origin}${window.location.pathname}${hashStr}${queryStr}`)
      window.location.href = `${window.location.origin}${window.location.pathname}${hashStr}${queryStr}`;
      resolve({ token: jdTokenInSearch, source: '02' });
    } else {
      // 判断sessionStorage中是否有JD的token信息
      const jdTokenInSession = sessionStorage.getItem(CONST.LZ_JD_CUSTOMER_TOKEN);
      if (typeof jdTokenInSession === 'string' && jdTokenInSession) {
        resolve({ token: jdTokenInSession, source: '02' });
      } else {
        // 获取token
        if (getClientType() === CONST.CLIENT_TYPE.JDAPP) {
          // alert('JD APP login')
          console.log('JD APP login');
          // jd app
          loginJDApp().then(() => {
            // 用户已经登录通过sdk获取token
            console.log('getToken -> requestIsvToken');
            JDSDK.Isv.requestIsvToken({
              url: window.location.origin,
            }, ({ data }) => resolve({ token: data, source: '01' }));
          }).catch(() => reject(new Error('京东APP验证用户身份失败')));
        } else {
          console.log('wq login');
          window.location.href = `${CONST.JD_WQ_AUTH_URL}?biz=${CONST.BIZTYPE}&url=${encodeURIComponent(window.location.href)}`;
        }
      }
    }
  });
};

/**
 * 获取用户在京东侧的token
 * 此处返回的是一个Promise，token信息会被传入resolve中
 * 如果是wechat、qq则创建一个iframe，在iframe中使用跳页面的认证方式在认证回调的search链接中获取对应的token信息
 */
// const getToken = () => {
//   return new Promise((resolve, reject) => {
//     // 获取客户端类型
//     if (getClientType() === CONST.CLIENT_TYPE.JDAPP) {
//       // jd app
//       loginJDApp().then(() => {
//         // 用户已经登录通过sdk获取token
//         console.log('getToken -> requestIsvToken');
//         JDSDK.Isv.requestIsvToken({
//           url: window.location.origin
//         }, ({data}) => resolve({token: data, source: '01'}));
//       }).catch(() => reject(new Error('京东APP验证用户身份失败')));
//     } else {
//       // 创建iframe
//       const iframe = document.createElement('iframe')
//       iframe.style.position = 'fixed';
//       iframe.style.top = 0;
//       iframe.style.left = 0;
//       iframe.style.width = '100%';
//       iframe.style.height = '100%';
//       iframe.style.borderWidth = 0;
//       iframe.style.zIndex = 10000;
//       // 在iframe中跳转wechat、qq认证链接，认证之后回到auth.html
//       const authUrl = `https://${window.location.hostname}/mobile/auth.html`;
//       console.log(`${CONST.JD_WQ_AUTH_URL}?biz=${CONST.BIZTYPE}&url=${encodeURIComponent(authUrl)}`)
//       iframe.src = `${CONST.JD_WQ_AUTH_URL}?biz=${CONST.BIZTYPE}&url=${encodeURIComponent(authUrl)}`;
//       // 在window对像上挂在回调方法，用于接收auth.html接收到的token信息
//       window.jdAuthCallback = (error, token) => {
//         console.log('window.jdAuthCallback -> token', token);
//         // 销毁iframe
//         document.body.removeChild(iframe);
//         // 销毁回调方法
//         window.jdAuthCallback = null;
//         if (error) {
//           reject(new Error('获取京东token失败'));
//         } else {
//           resolve({token, source: '02'});
//         }
//       }
//       // body上挂载iframe
//       console.log('getToken -> iframe');
//       document.body.appendChild(iframe)
//     }
//   });
// };

const defaultShareImg = 'http://img10.360buyimg.com/imgzone/jfs/t1/163534/34/4106/101460/600e2292Ed3609887/824e50f6ac5477dd.jpg';

const getMpPath = url => `pages/h5/index?encode_url=${url}`;
const getShareConfig = (config = {}) => {
  const title = config.title || '请您参与活动';
  const content = config.content || title;
  const url = config.shareUrl || window.location.href;

  const img = config.imageUrl || defaultShareImg;

  const endTime = Date.now() + 3 * 60 * 60 * 24 * 1000;
  // const
  return {
    title, // 分享标题
    content, // 分享内容
    url, // 分享链接
    img, // 分享图片
    channel: 'Wxfriends', // 发送给微信好友
    callback: () => {}, // 分享回调 // TODO： ？？？？ 具体在那个阶段出发需要测试
    clickcallback: null, // 点击回调 // TODO： ？？？？ 具体在那个阶段出发需要测试
    qrparam: null, // 二维码参数？？？
    timeline_title: '', // 朋友圈标题
    mpId: 'gh_45b306365c3d', // 小程序ID 默认 使用的是京东购物小程序的微信小程序appid
    mpIconUrl: img, // 微信小程序分享的图片
    mpPath: getMpPath(window.location.href), // 小程序路径
    mpType: '1',
    appCode: 'jApp', //  jApp - 商城 jXi - 京喜 jFinance - 京东金融 jLite - 京东极速版 liwo - 梨涡
    keyparam: {
      url: decodeURIComponent(url),
      keyEndTime: JSON.stringify(endTime),
      keyChannel: 'Wxfriends,QQfriends,Wxmoments,QQzone,Sinaweibo', // 分享渠道
      // 'sourceCode': 'babel',
      sourceCode: 'isv',
      keyImg: img,
      keyId: decodeURIComponent(url), // 京东侧同一个页面必须唯一
      keyTitle: title,
      keyContent: content,
      keyOpenapp: 'openapp.jdmobile://virtual?params={\"category\":\"jump\",\"des\":\"jdreactcommon\",\"modulename\":\"JDReactCollectJDBeans\",\"appname\":\"JDReactCollectJDBeans\",\"param\":{\"page\":\"collectJDBeansHomePage\",\"transparentenable\":true}}',
    },
  };
};
const setHeaderShare = (config = {}) => {
  window.jdshare && window.jdshare.setShareInfo(getShareConfig(config));
};
const shareWithCmdword = (config = {}) => {
  console.log('🚀 ~ shareWithCmdword ~ shareWithCmdword');
  window.jdshare && window.jdshare.callSharePane(getShareConfig(config));
};
export default {
  // 导出jd的sdk，方便需要的时候灵活调用
  SDK: JDSDK,
  getClientType,
  getToken,
  setHeaderShare,
  shareWithCmdword,
};
