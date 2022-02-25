<template>
  <!-- 京豆与优惠券头 -->
  <div class="IBanner">
    <div v-if="banners.type == 1 || banners.type == 4" class="banner_ticket">
      <div class="banner_top">
        <div class="banner_left">
          <div class="money_icon">￥</div>
          <div class="money_number">{{ banners.couponDiscount }}</div>
          <div class="ticket_memo">
            <p v-if="banners.rangeType" class="memo_1">{{ ['', '店铺优惠券', '商品优惠券'][banners.rangeType] }}</p>
            <p v-else class="memo_1">店铺优惠券</p>
            <p v-if="banners.couponType !== 0 && banners.couponQuota !== null" class="memo_2">
              满{{ banners.couponQuota }}元使用</p>
            <p v-else class="memo_2">无限制使用</p>
          </div>
        </div>
        <div class="banner_right">{{ ['京券', '东券'][banners.couponType] }}</div>
      </div>
      <div class="banner_bottom">
        <span v-if='banners.expireType == 1'>有效期：领取之日 {{ banners.couponValidateDay }} 天内</span>
        <span
          v-else>有效期：{{ (banners.couponBeginTime ? (banners.couponBeginTime).slice(0, 16) : '') + '至' + (banners.couponEndTime ? (banners.couponEndTime).slice(0, 16) : '') }}</span>
        <span v-if="banners.rangeType == 1">全店使用</span>
        <span v-else>部分商品使用</span>
      </div>
    </div>
    <div v-else class="banner_bean">
      <span class="bean_number">{{ banners.sendNumPerson }}</span>
      <span class="bean_bit">京豆</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IBanner',
  props: ['banners'],
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
.IBanner {
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  padding: 0.24rem 0.24rem 0.34rem 0.24rem;
}

.IBanner > div {
  width: 100%;
  height: 100%;
}

.banner_ticket {
  background: url('../assets/images/ticket_bg.png') no-repeat;
  background-size: 100% 100%;
}

.banner_top {
  height: 1.6rem;
  padding: 0 0.4rem;
  display: flex;
  justify-content: space-between;
}

.banner_left {
  height: 100%;
  display: flex;
  justify-self: start;
  color: #ffffff;
}

.money_icon {
  font-size: 0.2rem;
  line-height: 1.6rem;
}

.money_number {
  line-height: 1.6rem;
  font-size: 0.9rem;
}

.ticket_memo {
  font-size: 0.24rem;
  margin-left: 0.2rem;
  margin-top: 0.4rem;
}

.ticket_memo .memo_1 {
  font-size: 0.3rem;
  text-align: left;
}

.ticket_memo .memo_2 {
  text-align: left;
}

.banner_right {
  margin-top: 0.7rem;
  height: 0.4rem;
  width: 0.8rem;
  background: #ffffff;
  color: #ff3333;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.42rem;
  border-radius: 0.05rem;
}

.banner_bottom {
  display: flex;
  justify-content: space-between;
  color: #a7a7a7;
  padding: 0 0.2rem;
  font-size: 0.22rem;
  height: 1rem;
  margin-top: 0.2rem;
}

.banner_bean {
  background: url('../assets/images/bean_bg.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
}

.bean_number {
  display: inline-block;
  height: 2.52rem;
  color: #ffffff;
  line-height: 2.52rem;
  font-size: 1rem;
  margin-left: 0.8rem;
}

.bean_bit {
  display: inline-block;
  font-size: 0.28rem;
  height: 2.52rem;
  color: #ffffff;
  line-height: 2.52rem;
  margin-left: 0.1rem;
}

</style>
