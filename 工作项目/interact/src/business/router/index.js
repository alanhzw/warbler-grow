/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-10-28 10:50:24
 * @LastEditTime: 2021-09-02 17:23:06
 * @FilePath: \interact\src\business\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import { getBasename } from '@ice/stark-app';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/Login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/list',
    name: 'Activities',
    component: () => import('../pages/Activities.vue'),
    meta: {
      title: '云鹿专享互动活动',
    },
  },
  {
    path: '/:type/new',
    name: 'NewActivityForm',
    component: () => import('../pages/ActivityForm.vue'),
    meta: {
      title: '创建活动',
    },
  },
  {
    path: '/create',
    name: 'ActivityCreate',
    component: () => import('../pages/ActivityCreate.vue'),
    meta: {
      title: '活动管理',
    },
  },
  {
    path: '/:type/:id',
    name: 'ActivityInfoPage',
    component: () => import('../pages/ActivityForm.vue'),
    meta: {
      title: '编辑活动',
    },
  },
  {
    path: '/square',
    name: 'Square',
    component: () => import('../pages/ActivitySquare.vue'),
    meta: {
      title: '互动广场',
    },
  },
  {
    path: '/squareCommon',
    name: 'squareCommon',
    component: () => import('../pages/ActivitySquareCommon.vue'),
    meta: {
      title: '互动广场',
    },
  },
  {
    path: '/squareChangZe',
    name: 'squareChangZe',
    component: () => import('../pages/ActivitySquareChangZe.vue'),
    meta: {
      title: '互动广场',
    },
  },
  {
    path: '/squareSnapdragon',
    name: 'squareSnapdragon',
    component: () => import('../pages/ActivitySquareSnapdragon.vue'),
    meta: {
      title: '互动广场',
    },
  },
  {
    path: '/crm',
    name: 'squareCrm',
    component: () => import('../pages/ActivitySquareCrm.vue'),
    meta: {
      title: '定制活动中心',
    },
  },
];
const router = new VueRouter({
  mode: 'history', // 在框架应用里面使用history模式，本地启动的时候使用hash模式方便多端启动
  base: getBasename(),
  routes,
});

export default router;
