/*
 * @Author: caoshijie
 * @Date: 2021-09-23 14:36:23
 * @LastEditTime: 2021-09-24 16:41:18
 * @LastEditors: caoshijie
 * @Description: 雅诗兰黛复购礼
 * @FilePath: \custom\src\pages\1000376745\99\2109100037674502\routers.ts
 */
export default [
  { path: '/', name: 'index', component: () => import('./pages/index.vue') },
  { path: '/notqualified', name: 'notqualified', component: () => import('./pages/notQualified.vue') },
  { path: '/apply', name: 'apply', component: () => import('./pages/apply.vue') },
];
