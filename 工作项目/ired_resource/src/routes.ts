/*
 * @Descripttion:
 * @Author: yang chenglin
 * @Date: 2021-09-24 18:28:22
 * @LastEditors: yang chenglin
 * @LastEditTime: 2021-11-21 21:22:25
 */
import { createRouter, createWebHistory } from 'vue-router';
import publicLayout from 'layout/public.vue';
import Home from 'pages/public/home/index.vue';
import { checkLogin } from '@/utils';

const publicRoutes = [
  {
    path: '/login',
    component: () => import('pages/login/index.vue'),
    meta: {
      wrapper: 'default',
      wrapperBgColor: '#F8F8F8',
    },
  },
  {
    path: '/',
    component: publicLayout,
    children: [
      {
        path: '/',
        component: Home,
        meta: {
          wrapper: 'default',
          wrapperBgColor: '#F8F8F8',
        },
      },
      {
        name: 'Overall',
        path: '/overall/:classificationValue/:classifyCode',
        component: () => import('pages/public/overall/index.vue'),
        meta: {
          wrapper: 'default',
          wrapperBgColor: '#F8F8F8',
        },
      },
      {
        path: '/job/:jobId',
        component: () => import('pages/public/job/detail/index.vue'),
        meta: {
          wrapper: '',
          wrapperBgColor: '#FFFFFF',
        },
      },
      {
        path: '/invite/:jobId',
        component: () => import('pages/public/job/invite/index.vue'),
        meta: {
          wrapper: '',
          wrapperBgColor: '#FFFFFF',
        },
      },
      {
        path: '/company/:companyId',
        component: () => import('pages/public/company/detail/index.vue'),
        meta: {
          wrapper: '',
          wrapperBgColor: '#FFFFFF',
        },
      },
      // 搜索页
      {
        name: 'Search',
        path: '/search',
        component: () => import('pages/public/search/index.vue'),
        meta: {
          wrapper: 'default',
          wrapperBgColor: '#FFFFFF',
        },
      },
    ],
  },
];
const customerRoutes = [
  {
    path: '/customer',
    component: publicLayout,
    children: [
      {
        path: 'resume/create',
        component: () => import('pages/customer/resume/form/index.vue'),
        meta: {
          wrapper: 'default',
          wrapperBgColor: '#F8F8F8',
        },
      },
      {
        path: 'resume/:resumeId',
        component: () => import('pages/customer/resume/preview/index.vue'),
        meta: {
          wrapper: 'default',
          wrapperBgColor: '#F8F8F8',
        },
      },
      {
        path: 'application/records',
        component: () => import('pages/customer/application/records/index.vue'),
        meta: {
          wrapper: 'default',
          wrapperBgColor: '#FFFFFF',
        },
      },
      {
        path: 'collect/records',
        component: () => import('pages/customer/collection/records/index.vue'),
        meta: {
          wrapper: 'default',
          wrapperBgColor: '#FFFFFF',
        },
      },
    ],
  },

];

const evaluationRoutes = [
  {
    path: '/evaluation',
    component: () => import('layout/evaluation.vue'),
    children: [
      // 答题首页
      {
        path: '',
        component: () => import('pages/evaluation/index.vue'),
        meta: {
          wrapper: 'default',
          wrapperBgColor: '#F8F8F8',
        },
      },
      // 答题过程
      {
        path: 'answer',
        component: () => import('pages/evaluation/pages/answer/index.vue'),
        meta: {
          wrapper: 'default',
          wrapperBgColor: '#F8F8F8',
        },
      },
      // 答题结果
      {
        name: 'AnswerResult',
        path: 'answer/result',
        component: () => import('pages/evaluation/pages/answerResult/index.vue'),
        meta: {
          wrapper: 'default',
          wrapperBgColor: '#F8F8F8',
        },
      },
      // 自评
      {
        path: 'self',
        component: () => import('pages/evaluation/pages/self/index.vue'),
        meta: {
          wrapper: 'default',
          wrapperBgColor: '#F8F8F8',
        },
      },
      // 自评最后一页
      {
        name: 'SelfLast',
        path: 'self/last',
        component: () => import('pages/evaluation/pages/selfLast/index.vue'),
        meta: {
          wrapper: 'default',
          wrapperBgColor: '#F8F8F8',
        },
      },
      // 自评结果
      {
        name: 'SelfResult',
        path: 'self/result',
        component: () => import('pages/evaluation/pages/selfResult/index.vue'),
        meta: {
          wrapper: 'default',
          wrapperBgColor: '#F8F8F8',
        },
      },
      // 职业属性
      {
        name: 'SelfAttribute',
        path: 'attribute',
        component: () => import('pages/evaluation/pages/attribute/index.vue'),
        meta: {
          wrapper: 'default',
          wrapperBgColor: '#F8F8F8',
        },
      },

    ],
  },

];

