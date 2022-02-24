<!--
 * @Author: 一尾流莺
 * @Description:根组件
 * @Date: 2021-12-15 11:29:18
 * @LastEditTime: 2021-12-15 18:35:56
 * @FilePath: \nuxt-template-admin\app.vue
-->
<template>
  <NuxtPage></NuxtPage>
</template>

<script lang="ts" setup>
interface SideBarProps {
  width?: string
}

const props = withDefaults(defineProps<SideBarProps>(), {
  width: '200px',
})
</script>

<style lang="scss" scoped>
</style>