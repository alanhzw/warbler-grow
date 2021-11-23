<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-19 17:50:48
 * @LastEditTime: 2021-11-23 17:37:02
 * @FilePath: \jest-test\src\widgets\big-wheel\prize.vue
-->
<template>
  <div class="prize-item"
       :class="getOddEvenClass(index)">
    <div class="product"
         v-if="prize.prizeType === 1">
      <p class="name">{{prize.prizeName}}</p>
      <img :src="prize.prizePic">
    </div>

    <div class="coupon"
         v-if="prize.prizeType === 2">
      <p class="name">{{prize.prizeName}}</p>
      <p class="desc">{{prize.prizeDesc}}</p>
    </div>

    <div class="bean"
         v-if="prize.prizeType === 3">
      <p class="name">{{prize.prizeName}}</p>
      <p class="desc">{{prize.prizeDesc}}</p>
    </div>

    <div class="thanks"
         v-if="prize.prizeType === 4">
      <p>{{prize.prizeName}}</p>
    </div>

    <div class="chance"
         v-if="prize.prizeType === -1">
      <p>{{prize.prizeName}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const getOddEvenClass = (index: number) => ({
  odd: index % 2 === 0,
  even: index % 2 === 1,
});
// 奖品信息结构体
export interface Prize {
  prizeName: string; // 奖品名称
  prizeDesc: string; // 奖品描述
  prizePic: string; // 奖品图片
  prizeType: number; // 奖品类型
  prizeId: number | string; // 奖品ID
}

interface PrizeProp {
  prize: Prize;
  index: number;
}

defineProps<PrizeProp>();
</script>

<style scoped lang="scss">
.prize-item {
  padding-top: 20em;
}
.odd {
  color: #ffffff;
}

.even {
  color: #ec1341;
}
.product {
  .name {
    font-size: 10em;
  }
  img {
    width: 60em;
    height: 60em;
    border-radius: 50%;
  }
}
.coupon,
.bean {
  .name {
    font-size: 10em;
  }
  .desc {
    margin-top: 10em;
    font-size: 1.33em;
  }
}

.thanks,
.chance {
  font-size: 18em;
  width: 2em;
  margin: 0 auto;
}
</style>
