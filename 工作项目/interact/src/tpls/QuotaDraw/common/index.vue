<template>
  <div class="quota-draw-common">
    <main-pic :options="{
      ...mainPicOptions,
      pic: options.mainPic ? `${CONST.IMAGE_PREFIX}${options.mainPic}`: mainPicOptions.pic
    }"></main-pic>
    <rule :options="ruleOptions"></rule>
    <my-draw-prizes :options='myDrawPrizesOptions'></my-draw-prizes>
    <countdown :options="countdownOptions" :activityInfo="{
      ...activityInfo,
      activityEndTime: activityEndTime,
    }"/>
    <draw :options="drawOptions" :activityInfo="{
      ...activityInfo,
      consumptionAmount: formData.drawForm.drawTimesInfoList[0].quota,
      giveTimes: formData.drawForm.drawTimesInfoList[0].times,
      maxDraw: formData.drawForm.maxDraw,
      prizeLists: formData.drawPrizeForm.drawPrizeInfoList.map((p, idx) => ({
        prizePicture: p.prizePicture,
        position: idx + 1,
        prizeName: p.prizeName,
        prizeType: p.prizeType,
        sendNumUnit: p.sendNumUnit,
        sendPeople: p.sendPeople,
        isEmpty: p.isEmpty,
      })).filter(p => !p.isEmpty),
    }"/>
    <winners :options="winnersOptions" :previewMode="true"/>
  </div>
</template>
<script>
/**
 * 通用的开卡礼包组件模版
 */
// 默认的开卡礼包配置
import mainPic from '@/assets/main-quota-draw.png';
import ruleBtn from '@/assets/btn-rule.png';
import myPrizesBtn from '@/assets/btn-my-prizes.png';
import cdBg from '@/assets/bg-countdown.png';

import pointerPic from '@/assets/wheel-pointer.png';

import CONST from '@/utils/constant';
import MyDrawPrizes from '@/mobile/modules/MyDrawPrizes';
import Draw from '@/mobile/modules/Draw';
import Moment from 'moment';
import winnersBg from '@/assets/bg-winners.png';

export default {
  components: { MyDrawPrizes, Draw },
  name: 'CommonQuotaDrawTpl',
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
        status: 3,
        signUp: 2,
        giveTimes: 2,
        remainingTimes: 1,
        consumptionAmount: 99,
        grade: '1,2,3,4,5',
        prizeLists: this.formData.prizeLists,
      },
      userInfo: {
        grade: '1',
      },
      mainPicOptions: {
        pic: mainPic,
        style: {
          height: '7.1rem',
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
          backgroundImage: `url(${cdBg}`,
          top: '6rem',
          left: '50%',
          width: '4.5rem',
          height: '0.6rem',
        },
        label: '距离结束时间',
        format: 'DD天 HH小时 mm分 ss秒',
        timeKey: 'activityEndTime',
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
          top: '0rem',
        },
        itemStyle: {
          itemColor: ['#ffffff', '#ec1341'],
          width: '3.1rem',
          height: '3.1rem',
        },
        wheelContentStyle: {
          top: '0.4rem',
          width: '6.2rem',
          height: '6.2rem',
          backgroundColor: '#ffffff',
        },
        backgroundOutsideStyle: {
          backgroundColor: '#ffe4a1',
          top: '0rem',
          width: '7rem',
          height: '7rem',
        },
        backgroundInsideStyle: {
          backgroundColor: '#c41324',
          top: '0.2rem',
          width: '6.6rem',
          height: '6.6rem',
        },
        prizeNameStyle: {
          fontSize: '0.24rem',
        },
        prizePictureStyle: {
          width: '1rem',
        },
        pointerStyle: {
          top: '2.2rem',
          width: '1.4rem',
        },
        pointerPic,
        circleStyle: {},
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
    activityEndTime() {
      if (this.$route.params.type == 505 || (this.$route.query.key && this.$route.query.key.startsWith('505'))) {
        if (this.formData && this.formData.baseInfoForm) {
          return Moment(this.formData.baseInfoForm.endTime || this.formData.baseInfoForm.activityTime[1]).format('YYYY/MM/DD HH:mm:ss');
        }
        return Moment(Date.now() + 24 * 60 * 60 * 1000).format('YYYY/MM/DD HH:mm:ss');
      }
      if (this.$route.params.type == 502 || (this.$route.query.key && this.$route.query.key.startsWith('502'))) {
        if (this.formData && this.formData.drawForm) {
          return Moment(this.formData.drawForm.drawEndTime).format('YYYY/MM/DD HH:mm:ss');
        }
        return Moment(Date.now() + 24 * 60 * 60 * 1000).format('YYYY/MM/DD HH:mm:ss');
      }
    },


  },
};
</script>

<style lang="scss">
.quota-draw-common {
  position: relative;
  width: 100%;
  min-height: 100%;
  overflow: auto;
  text-align: center;
  background-image: linear-gradient(bottom, #d31c2e, #a80011);
}
</style>
