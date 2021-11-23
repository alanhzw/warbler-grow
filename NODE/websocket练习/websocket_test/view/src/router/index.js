/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2021-01-03 12:24:10
 * @LastEditTime: 2021-01-09 15:51:22
 * @FilePath: \websocket_test\view\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/aaaa",
    name: "aaa",
    component: () => import("../views/aaaa.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
