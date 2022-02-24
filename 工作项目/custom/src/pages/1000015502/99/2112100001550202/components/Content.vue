<!--
 * @Author: 一尾流莺
 * @Description:实物商品和加购组件
 * @Date: 2021-10-12 15:03:06
 * @LastEditTime: 2021-12-22 10:34:38
 * @FilePath: \custom\src\pages\1000015502\99\2112100001550202\components\Content.vue
-->
<template>
  <div class="content-box">
    <div class="rule-01">您已购买 {{totalMoney}} 元，奖品数量有限，快去下单吧</div>
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
    <div class="product">
      <div class="item"
           v-for="item in 3"
           :key="item"
           @click="exchangeProduct(item)">
        领取
      </div>
    </div>
    <!-- 实物兑换 -->
    <div class="reset">
      <div class="item"
           v-for="item in 3"
           :key="item">
        剩余500
      </div>
    </div>
    <!-- 排行榜 -->
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
const emit = defineEmits(['changeGiftId']);

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
  totalMoney: {
    type: Number,
    default: 0,
  },
});

// 点击兑换实物
const exchangeProduct = async (item: any) => {
  await getPrize(item.id);
};
</script>

<style lang='scss'>
.content-box {
  .rule-01{
    position: absolute;
    font-size: 0.2rem;
    top: 6.22rem;
    left: 1.4rem;
    font-weight :700;
  }
  .product {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 5.8rem;
    left: 50%;
    transform: translateX(-50%);
    top: 9.6rem;
    height: 0.45rem;
    .item {
      flex-wrap: nowrap;
      justify-content: flex-start;
      background-image: url('../assets/btn.png');
      background-size: 100%;
      background-repeat: no-repeat;
      width: 1.85rem;
      height: 0.45rem;
      text-align: center;
      color: #f6e8bd;
      font-size: 0.24rem;
      line-height: 0.45rem;
    }
  }
    .reset {
    position: absolute;
    display: flex;
    justify-content: space-between;
    width: 5.8rem;
    left: 50%;
    transform: translateX(-50%);
    top: 9rem;
    height: 0.45rem;
    .item {
      flex-wrap: nowrap;
      justify-content: flex-start;
      width: 1.85rem;
      height: 0.45rem;
      text-align: center;
      color: #f6e8bd;
      font-size: 0.265rem;
      line-height: 0.45rem;
      font-weight: 700;
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
