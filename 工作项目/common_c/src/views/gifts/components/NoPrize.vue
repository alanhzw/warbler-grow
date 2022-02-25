<template>
  <!-- 权益已领完 -->
  <div class="NoPrize">
    <img class="img1" src="../assets/nocondition.png" />
    <p class="title">权益已领光!</p>
    <p class="subtitle">{{subtitle}}</p>
    <img class="img2" src="../assets/goShop.png" @click="goShop" />
  </div>
</template>

<script>
export default {
  name: 'NoPrize',
  props: ['subtitle'],
  data() {
    return {};
  },
  methods: {
    goShop() {
      window.location.href = `https://shop.m.jd.com/?shopId=${sessionStorage.getItem('LZ_CRM_CUSTOMER_ShopId')}`;
    },
  },
};
</script>

<style scoped>
.NoPrize {
    width: 100%;
    position: absolute;
    box-sizing: border-box;
    bottom: 0;
    top: 0;
}
.img1 {
    width: 2.6rem;
    height: 2.6rem;
    position: absolute;
    top: 2.5rem;
    left: 50%;
    margin-left: -1.3rem;
}
.img2 {
    width: 3rem;
    height: 0.86rem;
    position: absolute;
    top: 8.1rem;
    left: 50%;
    margin-left: -1.5rem;
}
.title {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 5.6rem;
    font-size: 0.32rem;
    font-weight: 600;
    color: #000;
}
.subtitle {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 6.2rem;
    color: #8c8c8c;
    font-size: 0.24rem;
}
</style>
