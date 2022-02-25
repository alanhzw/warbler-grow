/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-01-11 14:25:31
 * @LastEditTime: 2022-01-20 11:23:29
 * @FilePath: \common_c\src\views\activity\improve\utils\allCollects.js
 */
const allCollects = [
  {
    label: '姓名', name: 'name', alias: '姓名', required: 1, pointCode: '', pointCount: '', limit: 1, disabled: false, remark: '用户姓名',
  },
  {
    label: '性别', name: 'gender', alias: '性别', required: 1, pointCode: '', pointCount: '', limit: 1, disabled: false, remark: '用户性别',
  },
  {
    label: '生日',
    name: 'birthday',
    alias: '生日',
    required: 0,
    pointCode: '',
    pointCount: '',
    limit: 0,
    disabled: false,
    remark: '生日根据DL字段判断是否可修改',
  },
  {
    label: '省/市',
    name: 'address',
    alias: '省/市',
    required: 0,
    pointCode: '',
    pointCount: '',
    limit: 1,
    disabled: false,
    remark: '用户省/市信息',
  },
  {
    label: '详细地址',
    name: 'addressDetail',
    alias: '详细地址',
    required: 0,
    pointCode: '',
    pointCount: '',
    limit: 1,
    disabled: false,
    remark: '用户详细地址信息',
  },
];

export default allCollects;
