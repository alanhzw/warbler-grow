/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-19 17:25:26
 * @LastEditTime: 2020-12-28 10:54:16
 * @FilePath: \SNActivity\src\store\modules\pointGuess\getters.js
 */
export default {
  // 剩余抽奖次数
  restCount(state) {
    return (
      state.pointGuessForm.activityContent.limitTimes -
      state.pointGuessForm.activityContent.guessCount
    );
  },
};
