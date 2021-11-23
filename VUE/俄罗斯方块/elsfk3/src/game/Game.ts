/*
 * @Author: 一尾流莺
 * @Description:游戏类
 * @Date: 2021-10-19 10:27:43
 * @LastEditTime: 2021-10-19 15:52:19
 * @FilePath: \elsfk3\src\game\Game.ts
 */

import { createBox } from './box';
import { hitBottomBoundary, hitBottomBox } from './hit';
import { addBoxToMap, eliminateLine } from './map';
import { render } from './render';
import { addTicker } from './ticker';

export class Game {
  private _map: any;
  private _activeBox: any;
  constructor(box, map) {
    this._map = map;
    this._activeBox = box;
  }
  start() {
    // 添加到帧循环列表
    addTicker(this.handlerTicker.bind(this));
  }

  // 定义帧循环函数
  handlerTicker(n: any) {
    render(this._activeBox, this._map);
  }
  moveDown() {
    if (hitBottomBoundary(this._activeBox, this._map) || hitBottomBox(this._activeBox, this._map)) {
      // 当一个方块碰到边界时候,需要产生一个新的方块
      this._activeBox = createBox();
      // 把到底的box添加到map中
      addBoxToMap(this._activeBox, this._map);
      // 检测是否可以消除一行
      eliminateLine(this._map);
      return;
    }
    this._activeBox.y++;
  }
  moveBoxToLeft() {
    this._activeBox.x--;
  }
  moveBoxToRight() {
    this._activeBox.x++;
  }
  rotate() {
    this._activeBox.rotate();
  }
}
