<template>
  <div class="index">
    <img
      src="//img10.360buyimg.com/imgzone/jfs/t1/203154/4/11098/448015/61a6e672Eb4ed3962/f004dd8512fbbf5a.jpg"
      class="index-img"
    />
    <div class="sku-list">
      <div v-for="item in skuList" :key="item" @click="gotoSkuPage(item)"></div>
    </div>
    <a class="button new-comer" href="https://lzkjdz-isv.isvjcloud.com/nestle/newPeople/activity"></a>
    <a
      class="button points-mall"
      href="https://lzkj-isv.isvjcloud.com/nestle/pointRedeem/pointProductSetPage"
    ></a>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { BaseInfo } from '@/types/BaseInfo';
import { gotoSkuPage } from '@/utils/platforms';

const skuList = [1194389, 255751, 5285870];

// 数据
const baseInfo: BaseInfo = inject('baseInfo') as BaseInfo;
</script>

<style lang="scss">
.index {
  min-height: 100vh;
  // background: url('//img10.360buyimg.com/imgzone/jfs/t1/203154/4/11098/448015/61a6e672Eb4ed3962/f004dd8512fbbf5a.jpg') no-repeat;
  // background-size: 100%;
  background-color: #b9a2da;
  position: relative;
  .index-img {
    width: 100%;
    display: block;
  }
  .sku-list {
    position: absolute;
    top: 4.9rem;
    left: 0.6rem;
    right: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      width: 33.33%;
      height: 2.4rem;
    }
  }
  .button {
    position: absolute;
    width: 1.7rem;
    height: 0.8rem;
    display: block;
  }
  .new-comer {
    top: 9.5rem;
    right: 1rem;
  }
  .points-mall {
    top: 12.8rem;
    right: 1rem;
  }
}
</style>
