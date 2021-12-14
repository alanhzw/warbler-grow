/*
 * @Description:pointPK
 * @Autor: hanzhiwei
 * @Date: 2020-12-08 11:23:09
 * @LastEditTime: 2020-12-23 11:59:00
 * @FilePath: \SNActivity\src\store\modules\pointPK\state.js
 */
export default {
  pointPkForm: {
    URL: `${process.env.VUE_APP_BASEURL}activity/pointGuess/`, // 根路径
    rule: '', // 活动规则
    isShowRule: false, // 是否展示活动规则
    // 活动信息
    activityContent: {
      actName: '',
      activityId: '',
      activityStatus: '',
      apiecePoint: '',
      canTakePrizeDays: '',
      choseLeftMans: '',
      choseRightMans: '',
      costPoint: '',
      endTime: '',
      getPointStatus: '',
      joinStatus: '',
      leftImgDesc: '',
      leftPercent: '',
      pkResult: '',
      rightImgDesc: '',
      rightPercent: '',
      showApiecePointOfJoins: '',
      showImageLeftSrc: '',
      showImageRightSrc: '',
      showResultDays: '',
      startTime: '',
      takePrizeDaysLimit: '',
      totalPoints: '',
      voteChoice: '',
      winPrizeStatus: '',
    },
    activityType: 48, // 活动类型
  },
};
