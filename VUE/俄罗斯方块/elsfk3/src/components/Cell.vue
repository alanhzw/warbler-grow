<!--
 * @Author: 一尾流莺
 * @Description:每一个小格子
 * @Date: 2021-10-14 15:38:34
 * @LastEditTime: 2021-10-18 16:27:53
 * @FilePath: \elsfk3\src\components\Cell.vue
-->
<template>
  <div class='cell-box'>
    {{type}}
  </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue';
const props = defineProps(['type']);

// 小格子的颜色映射
const typeToColorMap: any = {
  [0]: 'gray',
  [1]: 'red',
  [-1]: 'red',
};

// 小格子的颜色
const color = computed(() => typeToColorMap[props.type]);
</script>

<style lang='scss'>
.cell-box {
  width: 20px;
  height: 20px;
  background: v-bind(color);
  margin: 5px;
}
</style>
