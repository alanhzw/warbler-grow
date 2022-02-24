/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2021-01-25 10:24:46
 * @LastEditTime: 2021-12-11 21:47:40
 * @FilePath: \interact\src\mobile\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import CONST from '@/utils/constant';
import { JDSDK } from '@mobile/utils/jd';
import { getToken } from '@mobile/service';

Vue.use(VueRouter);

const routes = [
  // 微信引导页面
  {
    path: '/wx/guide',
    name: 'WxGuide',
    component: () => import('@/mobile/pages/WxGuide'),
    meta: {
      title: '请稍候',
      wxGuideEnable: false,
      pageType: 2,
      version: '',
      versionName: '',
    },
  },
  // 会员试用
  {
    path: '/:shopId/508/:activityId',
    name: 'Activity',
    component: () => import('@/mobile/pages/Trial'),
    meta: {
      title: '会员试用',
      pageType: 2,
      version: '',
      versionName: '',
      type: '508',
    },
  },
  // 会员试用
  {
    path: '/:shopId/508/:activityId/:tplId',
    name: 'Activity',
    component: () => import('@/mobile/pages/Trial'),
    meta: {
      title: '会员试用',
      pageType: 2,
      version: '',
      versionName: '',
      type: '508',
    },
  },
  // 会员集卡
  {
    path: '/:shopId/504/:activityId',
    name: 'Activity',
    component: () => import('@/mobile/pages/CollectCard'),
    meta: {
      title: '会员集卡',
      pageType: 2,
      version: '',
      versionName: '',
      type: '504',
    },
  },
  // 会员集卡
  {
    path: '/:shopId/504/:activityId/:tplId',
    name: 'Activity',
    component: () => import('@/mobile/pages/CollectCard'),
    meta: {
      title: '会员集卡',
      pageType: 2,
      version: '',
      versionName: '',
      type: '504',
    },
  },
  // 测试页面
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/mobile/pages/Test'),
    meta: {
      title: '测试页面',
      wxGuideEnable: true,
      requiresAuth: true,
      pageType: 2,
      version: '',
      versionName: '',
    },
  },
  // 模版预览
  {
    path: '/tpl/:templateKey',
    name: 'TemplatePreview',
    component: () => import('@/mobile/pages/Preview'),
    meta: {
      title: '活动预览',
      requiresAuth: false,
      pageType: 2,
      version: '',
      versionName: '',
    },
  },
  // 消费满额活动通用
  {
    path: '/:shopId/:type/:activityId',
    name: 'Activity',
    component: () => import('@/mobile/pages/Activity'),
    meta: {
      title: '活动主页面',
      requiresAuth: true,
      pageType: 2,
      version: '',
      versionName: '',
    },
  },
  // 消费满额活动通用
  {
    path: '/:shopId/:type/:activityId/:tplId',
    name: 'Activity',
    component: () => import('@/mobile/pages/Activity'),
    meta: {
      title: '活动主页面',
      requiresAuth: true,
      pageType: 2,
      version: '',
      versionName: '',
    },
  },
].map(({ meta, ...route }) => ({
  ...route,
  meta: {
    title: '互动活动', // 默认的title-互动活动
    wxGuideEnable: true, // 默认在微信环境进入引导页面（下载二维码，京东APP打开），现阶段由于微信对活动分享的限制，所有的活动页面默认引导到京东APP打开
    requiresAuth: true, // 默认需要用户身份信息
    ...meta,
  },
}));

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_PUBLICPATH, // 这货会被自动处理和 vue.config 的 publicPath 最终的结果保持一致，不需要在.env中定义？？？
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (JDSDK.Client.isWeixin() && to.meta.wxGuideEnable && window.location.href.indexOf('504') > -1) {
    // 如果是在微信的环境 对应的页面需要使用微信引导页面则跳转到微信的引导页面
    // next({
    //   name: 'WxGuide',
    //   query: {
    //     url: window.location.href
    //   }
    // });
    window.location.href = `/activity/wx/guide?url=${encodeURIComponent(window.location.href)}`;
  } else if (to.meta.requiresAuth) {
    // 如果需要用户身份，则检查用户token是否存在，这个流程是否放在这里处理还有待考量。。。
    const token = sessionStorage.getItem(CONST.LZ_CRM_CUSTOMER_TOKEN);
    if (!token) {
      // token不存在，获取token在进入页面
      getToken().then(() => next());
    } else {
      // token存在直接进入页面
      next();
    }
  } else {
    // 无条件直接打开页面
    next();
  }
});

export default router;
