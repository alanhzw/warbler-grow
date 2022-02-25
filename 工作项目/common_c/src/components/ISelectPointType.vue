<template>
  <div class="ISelectPointType">
    <!-- 积分兑换记录 选择类型弹出层 -->
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
  name: 'ISelectPointType',
  props: ['typeShow', 'defaultType'],
  data() {
    return {
      contains: [
        { id: 0, arr: [301, 302, 303, 311, 312, 313], value: '全部' },
        { id: 1, arr: [301], value: '积分兑换实物商品' },
        { id: 2, arr: [302], value: '积分兑换优惠券' },
        { id: 3, arr: [303], value: '积分兑换京豆' },
        { id: 4, arr: [311, 312, 313], value: '积分秒杀' },

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
.ISelectPointType {
  font-size: 0.26rem;
}

.ISelectPointType >>> .van-radio {
  padding-left: 0.24rem;
  height: 0.8rem;
  border-bottom: 1px solid #cacaca;
}
</style>
