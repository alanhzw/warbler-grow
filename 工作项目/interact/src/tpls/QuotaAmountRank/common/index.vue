<template>
  <div class="quota-amount-rank">
    <div class="is-can-be-click">
      <main-pic :options="{
      ...mainPicOptions,
      pic: options.mainPic ? `${CONST.IMAGE_PREFIX}${options.mainPic}`: mainPicOptions.pic
    }"></main-pic>
      <rule :options="ruleOptions"></rule>
      <my-draw-prizes :options='myDrawPrizesOptions'></my-draw-prizes>
      <time-range :options="timeRangeOptions" :activityInfo="{
      ...activityInfo,
      awardStartTime: formData.prizeDistributionForm.awardStartTime,
      awardEndTime: formData.prizeDistributionForm.awardEndTime,
    }" />
      <amount-rank-info :activityInfo="activityInfo" />
      <my-prizes-manual :options="myPrizeManualOptions" :activityInfo="{
      ...activityInfo,
      getUserAwardsRespDTOS: formData.prizeSettingsForm.prizeList.map(p => ({...p, prizeStatus: 1})),
    }"></my-prizes-manual>
      <enroll :options="enrollOptions" :activityInfo="activityInfo" :userInfo="userInfo" />
      <winners :options="winnersOptions" :previewMode="true"/>
    </div>

  </div>
</template>
<script>
/**
 */
// 默认的开卡礼包配置
import mainPic from '@/assets/main-quota-rank.png';
import ruleBtn from '@/assets/btn-rule.png';
import myPrizesBg from '@/assets/bg-my-prizes.png';
import mainEnableBtn from '@/assets/btn-enable.png';
import mainDisableBtn from '@/assets/btn-disable.png';
import blankBox from '@/assets/blank-box.png';
import myPrizesBtn from '@/assets/btn-my-prizes.png';

import CONST from '@/utils/constant';
import MyDrawPrizes from '../../../mobile/modules/MyDrawPrizes.vue';
import winnersBg from '@/assets/bg-winners.png';

export default {
  name: 'LzTplQuotaAmountRank',
  components: { MyDrawPrizes },
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
          prizeList: [],
        },
      }),
    },
  },
  data() {
    return {
      CONST,
      activityInfo: {
        enrollEndTime: Date.now() + 10 * 24 * 60 * 60 * 1000,
        activityType: 506,
        status: 3,
        isAccord: 1,
        grade: '1,2,3,4,5',
        orderPrice: '100',
        ranking: 10,
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
      myPrizeManualOptions: {
        blankBox,
        boxStyle: {
          backgroundImage: `url(${myPrizesBg})`,
          width: '7.5rem',
          height: '6rem',
        },
      },
      timeRangeOptions: {
        label: '领奖时间',
        startKey: 'awardStartTime',
        endKey: 'awardEndTime',
      },
      enrollOptions: {
        enableBtnStyle: {
          marginTop: '0.4rem',
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
          marginTop: '0.4rem',
          backgroundImage: `url(${mainDisableBtn}`,
          width: '7.08rem',
          height: '1.29rem',
          fontSize: '0.36rem',
          lineHeight: '1rem',
          color: '#999999',
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
  },
};
</script>

<style lang="scss">
.quota-amount-rank {
  position: relative;
  width: 100%;
  min-height: 100%;
  background-image: linear-gradient(bottom, #d31c2e, #a80011);
  text-align: center;
  overflow: auto;

  .is-can-be-click {
    pointer-events: none;
    cursor: not-allowed;
    cursor: no-drop;
  }
}
</style>
