import Vue from 'vue';
import VueRouter from 'vue-router';
import { getToken } from '@mobile/service';
import CONST from '@/utils/constant';

const Page = () => import('@/mobile/pages/Page');
const Preview = () => import('@/mobile/pages/Preview');

Vue.use(VueRouter);

const routes = [
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/mobile/pages/Test'),
    meta: {
      title: '测试页面',
      requiresAuth: false,
    },
  }, {
    path: '/page/:shopId/:instanceId',
    name: 'Page',
    component: Page,
    meta: {
      title: '',
    },
  }, {
    path: '/preview/:shopId/:instanceId',
    name: 'PreviewPage',
    component: Preview,
    meta: {
      title: '预览',
    },
  }, {
    path: '/timer/:shopId/:instanceId',
    name: 'TimerPage',
    component: Preview,
    meta: {
      title: '预览',
    },
  }, {
    path: '/shop/:shopId',
    name: 'ShopPage',
    component: Page,
    meta: {
      title: '会员中心',
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: '/deco/', // process.env.VUE_APP_PUBLICPATH,
  routes: routes.map(({ meta, ...route }) => ({
    ...route,
    meta: {
      title: '', // 默认的title-互动活动
      requiresAuth: true, // 默认需要用户身份信息
      ...meta, // 如果路由内部定义的了相关的meta信息，则以自定义的为主
    },
  })),
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 如果需要用户身份，则检查用户token是否存在，这个流程是否放在这里处理还有待考量。。。
    const token = sessionStorage.getItem(CONST.LZ_DECO_CUSTOMER_TOKEN);
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