const businessRoutes = [{
  path: '/business',
  component: () => import('layout/business.vue'),
  children: [
    {
      path: '',
      component: () => import('pages/business/home/index.vue'),
      meta: {
        wrapper: 'default',
        wrapperBgColor: '#F8F8F8',
      },
    },
    {
      path: 'statistics',
      component: () => import('pages/business/statistics/index.vue'),
      meta: {
        wrapper: 'default',
        wrapperBgColor: '#F8F8F8',
      },
    },
    {
      path: 'application/:status',
      component: () => import('pages/business/application/index.vue'),
      meta: {
        wrapper: 'default',
        wrapperBgColor: '#F8F8F8',
      },
    },
    {
      path: 'homepage/setting',
      component: () => import('pages/business/homepagesetting/index.vue'),
      meta: {
        wrapper: 'default',
        wrapperBgColor: '#F8F8F8',
      },
    },
    {
      path: 'resume/preview/:personId/:jobId',
      component: () => import('pages/business/resume/preview/index.vue'),
      meta: {
        wrapper: 'default',
        wrapperBgColor: '#F8F8F8',
      },
    },
    {
      path: 'people/square',
      component: () => import('pages/business/peopleSquare/index.vue'),
      meta: {
        wrapper: 'default',
        wrapperBgColor: '#F8F8F8',
      },
    },
    {
      path: 'recruitment/list',
      component: () => import('pages/business/recruitment/list/index.vue'),
      meta: {
        wrapper: 'default',
        wrapperBgColor: '#F8F8F8',
      },
    },
    {
      name: 'CreateRecruitment',
      path: 'recruitment/create',
      component: () => import('pages/business/recruitment/form/index.vue'),
      meta: {
        wrapper: 'default',
        wrapperBgColor: '#F8F8F8',
      },
    },
    // hr管理
    {
      path: 'hrManage',
      component: () => import('pages/business/hrManage/index.vue'),
      meta: {
        wrapper: 'default',
        wrapperBgColor: '#F8F8F8',
      },
    },
  ],
}];

const router = createRouter({
  routes: [...publicRoutes, ...customerRoutes, ...evaluationRoutes, ...businessRoutes],
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    // document.querySelector('.content')
    console.log('🚀 ~ scrollBehavior ~ document.querySelector(\'.content\')', document.querySelector('.content'));
    return {
      el: document.querySelector('.content'),
      top: 0,
    };
  },
  history: createWebHistory(),
});

const needToken = (path: string): boolean => {
  const modules = ['customer', 'evaluation', 'business'];
  return modules.indexOf(path.split('/')[1]) > -1;
};

router.beforeEach((to, from, next) => {
  console.log('🚀 ~ router.beforeEach ~ to.path', to.path);
  if (needToken(to.path) && !checkLogin()) {
    next(`/login?returnUrl=${encodeURIComponent(to.path)}`);
  }
  const content = document.querySelector('.main-body');
  if (content) {
    content.scrollTop = 0;
  }
  next();
});

export default router;
