
const ActivityTypeEnum = {
  501: '消费满额有礼(自动发放)',
  502: '消费满额抽奖(实付金额,交易完成)',
  503: '消费满额有礼(手动领取)',
  505: '消费满额抽奖(订单金额,付款完成)',
  506: '消费金额排名有礼',
  507: '消费时间排名有礼',
  504: '会员集卡',
  508: '会员试用',
};

const ActivityOptions = [];

for (const key in ActivityTypeEnum) {
  ActivityOptions.push({
    value: key,
    label: ActivityTypeEnum[key],
  });
}

export { ActivityTypeEnum, ActivityOptions };

export default ActivityTypeEnum;