<!--
 * @Author: 一尾流莺
 * @Description:游戏页面
 * @Date: 2021-10-14 14:47:09
 * @LastEditTime: 2021-10-19 11:21:26
 * @FilePath: \elsfk3\src\components\Game.vue
-->
<template>
  <div class="game-box">
    <!-- 行 -->
    <div class="row"
         v-for='row in gameRow'
         :key='row'>
      <!-- 列 -->
      <div class="col"
           v-for='col in gameCol'
           :key='col'>
        <!-- 小格子 -->
        <Cell :type='map[row-1][col-1]'></Cell>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cell from './Cell.vue';
import { reactive } from 'vue';
import { gameRow, gameCol, initSelfGame, initRivalGame } from '@/game';
// 地图
const map = reactive([]);
const props = defineProps(['type']);

if (props.type === 'self') {
  initSelfGame(map);
} else if (props.type === 'rival') {
  initRivalGame(map);
}
</script>

<style lang='scss'>
.game-box {
  margin: 0 15px;
  border: 1px solid black;
  .row {
    display: flex;
  }
}
</style>
