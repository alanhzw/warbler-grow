/*
 * @Author: 一尾流莺
 * @Description: 曝光商品相关
 * @Date: 2021-08-27 14:37:01
 * @LastEditTime: 2021-12-28 09:45:33
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119507\config\skusList.ts
 */

import sku1 from '../assets/skus-01.png';
import sku2 from '../assets/skus-02.png';
import sku3 from '../assets/skus-03.png';
import sku4 from '../assets/skus-04.png';
import sku5 from '../assets/skus-05.png';
import sku6 from '../assets/skus-06.png';

export interface SkuItem {
  pic: string;
  sku: number;
}
export type SkusList = Array<SkuItem>

// 商品列表  固定的六个
const skusList:SkusList = [
  {
    pic: sku1, // 商品图
    sku: 100021508648, // 商品sku
  },
  {
    pic: sku2,
    sku: 100023894496,
  },
  {
    pic: sku3,
    sku: 100008817605,
  },
  {
    pic: sku4,
    sku: 100021508616,
  },
  {
    pic: sku5,
    sku: 100010495151,
  },
  {
    pic: sku6,
    sku: 100018842636,
  },
];

export default skusList;
