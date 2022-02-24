<!--
 * @Author: YC
 * @Date: 2020-12-18 15:06:23
 * @LastEditors: YC
 * @LastEditTime: 2020-12-18 15:23:11
 * @Description: PC端页面区块 陆泽通用样式
-->


<template>
  <div class="lz-page-section">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'LzPageSection',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~lz-crm/style/variables';
.lz-page-section {
  background-color: $WHITE;
  padding: 20px;
  margin: 10px 0;
  box-shadow: 0px 2px 15px 0px rgba(169, 182, 199, 0.2);
}
</style>
