import { message } from './message';

/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-10-19 15:19:18
 * @LastEditTime: 2021-10-19 15:50:00
 * @FilePath: \elsfk3\src\game\Rival.ts
 */
export class Rival {
  private _game: any;
  constructor(game) {
    this._game = game;
    message.on('left', this.handleLeft.bind(this));
    message.on('right', this.handleRight.bind(this));
    message.on('rotate', this.handleRotate.bind(this));
    message.on('down', this.handleDown.bind(this));
  }
  handleLeft() {
    this._game.moveBoxToLeft();
  }
  handleRight() {
    this._game.moveBoxToRight();
  }
  handleRotate() {
    this._game.rotate();
  }
  handleDown() {
    this._game.moveDown();
  }
}
