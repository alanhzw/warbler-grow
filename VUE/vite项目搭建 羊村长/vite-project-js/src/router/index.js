/*
 * @Description:
 * @Date: 2021-03-21 16:17:56
 * @LastEditTime: 2021-07-20 17:31:31
 * @FilePath: \vite-project-js\src\router\index.js
 */

// hash模式  createWebHashHistory
// history模式  createWebHistory

import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // {
    //   path: '/',
    //   component: () => import('../components/todos/Todos.vue'),
    // },
    // {
    //   path: '/back',
    //   component: () => import('../views/Back.vue'),
    // },
    {
      path: '/a',
      component: () => import('../components/A.vue'),
      beforeEnter: (to, from) => {
       console.log('🚀🚀~ beforeEnter ');
      },
    },
    {
      path: '/b',
      component: () => import('../components/B.vue'),
    },
    {
      path: '/c',
      component: () => import('../components/C.vue'),
    },
  ],
});
router.beforeEach((to, from, next) => {
  console.log('🚀🚀~ beforeEach1');
  next();
});
router.beforeEach((to, from, next) => {
  console.log('🚀🚀~ beforeEach2');
  next();
});
router.beforeEach((to, from, next) => {
  console.log('🚀🚀~ beforeEach3');
  next();
});
router.beforeResolve((to, from, next) => {
  console.log('🚀🚀~ beforeResolve1');
  next();
});
router.beforeResolve((to, from, next) => {
  console.log('🚀🚀~ beforeResolve2');
  next();
});
router.beforeResolve((to, from, next) => {
  console.log('🚀🚀~ beforeResolve3');
  next();
});
router.afterEach((to, from) => {
  console.log('🚀🚀~ afterEach1');
});
router.afterEach((to, from) => {
  console.log('🚀🚀~ afterEach2');
});
router.afterEach((to, from) => {
  setTimeout(() => {
  console.log('🚀🚀~ afterEach3');

  }, 3000);
});

// router.afterEach((to, from) => {
//  console.log('🚀🚀~ afterEach1:');
// });
// router.afterEach((to, from) => {
//   console.log('🚀🚀~ afterEach2:');
//  });
export default router;
