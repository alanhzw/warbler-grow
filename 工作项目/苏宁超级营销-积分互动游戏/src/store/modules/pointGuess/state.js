/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-08 11:23:09
 * @LastEditTime: 2020-12-24 15:09:13
 * @FilePath: \SNActivity\src\store\modules\pointGuess\state.js
 */
export default {
  pointGuessForm: {
    URL: `${process.env.VUE_APP_BASEURL}activity/pointGuess/`, // 根路径
    // 活动信息
    activityContent: {
      canGuess: true, // 是否可以继续游戏
      guessCount: 0,
      id: '', // 活动id
      limitTimes: null, // 限制次数
      multiple: 2,
      rule: '', // 活动规则
      userId: '', // 商家id
    },
    activityType: 41, // 活动类型
    bigOrSmall: '-1', // 猜大还是猜小  压大还是压小  1大  0小
    selectedPoints: '-1', // 当前选择的筹码面额
    diceStatus: 1, // 骰子的状态  1准备  2旋转中   else 结果
    guessResult: {
      dice: '', // 骰子的点数
      guessOk: '', // 是否成功参加游戏  只要参加成功 无论输赢都是true
      msg: '', // 提示信息
      rewardPoint: '', // 赢得的积分
    },
    isShowPriceModal: false, // 是否展示获奖弹窗
    isShowGuessRecord: false, // 是否展示游戏记录弹窗
    // 游戏记录
    recordList: {
      count: '', // 总条数
      pageNo: 1, // 当前页数
      list: [
        // {
        //   activityId: '', // 活动ID
        //   createTime: '', // 创建时间
        //   id: '',
        //   nickName: '', // 用户昵称
        //   partakeMan: '', // 用户pin
        //   partakeTime: '', // 参加时间
        //   point: '', // 下注积分
        //   rewardPoint: '', // 赢取积分
        //   status: '', // 1猜中 0 未猜中
        //   updateTime: '', // 更新时间
        //   venderId: '', // 店铺ID
        // },
      ],
    },
  },
};
