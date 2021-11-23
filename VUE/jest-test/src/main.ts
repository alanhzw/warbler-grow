/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-15 17:59:57
 * @LastEditTime: 2021-11-19 16:20:39
 * @FilePath: \jest-test\src\main.ts
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import Widgets from "@/widgets";

const app = createApp(App);
app.use(store).use(router).mount("#app");
app.use(Widgets);
