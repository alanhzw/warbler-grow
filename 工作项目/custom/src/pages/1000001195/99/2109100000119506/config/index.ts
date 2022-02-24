/*
 * @Author: 一尾流莺
 * @Description:配置文件
 * @Date: 2021-08-27 15:34:41
 * @LastEditTime: 2021-09-06 14:32:49
 * @FilePath: \custom\src\pages\1000001195\99\2109100000119502\config\index.ts
 */

import { ref } from 'vue';
import firstPart from '../assets/first-part.png';
import secondPart from '../assets/second-part.png';
import thirdPart from '../assets/third-part.png';
import fourthPart from '../assets/fourth-part.png';

// 页面配置对象
const pageOptions = {
  background: '#48b6f7',
};

// KV配置对象
const firstPartOptions = {
  backgroundImage: `url(${firstPart})`,
  width: '7.5rem',
  height: '8.5rem',
  margin: '0rem',
};

// 加入会员专享好礼
const secondPartOptions = ref({
  backgroundImage: `url(${secondPart})`,
  width: '7.3rem',
  height: '7.7rem',
  margin: '0 auto',
});

// 专属抽奖新品尝鲜
const thirdPartOptions = {
  backgroundImage: `url(${thirdPart})`,
  width: '7.3rem',
  height: '9.6rem',
  margin: '0 auto',

};
// 专属好货,新品推荐
const fourthPartOptions = {
  backgroundImage: `url(${fourthPart})`,
  width: '7.3rem',
  height: '19.5rem',
  margin: '0 auto',

};
// APIS
const apisOptions = {
  main: '/wx/bluemoon/joingift/activityContent',
  getMyPrize: '/wx/bluemoon/joingift/myPrize',
  getStatus: '/wx/bluemoon/joingift/judge',
  win: '/wx/bluemoon/joingift/sendBeans',
  draw: '/wx/bluemoon/joingift/start',
  addAddress: '/wxAddress/save',
  checkAddress: '/wxAddress/getAddressByGenerateId',
  getRule: '/common/brand/getFullActInfoVo',
};

export {
  pageOptions,
  firstPartOptions,
  secondPartOptions,
  thirdPartOptions,
  fourthPartOptions,
  apisOptions,
};
