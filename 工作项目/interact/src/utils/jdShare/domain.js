

/**
 * 获取一级域名
 */
export function getMainDomain() {
  return document.domain.split('.').slice(-2).join('.');
}

export const DOMAIN = {
  COMMON: '.isvjcloud.com',
  PROTECT: '.isvjd.com'
}

/**
 * biz类型与域名对应关系
 * jm-business-center   | isvjcloud.com  京东APP使用
 * jm-business-center-3 | isvjd.com      WQ环境使用
 * jm-business-center-2 | jdfw1.com      备份域名使用
 */
export const BIZ_TYPES = {
  'isvjcloud.com': 'jm-business-center',
  'isvjd.com': 'jm-business-center-3',
  'jdfw1.com': 'jm-business-center-2',
};

export default DOMAIN;


export const exchangeSubStr = (url, from, to) => (url.indexOf(from) > -1 ? url.replace(from, to) : url);

/**
 * 获取京东授权bizType
 */
export function getBizType() {
  const domain = getMainDomain();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return BIZ_TYPES[domain] || BIZ_TYPES['isvjcloud.com'];
}
