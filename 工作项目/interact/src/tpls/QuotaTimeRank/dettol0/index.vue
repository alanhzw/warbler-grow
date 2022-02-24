<template>
  <div class="quota-prize-common-dettol">
    <!-- {{formData}} -->
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
    <DettolEnroll :options="enrollOptions"
                  :activityInfo="{
                    ...activityInfo,
                    prizeLists:formData.prizeSettingsForm.prizeList || []
                  }"></DettolEnroll>

    <DettolMyQuoTaPrizes :options="dettolRuleQuotaPrizeOptions"></DettolMyQuoTaPrizes>
  </div>
</template>
<script>
/**
 * 通用的开卡礼包组件模版
 */
// 默认的开卡礼包配置
import mainPic from '@/assets/main-time-rank-dettol.png';
import ruleBtn from '@/assets/btn-rule.png';
import Moment from 'moment';
import dettolCdBg from '../../../mobile/modules/dettol/assets/begin-enroll.png';

import CONST from '@/utils/constant';

export default {
  name: 'CommonQuotaPrizeTpl',
  props: {
    options: {
      type: Object,
      // 默认是个空对象
      default: () => ({}),
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
        enrollEndTime: Date.now() + 10 * 24 * 60 * 60 * 1000,
        awardStartTime: Date.now() + 10 * 24 * 60 * 60 * 1000,
        status: 2,
        signUp: 1,
        hasGotInfo: true,
        activityType: 507,
        isAccord: 1,
        pre: true,
        grade: '1,2,3,4,5',
        prizeLists: [{
          prizeIndex: 1,
          prizeName: '',
          prizePicture: 'jfs/t1/164034/40/7285/2121/60321507E4b83552c/7587542256a93a15.png',
          prizeStatus: null,
          prizeType: 4,
        }],
      },
      userInfo: {
        grade: '1',
      },
      mainPicOptions: {
        pic: mainPic,
      },
      enrollOptions: {
        enableBtnStyle: {
          backgroundImage: `url(${dettolCdBg}`,
          backgroundSize: '100%',
          width: '6.8rem',
          height: '1.6rem',
          fontSize: '0.6rem',
          fontWeight: '700',
          lineHeight: '1.6rem',
          color: '#0e822f',
          marginTop: '1.3rem',
        },
        disableBtnStyle: {
          backgroundImage: `url(${dettolCdBg}`,
          backgroundSize: '100%',
          width: '6.8rem',
          height: '1.6rem',
          fontSize: '0.6rem',
          fontWeight: '700',
          lineHeight: '1.6rem',
          color: '#595959',
          marginTop: '1.3rem',
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
      countdownOptions: {
        style: {
          backgroundImage: '',
          top: '11.6rem',
          left: '50%',
          width: '6.5rem',
          height: '0.6rem',
        },
        label: '距离领奖时间',
        format: 'HH : mm : ss',
        timeKey: 'awardStartTime',
      },
      dettolRuleQuotaPrizeOptions: {
        boxStyle: {
          width: '7rem',
          height: '7.4rem',
          // padding: '1.1rem 0.5rem 0.5rem',
        },
      },

      swiperOptions: {
        style: {
          marginTop: '2rem',
        },
      },

    };
  },
  computed: {
    endTime() {
      return Moment(this.formData.prizeDistributionForm.awardStartTime).format('HH:mm:ss') || Date.now() + 10 * 24 * 60 * 60 * 1000;
    },
  },
};
</script>

<style lang="scss">
.quota-prize-common-dettol {
  position: relative;
  width: 100%;
  min-height: 100%;
  background-image: linear-gradient(bottom, #0e822f, #0e822f);
}
</style>
