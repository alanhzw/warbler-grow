<template>
  <!-- 兑换规则 -->
  <div class="ISKUDetails">
    <p class="title">商品详情</p>
    <div v-if='SKUDetails' class="contains" v-html="SKUDetails"></div>
    <div v-else class="contains">暂无详情</div>
  </div>
</template>

<script>
export default {
  name: 'ISKUDetails',
  props: {
    SKUDetails: {
      required: true,
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
.contains{
  text-align: left;
  word-wrap: break-word;
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
