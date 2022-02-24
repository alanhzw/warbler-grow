/*
 * @Author: 一尾流莺
 * @Description:蕴醇页面配置
 * @Date: 2021-09-27 14:43:02
 * @LastEditTime: 2021-10-31 19:15:26
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\config\yunchun.ts
 */
import { ref } from 'vue';
import bg from '../assets/page-yunchun.png';
import bg1 from '../assets/page-yunchun1.png';
import { isScheduled } from '../hooks/useMethods';
import { changeTime } from './time';

const yunchunOptions = ref({
  styleOption: {
    backgroundImage: `url(${bg})`,
    width: '7.5rem',
    height: '30rem',
    margin: '0rem auto',
  },
  linkOptions: {
    partOne: {
      coupon0: '100027029204',
      coupon1: '100027029204',
      coupon2: '100027029204',
      coupon3: '100027029204',
      goods1: '100014593273',
      goods2: '100014593273',
      goods3: '100014593273',
    },
    partTwo: {
      coupon1: '25202021100010',
      goods1: '100027029226',
      goods2: '100027029158',
      goods3: '100014593271',
      goods4: '100027029182',
      goods5: '100027029176',
      goods6: '100014593245',
    },
  },
  pageName: 'yunchun',
});
if (isScheduled(changeTime)) {
  yunchunOptions.value.styleOption.backgroundImage = `url(${bg1})`;
  yunchunOptions.value.linkOptions = {
    partOne: {
      coupon0: '252020211100001',
      coupon1: '100027029204',
      coupon2: '100027029204',
      coupon3: '100027029204',
      goods1: '100014593273',
      goods2: '100014593273',
      goods3: '100014593273',
    },
    partTwo: {
      coupon1: '252020211100003',
      goods1: '100027029226',
      goods2: '100027029158',
      goods3: '100014593271',
      goods4: '100027029182',
      goods5: '100027029176',
      goods6: '100014593245',
    },
  };
}
export { yunchunOptions };
