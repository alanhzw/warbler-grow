<!--
 * @Author: 一尾流莺
 * @Description:实物商品和加购组件
 * @Date: 2021-10-12 15:03:06
 * @LastEditTime: 2021-12-21 15:48:52
 * @FilePath: \custom\src\pages\1000123965\99\2110100012396501\components\Content.vue
-->
<template>
  <div class="content-box">
    <!-- 加购商品 -->
    <div class="add-car"
         :style="contentStyle.carStyle">
      <div class="item"
           v-for="item in skus"
           :key="item"
           @click="gotoSkuPage(item)"
           :style="contentStyle.carItemStyle"></div>
    </div>
    <!-- 实物兑换 -->
    <div class="product"
         :style="contentStyle.productStyle">
      <div class="process"
           :style="`bottom:${contentStyle.processStyle.bottom};width:${ 6.5 / 18 * number}rem`"></div>
      <div class="item"
           :style="contentStyle.productItemStyle"
           v-for="item in product"
           :key="item.id"
           @click="exchangeProduct(item)"></div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, defineEmits, PropType } from 'vue';
import { Toast } from 'vant';
import { gotoSkuPage } from '@/utils/platforms';
import useGetPrize from '../apis/useGetPrize';
import useBaseInfo from '../hooks/useBaseInfo';
// 获取基本信息
const { baseInfo } = useBaseInfo();
// 兑换实物奖品api
const { getPrize, prizeResult } = useGetPrize(baseInfo);
const emit = defineEmits(['openAddAddressPopup', 'changeGiftId', 'changeInitAddress']);

const props = defineProps({
  product: {
    type: Array as PropType<Array<any>>,
    default: () => ([]),
  },
  contentStyle: {
    type: Object,
    default: () => ({}),
  },
  skus: {
    type: Array as PropType<Array<any>>,
    default: () => ([]),
  },
  number: {
    type: Number,
    default: () => 0,
  },
});
// 点击兑换实物
const exchangeProduct = async (item: any) => {
  await emit('changeGiftId', item.id);
  await getPrize(item.id);
  if (prizeResult.value) {
    emit('changeInitAddress', {});
    emit('openAddAddressPopup');
  }
};
</script>

<style lang='scss'>
.content-box {
  .product {
    position: absolute;
    display: flex;
    .process{
      background-image: url("../assets/process.png");
      background-size: cover;
      background-repeat: no-repeat;
      height: 3px;
      position: absolute;
      left: 0.5rem;
    }
    .item {
      flex-wrap: nowrap;
      justify-content: flex-start;
    }
  }
  .add-car {
    position: absolute;
    display: flex;
    .item {
      flex-wrap: nowrap;
      justify-content: flex-start;
    }
  }
}
</style>
