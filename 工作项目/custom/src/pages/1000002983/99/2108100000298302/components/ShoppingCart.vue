<!--
 * @Author: 一尾流莺
 * @Description:购物车组件
 * @Date: 2021-08-27 16:14:24
 * @LastEditTime: 2021-08-30 10:00:00
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298301\components\ShoppingCart.vue
-->
<template>
  <div class="car"
       :style="optins"
       @click='go2Car'></div>
</template>

<script lang='ts' setup>

import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  optins: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['go2Car']);

// 进店逛逛
const go2Car = () => {
  emit('go2Car');
};
</script>

<style lang='scss'>
.car {
  background-repeat: no-repeat;
  background-size: 100%;
  position: fixed;
}
</style>
