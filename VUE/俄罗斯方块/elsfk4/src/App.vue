<!--
 * @Author: 一尾流莺
 * @Description:根节点
 * @Date: 2021-10-14 14:47:09
 * @LastEditTime: 2021-10-19 10:15:30
 * @FilePath: \elsfk3\src\App.vue
-->
<template>
  <div class=''>
    <Game></Game>
    <button @click="start">startGame</button>
  </div>
</template>

<script lang='ts' setup>
import Game from '@/components/Game.vue';
import { startGame } from './game';
const start = () => {
  startGame();
};
</script>

<style lang='scss'>
</style>
