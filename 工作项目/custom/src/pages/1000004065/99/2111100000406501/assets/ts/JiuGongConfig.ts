export const LotteryConfig = {
  // 转盘背景img
  TurntableBg: '',
  // 转盘开始按钮背景img
  TurnStartBg: 'https://img10.360buyimg.com/imgzone/jfs/t1/219651/38/1903/8264/6177b1c4E070b84e6/d3d2a0a5e2c7671e.png',
  // 京豆icon
  JdouUrl: 'https://img10.360buyimg.com/imgzone/jfs/t1/126770/4/20945/2395/6177b1c4Efd42f370/fffc4a31b0e395c4.png',
  // 积分icon
  JifenUrl: '',
  // 奖品格子宽度，高度（正方形） px --> rem （最大150）
  PrizeImgSize: 100,
  // ----------------------- 二选一 色号or图片
  // 奖品格子(偶数)背景img
  // PrizeGridOddBg: 'https://img10.360buyimg.com/imgzone/jfs/t1/203114/14/14677/528/6188dcfaEf3734cb5/c830ecd673f9d220.png',
  // 奖品格子(偶数)背景颜色
  PrizeGridOddColor: '#2a60cf',
  // ---------------------------------------
  // ----------------------- 二选一 色号or图片
  // 奖品格子(奇数)背景img
  // PrizeGridEvenBg: 'https://img10.360buyimg.com/imgzone/jfs/t1/168618/26/22646/528/6188dcfaE5bfe6b73/3d11f5adb0e3104a.png',
  // 奖品格子(奇数)背景颜色
  PrizeGridEvenColor: '#e0f7ff',
  // ---------------------------------------
  // 奖品名称(偶数)颜色
  FontOddColor: '#FFFFFF',
  // 奖品名称(奇数)颜色
  FontEvenColor: '#2e7aff',
  // 奖品字号 px --> rem
  FontSize: 22,
  // 需要转几圈 开始中奖
  CircleNum: 5,
  // 转速是否可变
  VariableSpeed: true,
};

export default {
  LotteryConfig,
};
