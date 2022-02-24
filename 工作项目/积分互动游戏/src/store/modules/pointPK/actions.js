/* eslint-disable new-cap */
/*
 * @Description:pointPK
 * @Autor: hanzhiwei
 * @Date: 2020-12-19 17:25:15
 * @LastEditTime: 2021-01-06 11:33:52
 * @FilePath: \SNActivity\src\store\modules\pointPK\actions.js
 */
// 引入axios配置文件
import axios from '@/axios/index';

import Toast from '@/utils/toast';

export default {
  /**
   * @description: 初始化活动数据
   */
  async getActivityContent({ rootState, commit }) {
    let form = rootState.form;
    let res = await axios({
      method: 'post',
      url: '/api/mc/wxPointPkActivity/activityDetailContent',
      data: {
        activityId: form.activityId,
        pin: form.pin,
      },
    });
    let data = res.data;
    if (data.result) {
      Toast.clear();
      commit('setActivityContent', data.data);
    } else {
      Toast(data.errorMessage);
    }
  },

  /**
   * @description: 参加活动
   */
  async joinActivity({ rootState, dispatch }) {
    let form = rootState.form;
    let obj = document.getElementsByName('vote'),
      flag = false,
      voteChoice = 0;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].checked) {
        flag = true;
        voteChoice = obj[i].value;
      }
    }
    if (flag) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 10000,
      });
      let res = await axios({
        method: 'post',
        url: '/api/mc/wxPointPkActivity/joinActivity',
        data: {
          activityId: form.activityId,
          pin: form.pin,
          voteChoice: voteChoice,
        },
      });
      let data = res.data;
      if (data.result) {
        Toast.clear();
        dispatch('getActivityContent', rootState.form.pin);
      } else {
        Toast.clear();
        Toast(data.errorMessage);
      }
    } else {
      Toast('请选择一个选项,为Ta打Call吧!');
    }
  },

  /**
   * @description: 领取积分
   */
  async getPoint({ rootState, dispatch }) {
    let form = rootState.form;
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 10000,
    });
    let res = await axios({
      method: 'post',
      url: '/api/mc/wxPointPkActivity/getPkWinPoint',
      data: {
        activityId: form.activityId,
        pin: form.pin,
      },
    });
    let data = res.data;
    if (data.result) {
      Toast.clear();
      Toast('积分领取成功！');
      dispatch('getActivityContent', rootState.form.pin);
    } else {
      Toast(data.errorMessage);
    }
  },
  /**
   * @description: 获取活动规则
   */
  // eslint-disable-next-line no-unused-vars
  async getRule({ rootState, commit }) {
    let form = rootState.form;
    let res = await axios({
      method: 'post',
      url: '/api/mc/pointPkActivity/getInfo',
      data: {
        activityId: form.activityId,
      },
    });
    let data = res.data.data;
    if (!data.actRule) {
      commit('setRule', '暂无规则');
    } else {
      commit('setRule', data.actRule);
    }
    if (data.venderId) {
      commit('setUserId', data.venderId, { root: true });
    }
  },
};
