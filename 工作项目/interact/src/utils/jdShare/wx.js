

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

const jsApiList = [
  'updateAppMessageShareData',
  'updateTimelineShareData',
  'onMenuShareWeibo',
  'onMenuShareQZone',
  'showAllNonBaseMenuItem',
];

// 加载微信sdk
export const getWXSDK = async () => {
  console.log('加载微信sdk');
  if (!window.wx) {
    // await loadScript('https://res.wx.qq.com/open/js/jweixin-1.3.2.js');
    await loadScript('https://res.wx.qq.com/open/js/jweixin-1.6.0.js');
  }
  return window.wx;
};

export default {
  getWXSDK,
};

// 加载京东已注册的wxSdk
export const getJDWxSdk = async () => {
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
export const isMiniProgram = async () => {
  const wxSDK = await getJDWxSdk();
  return new Promise(((resolve) => {
    wxSDK.wxapi.ready(() => {
      // @ts-ignore
      wx.miniProgram.getEnv((result) => {
        console.log('wxSDK.miniProgram.getEnv', result);
        resolve(result.miniprogram);
      });
    });
  }));
};

