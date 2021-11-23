<!--
 * @Author: 一尾流莺
 * @Description: 地图上的一个块
 * @Date: 2021-07-23 18:51:31
 * @LastEditTime: 2021-07-27 08:32:24
 * @FilePath: \elsfk2\src\components\Box.vue
-->
<template>
  <div class="box">
    {{ type }}
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
const props = defineProps(['type']);
console.log('🚀🚀~ props.type:', props.type);

const typeToColorMap = {
  [0]: 'gray',
  [1]: 'red',
};

const color = computed(() => typeToColorMap[props.type]);
</script>

<style lang="scss">
.box {
  width: 40px;
  height: 40px;
  margin: 2px;
  background-color: v-bind(color);
}
</style>