<template>
  <div class="quota-prize-common-dettol">
    <main-pic :options="{
      ...mainPicOptions,
      pic: options.mainPic ? `${CONST.IMAGE_PREFIX}${options.mainPic}`: mainPicOptions.pic
    }"></main-pic>
    <dettol-rule :options="ruleOptions"></dettol-rule>
    <dettol-my-draw-prizes :options='myDrawPrizesOptions'></dettol-my-draw-prizes>
    <dettol-draw :options="drawOptions" />
    <!-- <dettol-swiper :activityInfo='activityInfo'></dettol-swiper> -->
    <dettol-winners :options="winnersOptions"
                    :previewMode="true" />
  </div>
</template>
<script>
/**
 * 通用的开卡礼包组件模版
 */
// 默认的开卡礼包配置
import mainPic from '@/assets/main-quota-draw-dettol.png';
import ruleBtn from '@/assets/btn-rule.png';
import myPrizesBtn from '@/assets/btn-my-prizes.png';

import CONST from '@/utils/constant';
import MyDrawPrizes from '@/mobile/modules/MyDrawPrizes';
import Draw from '@/mobile/modules/Draw';
import Moment from 'moment';

export default {
  components: { MyDrawPrizes, Draw },
  name: 'DettolQuotaDrawTpl',
  props: {
    options: {
      type: Object,
      // 默认是个空对象
      default: () => ({
      }),
    },
    formData: {
      type: Object,
      // 默认是个空对象
      default: () => ({
        baseInfoForm: {
          endTime: Moment(Date.now() + 24 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss'),
        },
        drawForm: {
          drawEndTime: Moment(Date.now() + 24 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss'),
          drawTimesInfoList: [{
            times: 1,
            quota: 10,
          }],
        },
        drawPrizeForm: {
          drawPrizeInfoList: [],
        },
      }),
    },
  },
  data() {
    return {
      CONST,
      activityInfo: {
        enrollEndTime: Date.now() + 10 * 24 * 60 * 60 * 1000,
        status: 1,
        signUp: 2,
        grade: '1,2,3,4,5',
        prizeLists: this.formData.prizeLists,

      },
      userInfo: {
        grade: '1',
      },
      mainPicOptions: {
        pic: mainPic,
      },
      ruleOptions: {
        btnStyle: {
          backgroundImage: `url(${ruleBtn}`,
          top: '0.9rem',
          right: '0.3rem',
          width: '1.28rem',
          height: '0.49rem',
        },
      },
      myDrawPrizesOptions: {
        btnStyle: {
          backgroundImage: `url(${myPrizesBtn}`,
          top: '1.5rem',
          right: '0.3rem',
          width: '1.28rem',
          height: '0.49rem',
        },
      },
      drawOptions: {
        boxStyle: {
          top: '1rem',
        },
        itemStyle: {
          itemColor: ['#e4c783', '#f6fbf7'],
          width: '2.7rem',
          height: '2.7rem',
        },
        wheelContentStyle: {
          top: '0.3rem',
          width: '5.4rem',
          height: '5.4rem',
          backgroundColor: '#f6fbf7',
          border: '2px solid #16993c',
        },
        backgroundOutsideStyle: {
          backgroundColor: '#119737',
          top: '0rem',
          width: '6rem',
          height: '6rem',
        },
        backgroundInsideStyle: {
          backgroundColor: '#1fcf51',
          top: '0.2rem',
          width: '5.6rem',
          height: '5.6rem',
        },
        prizeNameStyle: {
          fontSize: '0.24rem',
        },
        prizePictureStyle: {
          width: '0.8rem',
        },
        pointerStyle: {
          position: 'absolute',
          top: '2.2rem',
          width: '1.4rem',
        },
        pointerPic: require('@/assets/wheel-pointer-dilu.png'),
        circleStyle: {},
      },
      winnersOptions: {
        boxStyle: {
          width: '5.9rem',
          padding: '0.2rem 0.3rem',
        },
      },
    };
  },
  computed: {
  },
};
</script>

<style lang="scss">
.quota-prize-common-dettol {
  position: relative;
  width: 100%;
  min-height: 100%;
  // overflow: hidden;
  background-image: linear-gradient(bottom, #048e2f, #0e822f);
}
</style>
