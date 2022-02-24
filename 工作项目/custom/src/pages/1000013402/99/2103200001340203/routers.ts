// 1. 定义路由组件.
// 也可以从其他文件导入
const Home = () => import('./pages/Index.vue');
const AllRights = () => import('./pages/AllRights.vue');
const TaskDetails = () => import('./pages/TaskDetails.vue');
const GrowthDetails = () => import('./pages/GrowthDetails.vue');

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
export default [
  { path: '/', component: Home },
  { path: '/AllRights', component: AllRights },
  { path: '/TaskDetails', component: TaskDetails },
  { path: '/GrowthDetails', component: GrowthDetails },
];
