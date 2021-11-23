<!--
 * @Description:
 *         内容显示区域组件
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-25
 * @FilePath: \intelligent-overhaul-app\src\components\ContentWrapper.vue
-->
<template>
  <section class="content-wrapper">
      <slot></slot>
  </section>
</template>
<script>
export default {
  name: 'ContentItem',
  props: {
    label: {
      default: ''
    },

    value: {
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.content-wrapper {
  // padding: 0.01rem 0;
  & + .content-wrapper {
    border-top: 1px solid rgba(0,0,0,0.1);
  }
}

</style>