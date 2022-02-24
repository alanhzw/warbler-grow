export default [
  {
    path: '/',
    component: () => import('./home/index.vue'),
  },
  {
    path: '/page1',
    component: () => import('./page1/index.vue'),
  },
  {
    path: '/page2',
    component: () => import('./page2/index.vue'),
  },
];
