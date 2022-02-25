<template>
  <!-- 按钮 -->
  <!--  :class="{'feed-bottom-view-IPX': isIPhoneX && isIPhoneXSMax && isIPhoneXR}" -->
  <div class="IButton iosButton">

    <van-button v-if='bg !== -1'
                v-lz-click.isMain="`${elementId}`"
                :color="$store.state.styleOptions ? $store.state.styleOptions.buttonBackgroundColor : btnsState[bg][0]"
                block
                @click="clickBtn">
      <span :style="[{color: $store.state.styleOptions ? $store.state.styleOptions.buttonFrontColor : btnsState[bg][1]}]">{{ btnsState[bg][2] }}</span>
    </van-button>
    <van-button v-else
                block
                color="#66b5ff">
      <span style="[{color: #99ceff}]">系统异常</span>
    </van-button>
  </div>
</template>
<script>
import { PointsService } from '@/http';
import Qs from 'qs';

export default {
  name: 'IButton',
  props: ['bg', 'elementId', 'activityType'],
  data() {
    return {
      isIPX: false,
      isIPhoneX: false,
      isIPhoneXSMax: false,
      isIPhoneXR: false,
      btnsState: [
        ['', '', ''], // 0
        ['#66b5ff', '#99ceff', '活动未开始'], // 1 √
        ['#66b5ff', '#99ceff', '活动已结束'], // 2 √
        ['#66b5ff', '#99ceff', '权益已兑完'], // 3 √
        ['#66b5ff', '#99ceff', '已兑换'], // 4 √
        ['#f2f9ff', '#9dd0ff', '积分不足'], // 5 √
        ['#f2f9ff', '#9dd0ff', '不符合活动条件'], // 6 √
        ['#0083ff', '#ffffff', '立即兑换'], // 7 √
        ['#f2f9ff', '#9dd0ff', '会员信息不存在'], // 8
        ['#f2f9ff', '#9dd0ff', '活动不存在'], // 9
        ['#f2f9ff', '#9dd0ff', '奖品不存在'], // 10
        ['#f2f9ff', '#9dd0ff', '等级未达到要求'], // 11 √
        ['#0083ff', '#ffffff', '去购买'], // 12 √
        ['#f2f9ff', '#9dd0ff', '已兑完'], // 13
        ['#f2f9ff', '#9dd0ff', '商品信息不存在'], // 14
        ['#f2f9ff', '#9dd0ff', '活动已终止'], // 15
        ['#0083ff', '#ffffff', '立即领取'], // 16
        ['#f2f9ff', '#9dd0ff', '不符合活动条件'], // 17
        ['#66b5ff', '#99ceff', '权益已领完'], // 18
        ['#f2f9ff', '#9dd0ff', '已领取'], // 19
        ['#f2f9ff', '#9dd0ff', '权益已发放完毕'], // 20
        ['#f2f9ff', '#9dd0ff', '不符合参与条件'], // 21
        ['#0083ff', '#ffffff', '立即参与'], // 22
        ['#f2f9ff', '#9dd0ff', '今日权益已兑完'], // 23
        ['#f2f9ff', '#9dd0ff', '今日已兑完'], // 24
        ['', '', ''], // 25
        ['#f2f9ff', '#9dd0ff', '兑换失败'], // 26
        ['#f2f9ff', '#9dd0ff', '本月已兑完'], // 27
      ],
    };
  },
  mounted() {
  },
  methods: {
    clickBtn() {
      // 立即兑换状态
      if (this.bg === 7 || this.bg === 16 || this.activityType === 304
        || this.activityType === 341 || this.activityType === 322) {
        this.$emit('exchange');
      } else if (this.bg === 12) {
        this.$emit('goBuy');
      }
    },
  },

};
</script>
<style scoped>
.IButton {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.IButton >>> .van-button {
  height: 1rem;
  border-radius: 0;
}

.IButton >>> .van-button .van-button__text span {
  display: inline-block;
  line-height: 0.6rem;
}

.feed-bottom-view-IPX {
  padding-bottom: 34px;
}
</style>
