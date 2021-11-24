<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-16 16:58:41
 * @LastEditTime: 2021-11-24 17:09:54
 * @FilePath: \jest-test\src\views\BigWheel.vue
-->
<template>
  <div class="big-wheel">
    <big-wheel :plate='plate'
               ref='bw'
               @start='start'
               @over='over'
               :prizes='initData'></big-wheel>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { ref } from "vue";
import plate from "../assets/plate.png";
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
}
</style>
