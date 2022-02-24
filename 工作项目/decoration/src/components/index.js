/*
 * @Author: YC
 * @Date: 2020-12-18 14:28:58
 * @LastEditors: YC
 * @LastEditTime: 2020-12-21 20:53:26
 * @Description:
 */

// import LzPageHeader from './LzPageHeader';
// import LzPageSection from './LzPageSection';
// import LzTitle from './LzTitle';

// export default {
//   install (vue) {
//     vue.component(LzPageHeader.name, LzPageHeader)
//     vue.component(LzPageSection.name, LzPageSection)
//     vue.component(LzTitle.name, LzTitle)
//   }
// }


export default {
  install(vue) {
    vue.component('LzPageHeader', () => import('./LzPageHeader'));
    vue.component('LzPageSection', () => import ('./LzPageSection'));
    vue.component('LzTitle', () => import('./LzTitle'));
    vue.component('LzRenamePop', () => import('./LzRenamePop'));
    vue.component('LzAddrPop', () => import('./LzAddrPop'));
  },
};
