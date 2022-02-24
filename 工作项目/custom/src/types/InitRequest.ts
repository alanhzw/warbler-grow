// 页面初始化的配置
export interface InitRequest {
  // 平台标识,默认jd
  platform?: 'jd' | 'tmall' | 'pdd' | 'sn';

  // 产品代码，默认cjwx
  sysCode?: 'cjhy' | 'cjwx';

  // 路径模式
  urlPattern?: string;

  // 手动指定venderId
  venderId?: string,

  // 手动指定活动id
  activityId? :string,

  // 手动指定活动类型
  activityType? :string,

  // 是否启用业务数据上报
  trackable?: boolean;

  // 是否启用京东数据上报
  jdTrackable?: boolean;

  // 是否检查开卡状态
  checkOpenCard?: boolean;

  // 开卡链接,仅当用户未开卡的时候，自动跳转到该链接
  openCardLink?: string;

  // 是否显示未开始页面(默认：true)
  showUnStartPage?: boolean,

  // 是否显示结束页面(默认：true)
  showFinishedPage?: boolean,

  // 模拟登录信息（不推荐使用）
  mockPin?: {
    pin: string;
    nickname: string;
  };

}
