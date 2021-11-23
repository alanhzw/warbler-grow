/*
 * @Author: 一尾流莺
 * @Description:帧循环添加动画
 * @Date: 2021-07-27 09:08:07
 * @LastEditTime: 2021-07-27 16:17:35
 * @FilePath: \elsfk2\src\game\ticker.js
 */

let startTime = Date.now();

function handleTicker() {
  tickers.forEach((ticker) => {
    ticker(Date.now() - startTime);
  });
  startTime = Date.now();
  requestAnimationFrame(handleTicker);
}

// 帧循环
requestAnimationFrame(handleTicker);


const tickers = [];

export function addTicker(ticker) {
  tickers.push(ticker);
}