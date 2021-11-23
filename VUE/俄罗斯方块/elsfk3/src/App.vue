<!--
 * @Author: 一尾流莺
 * @Description:根节点
 * @Date: 2021-10-14 14:47:09
 * @LastEditTime: 2021-10-19 11:15:34
 * @FilePath: \elsfk3\src\App.vue
-->
<template>
  <div class='game'>
    <div>
      自己
      <Game type='self'></Game>
    </div>
    <div>
      对手
      <Game type='rival'></Game>
    </div>
  </div>
  <button @click="start">startGame</button>

</template>

<script lang='ts' setup>
import Game from '@/components/Game.vue';
import { startGame } from './game';
const start = () => {
  startGame();
};
</script>

<style lang='scss'>
.game {
  display: flex;
}
</style>
