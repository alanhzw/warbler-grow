/*
 * @Author: YC
 * @Date: 2021-07-19 17:16:59
 * @LastEditors: YC
 * @LastEditTime: 2021-07-20 21:15:57
 * @Description:
 */
interface JDShare {
  setShareInfo: (config: any) => void,
  callSharePane: (config: any) => void,
  sendDirectShare: (config: any) => void,
}

interface MPing {
  inputs?: any
}

interface WXSDK {
  config: (config: any) => void,
  ready: (config: any) => void,
  checkJsApi: (config: any) => void,
  onMenuShareTimeline: (config: any) => void,
  onMenuShareAppMessage: (config: any) => void,
  onMenuShareQQ: (config: any) => void,
  onMenuShareWeibo: (config: any) => void,
  updateAppMessageShareData: (config: any) => void,
  updateTimelineShareData: (config: any) => void,
  onMenuShareQZone: (config: any) => void,
  showAllNonBaseMenuItem: () => void,
  showMenuItems: (config: any) => void,
  miniProgram: {
    getEnv: (fn: function) => void,
    navigateTo: (fn: function) => void,
  },
  wxapi: {
    ready:(fn: function)=>void
  },
}

interface Window {
  VConsole?: Constructor,
  jdshare?: JDShare,
  wx?: WXSDK,
  MPing?: MPing,
  JD?:JDWxSdk,
}
