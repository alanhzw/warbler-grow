<template>
  <div class="quota-prize-common-durex">
    <durex-main-pic :options="{
      ...mainPicOptions,
      pic: options.mainPic ? `${CONST.IMAGE_PREFIX}${options.mainPic}`: mainPicOptions.pic
    }"></durex-main-pic>
    <durex-rule :options="ruleOptions"></durex-rule>
    <durex-my-draw-prizes :options='myDrawPrizesOptions'></durex-my-draw-prizes>
    <durex-draw :options="drawOptions" />
    <durex-swiper :activityInfo='activityInfo'></durex-swiper>
    <!-- <durex-winners :options="winnersOptions"
                   :previewMode="false" /> -->
  </div>
</template>
<script>
/**
 * 通用的开卡礼包组件模版
 */
// 默认的开卡礼包配置
import mainPic from '../../../mobile/modules/durex0/assets/mainpic.png';
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
          top: '2rem',
        },
        itemStyle: {
          itemColor: ['', ''],
          width: '2.7rem',
          height: '2.7rem',
        },
        wheelContentStyle: {
          top: '0.3rem',
          width: '5.4rem',
          height: '5.4rem',
          backgroundColor: '',
        },
        backgroundOutsideStyle: {
          backgroundColor: '',
          top: '0rem',
          width: '6rem',
          height: '6rem',
        },
        backgroundInsideStyle: {
          backgroundColor: '',
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
        pointerPic: require('../../../mobile/modules/durex0/assets/pointer.png'),
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
.quota-prize-common-durex {
  position: relative;
  width: 100%;
  min-height: 100%;
}
</style>
