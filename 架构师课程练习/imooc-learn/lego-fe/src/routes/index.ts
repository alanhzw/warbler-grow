/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-19 09:35:09
 * @LastEditTime: 2022-05-19 09:49:58
 * @FilePath: \lego-fe\src\routes\index.ts
 */
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Editor from '../views/Editor.vue';
import TemplateDetail from '../views/TemplateDetail.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor,
    },
    {
      path: '/template/:id',
      name: 'template',
      component: TemplateDetail,
    },
  ],
});

export default router;
