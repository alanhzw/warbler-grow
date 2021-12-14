/*
 * @Description: 全局过滤器
 * @Author: hanzhiwei
 * @Date: 2020-10-08 15:26:49
 * @LastEditTime: 2020-12-24 15:01:42
 * @FilePath: \SNActivity\src\filters\index.js
 */
// 时间格式处理函数
const timeFormat = (value, format) => {
  let date = new Date(Number(value));
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let oneMago = m - 1;
  let d = date.getDate();
  let h = date.getHours();
  let min = date.getMinutes();
  let s = date.getSeconds();
  let result = '';
  if (m < 10) {
    m = '0' + m;
  }
  if (d < 10) {
    d = '0' + d;
  }
  if (h < 10) {
    h = '0' + h;
  }
  if (min < 10) {
    min = '0' + min;
  }
  if (s < 10) {
    s = '0' + s;
  }
  if (format === 'yyyy') {
    result = y;
  }
  if (format === 'yyyy-mm') {
    result = y + '-' + m;
  }
  if (format === 'yyyy-mm-dd') {
    result = y + '-' + m + '-' + d;
  }
  if (format === 'mm-dd') {
    result = m + '-' + d;
  }
  if (format === 'yyyy-mm-dd-hh-mm') {
    result = y + '-' + m + '-' + d + ' ' + h + ':' + min;
  }
  if (format === 'yyyy-oneMago-dd-hh-mm') {
    result = y + '-' + oneMago + '-' + d + ' ' + h + ':' + min;
  }
  if (format === 'yyyy-mm-dd-hh-mm-ss') {
    result = y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s;
  }
  return result;
};

export { timeFormat };
