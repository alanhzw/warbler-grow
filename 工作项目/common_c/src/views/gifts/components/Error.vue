<template>
  <!-- 兜底页 -->
  <div class="ErrorPage">
    <img class="img1" src="../assets/hb.png" />
    <p class="title">活动太火爆了，请稍后重试 ！</p>
    <p class="subtitle">~下次记得早点来哦~</p>
    <img class="img2" src="../assets/goShop1.png" @click="goShop" />
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
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
.ErrorPage {
    width: 100%;
    position: absolute;
    box-sizing: border-box;
    bottom: 0;
    top: 0;
}
.img1 {
    width: 3.6rem;
    height: 3.2rem;
    position: absolute;
    top: 3.2rem;
    left: 50%;
    margin-left: -1.6rem;
}
.img2 {
    width: 4rem;
    height: 0.86rem;
    position: absolute;
    top: 8.5rem;
    left: 50%;
    margin-left: -2rem;
}
.title {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 6.8rem;
    font-size: 0.34rem;
    font-weight: 600;
    color: #000;
}
.subtitle {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 7.4rem;
    color: #8c8c8c;
    font-size: 0.24rem;
}
</style>
