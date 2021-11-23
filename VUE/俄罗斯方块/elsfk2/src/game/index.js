/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-07-23 18:55:53
 * @LastEditTime: 2021-07-28 14:44:26
 * @FilePath: \elsfk2\src\game\index.js
 */
export * from './config';
import { initMap } from './map';
import { render } from './render';
import { addTicker } from './ticker';
import { intervalTimer } from './utils';
import { getBoxBottomPoints } from './matrix';
import { gameRow } from './config';
export function startGame(map) {
  initMap(map);
  // 块
  const box = {
    x: 0,
    y: 0,
    shape: [
      [1, 1],
      [1, 1],
    ],
  };


  /**
   *  时间累加器
    let t = 0;
    // 一秒钟的时间间隔
    const intervalTime = 1000;

    function handleTicker(n) {
      // 每执行一次ticker,累加时间间隔
      t += n;
      // 当累加器超过1000的时候 执行一次操作
      if (t >= intervalTime) {
        // 不可以超过map底部
        // 1.获取 box 的底部的说有点
        // 2.看看是不是超过了游戏的 row
        box.y++;
        // 重置累加器
        t = 0;
      }
      render(box, map);
    }
   */


  // 使用闭包实现
  const isDownMove = intervalTimer();

  function handleTicker(n) {
    if (isDownMove(n, 1000)) {
      // 不可以超过map底部
      // 1.获取 box 的底部的说有点
      const points = getBoxBottomPoints(box.shape, { x: box.x, y: box.y });
      console.log('🚀🚀~ points:', points);
      // 2.看看是不是超过了游戏的 row
      for (let i = 0; i < points.length; i++) {
        console.log('🚀🚀~ points.y:', points[i].y);

        if (points[i].y + 1 >= 4) {
          return;
        }
      }
      box.y++;
    }
    render(box, map);
  }


  // 监听键盘事件
  window.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowDown') {
      box.y++;
    }
  });

  addTicker(handleTicker);
}


