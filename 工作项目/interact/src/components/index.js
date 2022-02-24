/*
 * @Author: YC
 * @Date: 2020-12-18 14:28:58
 * @LastEditors: YC
 * @LastEditTime: 2020-12-21 20:53:26
 * @Description:
 */

export default {
  install(vue) {
    vue.component('LzPageHeader', () => import('./LzPageHeader'));
    vue.component('LzPageSection', () => import ('./LzPageSection'));
    vue.component('LzTitle', () => import('./LzTitle'));
    vue.component('LzRenamePop', () => import('./LzRenamePop'));
    vue.component('LzAddrPop', () => import('./LzAddrPop'));
    vue.component('LzHorizontalStepsTip', () => import('./LzHorizontalStepsTip'));
  },
};
