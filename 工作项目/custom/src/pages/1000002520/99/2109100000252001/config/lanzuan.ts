/*
 * @Author: 一尾流莺
 * @Description:蓝钻页面配置
 * @Date: 2021-09-27 14:43:02
 * @LastEditTime: 2021-10-31 19:15:01
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\config\lanzuan.ts
 */
import { ref } from 'vue';
import bg from '../assets/page-lanzuan.png';
import bg1 from '../assets/page-lanzuan1.jpg';
import { isScheduled } from '../hooks/useMethods';
import { changeTime } from './time';

// a
const lanzuanOptions = ref({
  styleOption: {
    backgroundImage: `url(${bg})`,
    width: '7.5rem',
    height: '30rem',
    margin: '0rem auto',
  },
  linkOptions: {
    partOne: {
      coupon0: '252020211100001',
      coupon1: '2520202110001',
      coupon2: '2520202110002',
      coupon3: '2520202110003',
      goods1: '100007066678',
      goods2: '100007316356',
      goods3: '100016317954',
    },
    partTwo: {
      coupon1: '25202021100010',
      goods1: '100011575547',
      goods2: '100011575551',
      goods3: '100006355552',
      goods4: '100003771895',
      goods5: '100011916591',
      goods6: '5088026',
    },
  },
  pageName: 'lanzuan',

});
if (isScheduled(changeTime)) {
  lanzuanOptions.value.styleOption.backgroundImage = `url(${bg1})`;
  lanzuanOptions.value.linkOptions = {
    partOne: {
      coupon0: '252020211100001',
      coupon1: '100007066678',
      coupon2: '100007316356',
      coupon3: '100016317954',
      goods1: '100007066678',
      goods2: '100007316356',
      goods3: '100016317954',
    },
    partTwo: {
      coupon1: '252020211100002',
      goods1: '100011575547',
      goods2: '100011575551',
      goods3: '100006355552',
      goods4: '100003771895',
      goods5: '100011916591',
      goods6: '5088026',
    },
  };
}
export { lanzuanOptions };
