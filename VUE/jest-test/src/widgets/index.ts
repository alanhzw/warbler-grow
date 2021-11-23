/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-19 16:18:11
 * @LastEditTime: 2021-11-19 16:19:43
 * @FilePath: \jest-test\src\widgets\index.ts
 */
import { App } from "vue";
import BigWheel from "./big-wheel";
export default {
  install(app: App): void {
    app.use(BigWheel);
  },
};
