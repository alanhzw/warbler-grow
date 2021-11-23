/*
 * @Author: 一尾流莺
 * @Description:game下所有文件的总出口
 * @Date: 2021-10-14 16:03:52
 * @LastEditTime: 2021-10-19 15:44:25
 * @FilePath: \elsfk3\src\game\index.ts
 */
export * from './config';

import { createBox } from './box';
import { Game } from './Game';
import { initMap } from './map';
import { initMessage } from './message';
import { Player } from './Player';
import { Rival } from './Rival';

let selfGame;
let player;
export function initSelfGame(map: any) {
  const box = createBox();
  selfGame = new Game(box, initMap(map));
  player = new Player(selfGame);
}

let rivalGame;
export function initRivalGame(map: any) {
  const box = createBox();
  rivalGame = new Game(box, initMap(map));
  const rival = new Rival(rivalGame);
}

// 开始游戏
export function startGame() {
  selfGame.start();
  rivalGame.start();
  player.start();
}

export function initGame() {
  initMessage();
}
