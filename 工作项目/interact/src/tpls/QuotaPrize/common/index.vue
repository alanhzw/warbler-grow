<template>
  <div class="quota-prize-common">
    <main-pic :options="{
      ...mainPicOptions,
      pic: options.mainPic ? `${CONST.IMAGE_PREFIX}${options.mainPic}`: mainPicOptions.pic
    }"></main-pic>
    <rule :options="ruleOptions"></rule>
    <countdown :options="countdownOptions" :activityInfo="activityInfo"/>
    <enroll :options="enrollOptions" :activityInfo="activityInfo" :userInfo="userInfo"/>
  </div>
</template>
<script>
/**
 * 通用的开卡礼包组件模版
 */
// 默认的开卡礼包配置
import mainPic from '@/assets/main-quota-gift.png';
import ruleBtn from '@/assets/btn-rule.png';
import cdBg from '@/assets/bg-countdown.png';
import mainEnableBtn from '@/assets/btn-enable.png';
import mainDisableBtn from '@/assets/btn-disable.png';

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
      type: Object,
      // 默认是个空对象
      default: () => ({}),
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
          backgroundImage: `url(${cdBg}`,
          top: '6rem',
          left: '50%',
          width: '4.5rem',
          height: '0.6rem',
        },
        label: '距离报名结束',
        format: 'DD天 HH小时 mm分 ss秒',
        timeKey: 'enrollEndTime',
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
    };
  },
  computed: {
  },
};
</script>

<style lang="scss">
.quota-prize-common {
  position: relative;
  width: 100%;
  min-height: 100%;
  background-image: linear-gradient(bottom, #d31c2e, #a80011);
}
</style>
