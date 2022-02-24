<!--
 * @Author: 一尾流莺
 * @Description:通用标题组件
 * @Date: 2021-12-16 09:40:59
 * @LastEditTime: 2021-12-16 09:49:24
 * @FilePath: \nuxt-template-admin\components\common\title.vue
-->
<template>
  <div class='common-title'>
    <div class="line"></div>
    <div>{{title}}</div>
  </div>
</template>

<script lang='ts' setup>
interface TitleProps {
  title: string
}
const props = withDefaults(defineProps<TitleProps>(), {
  title: '模板列表',
})
</script>

<style lang='scss' scoped>
.common-title {
  display: flex;
  justify-content: flex-start;
  padding: 0 0 20px 0;
  font-weight: 700;
  font-size: 18px;
  .line {
    height: 25px;
    border-right: 4px solid blue;
    margin-right: 10px;
  }
}
</style>
