/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-23 16:38:36
 * @LastEditTime: 2021-11-23 17:34:06
 * @FilePath: \jest-test\src\widgets\logic.ts
 */

export const calcDiameter = (width: number, height: number): number => {
  if (width > 0 && height > 0) {
    return Math.min(width, height);
  }
  if (width > 0) {
    return width;
  }
  return 355;
};

export const calcPrizeFontSize = (diameter: number) => diameter / 355;
