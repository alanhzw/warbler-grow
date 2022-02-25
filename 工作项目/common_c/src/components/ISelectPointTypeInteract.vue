<template>
  <div class="ISelectPointTypeInteract">
    <!-- 互动获奖记录 选择类型弹出层 -->
    <van-popup v-model="typeShow" :close-on-click-overlay="false" position="bottom" @click-overlay='closePopup'>
      <van-radio-group v-model="radio" icon-size="16px" @change="changeVal">
        <van-radio v-for="(v, index) in contains" :key='index' :name="v.id" checked-color="#07c160">{{ v.value }}
        </van-radio>
      </van-radio-group>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'ISelectPointTypeInteract',
  props: ['typeShow', 'defaultType'],
  data() {
    return {
      // COUPON(1, "优惠券"),
      // BEAN(2, "京豆"),
      // SKU(3, "实物商品"),
      // INTEGRAL(4, "积分"),
      // PROMOTION(5, "促销令牌"),
      // ENVELOPES(6,"红包"),
      // CARD(7,"礼品卡"),
      // ECARD(8,"E卡"),
      // EPLUS(9,"京东EPLUS"),
      // QIY(10,"爱奇艺会员");
      contains: [
        { id: 0, arr: '', value: '全部' },
        { id: 1, arr: 1, value: '优惠券' },
        { id: 2, arr: 2, value: '京豆' },
        { id: 3, arr: 3, value: '实物商品' },
        // { id: 4, arr: 4, value: '积分' },
        { id: 5, arr: 5, value: '折扣商品' },
        { id: 6, arr: 6, value: '红包' },
        { id: 7, arr: 7, value: '礼品卡' },
        { id: 8, arr: 8, value: 'E卡' },
        { id: 9, arr: 9, value: '京东EPLUS' },
        { id: 10, arr: 10, value: '爱奇艺会员' },
      ],
      radio: '',
    };
  },
  mounted() {
    this.radio = this.defaultType;
  },
  methods: {
    closePopup() {
      this.$emit('closePop');
    },
    changeVal(val) {
      this.$emit('typeChange', val, this.contains.find((v) => v.id === val).arr, this.contains.find((v) => v.id === val).value);
    },
  },

};
</script>
<style scoped>
.ISelectPointTypeInteract {
  font-size: 0.26rem;
}

.ISelectPointTypeInteract >>> .van-radio {
  padding-left: 0.24rem;
  height: 0.8rem;
  border-bottom: 1px solid #cacaca;
}
</style>
