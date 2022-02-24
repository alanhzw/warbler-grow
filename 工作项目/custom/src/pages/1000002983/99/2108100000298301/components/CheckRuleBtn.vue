<!--
 * @Author: 一尾流莺
 * @Description:返回规则页面
 * @Date: 2021-08-27 16:29:48
 * @LastEditTime: 2021-08-30 10:04:17
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298301\components\CheckRuleBtn.vue
-->
<template>
  <div class="check-draw-method"
       :style="optins"
       @click="goToRule"></div>
</template>

<script lang='ts' setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  optins: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['goToRule']);

// 进店逛逛
const goToRule = () => {
  emit('goToRule');
};
</script>

<style lang='scss'>
.check-draw-method {
  position: absolute;
  background-repeat: repeat-y;
  background-size: 100%;
}
</style>
