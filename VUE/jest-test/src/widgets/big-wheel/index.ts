/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-18 16:36:26
 * @LastEditTime: 2021-11-18 17:15:49
 * @FilePath: \jest-test\src\widgets\big-wheel\index.ts
 */

import { App, defineAsyncComponent } from "vue";

export default {
  install(app: App): void {
    app.component(
      "BigWheel",
      defineAsyncComponent(() => import("./BigWheel.vue"))
    );
  },
};
