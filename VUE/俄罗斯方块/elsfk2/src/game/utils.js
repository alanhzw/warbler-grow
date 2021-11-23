/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-07-27 16:15:20
 * @LastEditTime: 2021-07-28 08:05:22
 * @FilePath: \elsfk2\src\game\utils.js
 */

// 闭包
// 重绘回流
// requestAnimationFrame API

export function intervalTimer() {
  let t = 0;
  return (n, intervalTime) => {
    t += n;
    if (t >= intervalTime) {
      t = 0;
      return true;
    }
    return false;
  };
}