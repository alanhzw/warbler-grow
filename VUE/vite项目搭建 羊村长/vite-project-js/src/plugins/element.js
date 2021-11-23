/*
 * @Description:
 * @Date: 2021-03-22 18:49:14
 * @LastEditTime: 2021-03-29 19:06:39
 * @FilePath: \vite-project-js\src\plugins\element.js
 */
// 全局引入element3

import { ElButton } from 'element-plus';
import { ElInput } from 'element-plus';
import { ElTabs } from 'element-plus';
import { ElTabPane } from 'element-plus';

import 'element-plus/lib/theme-chalk/index.css';

export default function (app) {
  // 整体引入
  app.use(ElButton);
  app.use(ElInput);
  app.use(ElTabs);
  app.use(ElTabPane);

  // 按需引入
}
