/*
 * @Author: 一尾流莺
 * @Description:铂臻页面配置
 * @Date: 2021-09-27 14:43:02
 * @LastEditTime: 2021-10-31 19:17:15
 * @FilePath: \custom\src\pages\1000002520\99\2109100000252001\config\bozhen.ts
 */
import { ref } from 'vue';
import bg from '../assets/page-bozhen.png';
import bg1 from '../assets/page-bozhen1.jpg';
import { isScheduled } from '../hooks/useMethods';
import { changeTime } from './time';

const bozhenOptions = ref({
  styleOption: {
    backgroundImage: `url(${bg})`,
    width: '7.5rem',
    height: '30rem',
    margin: '0rem auto',
  },
  linkOptions: {
    partOne: {
      coupon0: '252020211017',
      coupon1: '2520202110007',
      coupon2: '2520202110008',
      coupon3: '2520202110009',
      goods1: '100007649050',
      goods2: '100009836111',
      goods3: '100025835092',
    },
    partTwo: {
      coupon1: '25202021100010',
      goods1: '100003930745',
      goods2: '100003930843',
      goods3: '100006669406',
      goods4: '100003930881',
      goods5: '100022331980',
      goods6: '100011775581',
    },
  },
  pageName: 'bozhen',
});
// 定时更换页面优惠券id等
if (isScheduled(changeTime)) {
  bozhenOptions.value.styleOption.backgroundImage = `url(${bg1})`;
  bozhenOptions.value.linkOptions = {
    partOne: {
      coupon0: '252020211100001',
      coupon1: '252020211100001',
      coupon2: '252020211100001',
      coupon3: '25202021110005',
      goods1: '100007649050',
      goods2: '100009836111',
      goods3: '100025835092',
    },
    partTwo: {
      coupon1: '252020211100002',
      goods1: '100003930745',
      goods2: '100003930843',
      goods3: '100006669406',
      goods4: '100003930881',
      goods5: '100022331980',
      goods6: '100011775581',
    },

  };
}
export {
  bozhenOptions,
};
