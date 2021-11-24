/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-23 16:38:36
 * @LastEditTime: 2021-11-24 17:13:56
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

export const calcPrizeFontSize = (diameter: number): number => diameter / 355;

export const rotatePlateToPrize = (prizeIndex: number, total: number): number => {
  return 1 - prizeIndex / total;
};

export const addStopListener = (ele: HTMLElement, callback: any) => {
  ele.addEventListener("transitionend", callback);
};
