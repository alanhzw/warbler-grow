/*
 * @Author: 一尾流莺
 * @Description:game下所有文件的总出口
 * @Date: 2021-10-14 16:03:52
 * @LastEditTime: 2021-10-19 11:09:37
 * @FilePath: \elsfk3\src\game\index.ts
 */
export * from './config';

import { createBox } from './box';
import { Game } from './Game';
import { initMap } from './map';

let game;
// 初始化游戏
export function initGame(map: any) {
  const box = createBox();
  game = new Game(box, initMap(map));
}

// 开始游戏
export function startGame() {
  game.start();
}
