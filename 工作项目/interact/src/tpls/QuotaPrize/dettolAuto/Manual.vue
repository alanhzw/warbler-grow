<template>
  <div class="quota-prize-common-dettol">
    <!-- {{formData}} -->
    <main-pic :options="{
        ...mainPicOptions,
        pic: options.mainPic
          ? `${CONST.IMAGE_PREFIX}${options.mainPic}`
          : mainPicOptions.pic,
      }"></main-pic>
    <DettolRuleQuotaPrize :options="ruleOptions"></DettolRuleQuotaPrize>
    <DettolCountDown :options="countdownOptions"
                     :activityInfo="{
        ...activityInfo,
        endTime: endTime,
      }" />
    <DettolSwiper :options="swiperOptions"
                  :activityInfo="{
        ...activityInfo,
        prizeLists: formData.prizeSettingsForm.prizeList || [],
      }"
                  :userInfo="userInfo" />
  </div>
</template>
<script>
/**
 * 通用的开卡礼包组件模版
 */
// 默认的开卡礼包配置
import mainPic from '@/assets/main-quota-auto.png';
import ruleBtn from '@/assets/btn-rule.png';
import mainEnableBtn from '@/assets/btn-enable.png';
import mainDisableBtn from '@/assets/btn-disable.png';
import Moment from 'moment';

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
              prizePicture:
                'jfs/t1/164034/40/7285/2121/60321507E4b83552c/7587542256a93a15.png',
              prizeStatus: 0,
              prizeType: 4,
              sendNumUnit: 3,
            },
            {
              prizeIndex: 1,
              prizeName: '3积分',
              prizePicture:
                'jfs/t1/164034/40/7285/2121/60321507E4b83552c/7587542256a93a15.png',
              prizeStatus: 0,
              prizeType: 4,
              sendNumUnit: 3,
            },
            {
              prizeIndex: 1,
              prizeName: '4积分',
              prizePicture:
                'jfs/t1/164034/40/7285/2121/60321507E4b83552c/7587542256a93a15.png',
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
        enrollStartTime: Date.now() + 10 * 24 * 60 * 60 * 1000,
        status: 1,
        signUp: 2,
        grade: '1,2,3,4,5',
        prizeLists: [
          {
            prizeIndex: 1,
            prizeName: '',
            prizePicture:
              'jfs/t1/164034/40/7285/2121/60321507E4b83552c/7587542256a93a15.png',
            prizeStatus: null,
            prizeType: 4,
          },
        ],
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
      countdownOptions: {
        style: {
          backgroundImage: '',
          top: '11.6rem',
          left: '50%',
          width: '6.5rem',
          height: '0.6rem',
        },
        label: '距离活动开始',
        format: 'HH : mm : ss',
        timeKey: 'enrollStartTime',
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
      swiperOptions: {
        style: {
          marginTop: '2rem',
        },
      },
    };
  },
  computed: {
    endTime() {
      return (
        Moment(this.formData.prizeDistributionForm.awardStartTime).format('HH:mm:ss') ||
        Date.now() + 10 * 24 * 60 * 60 * 1000
      );
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
