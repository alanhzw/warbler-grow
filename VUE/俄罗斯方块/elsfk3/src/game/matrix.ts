/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-10-18 14:28:46
 * @LastEditTime: 2021-10-18 19:36:41
 * @FilePath: \elsfk3\src\game\matrix.ts
 */

// 获取底部的点
export function getBottomPoints(matrix: any) {
  const points: any = [];
  const row = matrix.length - 1;
  matrix[row].forEach((item: any, index: any) => {
    if (matrix[row][index] > 0) {
      points.push({
        x: index,
        y: row,
      });
    }
  });
  return points;
}
// 旋转矩阵
export function rotate(matrix: any) {
  const temp: any = [];
  const row = matrix.length - 1;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const newRow = row - j;
      if (!temp[newRow]) {
        temp[newRow] = [];
      }
      temp[newRow][i] = matrix[i][j];
    }
  }
  return temp;
}
