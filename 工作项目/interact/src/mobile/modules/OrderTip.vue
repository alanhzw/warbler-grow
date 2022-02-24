<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-06-16 10:00:55
 * @LastEditTime: 2021-08-20 13:53:53
 * @FilePath: \interact\src\mobile\modules\OrderTip.vue
-->
<template>
  <div class="order-tip">
    当前已收货订单金额： ¥{{activityInfo.orderPrice || 0}}
  </div>
</template>
<script>
export default {
  name: 'OrderTip',
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
.order-tip {
  color: #ffffff;
  text-align: center;
}
</style>
