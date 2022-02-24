/**
 * @Description:caoshijie
 * @Date: 2021/12/30
 * @Description: sku展示组件
 * @FilePath:src\pages\1000003005\99\2201100000300501\components\skuList.vue
*/
<template>
  <div class='sku-list'>
    <div class='sky-item' v-for='item in skuList' :key='item.skuId'>
      <div @click='gotoSkuPage(item.skuId)'>
        <img class='sku-img' :src='formatUrl(item.logo)'>
        <div class='sku-name'>{{ item.skuName }}</div>
      </div>
      <div class='sku-btn-box'>
        <div class='sku-btn' @click='addCar(item.skuId)'>立即加购</div>
<!--        <div class='sku-btn' @click='gotoSkuPage(item.skuId)'>立即购买</div>-->
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {
  defineProps, inject, PropType, ref,
} from 'vue';
import { BaseInfo } from '@/types/BaseInfo';
import { gotoSkuPage } from '@/utils/platforms';
import tools from '../hook/tools';

const formatUrl = (url: string) => (url.indexOf('http') > -1 ? url : `https://img10.360buyimg.com/n1${url}`);
const baseInfo = inject('baseInfo') as BaseInfo;

const props = defineProps({
  skuList: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
});
const {
  addCar,
} = tools(baseInfo);
</script>

<style lang='scss' scoped>
.sku-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.sky-item {
  width: 3.14rem;
  background: #fff;
  margin-right: .11rem;
  margin-bottom: .11rem;
  padding: .05rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border-radius: 0.1rem;

  &:nth-child(2n) {
    margin-right: 0;
  }
}

.sku-img {
  width: 3.04rem;
  height: 3.04rem;
  object-fit: cover;
  border-radius: .1rem;
}

.sku-name {
  width: 2.73rem;
  font-size: 0.24rem;
  padding: 0 .1rem;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;

}

.sku-btn-box {
  display: flex;
  margin: .05rem 0;
}

.sku-btn {
  //flex: 1;
  margin-left: 50%;
  transform: translateX(-50%);
  width: 1.46rem;
  line-height: 0.44rem;
  text-align: center;
  font-size: 0.24rem;
  color: #06427e;
  background-image: linear-gradient(-90deg,
    #fcf2cb 0%,
    #e9c88f 100%),
  linear-gradient(
      #0f2b4f,
      #0f2b4f);
  background-blend-mode: normal,
  normal;
  border-radius: 0.22rem;
  position: relative;

  &::after {
    width: 0;
    height: 0;
    content: '';
    border-top: .07rem solid transparent;
    border-bottom: .07rem solid transparent;
    border-left: .07rem solid #06427e;
    position: absolute;
    right: .1rem;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
