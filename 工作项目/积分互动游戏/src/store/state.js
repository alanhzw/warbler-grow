/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-08 11:23:09
 * @LastEditTime: 2020-12-23 11:09:23
 * @FilePath: \SNActivity\src\store\state.js
 */
export default {
  URL: `${process.env.VUE_APP_BASEURL}activity/pointPK/`,
  wareList: [
    // 曝光商品
    {
      logo: '',
      showType: '',
      skuName: '',
      jdPrice: '',
      promoPrice: '0',
    },
  ],
  form: {
    myPoints: '', // 我的积分数量
    activityId: '', // 活动Id
    sunCode: '', // 太阳码
    pin: '', // 用户pin
    userId: '', // 商家id
    isOpencard: true, // 是否开卡
    followShopChecked: false, // 是否勾选关注店铺
    // 店铺信息
    shopInfo: {
      shopName: '', // 店铺名称
      sid: '', // 进店逛逛的跳转
    },
    // app分享
    shareInfoSnApp: {
      // 分享信息
      title: '', // 分享标题
      targetUrl: '', // 分享到聊天和群的小程序展示的H5原始地址
      iconUrl: '', // 分享到聊天和群的小程序卡片的图片, 为空则默认使用易购图（图片大小不超过128k）
      posterUrl: '', // 海报图url
    },
    // 微信分享
    shareInfoWeChat: {
      // 分享信息
      title: '', // 分享标题
      cardImg: '', // 分享到聊天和群的小程序卡片的图片, 尺寸要求横向750px*600px
      path: '', // 分享到聊天和群的小程序展示的H5原始地址
      bgImg: '', // 分享页面的展示主图, 以及分享页面和海报保存页面的背景(模糊处理), 尺寸要求竖向
      codeImg: '', // 分享的海报地址, 尺寸要求竖向500px*700px
      showPoster: false,
    },
    // 用户信息
    userInfo: {
      createTime: '',
      id: '',
      nickname: '',
      nicknameShow: '',
      pin: '',
      secretPin: '',
      updateTime: null,
      yunBigImageUrl: null,
      yunMidImageUrl: null,
      yunSmaImageUrl: null,
    },
  },
};
