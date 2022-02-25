import clientType, { getClientType } from '@/utils/jdShare/clientType';

const client = getClientType();

// 跳转商品详情页面
export const gotoSkuPage = (skuId) => {
  if (client === clientType.WECHAT) {
    window.location.href = `https://wq.jd.com/item/view/?sku=${skuId}`;
  } else {
    window.location.href = `https://item.m.jd.com/product/${skuId}.html?wjfrom=ISV_2180A2AFA5B2452F9061C01C053C4756_WX&wjwxpubid=wxd9fd3549c5fdb283&wjunionid=&wjopenid=`;
  }
};

// 获取url参数
export const qs = (url) => {
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
