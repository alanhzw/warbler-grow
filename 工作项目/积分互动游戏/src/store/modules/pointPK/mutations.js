/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-19 17:25:08
 * @LastEditTime: 2020-12-23 11:33:19
 * @FilePath: \SNActivity\src\store\modules\pointPK\mutations.js
 */
export default {
  // 初始化活动数据
  setActivityContent(state, activityContent) {
    state.pointPkForm.activityContent = activityContent;
    state.pointPkForm.activityContent.startTime =
      new Date(activityContent.startTime.replace(/-/g, '/')).getTime() -
      new Date().getTime();
  },
  // 保存活动规则
  setRule(state, rule) {
    state.pointPkForm.rule = rule;
  },
  // 保存是否展示活动规则弹窗
  setIsShowRule(state, isShowRule) {
    state.pointPkForm.isShowRule = isShowRule;
  },
};
