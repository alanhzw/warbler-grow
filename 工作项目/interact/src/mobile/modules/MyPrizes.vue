<template>
  <div v-if="!isBeforeStart" class="my-prizes" :style="options.boxStyle">
    <div class="" v-if="prizes.length > 0">
      <p class="prizes-header">恭喜您获得</p>
      <img class="my-prize" :src="`${CONST.IMAGE_PREFIX}${prizes[prizeIndex].prizePicture}`" />
      <div class="my-prize-name">{{ prizes[prizeIndex].prizeName }}</div>
      <img v-if="prizes.length > 1" class="arrow arrow-l" src="../../assets/arrow-l.png" @click="prizeIndex = (prizes.length + prizeIndex - 1) % prizes.length" />
      <img v-if="prizes.length > 1" class="arrow arrow-r" src="../../assets/arrow-r.png" @click="prizeIndex = (prizes.length + prizeIndex + 1) % prizes.length" />
    </div>
    <div v-else class="no-prizes-tip">
      <p class="prizes-header" v-if="activityInfo.status === 3">您还未获得任何奖品</p>
      <p class="prizes-header" v-if="activityInfo.status === 4">抱歉，您与奖品插肩而过</p>
      <img class="blank-box" :src="options.blankBox" />
    </div>
  </div>
</template>
<script>
import CONST from '@/utils/constant';

export default {
  name: 'MyPrizes',
  props: {
    options: {
      default: () => ({}),
    },
    userInfo: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
    settings: {
      default: () => ({}),
    },
  },
  computed: {
    isBeforeStart() {
      return new Date() < new Date(this.activityInfo.enrollStartTime);
    },
    prizes() {
      return Array.isArray(this.activityInfo.getUserAwardsRespDTOS) ? this.activityInfo.getUserAwardsRespDTOS : [];
    },
  },
  data() {
    return {
      CONST,
      prizeIndex: 0,
    };
  },
};
</script>
<style lang="scss">
.my-prizes {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  .arrow {
    position: absolute;
    top: 2rem;
    height: 1rem;
    &.arrow-l {
      left: 0;
    }
    &.arrow-r {
      right: 0;
    }
  }
  .prizes-header {
    color: #ffffff;
    font-size: 0.3rem;
  }
  .no-prizes-tip {
    .blank-box {
      width: 2.77rem;
      height: 1.83rem;
      margin-top: 0.4rem;
    }
  }
  .my-prize {
    height: 1.83rem;
    margin-top: 0.4rem;
  }
  .my-prize-name {
    color: #ffd396;
    font-size: 0.3rem;
  }
}
</style>
