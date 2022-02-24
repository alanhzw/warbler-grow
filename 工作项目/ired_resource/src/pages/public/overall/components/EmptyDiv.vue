<!--
 * @Author: 一尾流莺
 * @Description:空的div用来占位
 * @Date: 2021-09-29 14:42:07
 * @LastEditTime: 2021-09-29 14:54:35
 * @FilePath: \ired_resource\src\pages\home\components\EmptyDiv.vue
-->
<template>
  <div class="empty-div"
       :style='`height:${height}`'></div>
</template>

<script lang='ts' setup>
import { defineProps } from 'vue';

defineProps({
  height: {
    type: String,
    default: () => ('30px'),
  },
});

</script>

<style lang='scss'>
.empty-div {
  width: 100%;
}
</style>
