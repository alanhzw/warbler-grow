/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-02 18:09:53
 * @LastEditTime: 2021-01-07 18:58:33
 * @FilePath: \SNActivity\src\router\index.js
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
    // 积分pk活动页
    {
      path: '/pointPK/:activityId',
      name: 'PointPK',
      component: () => import('../views/pointsInteract/PointPK.vue'),
      meta: {
        title: '积分PK',
      },
    },
    // 积分pk预览页
    {
      path: '/preview/48',
      name: 'PointPkPreview',
      component: () =>
        import('../views/pointsInteract/preview/PointPkPreview.vue'),
      meta: {
        title: '积分PK',
      },
    },
    // 积分猜大小活动页
    {
      path: '/pointGuess/:activityId',
      name: 'PointGuess',
      component: () => import('../views/pointsInteract/PointGuess.vue'),
      meta: {
        title: '积分猜大小',
      },
    },
    // 积分猜大小预览页
    {
      path: '/preview/41',
      name: 'PointGuessPreview',
      component: () =>
        import('../views/pointsInteract/preview/PointGuessPreview.vue'),
      meta: {
        title: '积分猜大小',
      },
    },
    // 积分兑换 301实物商品  302优惠券  303 云钻
    {
      path: '/pointsExchange/:activityType/:activityId',
      name: 'PointsExchange',
      component: () => import('../views/pointsExchange/PointsExchange.vue'),
      meta: {
        title: '积分兑换',
      },
    },
    // 添加地址
    {
      path: '/address/selectAddress',
      name: 'SelectAddress',
      component: () =>
        import('../views/pointsExchange/address/SelectAddress.vue'),
      meta: {
        title: '选择收货地址',
      },
    },
    // 修改地址
    {
      path: '/address/editAddress',
      name: 'EditAddress',
      component: () =>
        import('../views/pointsExchange/address/EditAddress.vue'),
      meta: {
        title: '修改收货地址',
      },
    },
    // 地址管理
    {
      path: '/address/manageAddress',
      name: 'ManageAddress',
      component: () => import('../views/personalCenter/AddressManage.vue'),
      meta: {
        title: '管理收货地址',
      },
    },
    // 个人中心
    {
      path: '/personalCenter',
      name: 'PersonalCenter',
      component: () => import('../views/personalCenter/Center.vue'),
      meta: {
        title: '个人中心',
      },
    },
    // 积分流水
    {
      path: '/personalCenter/pointsHistory',
      name: 'PointsHistory',
      component: () => import('../views/personalCenter/PointsHistory.vue'),
      meta: {
        title: '积分流水',
      },
    },
    // 各种记录页
    {
      path: '/personalCenter/records/:type', // 1 礼包发放  2会员权益领取  3积分兑换  4活动获奖
      name: 'Records',
      component: () => import('../views/personalCenter/Records.vue'),
      meta: {
        title: '查看记录',
      },
    },
    // 实物发货详情
    {
      path: '/personalCenter/GoodsSendDetail',
      name: 'GoodsSendDetail',
      component: () => import('../views/personalCenter/GoodsSendDetail.vue'),
      meta: {
        title: '查看记录',
      },
    },
    // 查看积分规则
    {
      path: '/personalCenter/pointsRules',
      name: 'PointsRules',
      component: () => import('../views/personalCenter/PointsRules.vue'),
      meta: {
        title: '积分规则',
      },
    },
  ],
  router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
  });

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
