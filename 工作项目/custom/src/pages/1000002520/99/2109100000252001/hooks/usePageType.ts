/*
 * @Author: 一尾流莺
 * @Description: 控制显示哪个二级页面
 * @Date: 2021-09-27 17:18:59
 * @LastEditTime: 2021-09-28 11:00:01
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\hooks\usePageType.ts
 */
import { ref } from 'vue';
import type { PageType } from '../type/index';

const usePageType = () => {
  // 控制显示哪个二级页面
  const pageType = ref<PageType>('home');

  // 切换二级页面
  const changePageType = (value:PageType) => {
    pageType.value = value;
  };
  return {
    pageType,
    changePageType,
  };
};

export default usePageType;
