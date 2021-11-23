import { message } from './message';
import { addTicker } from './ticker';
import { intervalTimer } from './utils';

/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-10-19 11:29:17
 * @LastEditTime: 2021-10-19 15:56:16
 * @FilePath: \elsfk3\src\game\Player.ts
 */
export class Player {
  private _game: any;
  constructor(game: any) {
    this._game = game;
    // 添加方块掉落,监听键盘事件
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }
  // 渲染map
  timeInterval = 500;
  // 方块是否下降
  _isDown = intervalTimer(this.timeInterval);
  // 定义帧循环函数
  handlerTicker(n: any) {
    if (this._isDown(n)) {
      this._game.moveDown();
      message.emit('down');
    }
  }
  start() {
    // 添加到帧循环列表
    addTicker(this.handlerTicker.bind(this));
  }
  handleKeyDown(e) {
    switch (e.code) {
      case 'ArrowLeft':
        this._game.moveBoxToLeft();
        message.emit('left');
        break;
      case 'ArrowRight':
        this._game.moveBoxToRight();
        message.emit('right');
        break;
      case 'ArrowUp':
        this._game.rotate();
        message.emit('rotate');
        break;
      case 'ArrowDown':
        this._game.moveDown();
        break;
      default:
        break;
    }
  }
}
