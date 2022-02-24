/**
 * 获取容器最大内切圆直径
 * @param wrapperWidth 容器宽度
 * @param wrapperHeight 容器高度
 * @returns 最大内切圆直径
 */
export const getDiameter = (wrapperWidth: number, wrapperHeight: number): number => {
  if (wrapperWidth > 0 && wrapperHeight > 0) {
    return wrapperWidth < wrapperHeight ? wrapperWidth : wrapperHeight;
  } if (wrapperWidth > 0) {
    return wrapperWidth;
  } if (wrapperHeight > 0) {
    return wrapperHeight;
  }
  return 0;
};

/**
 * 指定扇区的旋转圈数（turn）
 * @param index 扇区序号
 * @param total 扇区总个数
 * @returns 旋转角度
 */
export const getSectorAngle = (index: number, total: number): number => index / total;

/**
 * 获取旋转指针到指定奖品的旋转总圈数（turn）
 * @param index 奖品序号
 * @param total 扇区总数
 * @param loop 前置循环次数
 * @returns 总共旋转的圈数
 */
export const rotatePointerToPrize = (index: number, total: number, loop = 0) => Math.floor(loop) + getSectorAngle(index, total);

/**
 * 获取旋转转盘到指定奖品的旋转总圈数（turn）
 * @param index 奖品序号
 * @param total 扇区总数
 * @param loop 前置循环次数
 * @returns 总共旋转的圈数
 */
export const rotatePlateToPrize = (index: number, total: number, loop = 0) => Math.floor(loop) + 1 - getSectorAngle(index, total);

/**
 * 监听动画结束执行回调函数
 * @param elm 监听的HTML元素
 * @param callback 事件回调
 */
export const addStopListener = (elm: HTMLElement, callback: () => void) => {
  // elm.addEventListener('webkitTransitionEnd', callback);
  // elm.addEventListener('mozTransitionEnd', callback);
  // elm.addEventListener('oTransitionEnd', callback);
  elm.addEventListener('transitionend', callback);
};
