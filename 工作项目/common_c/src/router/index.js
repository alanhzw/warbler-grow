// import Axios from 'axios';

// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

// map
// 会员中心000，个人中心001，礼包发放记录002，会员权益领取记录003，积分兑换记录004，活动获奖记录005，收货地址管理006，积分规则007，积分流水008，实物发货详情009，收货地址选择010，收货地址填写011，收货地址编辑012，。

// 积分秒杀000
// 积分秒杀000
// 积分秒杀000
// 积分换券000
// 积分兑京豆000
// 积分兑换商品000
// 会员专享券000
// 积分加钱购0000

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/rules',
    name: 'Rules',
    meta: {
      title: '积分规则',
      nodeId: '100001004',
      pageId: '007',
    },
    component: () => import('@/views/Rules.vue'),
  },
  {
    path: '/points/shop',
    name: 'Shop',
    meta: {
      title: '积分商城',
      nodeId: '100001002',
    },
    component: () => import('@/views/points/Shop.vue'),
  }, {
    path: '/points/history',
    name: 'PointsHistory',
    meta: {
      title: '',
      nodeId: '100001003',
      pageId: '008',
    },
    component: () => import('@/views/points/History.vue'),
  }, {
    path: '/user/center',
    name: 'PersonalCenter',
    meta: {
      title: '个人中心',
      nodeId: '100001002',
      pageId: '001',
    },
    component: () => import('@/views/user/Center.vue'),
  }, {
    path: '/coupon/detail',
    name: 'DiscountCouponDetail',
    meta: {
      title: '积分换券',
      nodeId: '100005001',
      pageId: '000',
    },
    component: () => import('@/views/coupon/Detail.vue'),
  }, {
    path: '/coupon/seckill',
    name: 'DiscountCouponSeckill',
    meta: {
      title: '积分秒杀',
      nodeId: '100005004',
      pageId: '000',
    },
    component: () => import('@/views/coupon/Seckill.vue'),
  }, {
    path: '/bean/detail',
    name: 'JingBeanDetail',
    meta: {
      title: '积分兑京豆',
      nodeId: '100005002',
      pageId: '000',
    },
    component: () => import('@/views/bean/Detail.vue'),
  }, {
    path: '/bean/seckill',
    name: 'JingBeanSeckill',
    meta: {
      title: '积分秒杀',
      nodeId: '100005005',
      pageId: '000',
    },
    component: () => import('@/views/bean/Seckill.vue'),
  }, {
    path: '/product/detail',
    name: 'ProductDetail',
    meta: {
      title: '积分兑换商品',
      nodeId: '100005003',
      pageId: '000',
    },
    component: () => import('@/views/product/Detail.vue'),
  }, {
    path: '/productx/detail',
    name: 'ProductDetailXL',
    meta: {
      title: '积分兑换商品',
      nodeId: '100005003',
      pageId: '000',
    },
    component: () => import('@/views/product/DetailXL.vue'),
  }, {
    path: '/product/seckill',
    name: 'ProductSeckill',
    meta: {
      title: '积分秒杀',
      nodeId: '100005006',
      pageId: '000',
    },
    component: () => import('@/views/product/Seckill.vue'),
  }, {
    path: '/productx/seckill',
    name: 'ProductSeckillXL',
    meta: {
      title: '积分秒杀',
      nodeId: '100005006',
      pageId: '000',
    },
    component: () => import('@/views/product/SeckillXL.vue'),
  }, {
    path: '/address/manage',
    name: 'AddressManage',
    meta: {
      title: '地址列表',
      nodeId: '100001011',
      pageId: '006',
    },
    component: () => import('@/views/address/Manage.vue'),
  }, {
    path: '/address/select',
    name: 'AddressSelect',
    meta: {
      keepAlive: true,
      title: '地址列表',
      nodeId: '100001011',
      pageId: '010',
    },
    component: () => import('@/views/address/Select.vue'),
  }, {
    path: '/address/add',
    name: 'AddressAdd',
    meta: {
      keepAlive: false,
      title: '填写地址',
      nodeId: '100001011',
      pageId: '011',
    },
    component: () => import('@/views/address/Add.vue'),
  }, {
    path: '/address/edit',
    name: 'AddressEdit',
    meta: {
      keepAlive: false,
      title: '编辑地址',
      nodeId: '100001011',
      pageId: '012',
    },
    component: () => import('@/views/address/Edit.vue'),
  }, {
    path: '/points/records',
    name: 'PointsRecords',
    meta: {
      title: '积分兑换记录',
      nodeId: '100001009',
      pageId: '004',
    },
    component: () => import('@/views/points/Records.vue'),
  }, {
    path: '/product/logistics',
    name: 'ProductLogistics',
    meta: {
      title: '实物发货详情',
      nodeId: '100001012',
      pageId: '009',
    },
    component: () => import('@/views/product/Logistics.vue'),
  }, {
    path: '/memberEquity/VIPOnly',
    name: 'VIPOnly',
    meta: {
      title: '会员专享券',
      nodeId: '100004001',
      pageId: '000',
    },
    component: () => import('@/views/memberEquity/VIPOnly.vue'),
  }, {
    path: '/product/addMoneyBuy',
    name: 'AddMoneyBuy',
    meta: {
      title: '积分加钱购',
      nodeId: '100005007',
      pageId: '000',
    },
    component: () => import('@/views/product/AddMoneyBuy.vue'),
  },
  {
    path: '/product/addMemberMoneyBuy',
    name: 'addMemberMoneyBuy',
    meta: {
      title: '积分加钱购',
      nodeId: '100005007',
      pageId: '000',
    },
    component: () => import('@/views/product/AddMemberMoneyBuy.vue'),
  },
  {
    path: '/product/addTokenPointBuy',
    name: 'addTokenPointBuy',
    meta: {
      title: '积分加钱购',
      nodeId: '100005007',
      pageId: '000',
    },
    component: () => import('@/views/product/AddTokenPointBuy.vue'),
  },
  {
    path: '/product/giftCard',
    name: 'giftCard',
    meta: {
      title: '积分兑换礼品卡',
      nodeId: '100005008',
      pageId: '000',
    },
    component: () => import('@/views/product/giftCard.vue'),
  },
  {
    path: '/product/addMemberDiscount',
    name: 'addMemberDiscount',
    meta: {
      title: '会员专享折扣',
      nodeId: '100004002',
      pageId: '000',
    },
    component: () => import('@/views/product/addMemberDiscount.vue'),
  },
  {
    path: '/improve',
    name: 'Improve',
    meta: {
      title: '完善信息有礼',
      nodeId: '9999999999',
      pageId: '999',
    },
    component: () => import('@/views/activity/improve/index.vue'),
  },

  {
    path: '/memberEquity/GiftRecords',
    name: 'GiftRecords',
    meta: {
      title: '会员礼包领取记录',
      nodeId: '100001006',
      pageId: '002',
    },
    component: () => import('@/views/memberEquity/GiftRecords.vue'),
  },
  {
    path: '/memberEquity/MemberCouponRecords',
    name: 'MemberCouponRecords',
    meta: {
      title: '会员专享券领取记录',
      nodeId: '100001007',
      pageId: '003',
    },
    component: () => import('@/views/memberEquity/MemberCouponRecords.vue'),
  }, {
    path: '/user/winRecord',
    name: 'WinRecord',
    meta: {
      title: '活动获奖记录',
      nodeId: '100001010',
      pageId: '005',

    },
    component: () => import('@/views/user/WinRecord.vue'),
  }, {
    path: '/interact/record',
    name: 'UserRecord',
    meta: {
      title: '获奖记录',
      nodeId: '100001010',
      pageId: '005',

    },
    component: () => import('@/views/user/Record.vue'),
  }, {
    path: '/giftCards/record',
    name: 'CardRecord',
    meta: {
      title: '礼品卡',
      nodeId: '100001013',
      pageId: '005',

    },
    component: () => import('@/views/giftCards/CardRecord.vue'),
  }, {
    path: '/gifts/birthday',
    name: 'Birthday',
    meta: {
      title: '生日礼包',
    },
    component: () => import('@/views/gifts/Birthday.vue'),
  }, {
    path: '/gifts/initiation',
    name: 'Initiation',
    meta: {
      title: '入会礼包',
    },
    component: () => import('@/views/gifts/Initiation.vue'),
  }, {
    path: '/gifts/upgrade',
    name: 'Upgrade',
    meta: {
      title: '升级礼包',
    },
    component: () => import('@/views/gifts/Upgrade.vue'),
  }, {
    path: '/gifts/firstPurchase',
    name: 'FirstPurchase',
    meta: {
      title: '会员首购礼包',
    },
    component: () => import('@/views/gifts/FirstPurchase.vue'),
  }, {
    path: '/firstPurchase',
    name: 'FirstPurchase',
    meta: {
      title: '首购',
      nodeId: '88888',
      pageId: '006',
    },
    component: () => import('@/views/purchase/firstPurchase/index.vue'),
  }, {
    path: '/rePurchase',
    name: 'RePurchase',
    meta: {
      title: '复购',
      nodeId: '88888',
      pageId: '006',
    },
    component: () => import('@/views/purchase/rePurchase/index.vue'),
  },
  // 欧莱雅
  {
    path: '/preview/351',
    name: 'ImprovePreview',
    meta: {
      title: '完善信息送积分活动预览',
      nodeId: '351',
      pageId: '351',
    },
    component: () => import('@/views/activity/preview/index.vue'),
  },
  {
    path: '/preview/352',
    name: 'Preview',
    meta: {
      title: '首购预览',
      nodeId: '352',
      pageId: '352',
    },
    component: () => import('@/views/purchase/preview/index.vue'),
  }, {
    path: '/preview/353',
    name: 'Preview',
    meta: {
      title: '复购预览',
      nodeId: '353',
      pageId: '353',
    },
    component: () => import('@/views/purchase/preview/index.vue'),
  }, {
    path: '/user/couponCenter',
    name: 'couponCenter',
    meta: {
      title: '卡券中心',
      nodeId: '100001014',
      pageId: '005',
    },
    component: () => import('@/views/user/couponCenter.vue'),
  },
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export {
  routes,
};

export default router;
