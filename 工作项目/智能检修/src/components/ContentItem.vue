<!--
 * @Description:
 *         内容显示区域组件
 * @Author:HJ
 * @Date: 2021-05-05
 * @LastEditTime: 2021-05-25
 * @FilePath: \intelligent-overhaul-app\src\components\ContentItem.vue
-->
<template>
  <div class="content-item">
    <div class="content">
      <span class="label">{{label}}</span>
      <span v-if="!isBlock" class="value">{{value}}</span>
    </div>
    <div  class="block" v-if="isBlock">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContentItem',
  props: {
    label: {
      type: String,
      default: ''
    },

    value: {
      type: String,
      default: ''
    },
    isBlock: {
      type: Boolean,
      default: false,
    }
  }
}
</script>
<style lang="scss" scoped>
.content-item {
  font-size: 0.28rem;
  line-height: 0.4rem;
  text-align: left;
  margin-top: 0.48rem;
  margin-bottom: 0.48rem;
  .content {
    display: flex;
  }
  .label {
    width: 1.7rem;
    margin-right: 0.32rem;
    font-weight: 500;
  }

  .value {
    flex: 1;
    font-weight: 400;
  }
  .block {
    margin-top: 0.16rem
  }
}

</style>