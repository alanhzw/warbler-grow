/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-09-13 17:03:55
 * @LastEditTime: 2021-09-13 18:40:49
 * @FilePath: \vue-press\docs\guide\sidebar.js
 */

module.exports = [
  ['', '文档'],
  {
    title: '数组',
    collapsable: true,
    children: [
      ['array/arrWithoutDupli', '删除数组中的重复元素'],
      ['array/arrObjectWithoutDupli', '删除对象数组中的重复元素'],
      ['array/findObjectInArray', '根据对象的键值在数组中查找对象'],
    ],
  },
  {
    title: '布尔值',
    collapsable: true,
    children: [
      ['boolean/randomBoolean', '获得一个随机的布尔值'],
    ],
  },
  {
    title: '日期',
    collapsable: true,
    children: [
    ],
  },

  {
    title: '函数',
    collapsable: true,
    children: [
    ],
  },
  {
    title: '常用方法',
    collapsable: true,
    children: [
      ['methods/imitateDelay', '模拟延迟'],
    ],
  },
  {
    title: '数字',
    collapsable: true,
    children: [
      ['number/getAverage', '求平均值'],
      ['number/isEvenNumber', '判断奇偶'],
    ],
  },
  {
    title: '对象',
    collapsable: true,
    children: [
    ],
  },
  {
    title: '字符串',
    collapsable: true,
    children: [
      ['string/reverseString', '反转字符串'],
    ],
  },
];
