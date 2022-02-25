<template>
  <div class="code" :style="{backgroundImage: pageSetting2.backgroundImage, backgroundColor: pageSetting2.backgroundColor}">
    <p class="code-titel" :style="{color: pageSetting2.titleColor}">礼券使用说明</p>
    <div class="code-rule" :style="{color: pageSetting2.textColor}">{{ couponDesc }}</div>
    <div class="code-img" ref="codeWidth">
      <QrcodeVue :value="codeInfor" :size="size" level="H"></QrcodeVue>
    </div>

    <div class="back" @click="back" :style="{backgroundColor: pageSetting2.buttonBackgroundColor, color: pageSetting2.buttonColor, border: '0.02rem solid '+ pageSetting2.buttonColor,}">返回</div>
  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'ICouponQRcode',
  props: {
    codeInfor: {
      default: '',
    },
    couponDesc: {
      default: '',
    },
    pageSetting2: {
      default: {},
    },
  },
  data() {
    return {
      size: 0,
    };
  },
  components: {
    QrcodeVue,
    // size() {
    //   console.log(this.$refs.barparent.clientWidth);
    //   return this.$refs.barparent.clientWidth;
    // },
  },
  created() {
    const bodyWidth = document.body.offsetWidth < 750 ? document.body.offsetWidth : 750;
    this.size = bodyWidth * 0.53;
  },
  mounted() {

  },
  methods: {
    back() {
      this.$emit('codeBack');
    },
  },
};
</script>

<style lang="scss">
.code {
  background-color: #fff;
  padding: 0.96rem 0.32rem 0;
  color: #000;
  height: 100%;
  overflow-y: scroll;

  .code-titel {
    font-size: 0.32rem;
    margin-bottom: 0.32rem;
    text-align: center;
  }

  .code-rule {
    text-align: center;
    font-size: 0.28rem;
    line-height: 0.4rem;
  }

  .code-img {
    width: 4rem;
    height: 4rem;
    margin: 0.48rem auto 1.4rem;
  }

  .back {
    line-height: 0.88rem;
    border-radius: 0.44rem;
    border: 0.02rem solid #000;
    font-size: 0.28rem;
    text-align: center;
    margin-bottom: 2rem;
  }
}
</style>
