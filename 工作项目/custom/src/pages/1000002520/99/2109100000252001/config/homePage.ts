/*
 * @Author: 一尾流莺
 * @Description:活动主页的配置文件
 * @Date: 2021-09-27 14:28:26
 * @LastEditTime: 2021-10-28 14:56:52
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\config\homePage.ts
 */
import { ref } from 'vue';
import type { HomePageOptions } from '../type/index';
import bg from '../assets/page-home-page.png';

const homePageOptions = ref<HomePageOptions>({
  // 样式配置
  styleOption: {
    backgroundImage: `url(${bg})`,
    width: '7.5rem',
    height: '12.5rem',
    margin: '0rem',
  },
  pageList: [
    {
      pageName: 'lanzuan',
    },
    {
      pageName: 'youji',
    },
    {
      pageName: 'bozhen',
    },
    {
      pageName: 'yunchun',
    },
  ],
});
export {
  homePageOptions,
};
