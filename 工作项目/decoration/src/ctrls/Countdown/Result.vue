<template>
  <div class="ctrl-countdown-result" :class="{mb15: data.mb15}" @click="go2Link($event)" v-lz-click='100' v-lz-floor="floorInfo">
    <p class="count-down">
      <span>{{labels[state-1]}}</span>
      <van-count-down v-if="state < 3" :time="time" format="DD 天 HH 时 mm 分 ss 秒" @finish="finish" />
    </p>
    <img class="bg" :src="`${CONST.IMAGE_PREFIX}${data.pic}`" alt="">
  </div>
</template>

<script>
import Moment from 'moment';
import CONST from '@/utils/constant';
import LzMsg from '@/mobile/utils/LzMsg';

export default {
  name: 'CtrlCountdownResult',
  props: {
    data: {
      default: () => ({}),
    },
    floorInfo: {
      default: () => ({}),
    },

  },
  data() {
    let state = 1;
    let time = 0;
    const range = this.data.range;
    if (range[0]) {
      // if (new Date(range[0]) - new Date() > 0) {
      //   state = 1;
      //   time = new Date(range[0]) - new Date();
      // } else if (new Date(range[1]) - new Date() > 0) {
      //   state = 2;
      //   time = new Date(range[1]) - new Date();
      // } else {
      //   state = 3;
      // }
      const now = Date.now();
      if (Moment(range[0]).valueOf() - now > 0) {
        state = 1;
        time = Moment(range[0]).valueOf() - now;
      } else if (Moment(range[1]).valueOf() - now > 0) {
        state = 2;
        time = Moment(range[1]).valueOf() - now;
      } else {
        state = 3;
      }
    }
    return {
      CONST,
      time,
      state, // 1 - 未开始， 2 一 已开始， 3 - 已结束,
      labels: ['距离活动开始还有：', '距离活动结束还有：', '活动已结束'],
    };
  },
  created() {
    if (Array.isArray(this.data.range) && this.data.range.length > 0) {
      const range = this.data.range;
      const now = Date.now();
      if (range[0]) {
        if (Moment(range[0]).valueOf() - now > 0) {
          this.time = Moment(range[0]).valueOf() - now;
          this.label = '距离活动开始还有：';
        } else if (Moment(range[1]).valueOf() - now > 0) {
          this.time = Moment(range[1]).valueOf() - now;
          this.label = '距离活动结束还有：';
        } else {
          this.label = '距离活动已结束';
          this.time = 0;
        }
      }
    }
  },
  methods: {
    finish() {
      const now = Date.now();
      this.state = this.state + 1;
      if (this.state == 1) {
        this.time = Moment(this.data.range[0]).valueOf() - now;
      } else if (this.state == 2) {
        this.time = Moment(this.data.range[1]).valueOf() - now;
      } else {
        this.time = 2;
      }
    },
    go2Link(evt) {
      const now = Date.now();
      if (now < Moment(this.data.range[0]).valueOf()) {
        LzMsg.fail('活动未开始');
        return;
      }
      if (now > Moment(this.data.range[1]).valueOf()) {
        LzMsg.fail('活动已结束');
        return;
      }
      if (typeof this.data.link === 'string' && this.data.link !== '') {
        window.location.href = this.data.link;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';
@import '~lz-crm/style/variables';

.ctrl-countdown-result {
  position: relative;

  .count-down {
    font-size: 0.28rem;
    display: flex;
    padding: 0 0.3rem;
    margin-bottom: 0.1rem;
    color: $FONT_COMMON_GRAY;
  }

  .bg {
    width: 100%;
    vertical-align: top;
  }
}
</style>
