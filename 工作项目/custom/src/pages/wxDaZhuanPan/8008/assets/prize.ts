interface Prize {
  prizeName: string, // 奖品名称
  prizeDesc: string, // 奖品描述
  prizePic: string, // 奖品图片
  prizeType: number, // 奖品类型
  prizeId: number | string, // 奖品ID
}

export const defalutUrl = {
  jingdou: '//img10.360buyimg.com/imgzone/jfs/t1/170609/40/21303/16523/61723297E5c26d877/d0887d4ffc4e9607.png',
  jifen: '//img10.360buyimg.com/imgzone/jfs/t1/204291/13/12335/12379/61723401Eba1e0cd6/952e7ee30c0ff93d.png',
};

export default {
  defalutUrl,
};
