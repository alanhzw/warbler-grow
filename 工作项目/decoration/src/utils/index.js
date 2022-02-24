/*
 * @Author: YC
 * @Date: 2020-12-21 10:02:10
 * @LastEditors: YC
 * @LastEditTime: 2021-06-24 16:01:51
 * @Description: 工具方法
 */
import { LzMsg } from "@/utils/UI";
import CONST from "@/utils/constant";

console.log('new utils')

/**
 * 判断坐标位置是否在矩形区域内
 * @param {*} rec 矩形数据结构
 * @param {*} x x坐标
 * @param {*} y y坐标
 */
const isInRectangle = (rec, x, y) => {
  return rec.x <= x && x <= rec.x + rec.w && rec.y <= y && y < rec.y + rec.h;
};

/**
 * 判断两个矩形是否重叠
 * @param {*} rec1 矩形1
 * @param {*} rec2 矩形2·
 */
const isOverlap = (rec1, rec2) => {
  console.log('overlap')
  return isInRectangle(rec1, rec2.x, rec2.y) ||
  isInRectangle(rec1, rec2.x + rec2.w, rec2.y) ||
  isInRectangle(rec1, rec2.x, rec2.y + rec2.h) ||
  isInRectangle(rec1, rec2.x + rec2.w, rec2.y + rec2.h) ||
  isInRectangle(rec2, rec1.x, rec1.y) ||
  // isInRectangle(rec2, rec1.x + rec1.w, rec1.y) ||
  // isInRectangle(rec2, rec1.x, rec1.y + rec1.h) ||
  isInRectangle(rec2, rec1.x + rec1.w, rec1.y + rec1.h);
}

/**
 * 判断多个矩形是否存在重叠
 * @param {*} list 矩形区域列表
 */
const checkOverlap = list => {
  list.forEach(rec => (rec.overlap = false));
  if (list.length > 1) {
    let result = false;
    for (let i = 0; i < list.length - 1; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (isOverlap(list[i], list[j])) {
          list[i].overlap = true;
          list[j].overlap = true;
          result = true;
        }
      }
    }
    return result;
  } else {
    return false;
  }
};
export default {
  /**
   * 深度   拷贝
   * @param {*} obj 要转换的对象
   */
  deepCopy(obj) {
    return obj ? JSON.parse(JSON.stringify(obj)) : obj;
  },
  /**
   * 复制到剪切板
   * @param {*} text 要复制到剪切板的字符串
   */
  copyText(text) {
    return new Promise(resolve => {
      const tag = document.createElement("input");
      tag.setAttribute("id", "cp_hgz_input");
      tag.value = text;
      document.getElementsByTagName("body")[0].appendChild(tag);
      document.getElementById("cp_hgz_input").select();
      document.execCommand("copy");
      document.getElementById("cp_hgz_input").remove();
      resolve();
    });
  },

  getShopId() {
    const shopId = localStorage.getItem(CONST.LZ_DECO_CUSTOMER_SHOPID);
    if (!shopId) {
      const bizUser = JSON.parse(localStorage.getItem(CONST.LZ_CRM_BIZ_USER));
      return bizUser && bizUser.currentShop && bizUser.currentShop.shopId;
    }
    return shopId;
  },

  isInRectangle,
  isOverlap,
  checkOverlap
};
