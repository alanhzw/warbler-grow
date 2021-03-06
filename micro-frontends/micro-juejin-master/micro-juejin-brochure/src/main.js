import "./public-path";
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import { routes } from "./router";
import store from "@/store";
import "@/filter";
import "@/shared/initLazyLoad";

const packageName = require("../package.json").name;

Vue.config.productionTip = false;

let router = null;
let instance = null;

function VueRender(props = {}) {
  const { container } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? `/${packageName}` : "",
    mode: "history",
    routes
  });

  instance = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(container ? container.querySelector("#app") : "#app");
}

/*如果不作为微应用加载则直接调用VueRender*/
if (!window.__POWERED_BY_QIANKUN__) {
  VueRender();
}

/*
 * 微应用必须暴露加载的生命周期hooks
 *
 * */
export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}

/*暴露监听全局状态变化的方法，让局部组件得意实现局部监听*/
export let onGlobalStateChange;

/*改变全局状态
 * setGlobalState: (state: Record<string, any>) => boolean， 按一级属性设置全局状态，微应用中只能修改已存在的一级属性
 * */
export let setGlobalState;

export async function mount(props) {
  onGlobalStateChange = props.onGlobalStateChange;
  setGlobalState = props.setGlobalState;
  console.log("[vue] props from main framework", props);
  VueRender(props);

}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;

}
