/*
 * @Author: 一尾流莺
 * @Description:游戏类
 * @Date: 2021-10-19 10:27:43
 * @LastEditTime: 2021-10-19 16:07:27
 * @FilePath: \elsfk4\src\game\Game.ts
 */

import { createBox } from './box';
import { hitBottomBoundary, hitBottomBox } from './hit';
import { addBoxToMap, eliminateLine, initMap } from './map';
import { render } from './render';
import { addTicker } from './ticker';
import { intervalTimer } from './utils';

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
    // 添加方块掉落,监听键盘事件
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  handleKeyDown(e) {
    switch (e.code) {
      case 'ArrowLeft':
        this._activeBox.x--;
        break;
      case 'ArrowRight':
        this._activeBox.x++;
        break;
      case 'ArrowUp':
        this._activeBox.rotate();
        break;
      case 'ArrowDown':
        this._activeBox.y++;
        break;
      default:
        break;
    }
  }
  // 渲染map
  timeInterval = 500;
  // 方块是否下降
  _isDown = intervalTimer(this.timeInterval);
  // 定义帧循环函数
  handlerTicker(n: any) {
    if (this._isDown(n)) {
      this.moveDown();
    }
    render(this._activeBox, this._map);
  }
  moveDown() {
    if (hitBottomBoundary(this._activeBox, this._map) || hitBottomBox(this._activeBox, this._map)) {
      // 把到底的box添加到map中
      addBoxToMap(this._activeBox, this._map);
      // 当一个方块碰到边界时候,需要产生一个新的方块
      this._activeBox = createBox();
      // 检测是否可以消除一行
      eliminateLine(this._map);
      return;
    }
    this._activeBox.y++;
  }
}
