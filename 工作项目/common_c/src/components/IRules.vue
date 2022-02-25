<template>
  <!-- 兑换规则 -->
  <div class="IRules">
    <p v-if="isMemberCoupon" class="title">领取规则</p>
    <p v-else class="title">兑换规则</p>
    <p v-for="x in rulesArray" :key='x' class="item" :style="[{color: color}]">
      {{ x }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'IRules',
  props: {
    rules: {
      required: true,
    },
    isMemberCoupon: {
      default: false,
    },
    color: {
      required: true,
      default: '#666666',
    },
  },
  computed: {
    rulesArray() {
      if (this.rules) {
        return this.rules.split('\n').map((v) => v.trim());
      }
      return ['无'];
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.IRules {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.3rem 0.3rem 0.8rem 0.3rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 0.3rem;
  color: #303030;
  text-align: left;
  margin-bottom: 0.24rem;
}

.item {
  color: #666666;
  font-size: 0.24rem;
  text-align: left;
  margin-bottom: 0.1rem;
}
</style>
