<!--
 * @Author: 一尾流莺
 * @Description:活动规则组件
 * @Date: 2021-08-27 16:27:04
 * @LastEditTime: 2021-08-27 16:40:25
 * @FilePath: \custom\src\pages\1000002983\99\2108100000298301\components\Rule.vue
-->
<template>
  <div class="rule"
       :style="optins"
       v-html="rule"></div>
</template>

<script lang='ts' setup>
import { defineProps } from 'vue';

const props = defineProps({
  rule: String,
  optins: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang='scss'>
.rule {
  position: absolute;
  overflow: auto;
}
</style>
