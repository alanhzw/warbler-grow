/*
 * @Author: 一尾流莺
 * @Description:工具
 * @Date: 2022-01-10 18:00:56
 * @LastEditTime: 2022-01-11 10:08:03
 * @FilePath: \common_c\src\views\activity\preview\utils.js
 */

// 获取url参数
const qs = (url) => {
  // 获取到url /api/types/gettypes?a=aaa&b=2
  // 把参数解析成字符串 a=aaa&b=2
  const paramsStr = url.split('?')[1] || '';
  // 把字符串解析成数组  [ 'a=aaa', 'b=2' ]
  const paramsArr = paramsStr.split('&') || [];
  // 把数组解析成对象  { a: 'aaa', b: '2' }
  const params = paramsArr.reduce((pre, cur) => {
    const [key, value] = cur.split('=');
    pre[key] = value || null;
    return pre;
  }, {});
  // 把对象赋值给 req.query
  return params;
};

export default qs;
