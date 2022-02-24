/*
 * @Author: 一尾流莺
 * @Description:有机页面配置
 * @Date: 2021-09-27 14:43:02
 * @LastEditTime: 2021-10-31 19:15:14
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\config\youji.ts
 */
import { ref } from 'vue';
import bg from '../assets/page-youji.png';
import bg1 from '../assets/page-youji1.jpg';
import { isScheduled } from '../hooks/useMethods';
import { changeTime } from './time';

// a
const youjiOptions = ref({
  styleOption: {
    backgroundImage: `url(${bg})`,
    width: '7.5rem',
    height: '30rem',
    margin: '0rem auto',
  },
  linkOptions: {
    partOne: {
      coupon0: '252020211100001',

      coupon1: '2520202110004',
      coupon2: '2520202110005',
      coupon3: '2520202110006',
      goods1: '100007649014',
      goods2: '100004420183',
      goods3: '100009265437',
    },
    partTwo: {
      coupon1: '25202021100010',
      goods1: '4394293',
      goods2: '5244860',
      goods3: '4394245',
      goods4: '100009617093',
      goods5: '100022377856',
      goods6: '100022377834',
    },
  },
  pageName: 'youji',

});
if (isScheduled(changeTime)) {
  youjiOptions.value.styleOption.backgroundImage = `url(${bg1})`;
  youjiOptions.value.linkOptions = {
    partOne: {
      coupon0: '252020211100001',
      coupon1: '100007649014',
      coupon2: '100004420183',
      coupon3: '100009265437',
      goods1: '100007649014',
      goods2: '100004420183',
      goods3: '100009265437',
    },
    partTwo: {
      coupon1: '252020211100002',
      goods1: '4394293',
      goods2: '5244860',
      goods3: '4394245',
      goods4: '100009617093',
      goods5: '100022377856',
      goods6: '100022377834',
    },
  };
}
export { youjiOptions };
