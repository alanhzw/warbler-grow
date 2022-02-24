<template>
  <div class="coupon-thumb" :style="{backgroundImage: `url(${couponBgs[info.rangeType]})`}">
    <div class="coupon-info">
      <div class="coupon-price">
        <span class="coupon-unit">¥</span>
        <span class="coupon-amount">{{info.couponDiscount}}</span>
      </div>
      <div class="coupon-detail">
        <div class="coupon-type">{{['', '店铺券', '商品券'][info.rangeType]}}</div>
        <p v-if="info.couponQuota > 0" class="coupon-limit">满{{info.couponQuota}}元可用</p>
        <p v-else class="coupon-limit">无使用限制</p>
      </div>
    </div>

    <div class="type">{{['京券', '东券'][info.couponType]}}</div>
  </div>
</template>

<script>
export default {
  name: 'CouponPreview',
  props: {
    info: {
      default: () => ({}),
    },
  },
  data() {
    return {
      couponBgs: [
        require('@/assets/coupon-blue-bg.png'),
        require('@/assets/coupon-pink-bg.png'),
        require('@/assets/coupon-yellow-bg.png'),
      ],
    };
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.coupon-thumb {
  position: relative;
  width: 146px;
  height: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  .coupon-info {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .coupon-price {
    text-align: center;
    width: 60px;
    color: $WHITE;
  }

  .coupon-detail {
    margin-left: 10px;
    flex: 1;
  }

  .coupon-type {
    line-height: 20px;
    margin: 0;
    text-align: left;
    font-size: 12px;
    color: $FONT_COMMON_GRAY;
  }

  .coupon-limit {
    margin: 0;
    text-align: left;
    font-size: 10px;
    color: $FONT_DISABLE_GRAY;
  }

  .coupon-unit {
    font-size: 12px;
  }

  .coupon-amount {
    font-size: 18px;
  }

  .type {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 28px;
    height: 14px;
    line-height: 14px;
    text-align: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    color: $FONT_COMMON_GRAY;
    font-size: 9px;
    background-image: url('../../../assets/coupon-type-bg.png');
  }
}
</style>
