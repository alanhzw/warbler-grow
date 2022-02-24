import { cjwxRequest } from '@/utils//service';
import { loadScript } from '../client';

let wxConfiied = false;

const jsApiList = [
  'updateAppMessageShareData',
  'updateTimelineShareData',
  'onMenuShareWeibo',
  'onMenuShareQZone',
  'showAllNonBaseMenuItem',
];

// 加载微信sdk
export const getWXSDK = async (): Promise<WXSDK> => {
  console.log('加载微信sdk');
  if (!window.wx) {
    // await loadScript('https://res.wx.qq.com/open/js/jweixin-1.3.2.js');
    await loadScript('https://res.wx.qq.com/open/js/jweixin-1.6.0.js');
  }
  return window.wx as WXSDK;
};

export default {
  getWXSDK,
};

// 加载京东已注册的wxSdk
export const getJDWxSdk = async (): Promise<WXSDK> => {
  console.log('加载京东的sdk');
  if (!window.JD) {
    console.log('重复加载京东的sdk？');
    await loadScript('https://wq.360buyimg.com/js/common/dest/wq.wxapi.core.8d12715068.js');
  }
  return window.JD;
};

/**
 * 检查是否是小程序
 */
// export const isMiniProgram = async (): Promise<boolean> => {
//   const wxSDK = await getWXSDK();
//   return new Promise(((resolve) => {
//     wxSDK.miniProgram.getEnv((result: any) => {
//       console.log('wxSDK.miniProgram.getEnv', result);
//       resolve(result.miniprogram);
//     });
//   }));
// };
export const isMiniProgram = async (): Promise<boolean> => {
  const wxSDK = await getJDWxSdk();
  return new Promise(((resolve) => {
    wxSDK.wxapi.ready(() => {
      // @ts-ignore
      wx.miniProgram.getEnv((result: any) => {
        console.log('wxSDK.miniProgram.getEnv', result);
        resolve(result.miniprogram);
      });
    });
  }));
};

// eslint-disable-next-line no-async-promise-executor
export const wxSdkConfig = async (): Promise<boolean> => new Promise((async (resolve) => {
  const data = await cjwxRequest.get('/wxActionCommon/signature', {
    params: {
      url: window.location.href.split('#')[0],
    },
  });
  const wxSDK = await getWXSDK();
  const wxConfig = {
    debug: window.location.pathname.indexOf('m/demo/share/test') > -1,
    appId: data.data.appid,
    timestamp: data.data.timestamp,
    nonceStr: data.data.nonceStr,
    signature: data.data.signature,
    jsApiList,
  };
  wxSDK.config(wxConfig);
  console.log('wxConfig', wxConfig);
  wxSDK.ready(() => {
    console.log('wx sdk ready');
    wxSDK.checkJsApi({
      jsApiList,
      success(res: any) {
        // 以键值对的形式返回，可用的api值true，不可用为false
        // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
        console.log('checkJsApi', res);
        wxConfiied = true;
        resolve(true);
      },
    });
  });
}));
