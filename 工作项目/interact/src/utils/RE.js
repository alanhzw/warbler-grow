/**
 * 通用的正则表达式
 */

export default {
  RE_NO_SPECIAL: /[^a-zA-Z0-9\u4E00-\u9FA5]/,
  NUM_LETTER: /^[A-Za-z0-9]$/, // 数字字母
  NUM_LETTER_6_20: '^[A-Za-z0-9]{6,20}$',
  PWD: /^[0-9a-zA-Z!@#$%^&*_]{6,20}$/, // 6-20位数字字母组合，包含部分特殊符号，用于密码校验
  CN_WORD: /[\u4E00-\u9FFF]+/g, // 字符串含有汉字
  JD_LINK: new RegExp(/^((https|http):\/\/)[a-zA-Z0-9-.]+(.isvjcloud.com|.isvjd.com|.jd.com)/g),
};
