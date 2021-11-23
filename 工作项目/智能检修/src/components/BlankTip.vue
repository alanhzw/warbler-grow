<!--
 * @Description:
 *     暂无数据的组件
 * @Author:LJN 
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-30
 * @FilePath: \intelligent-overhaul-app\src\components\BlankTip.vue
-->
<template>
  <div class="blank-tip">
    <img src="../assets/nodata.png">
    <p class="text">{{text}}</p>
  </div>
</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  text: {
    default: '暂无数据',
  }
})
</script>
<style lang="scss" scoped>
.blank-tip {
  margin-top: 0.32rem;
  text-align: center;
  img {
    width: 3.2rem;
    height: 3.2rem;
  }
  .text {
    color: rgba(0,0,0,0.45);
    margin-top: 0.32rem;
    font-size: 0.24rem;
  }
}
</style>