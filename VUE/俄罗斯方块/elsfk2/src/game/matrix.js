/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-07-28 08:39:42
 * @LastEditTime: 2021-07-28 08:49:01
 * @FilePath: \elsfk2\src\game\matrix.js
 */
export function getBoxBottomPoints(matrix, initPoint) {
  const row = matrix.length;
  const col = matrix[0].length;
  const points = [];
  for (let j = 0; j < col; j++) {
    const x = j;
    const y = row - 1 + initPoint.y;
    // if (box.shape[y][x]) {
    //   const point = {
    //     x,
    //     y
    //   };
    //   points.push(point);
    // }
    points.push({
      x,
      y
    });

  }
  return points;
}