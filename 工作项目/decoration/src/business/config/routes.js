// /*
//  * @Author: YC
//  * @Date: 2020-12-11 11:27:10
//  * @LastEditors: YC
//  * @LastEditTime: 2020-12-11 21:34:20
//  * @Description: use lazy
//  */
// import { renderNotFound } from '@ice/stark-app';
// import BasicLayout from '@/layouts/BasicLayout.vue';
// import List from '@/pages/List';
// // import Home from '@/pages/Home';
//
// const routerConfig = [
//   {
//     path: '/',
//     component: BasicLayout,
//     children: [
//       // { path: '/', component: Home, exact: true },
//       { path: '/', component: () => import('@/pages/Home'), exact: true },
//       { path: '/list', component: List },
//       { path: '/login', component: () => import('@/pages/Login') },
//       {
//         path: '*',
//         component: () => renderNotFound(),
//       },
//     ],
//   },
// ];
//
// export default routerConfig;
