<!--
 * @Author: 一尾流莺
 * @Description:即刻领取按钮
 * @Date: 2021-08-27 16:29:48
 * @LastEditTime: 2021-08-30 09:20:19
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298301\components\DrawNowBtn.vue
-->
<template>
  <div class="draw-now"
       :style="optins"
       @click="getToken"></div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  optins: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['getToken']);

// 进店逛逛
const getToken = () => {
  emit('getToken');
};
</script>

<style lang="scss">
.draw-now {
  position: absolute;
  background-repeat: repeat-y;
  background-size: 100%;
}
</style>
