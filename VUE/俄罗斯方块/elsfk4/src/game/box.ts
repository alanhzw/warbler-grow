/*
 * @Author: 一尾流莺
 * @Description:俄罗斯方块
 * @Date: 2021-10-14 16:48:55
 * @LastEditTime: 2021-10-18 19:39:05
 * @FilePath: \elsfk3\src\game\box.ts
 */
import { rotate } from './matrix';

export class Box {
  // 形状
  shape: number[][];
  // x坐标
  x: number;
  // y坐标
  y: number;
  constructor() {
    this.x = 0;
    this.y = 0;
    this.shape = [
      [1, 1],
      [1, 1],
    ];
  }
  // 选择的一个函数集
  _rotates = [];
  // 是否旋转过 0 未旋转过  1转过了
  _rotateIndex = 0;
  // 旋转方法
  rotate() {
    // 旋转执行函数
    const rotateHandler: Function = this._rotates[this._rotateIndex];
    if (!rotateHandler) {
      return;
    }
    // 获取最终要执行的旋转
    this.shape = rotateHandler(this.shape);
    // 旋转次数增加
    this._rotateIndex++;
    // 超过一次的时候重置
    if (this._rotateIndex >= this._rotates.length) {
      this._rotateIndex = 0;
    }
  }
  setRotates(v) {
    if (!v) {
      return;
    }
    this._rotates = v;
  }
}

const boxInfos = {
  1: {
    type: 1,
    shape: [
      [1, 1],
      [1, 1],
    ],
    rotateStrategy: [rotate],
  },
  2: {
    type: 2,
    shape: [
      [1, 0, 0],
      [1, 1, 0],
      [0, 1, 0],
    ],
    rotateStrategy: [rotate, (m) => rotate(rotate(rotate(m)))],
  },
  3: {
    type: 2,
    shape: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 1, 0],
    ],
    rotateStrategy: [rotate],
  },
};

export function createBox() {
  // 生成一个box
  const box = new Box();
  // 随机生成一个形状
  const type = randomIntegerInRange(1, Object.keys(boxInfos).length);
  const { shape, rotateStrategy } = boxInfos[type];
  box.setRotates(rotateStrategy);
  box.shape = shape;
  return box;
}

const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
