/*
 * @Author: 一尾流莺
 * @Description:工具函数
 * @Date: 2021-10-18 14:15:58
 * @LastEditTime: 2021-10-18 14:17:08
 * @FilePath: \elsfk3\src\game\utils.ts
 */
export function intervalTimer(interval: number) {
  let t = 0;
  return (n: number) => {
    t += n;
    if (t >= interval) {
      t = 0;
      return true;
    }
    return false;
  };
}
