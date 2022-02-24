interface Prize {
  prizeName: string, // 奖品名称
  prizeDesc: string, // 奖品描述
  prizePic: string, // 奖品图片
  prizeType: number, // 奖品类型
  prizeId: number | string, // 奖品ID
}

export const defalutUrl = {
  JdouUrl: '//img10.360buyimg.com/imgzone/jfs/t1/221739/20/398/13077/617a7be0Ea45b1f92/e251849e2c2ee7d2.png',
  JifenUrl: '//img10.360buyimg.com/imgzone/jfs/t1/199062/14/15010/5937/617a7be0Ec79d1533/935e5d0bde087d07.png',
  TurntableBg: '//img10.360buyimg.com/imgzone/jfs/t1/221036/21/272/53759/617933f2E2d420a37/30c3c636ec925225.png',
  PrizeGridBg: '//img10.360buyimg.com/imgzone/jfs/t1/139362/35/23611/1239/617933f2E59d75250/adb31ef7f203a4cb.png',
};

export default {
  defalutUrl,
};
