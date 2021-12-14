/* eslint-disable new-cap */
/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-08 11:22:53
 * @LastEditTime: 2021-01-21 10:27:51
 * @FilePath: \SNActivity\src\store\actions.js
 */
// 引入axios配置文件
import axios from '../axios/index';
import { commonService } from '@/axios/apis';
// 引入苏宁方法
import getSn from '@/assets/js/suning.js';
const { galaxie, isSnApp, isMiniApp } = getSn();

// 引入Toast
import Toast from '@/utils/toast';

export default {
  /**
   * @description: 获取我的积分
   */
  async getMyPoints({ rootState, commit }) {
    let form = rootState.form;
    let res = await axios({
      method: 'post',
      url: '/api/points/getPoints',
      data: {
        venderId: form.userId,
        pin: form.pin,
      },
    });
    let data = res.data;
    if (data.result) {
      commit('setMyPoints', data.data);
    } else {
      Toast(data.errorMessage);
    }
  },

  /**
   * @description: 获取用户信息
   */
  async getUserInfo({ rootState, commit }) {
    let form = rootState.form;
    let res = await axios({
      method: 'post',
      url: '/api/wx/common/getUserInfo',
      data: {
        pin: form.pin,
        userId: form.userId,
      },
    });
    let data = res.data;
    if (data.result) {
      commit('setUserInfo', data.data);
    } else {
      Toast(data.errorMessage);
    }
  },

  /**
   * @description: 获取店铺信息
   */
  async getShopInfo({ rootState, commit }) {
    let form = rootState.form;
    let res = await axios({
      method: 'post',
      url: '/api/wx/common/getShopInfo',
      data: {
        userId: form.userId,
      },
    });
    let data = res.data;
    if (data.result) {
      commit('setShopInfo', data.data);
    } else {
      Toast(data.errorMessage);
    }
  },

  /**
   * @description: 关注店铺
   */
  async followShop({ rootState }) {
    let form = rootState.form;
    if (!rootState.followShopChecked) {
      let res = await axios({
        method: 'post',
        url: '/api/wx/common/followShop',
        data: {
          activityId: form.activityId,
          userId: form.userId,
          pin: form.pin,
          activityType: rootState.pointGuess.pointGuessForm.activityType,
        },
      });
      let data = res.data;
      if (data.result) {
        Toast('关注成功');
      } else {
        Toast(data.errorMessage);
      }
    }
  },
  /**
   * @description: 分享
   */
  share({ rootState }) {
    if (isSnApp) {
      let shareInfoSnApp = rootState.form.shareInfoSnApp;
      shareInfoSnApp.targetUrl = rootState.URL + rootState.form.activityId;
      // 苏宁app分享  海报是带二维码
      shareInfoSnApp.posterUrl = rootState.form.sunCode;
      galaxie.interactive.shareToWeChat(shareInfoSnApp, false);
    } else if (isMiniApp) {
      let shareInfoWeChat = rootState.form.shareInfoWeChat;
      shareInfoWeChat.path = rootState.URL + rootState.form.activityId;
      shareInfoWeChat.bgImg = rootState.form.sunCode;
      galaxie.miniapp.share(shareInfoWeChat);
    } else {
      Toast('请使用易购App打开本活动');
    }
  },

  /**
   * @description:判断是否开卡
   */
  async getOpenCard({ rootState, commit }) {
    let form = rootState.form;
    commonService['getOpenCard']({
      shopId: form.userId,
      snUnionId: form.pin,
    }).then(({ data }) => {
      if (data.result) {
        if (data.data.isOpenMem === 'N') {
          commit('setIsOpenCard', false);
        } else {
          commit('setIsOpenCard', true);
        }
      } else {
        Toast(data.errorMessage);
      }
    });
  },
  /**
   * @description: 去开卡
   */
  async openCard({ rootState, dispatch }) {
    let form = rootState.form;
    let res = await axios({
      method: 'get',
      url: '/api/member/addRewardBind',
      params: {
        shopId: form.shopInfo.userId,
        snUnionId: form.pin,
        sourceNo: 1,
      },
    });
    let data = res.data;
    if (data.result) {
      Toast('成功开通会员!');
      dispatch('getOpenCard');
    } else {
      Toast(data.errorMessage);
    }
  },
  /**
   * @description: 获取太阳码
   */
  async getSunCode({ rootState, commit }) {
    let form = rootState.form;
    let sceneParam = encodeURIComponent(rootState.URL + form.activityId);
    let res = await axios({
      method: 'post',
      url: '/api/sun/code/createSunCode',
      data: {
        posterHeight: '1334',
        posterUrl: form.shareInfoSnApp.posterUrl,
        posterWith: '750',
        sunCodeX: '236',
        sunCodeY: '726',
        venderId: form.userId,
        width: '252',
        sceneParam: sceneParam,
      },
    });
    let data = res.data;
    if (data.result) {
      commit('setSunCode', data.data.sunCodeUrl);
    } else {
      Toast(data.errorMessage);
    }
  },
};
