<template>
  <!-- 礼品卡详情 -->
  <div class="CardRecord allpage">
    <div class="contain">
      <div class="part_1" :style="[{backgroundImage: `url(${prizePicture})`}]">
        <p class="title">{{prizeName}}</p>
          <div class="subtitle">卡号</div>
          <p  style="margin-left: -0.2rem;margin-top: 0.2rem;">{{cardNumber}}</p>
          <div v-if="cardPassword" class="subtitle">验证码</div>
          <p v-if="cardPassword">{{cardPassword}}</p>
      </div>
      <div class="part_2">
        <p class="part_2_p1">礼品卡说明</p>
        <div class="part_2_p2">{{cardDesc}}</div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'CardRecord',
  data() {
    return {
      prizeName: '',
      cardDesc: '',
      cardNumber: '',
      cardPassword: '',
      prizePicture: '',
    };
  },
  created() {
    this.prizeName = this.$route.query.prizeName;
    this.cardDesc = this.$route.query.cardDesc;
    this.cardNumber = this.$route.query.cardNumber;
    this.cardPassword = this.$route.query.cardPassword;
    this.prizePicture = this.$route.query.prizePicture;
  },
  methods: {

  },
};
</script>

<style scoped>
.CardRecord {
  background: #fff;
}
.part_1 {
  box-sizing: border-box;
  width: 7.1rem;
  height: 3.6rem;
  margin-left: 0.2rem;
  border-radius: 0.2rem;
  border: 1px solid #d6d6d6;
  margin-top: 0.2rem;
  padding: 0.2rem;
  text-align: left;
  background-position: 100%;
  background-size: contain;
}
.title {
  font-size: 0.4rem;
  color: #333333;
}
.subtitle {
  margin-top: 3.2rem;
  color: #666666;
  margin-left: -0.2rem;
}
.part_2 {
  margin-top: 0.2rem;
  text-align: left;
  padding: 0.2rem;
}
.part_2_p1 {
  margin-top: 1.2rem;
}
.part_2_p2 {
  margin-top: 0.2rem;
}
</style>
