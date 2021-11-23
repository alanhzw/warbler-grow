/*
 * @Author: 一尾流莺
 * @Description:有关渲染的逻辑
 * @Date: 2021-07-27 08:06:50
 * @LastEditTime: 2021-07-27 16:31:43
 * @FilePath: \elsfk2\src\game\render.js
 */

import { gameCol, gameRow } from './config';

export function render(box, map) {
  reset(map);
  _render(box, map);

}

// 添加box到map里
// _render
function _render(box, map) {
  const row = box.shape.length;
  const col = box.shape[0].length;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      // 1.把方块渲染到map上
      // map[i][j] = box.shape[i][j]; 或者 直接      map[i][j] = 1;
      // 2. 要让方块动起来要引入坐标的概念 i和j只是描述当前的形状
      const x = box.x + j;
      const y = box.y + i;
      map[y][x] = 1;
    }
  }
}

// 清理移动之前的box
function reset(map) {
  for (let i = 0; i < gameRow; i++) {
    for (let j = 0; j < gameCol; j++) {
      if (map[i][j] > 0) {
        map[i][j] = 0;
      }
    }
  }
}