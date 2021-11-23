/*
 * @Description:
 * @Date: 2021-03-22 18:49:14
 * @LastEditTime: 2021-03-23 18:54:37
 * @FilePath: \vite-project-js\src\plugins\vant.js
 */
// 全局引入vant
import Vant from 'vant';
import 'vant/lib/index.css';

export default function (app) {
  // 整体引入
  app.use(Vant);

  // 按需引入
}
