/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-19 17:25:08
 * @LastEditTime: 2020-12-22 18:12:05
 * @FilePath: \SNActivity\src\store\modules\pointGuess\mutations.js
 */
export default {
  // 初始化活动数据
  setActivityContent(state, activityContent) {
    state.pointGuessForm.activityContent = activityContent;
  },
  // 保存猜的结果  大还是小
  setBigOrSmall(state, bigOrSmall) {
    state.pointGuessForm.bigOrSmall = bigOrSmall;
  },
  // 保存选中的筹码面额
  setSelectedPoints(state, selectedPoints) {
    state.pointGuessForm.selectedPoints = selectedPoints;
  },
  // 保存骰子的状态
  setDiceStatus(state, diceStatus) {
    state.pointGuessForm.diceStatus = diceStatus;
  },
  // 保存游戏的结果
  setGuessResult(state, guessResult) {
    state.pointGuessForm.guessResult = guessResult;
  },
  // 保存是否展示获奖弹窗
  setIsShowPriceModal(state, isShowPriceModal) {
    state.pointGuessForm.isShowPriceModal = isShowPriceModal;
  },
  // 保存是否展示游戏记录弹窗
  setIsShowGuessRecord(state, isShowGuessRecord) {
    state.pointGuessForm.isShowGuessRecord = isShowGuessRecord;
  },
  // 保存游戏记录列表
  setRecordList(state, list) {
    state.pointGuessForm.recordList.list = list;
  },
  // 保存游戏记录总数
  setRecordCount(state, count) {
    state.pointGuessForm.recordList.count = count;
  },
  // 保存游戏记录当前页数
  setRecordPageNo(state, pageNo) {
    state.pointGuessForm.recordList.pageNo = pageNo;
  },
};
