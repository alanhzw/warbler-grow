/*
 * @Description:
 * @Date: 2021-04-01 18:25:07
 * @LastEditTime: 2021-04-13 18:03:17
 * @FilePath: \my-zhihu\src\router\index.ts
 */
// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import store from '../store/index';
// hash模式  createWebHashHistory
// history模式  createWebHistory

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
      meta: {
        redirectAlreadyLogin: true,
      },
    },
    {
      path: '/column/:id',
      name: 'column',
      component: () => import('../views/ColumnDetail.vue'),
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreatePost.vue'),
      meta: {
        requiredLogin: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { user, token } = store.state;
  const { requiredLogin, redirectAlreadyLogin } = to.meta;
  if (!user.isLogin) {
    if (token) {
      store
        .dispatch('fetchCurrentUser')
        .then(() => {
          if (redirectAlreadyLogin) {
            next('/');
          } else {
            next();
          }
        })
        .catch(() => {
          store.commit('logout');
          next('login');
        });
    } else {
      if (requiredLogin) {
        next('login');
      } else {
        next();
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/');
    } else {
      next();
    }
  }
});
export default router;
