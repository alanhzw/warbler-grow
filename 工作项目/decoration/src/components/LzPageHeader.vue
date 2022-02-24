<!--
 * @Author: YC
 * @Date: 2020-12-18 14:20:20
 * @LastEditors: YC
 * @LastEditTime: 2020-12-18 15:25:40
 * @Description: PC端页面标题 陆泽通用样式
-->

<template>
  <div class="lz-page-header">
    <span class="title-text">{{title}}</span>
    <slot name="rightSlot"></slot>
  </div>
</template>
<script>
export default {
  name: 'LzPageHeader',
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
.lz-page-header {
  background-color: $WHITE;
  color: $FONT_MAIN_BLACK;
  font-size: 14px;
  display: flex;
  align-items: center;
  position: relative;
  height: 70px;
  margin-top: 1px;
  margin-bottom: 10px;
  padding: 0 20px;
  line-height: 70px;
  border-radius: 5px;
  box-shadow: 0px 2px 15px 0px rgba(169, 182, 199, 0.2);

  .title-text {
    flex: 1;
    color: #333;
    font-weight: 700;
    font-size: 17px;
  }
}
</style>
