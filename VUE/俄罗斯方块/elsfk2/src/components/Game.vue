<!--
 * @Author: 一尾流莺
 * @Description:地图组件
 * @Date: 2021-07-23 18:27:57
 * @LastEditTime: 2021-07-27 08:24:54
 * @FilePath: \elsfk2\src\components\Game.vue
-->
<template>
  <div class="">
    <div v-for='i in gameRow'
         class="row"
         :key='i'>
      <div v-for='j in gameCol'
           class="col"
           :key='j'>
        <Box :type='map[i-1][j-1]'></Box>
      </div>
    </div>
  </div>
</template>

<script setup>
import Box from './Box.vue';
import { gameRow, gameCol, startGame } from '../game';
import { reactive } from 'vue';

const map = reactive({});

startGame(map);
</script>

<style lang='scss'>
.row {
  display: flex;
}
</style>
