/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-08 11:23:02
 * @LastEditTime: 2021-01-13 18:18:00
 * @FilePath: \SNActivity\src\store\mutations.js
 */
export default {
  // 保存用户积分
  setMyPoints(state, myPoints) {
    state.form.myPoints = myPoints;
  },
  // 保存用户信息
  setUserInfo(state, userInfo) {
    state.form.userInfo = userInfo;
  },
  // 保存店铺id
  setUserId(state, userId) {
    state.form.userId = userId;
  },
  // 保存店铺信息
  setShopInfo(state, shopInfo) {
    state.form.shopInfo = shopInfo;
  },
  // 保存活动id
  setActivityId(state, Id) {
    state.form.activityId = Id;
  },
  // 保存pin
  setPin(state, pin) {
    state.form.pin = pin;
  },
  // 保存是否开卡的状态
  setIsOpenCard(state, isOpenCard) {
    state.form.isOpencard = isOpenCard;
  },
  // 保存太阳码
  setSunCode(state, sunCode) {
    state.form.sunCode = sunCode;
  },
  // 保存 海报图片，小程序分享图片
  setShareInfo(state, shareInfo) {
    // 苏宁
    state.form.shareInfoSnApp.posterUrl = shareInfo.posterUrl;
    state.form.shareInfoSnApp.iconUrl = shareInfo.iconUrl;
    state.form.shareInfoSnApp.title = shareInfo.title;
    // 微信
    state.form.shareInfoWeChat.codeImg = shareInfo.posterUrl;
    state.form.shareInfoWeChat.cardImg = shareInfo.iconUrl;
    state.form.shareInfoWeChat.title = shareInfo.title;
    state.URL = shareInfo.baseUrl;
  },
  // 修改关注店铺选中状态
  changeFollowShopChecked(state) {
    state.followShopChecked = !state.followShopChecked;
  },
};
