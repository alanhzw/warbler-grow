/*
 * @Author: 一尾流莺
 * @Description:帧循环
 * @Date: 2021-10-14 19:19:53
 * @LastEditTime: 2021-10-14 19:28:39
 * @FilePath: \elsfk3\src\game\ticker.ts
 */

let startTime = Date.now();
type Ticker = Function;

const tickers: Array<Ticker> = [];

const handleFrame = () => {
  tickers.forEach((ticker) => {
    ticker(Date.now() - startTime);
  });
  startTime = Date.now();
  requestAnimationFrame(handleFrame);
};

requestAnimationFrame(handleFrame);

export function addTicker(ticker: any) {
  tickers.push(ticker);
}
