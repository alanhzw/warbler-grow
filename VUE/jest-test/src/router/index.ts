/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-15 17:59:57
 * @LastEditTime: 2021-11-26 17:08:50
 * @FilePath: \jest-test\src\router\index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/big-wheel1",
    name: "BigWheelView1",
    component: () => import(/* webpackChunkName: "about" */ "../views/BigWheel1.vue"),
  },
  {
    path: "/big-wheel",
    name: "BigWheelView",
    component: () => import(/* webpackChunkName: "about" */ "../views/BigWheel.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
