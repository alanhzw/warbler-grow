/*
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2020-12-29 12:08:03
 * @LastEditTime: 2021-01-05 12:26:55
 * @FilePath: \SNActivity\src\axios\apis\common\apis.js
 */
export default {
  // 判断是否开卡
  getOpenCard: {
    url: '/api/member/getMemLevel',
    method: 'get',
  },
  // 去开卡
  goOpenCard: {
    url: '/api/member/addRewardBind',
    method: 'get',
  },
  // 添加地址
  addAddress: {
    url: '/api/c/addAddress/addAddress',
    method: 'post',
  },
  // 获取地址列表
  getAddressList: {
    url: '/api/c/receivingAddressManagement/getAddress',
    method: 'get',
  },
  // 获取地址详情
  getAddressDetail: {
    url: '/api/c/updateAddress/details',
    method: 'get',
  },
  // 修改地址详情
  updateAddress: {
    url: '/api/c/updateAddress/updateAddress',
    method: 'post',
  },
  // 删除地址
  deleteAddress: {
    url: '/api/c/receivingAddressManagement/deleteAddress',
    method: 'get',
  },
  // 设为默认地址
  updateDefault: {
    url: '/api/c/receivingAddressManagement/updateDefault',
    method: 'post',
  },
  // 获取太阳码
  getSunCode: {
    url: '/api/sun/code/createSunCode',
    method: 'post',
  },
};
