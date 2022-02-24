/*
 * @Author: YC
 * @Date: 2020-12-11 11:27:10
 * @LastEditors: YC
 * @LastEditTime: 2021-08-26 12:17:12
 * @Description:
 */
import Vue from 'vue';
import Router from 'vue-router';
import { getBasename, renderNotFound } from '@ice/stark-app';
import BasicLayout from '@/business/layouts/BasicLayout';
import Pages from '@/business/pages/Pages.vue';
import MemberCenter from '@/business/pages/MemberCenter.vue';
import Custom from '@/business/pages/Custom.vue';
import PointMall from '@/business/pages/PointMall.vue';

const routes = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/login',
        component: () => import('@/business/pages/Login'),
        meta: {
          title: '登录',
        },
      },
      {
        path: '/test',
        component: () => import('../business/pages/Test.vue'),
        meta: {
          title: '登录',
        },
      },
      // { path: '/test/:a-:b-:c', component: () => import('@/business/pages/Test') },
      {
        path: '/',
        component: () => import('@/business/pages/Home'),
        meta: {
          title: '登录',
        },
      },
      {
        path: '/pages',
        component: Pages,
        meta: {
          title: '页面装修',
        },
      },
      {
        path: '/memberCenter',
        component: MemberCenter,
        meta: {
          title: '会员中心',
        },
      },
      {
        path: '/custom',
        component: Custom,
        meta: {
          title: '自定义页面',
        },
      },
      {
        path: '/pointMall',
        component: PointMall,
        meta: {
          title: '积分商城',
        },
      },
      {
        path: '/page/:instanceId',
        component: () => import('@/business/pages/Editor'),
        meta: {
          title: '登录',
        },
      },
      {
        path: '/tasks',
        component: () => import('@/business/pages/Tasks'),
        meta: {
          title: '定时发布任务管理',
        },
      },
      {
        path: '*',
        component: () => renderNotFound(),
      },
    ],
  },
];

Vue.use(Router);

export default new Router({
  routes,
  mode: 'history',
  base: getBasename(),
});
