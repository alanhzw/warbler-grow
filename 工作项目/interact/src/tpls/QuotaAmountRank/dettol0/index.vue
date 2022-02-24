<template>
  <div class="quota-prize-manual-dettol">
    <main-pic :options="{
      ...mainPicOptions,
      pic: options.mainPic ? `${CONST.IMAGE_PREFIX}${options.mainPic}`: mainPicOptions.pic
    }"></main-pic>
    <DettolRuleQuotaPrize :options="ruleOptions"></DettolRuleQuotaPrize>
    <DettolSwiper :options="
                     swiperOptions"
                  :activityInfo="{
                    ...activityInfo,
                    prizeLists:formData.prizeSettingsForm.prizeList || []
                  }"
                  :userInfo="userInfo" />
    <!-- <order-tip :activityInfo="activityInfo" /> -->
    <!-- <my-draw-prizes :options='myDrawPrizesOptions'></my-draw-prizes> -->
    <dettol-countdown :options="countdownOptions"
                      :activityInfo="{
      ...activityInfo,
      endTime: endTime
    }" />

    <DettolMyQuoTaPrizes :options="myPrizeManualOptions"
                         :activityInfo="{
      ...activityInfo,
      getUserAwardsRespDTOS: formData.prizeSettingsForm.prizeList.map(p => ({...p, prizeStatus: 1})),
    }"></DettolMyQuoTaPrizes>

  </div>
</template>
<script>
/**
 * 通用的开卡礼包组件模版
 */
// 默认的开卡礼包配置
import mainPic from '@/assets/main-prize-rank-dettol.png';
import ruleBtn from '@/assets/btn-rule.png';
import myPrizesBtn from '@/assets/btn-my-prizes.png';
import cdBg from '@/assets/bg-countdown.png';
import winnersBg from '@/assets/bg-winners.png';
import myPrizesBg from '@/assets/bg-my-prizes.png';
import mainEnableBtn from '@/assets/btn-enable.png';
import mainDisableBtn from '@/assets/btn-disable.png';
import blankBox from '@/assets/blank-box.png';
import Moment from 'moment';

import CONST from '@/utils/constant';

export default {
  name: 'CommonQuotaPrizeTpl',
  props: {
    options: {
      type: Object,
      // 默认是个空对象
      default: () => ({
      }),
    },
    formData: {
      default: () => ({
        prizeDistributionForm: {
          awardStartTime: '2021-02-28 00:00:00',
          awardEndTime: '2021-03-1 00:00:00',
        },
        prizeSettingsForm: {
          prizeList: [
            {
              prizeIndex: 1,
              prizeName: '2积分',
              prizePicture: 'jfs/t1/164034/40/7285/2121/60321507E4b83552c/7587542256a93a15.png',
              prizeStatus: 0,
              prizeType: 4,
              sendNumUnit: 3,
            },
            {
              prizeIndex: 1,
              prizeName: '3积分',
              prizePicture: 'jfs/t1/164034/40/7285/2121/60321507E4b83552c/7587542256a93a15.png',
              prizeStatus: 0,
              prizeType: 4,
              sendNumUnit: 3,
            },
            {
              prizeIndex: 1,
              prizeName: '4积分',
              prizePicture: 'jfs/t1/164034/40/7285/2121/60321507E4b83552c/7587542256a93a15.png',
              prizeStatus: 0,
              prizeType: 4,
              sendNumUnit: 3,
            },
          ],
        },
      }),
    },
  },
  data() {
    return {
      CONST,
      activityInfo: {
        activityType: this.$route.params.type,
        status: 3,
        signUp: 2,
        isAccord: 1,
        orderPrice: 100,
        grade: '1,2,3,4,5',
      },
      userInfo: {
        grade: '1',
      },
      mainPicOptions: {
        pic: mainPic,
      },
      swiperOptions: {
        style: {
          marginTop: '2.2rem',
        },
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
      countdownOptions: {
        style: {
          backgroundImage: `url(${cdBg}`,
          top: '6rem',
          left: '50%',
          width: '4.5rem',
          height: '0.6rem',
        },
        label: '距离领奖结束',
        format: 'DD天 HH小时 mm分 ss秒',
        timeKey: 'endTime',
      },
      enrollOptions: {
        enableBtnStyle: {
          position: 'absolute',
          bottom: '2rem',
          marginLeft: '0.21rem',
          backgroundImage: `url(${mainEnableBtn}`,
          width: '7.08rem',
          height: '1.29rem',
          fontSize: '0.36rem',
          lineHeight: '1rem',
          color: '#e2231a',
        },
        disableBtnStyle: {
          backgroundImage: `url(${mainDisableBtn}`,
          width: '7.08rem',
          height: '1.29rem',
          fontSize: '0.36rem',
          lineHeight: '1rem',
          color: '#999999',
        },
      },
      myPrizeManualOptions: {
        blankBox,
        boxStyle: {
          backgroundImage: `url(${myPrizesBg})`,
          width: '7.5rem',
          height: '6rem',
        },
      },
      winnersOptions: {
        boxStyle: {
          backgroundImage: `url(${winnersBg})`,
          width: '7rem',
          height: '7.4rem',
          padding: '1.1rem 0.5rem 0.5rem',
        },
      },
    };
  },
  computed: {
    endTime() {
      return Moment(this.formData.prizeDistributionForm.awardEndTime).format('YYYY/MM/DD HH:mm:ss');
    },
  },
};
</script>

<style lang="scss">
.quota-prize-manual-dettol {
  position: relative;
  width: 100%;
  min-height: 100%;
  overflow-y: auto;
  background-image: linear-gradient(bottom, #0e822f, #0e822f);
}
</style>
