/* eslint-disable new-cap */
/*
 * @Description:pointGuess
 * @Autor: hanzhiwei
 * @Date: 2020-12-19 17:25:15
 * @LastEditTime: 2021-01-05 16:08:55
 * @FilePath: \SNActivity\src\store\modules\pointGuess\actions.js
 */
// 引入axios配置文件
import axios from '@/axios/index';

// 引入全局js
import { timeFormat } from '@/assets/js/common.js';

import Toast from '@/utils/toast';

export default {
  /**
   * @description: 获取活动内容
   */
  async getActivityContent({ rootState, commit }) {
    let form = rootState.form;
    let res = await axios({
      method: 'post',
      url: '/api/wxGuessActivity/activityContent',
      data: {
        activityId: form.activityId,
        pin: form.pin,
      },
    });
    let data = res.data;
    if (data.result) {
      commit('setActivityContent', data.data);
      commit('setUserId', data.data.userId, { root: true });
    } else {
      Toast(data.errorMessage);
    }
  },
  /**
   * @description: 开始竞猜
   */
  async guess({ rootState, dispatch, commit }) {
    let form = rootState.form;
    let pointGuessForm = rootState.pointGuess.pointGuessForm;
    let res = await axios({
      method: 'post',
      url: '/api/wxGuessActivity/guess',
      data: {
        activityId: form.activityId,
        pin: form.pin,
        point: pointGuessForm.selectedPoints,
        size: pointGuessForm.bigOrSmall,
      },
    });
    let data = res.data;
    if (data.result) {
      dispatch('getMyPoints', null, { root: true });
      dispatch('getActivityContent');
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('setDiceStatus', 3);
          commit('setGuessResult', data.data);
          resolve();
        }, 1000);
      }).then(() => {
        setTimeout(() => {
          commit('setIsShowPriceModal', true);
        }, 1200);
      });
    } else {
      Toast(data.errorMessage);
    }
  },
  /**
   * @description: 获取游戏记录
   */
  async getRecordList({ rootState, commit }) {
    let form = rootState.form;
    let recordList = rootState.pointGuess.pointGuessForm.recordList;
    let startTime = timeFormat(new Date(), 'yyyy-oneMago-dd-hh-mm');
    let endTime = timeFormat(new Date(), 'yyyy-mm-dd-hh-mm-ss');
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 10000,
    });
    let res = await axios({
      method: 'post',
      url: '/api/guessActivity/recordList',
      data: {
        pageNo: recordList.pageNo,
        pageSize: 10,
        activityId: form.activityId,
        partakeTimeBegin: startTime,
        partakeTimeEnd: endTime,
        partakeMan: form.pin,
        status: 'all',
      },
    });
    let data = res.data;
    if (data.result) {
      Toast.clear();
      data.list.forEach((item) => {
        recordList.list.push(item);
      });
      data.list = recordList.list;
      recordList.pageNo++;
      commit('setRecordList', data.list);
      commit('setRecordCount', data.count);
    } else {
      Toast(data.errorMessage);
    }
  },
};
