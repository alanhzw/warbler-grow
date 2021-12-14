/*
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-19 10:53:49
 * @LastEditTime: 2021-11-19 15:04:05
 * @FilePath: \ired_resource\src\pages\business\recruitment\form\hooks\index.ts
 */

import { ref } from 'vue';

export default function () {
  // 工作经验
  const workingYearsTypeMap = ref([
    {
      label: '不限',
      value: 1,
    },
    {
      label: '1年以内',
      value: 2,
    },
    {
      label: '1-3年',
      value: 3,
    },
    {
      label: '3-5年',
      value: 4,
    },
    {
      label: '5-10年',
      value: 5,
    },
  ]);

  // 学历要求
  const educationMap = ref([
    {
      label: '不限',
      value: 1,
    },
    {
      label: '初中及以下',
      value: 2,
    },
    {
      label: '中专/中技',
      value: 3,
    },
    {
      label: '高中',
      value: 4,
    },
    {
      label: '大专',
      value: 5,
    },
    {
      label: '本科',
      value: 6,
    },
    {
      label: '硕士',
      value: 7,
    },
    {
      label: '博士',
      value: 8,
    },
  ]);

  return {
    workingYearsTypeMap,
    educationMap,
  };
}
