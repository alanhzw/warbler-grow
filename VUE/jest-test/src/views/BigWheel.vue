<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-16 16:58:41
 * @LastEditTime: 2021-11-19 16:55:13
 * @FilePath: \jest-test\src\views\BigWheel.vue
-->
<template>
  <div class="big-wheel">
    <big-wheel :plate='plate'
               :prizes='initData'></big-wheel>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import plate from "../assets/plate.png";
// @ts-ignore
import initData from "../assets/prizeData";
</script>

<style lang="scss">
.big-wheel {
}
</style>
