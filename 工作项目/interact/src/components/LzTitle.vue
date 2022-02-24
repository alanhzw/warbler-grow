<!--
 * @Author: YC
 * @Date: 2020-12-18 15:35:02
 * @LastEditors: YC
 * @LastEditTime: 2020-12-18 15:43:50
 * @Description: PC端栏目标题 陆泽通用样式
-->

<template>
  <div class="lz-title">
    <span class="title-text">{{title}}</span>
    <slot name="rightSlot"></slot>
  </div>
</template>
<script>
export default {
  name: 'LzTitle',
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
.lz-title {
  color: $FONT_MAIN_BLACK;
  font-size: 14px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  border-left: 3px solid $BLUE;
  // }
  .title-text {
    margin-left: 8px;
  }
}
</style>
