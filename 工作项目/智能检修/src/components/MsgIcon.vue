<!--
 * @Description:
 *    ICON组件
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-05
 * @FilePath: \intelligent-overhaul-app\src\components\MsgIcon.vue
-->
<template>
  <div class="msg-icon">
    <img :src="image">
  </div>
</template>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  image: {
    type: String,
    require: true,
  }
})
</script>
<style lang="scss" scoped>
.msg-icon {

}
</style>