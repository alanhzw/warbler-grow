/*
 * @Author: 一尾流莺
 * @Description:碰撞的逻辑
 * @Date: 2021-10-18 16:01:49
 * @LastEditTime: 2021-10-18 16:34:45
 * @FilePath: \elsfk3\src\game\hit.ts
 */
import { getBottomPoints } from './matrix';

export function hitBottomBoundary(box, map) {
  const mapRow = map.length;
  // 1.获取方块底部所有的点
  const points = getBottomPoints(box.shape);
  // 2.检测是不是有某个点超出了游戏的范围
  // 如果有任何一个点超过地图范围,方块就不可以移动了
  return points.some((point: any) => {
    return point.y + box.y + 1 >= mapRow;
  });
}

export function hitBottomBox(box, map) {
  // 1.获取方块底部所有的点
  const points = getBottomPoints(box.shape);
  // 2.检测某个点下一次移动会不会碰见map上值为-1的点
  return points.some((point: any) => {
    const row = point.y + box.y + 1;
    const col = point.x + box.x;
    return map[row][col] === -1;
  });
}
