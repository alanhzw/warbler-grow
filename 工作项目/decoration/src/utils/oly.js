/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-12-07 16:32:44
 * @LastEditTime: 2021-12-13 15:35:08
 * @FilePath: \decoration\src\utils\oly.js
 */

const isOLY = () => {
  let venderID;
  try {
    venderID = JSON.parse(localStorage.getItem('LZ_CURRENT_SHOP')).venderId
  } catch (error) {
  }
  return [].includes(venderID)
}

export default isOLY
