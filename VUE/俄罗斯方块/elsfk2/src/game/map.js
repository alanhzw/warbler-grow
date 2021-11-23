/*
 * @Author: 一尾流莺
 * @Description:初始化map
 * @Date: 2021-07-27 07:52:21
 * @LastEditTime: 2021-07-27 08:26:27
 * @FilePath: \elsfk2\src\game\map.js
 */
import { gameRow, gameCol } from './config';

// 初始化map
export function initMap(map) {
  for (let i = 0; i < gameRow; i++) {
    map[i] = [];
    for (let j = 0; j < gameCol; j++) {
      map[i][j] = 0;
    }
  }
}

