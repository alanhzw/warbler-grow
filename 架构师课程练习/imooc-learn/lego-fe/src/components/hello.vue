<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2022-05-31 10:30:14
 * @LastEditTime: 2022-05-31 10:58:52
 * @FilePath: \lego-fe\src\components\hello.vue
-->
<template>
  <h1>{{ msg }}</h1>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  msg: String
})

</script>

<style scoped>
</style>