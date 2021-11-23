<!--
 * @Description:
 *         共通title
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-19
 * @FilePath: \intelligent-overhaul-app\src\components\CommonTitle.vue
-->
<template>
  <div class="security-title">
    {{title}}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='scss'>
.security-title {
  text-align: left;
  font-size: 0.28rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
  line-height: 0.42rem;
}
</style>