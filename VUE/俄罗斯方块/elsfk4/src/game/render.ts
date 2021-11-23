/*
 * @Author: 一尾流莺
 * @Description:渲染视图的逻辑
 * @Date: 2021-10-14 18:32:51
 * @LastEditTime: 2021-10-18 18:01:06
 * @FilePath: \elsfk3\src\game\render.ts
 */

export function render(box: any, map: any) {
  // 重置map
  reset(map);
  // 渲染map
  _render(box, map);
}

function reset(map: any) {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[0].length; j++) {
      if (map[i][j] > 0) {
        map[i][j] = 0;
      }
    }
  }
}

function _render(box: any, map: any) {
  for (let i = 0; i < box.shape.length; i++) {
    for (let j = 0; j < box.shape[0].length; j++) {
      const row = i + box.y;
      const col = j + box.x;
      if (box.shape[i][j] > 0) {
        map[row][col] = 1;
      }
    }
  }
}
