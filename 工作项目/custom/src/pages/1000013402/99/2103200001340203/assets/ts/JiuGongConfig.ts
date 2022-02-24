export const LotteryConfig = {
  // 转盘背景img
  TurntableBg: '',
  // 转盘开始按钮背景img
  TurnStartBg: 'https://img10.360buyimg.com/imgzone/jfs/t1/212792/27/3734/27066/6188f497E82b02ca2/d05de6c4cf167e93.png',
  // 京豆icon
  JdouUrl: 'https://img10.360buyimg.com/imgzone/jfs/t1/215015/29/3693/7255/6188f497Ec4cfae87/870e56fde79f8a68.png',
  // 积分icon
  JifenUrl: 'https://img10.360buyimg.com/imgzone/jfs/t1/210746/22/8489/6413/6188f497Ec96f3c51/513e0f6d7eb5e4a2.png',
  // 奖品格子宽度，高度（正方形） px --> rem （最大150）
  PrizeImgSize: 100,
  // ----------------------- 二选一 色号or图片
  // 奖品格子(偶数)背景img
  PrizeGridOddBg: 'https://img10.360buyimg.com/imgzone/jfs/t1/210033/5/8564/566/6188f497E2c23ff47/c608655fd7e4f738.png',
  // 奖品格子(偶数)背景颜色
  // PrizeGridOddColor: '#2a60cf',
  // ---------------------------------------
  // ----------------------- 二选一 色号or图片
  // 奖品格子(奇数)背景img
  PrizeGridEvenBg: 'https://img10.360buyimg.com/imgzone/jfs/t1/212521/10/3627/563/6188f497Edcfbe7d7/2b3d989dfe2ff391.png',
  // 奖品格子(奇数)背景颜色
  // PrizeGridEvenColor: '#e0f7ff',
  // ---------------------------------------
  // 奖品名称(偶数)颜色
  FontOddColor: '#175441',
  // 奖品名称(奇数)颜色
  FontEvenColor: '#175441',
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
