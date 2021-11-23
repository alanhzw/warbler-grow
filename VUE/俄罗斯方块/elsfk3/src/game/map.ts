/*
 * @Author: 一尾流莺
 * @Description:地图相关
 * @Date: 2021-10-14 16:41:37
 * @LastEditTime: 2021-10-19 15:36:23
 * @FilePath: \elsfk3\src\game\map.ts
 */
import { gameRow, gameCol } from '@/game';

// 初始化地图  现在所有的位置type都是0
export function initMap(map: any) {
  for (let i = 0; i < gameRow; i++) {
    const arr: any = [];
    for (let j = 0; j < gameCol; j++) {
      arr.push(0);
    }
    map.push(arr);
  }
  return map;
}

// 把到底的box添加到map中
export function addBoxToMap(box, map) {
  for (let i = 0; i < box.shape.length; i++) {
    for (let j = 0; j < box.shape[0].length; j++) {
      const row = i + box.y;
      const col = j + box.x;
      console.log('🚀🚀~ row:', row);
      console.log('🚀🚀~ col:', col);
      console.log('🚀🚀~ x:', box.x);
      console.log('🚀🚀~ y:', box.y);

      console.log('🚀🚀~ map[row][col]:', map[row][col]);

      if (map[row][col] > 0) {
        map[row][col] = -1;
      }
    }
  }
}

// 消除行
export function eliminateLine(map) {
  // 检测是否可以消除一行
  // 1.获取到所有满行的索引
  // 2.基于索引删除一行
  _eliminateLine(getEliminateLines(map), map);
}

function _eliminateLine(lines, map) {
  const mapCol = map[0].length;
  lines.forEach((item) => {
    map.splice(item, 1);
    map.unshift(new Array(mapCol).fill(0));
  });
}

function getEliminateLines(map) {
  return map.reduce((pre, arr, index) => {
    const boo = arr.every((v) => {
      return v === -1;
    });
    if (boo) {
      pre.push(index);
    }
    return pre;
  }, []);
}
