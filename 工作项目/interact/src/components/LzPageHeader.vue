<!--
 * @Author: YC
 * @Date: 2020-12-18 14:20:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-04 10:14:22
 * @Description: PC端页面标题 陆泽通用样式
-->

<template>
  <div class="lz-page-header">
    <span class="title-text">{{ title }}
      {{ activityTitle }}</span>
    <slot name="rightSlot"></slot>
  </div>
</template>
<script>
import { ActivityTypeEnum } from '@/utils/ActivityType';

export default {
  name: 'LzPageHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    activityTitle() {
      const title = ActivityTypeEnum[this.$route.params.type];
      return title ? ` —— ${title}` : '';
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~lz-crm/style/variables';

.lz-page-header {
  background-color: $WHITE;
  color: $FONT_MAIN_BLACK;
  height: 70px;
  font-size: 18px;
  line-height: 58px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 15px 0px rgba(169, 182, 199, 0.2);
  font-family: PingFang SC;
  font-weight: bold;
  margin-bottom: 20px;

  .title-text {
    flex: 1;
  }
}
</style>
