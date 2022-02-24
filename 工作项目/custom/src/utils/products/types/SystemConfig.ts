/**
 * 状态说明
 *  -1：不控制
 *  0为京口令
 *  1为H5
 *  2为小程序
 */
export interface SystemConfig {
  // 总开关
  masterSwitch: number,
  // 活动开关
  activitySwitch: number,
  // 活动类型开关
  activityTypeSwitch: number,
}
