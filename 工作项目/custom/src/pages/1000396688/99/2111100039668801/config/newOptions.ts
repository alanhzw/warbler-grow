/*
 * @Author: 一尾流莺
 * @Description:新的配置
 * @Date: 2021-11-29 11:58:11
 * @LastEditTime: 2021-12-07 15:10:54
 * @FilePath: \custom\src\pages\1000396688\99\2111100039668801\config\newOptions.ts
 */
import mainBg from '../assets/background.png';
import mainBtnBg from '../assets/button-new.png';
import ruleBtnBg from '../assets/btn-rule.png';
import { HomePageOptions } from './type';

const option: HomePageOptions = {
  mainColor: '#c6c7cd',
  mainPicOptions: {
    imgUrl: mainBg,
  },
  mainBtnOptions: {
    backgroundImage: `url(${mainBtnBg})`,
    width: '2.68rem',
    height: '0.6rem',
    top: '12rem',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  ruleBtnOptions: {
    backgroundImage: `url(${ruleBtnBg})`,
    width: '1.44rem',
    height: '0.5rem',
    top: '9.2rem',
    right: '0',
  },
  openCardPopupOptions: {

  },
  rulePopupOptions: {

  },
};

export default option;
