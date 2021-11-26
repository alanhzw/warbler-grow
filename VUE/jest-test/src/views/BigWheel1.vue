<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-16 16:58:41
 * @LastEditTime: 2021-11-26 17:19:48
 * @FilePath: \jest-test\src\views\BigWheel1.vue
-->
<template>
  <div class="big-wheel">
    <big-wheel :plate='plate'
               ref='bw'
               class="bw"
               @start='start'
               @over='over'
               :prizes='initData'></big-wheel>
  </div>
  <img src="../assets/WechatIMG67.png"
       class="base">
</template>

<script lang="ts" setup>
// @ts-ignore
import { ref } from "vue";
// @ts-ignore

import plate from "../assets/WechatIMG65.png";
// @ts-ignore
import initData from "../assets/prizeData";

const bw = ref(null);
const start = () => {
  bw.value!.rotateTo(3);
};
const over = (prize: any) => {
  alert(`恭喜获得${prize}`);
};
</script>

<style lang="scss">
.big-wheel {
  .bw {
    width: 281.5px;
  }
}
.base {
  width: 341px;
  margin-top: -415px;
  position: relative;
  z-index: 33;
}
</style>
