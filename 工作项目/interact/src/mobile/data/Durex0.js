/*
 * @Author: 一尾流莺
 * @Description:杜蕾斯模板
 * @Date: 2021-12-01 09:24:22
 * @LastEditTime: 2021-12-02 10:52:53
 * @FilePath: \interact\src\mobile\data\Durex0.js
 */
import myPrizesBg from '../../assets/bg-my-prizes.png';
import blankBox from '../../assets/blank-box.png';

const options = {
  bgColor: ['#eef0f0', '#eef0f0'],
  modules: [
    {
      componentName: 'DurexMainPic',
      options: {
        pic: require('../modules/durex0/assets/mainpic.png'),
      },
    },
    {
      componentName: 'DurexOrders',
      options: {
        blankBox,
        boxStyle: {
          backgroundImage: `url(${myPrizesBg})`,
          width: '7.5rem',
          height: '4rem',
        },
      },
    },
    {
      componentName: 'DurexRule',
      options: {},
    },
    {
      componentName: 'DurexPrizes',
      options: {},
    },
    {
      componentName: 'DurexDraw',
      options: {
        boxStyle: {
          top: '1rem',
        },
        itemStyle: {
          itemColor: ['', ''],
          width: '3.47rem',
          height: '3.47rem',
        },
        wheelContentStyle: {
          width: '6.94rem',
          height: '6.94rem',
          backgroundColor: '',
        },
        isDettol: false,
        backgroundOutsideStyle: {
          top: '0rem',
          width: '6.94rem',
          height: '6.94rem',
        },
        backgroundInsideStyle: {
          backgroundColor: '',
          top: '0.2rem',
          width: '6.94rem',
          height: '6.94rem',
        },
        prizeNameStyle: {
          fontSize: '0.24rem',
        },
        prizePictureStyle: {
          width: '0.8rem',
        },
        pointerStyle: {
          position: 'absolute',
          top: '2.4rem',
          width: '1.5rem',
        },
        pointerPic: require('../modules/durex0/assets/pointer.png'),
        circleStyle: {},
      },
    },
    {
      componentName: 'DurexSwiper',
      options: {},
    },
    {
      componentName: 'DurexWinners',
      options: {
        boxStyle: {
          width: '5.9rem',
          padding: '0.2rem 0.3rem',
        },
      },
    },
  ],
};

export default options;