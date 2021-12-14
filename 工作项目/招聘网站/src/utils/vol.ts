/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-23 19:44:05
 * @LastEditTime: 2021-11-23 19:46:08
 * @FilePath: \ired_resource\src\utils\vol.ts
 */
const positiveIntegerReg = (value:any) => {
  const reg = /^[1-9]\d*$/;
  return reg.test(value);
};

export {
  positiveIntegerReg,
};
