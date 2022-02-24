// 登录京东app
import QS from 'qs';
import constant from '../constant';
import CLIENT_TYPE, { getClientType, isPC } from './clientType';
import DOMAIN, { exchangeSubStr, getBizType } from './domain';
import { Jdsdk } from './jdsdk';

const JD_WQ_AUTH_URL = 'https://wq.jd.com/pinbind/pinTokenRedirect';

export interface JDSDKRes {
  data: string,
  msg: string,
  state: string,
}

const loginJDApp = () => new Promise<void>((resolve, reject) => {
  // 先判断用户是否登陆
  Jdsdk.Isv.isAppLogin((checkLoginRes: JDSDKRes) => {
    if (checkLoginRes.data === '1') {
      resolve();
    } else {
      Jdsdk.Isv.requestLogin((loginRes: JDSDKRes) => {
        if (loginRes.data === '1') {
          resolve();
        } else {
          reject(new Error(loginRes.msg));
        }
      });
    }
  });
});

// 获取token
export const getToken = (shopId?:string): Promise<{
  token: string,
  source: string,
  fromType: string,
}> => new Promise((resolve, reject) => {
  // 先从页面的链接中检测有没有相关信息
  const searchParams = QS.parse(window.location.href.split('?')[1] || '');
  if (searchParams.token && searchParams.token !== '') {
    const jdTokenInSearch = searchParams.token as string;
    // 将相关信息写入sessionStorage
    sessionStorage.setItem(constant.LZ_JD_CUSTOMER_TOKEN, searchParams.token as string);
    // 删除链接中的token信息，这是为了一旦分享页面当前链接会带上用户的token信息
    delete searchParams.token;
    // 本来想用router.currentRoute可以比较简单
    // router.currentRoute 这个货并不能获取到当前的路由信息
    // 因为这个方法作为一个通用的方法不一定在哪个地方调用
    // 如果不是在具体的页面组件中调用所以大概率获取不到相关信息
    // so 手动从页面的url中获取路由信息
    const hashStr = window.location.hash.split('?')[0];
    const queryStr = Object.keys(searchParams).length > 0 ? `?${QS.stringify(searchParams)}` : '';
    // router.replace(`${hashStr}${queryStr}`); // 奇奇怪怪的不生效
    // 使用window.location.href会造成页面的刷新，会出现多次请求后台的问题，所以修改为使用replaceState的办法
    // window.location.href = `${window.location.origin}${window.location.pathname}${hashStr}${queryStr}`;

    // 使用replaceState的方式没法去掉search里面的token
    window.history.replaceState(window.history.state, '', `${window.location.origin}${window.location.pathname}${hashStr}${queryStr}`);
    resolve({ token: jdTokenInSearch, source: '02', fromType: CLIENT_TYPE.WECHAT });
  } else {
    const clientType = getClientType();

    // 判断sessionStorage中是否有JD的token信息
    const jdTokenInSession = sessionStorage.getItem(constant.LZ_JD_CUSTOMER_TOKEN);
    if (jdTokenInSession) {
      // 获取之后就删除对应的缓存
      sessionStorage.removeItem(constant.LZ_JD_CUSTOMER_TOKEN);
      resolve({ token: jdTokenInSession, source: '02', fromType: CLIENT_TYPE.WECHAT });
    } else if (clientType === CLIENT_TYPE.JDAPP) {
      // jd app
      loginJDApp().then(() => {
        const url = exchangeSubStr(window.location.origin, DOMAIN.PROTECT, DOMAIN.COMMON);
        // 用户已经登录通过sdk获取token
        Jdsdk.Isv.requestIsvToken({ url }, ({ data }: { data: string }) => resolve({ token: data, source: '01', fromType: 'APP' }));
      }).catch(() => reject(new Error('京东APP验证用户身份失败')));
    } else if (clientType === CLIENT_TYPE.WECHAT || clientType === CLIENT_TYPE.QQ || isPC()) {
      const bizType = getBizType();
      window.location.href = `${JD_WQ_AUTH_URL}?biz=${bizType}&url=${encodeURIComponent(window.location.href)}`;
    } else {
      const bizType = getBizType();

      window.location.href = `${JD_WQ_AUTH_URL}?biz=${bizType}&url=${encodeURIComponent(window.location.href)}`;

      // 按照京东app-open方式方式打开执行
      const accessUrl = encodeURIComponent(window.location.href.split('#')[0]);

      if (shopId) {
        window.location.href = `/lzclient/cjwx/common/openJDApp.html?actlink=${accessUrl}&shopid=${shopId}`;
      } else {
        window.location.href = `/lzclient/cjwx/common/openJDApp.html?actlink=${accessUrl}`;
      }
    }
  }
});
