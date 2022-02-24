<template>
  <div class="page-finished">
    <img
      src="//lzdzcdn.dianpusoft.cn/resources/images/activity_end.jpg"
      alt=""
    />
    <h3>您来晚了,活动已经结束了</h3>
    <p>下次记得早点来哦~</p>
    <a href="javascript:;" v-if="shopId" @click="onGoShopClick">进店逛逛</a>
  </div>
</template>
<script setup lang="ts">
import { inject } from 'vue';
import { gotoShopPage } from '@/utils/platforms';

const shopId = inject('shopId') as string;

console.log('shopId', shopId);

const onGoShopClick = () => {
  gotoShopPage(shopId);
};

</script>
<style lang="scss" scoped>
.page-finished {
  max-width: 750px;
  margin: 3rem auto 0px;
  font-family: "Helvetica Neue", Helvetica, sans-serif !important;
  text-shadow: none !important;
  text-align: center;

  img {
    width: 2.28rem;
    height: 2.28rem;
  }
  h3 {
    margin-top: 0.45rem;
    font-size: 0.36rem;
    font-weight: normal;
  }
  p {
    margin-top: 0.2rem;
    font-size: 0.24rem;
    color: rgb(102, 102, 102);
  }
  a {
    display: block;
    margin: 0.8rem auto;
    width: 4.4rem;
    height: 0.9rem;
    line-height: 0.9rem;
    color: rgb(255, 255, 255);
    background: rgb(0, 136, 223);
    border-radius: 0.55rem;
    text-decoration: none;
    font-weight: 300;
  }
}
</style>
