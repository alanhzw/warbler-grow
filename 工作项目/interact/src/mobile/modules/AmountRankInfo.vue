<template>
  <div v-if="activityInfo.isAccord == 1" class="amount-rank-info">
    <p class="amount">活动订单金额： {{activityInfo.orderPrice > 0 ? parseFloat(activityInfo.orderPrice).toFixed(2) : 0}} 元</p>
    <p class="rank">
      <span>活动排名：</span>
      <span v-if="activityInfo.ranking > 0" class="value">{{activityInfo.ranking}}</span>
      <span v-if="activityInfo.ranking == 0" class="value">--</span>
      <span v-if="activityInfo.ranking < 0" class="value">{{activityInfo.outRanking}}+</span>
      <span>名</span>
    </p>
  </div>
</template>
<script>

export default {
  name: 'AmountRankInfo',
  components: {
  },
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
  data() {
    return {};
  },
  computed: {
  },
  methods: {
  },
};
</script>
<style lang="scss">
.amount-rank-info {
  .amount {
    text-decoration: underline;
    font-size: 0.2rem;
    color: #ffffff;
    opacity: 0.68;
  }
  .rank {
    font-size: 0.36rem;
    line-height: 0.2rem;
    color: #ffb274;
    .value {
      color: #ffffff;
    }
  }
}
</style>
