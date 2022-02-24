<!--
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-07-22 16:50:07
 * @FilePath: \decoration\src\ctrls\components\MoveBar.vue
-->
<template>
  <div class="move-bar">
    <!-- 置顶 -->
    <span class="iconfont icon-iconxx-31"
          v-if='showTop'
          :class="{disable: count === 0}"
          @click="$emit('move-top')" />
    <!-- 上移 -->
    <span class="iconfont icon-iconjiantou-35"
          :class="{disable: count === 0}"
          @click="$emit('move-up')" />
    <!-- 下移 -->
    <span class="iconfont icon-iconjiantou-34"
          :class="{disable: count === total - 1}"
          @click="$emit('move-down')" />
    <!-- 置底 -->
    <div class="transform-180"
         v-if='showBottom'>
      <span class="iconfont icon-iconxx-31"
            :class="{disable: count === 0}"
            @click="$emit('move-bottom')" />
    </div>
    <!-- 编辑 -->
    <span class="iconfont icon-icon-08"
          v-if='showEdit'
          :class="{disable: !isCanBeEdit}"
          @click="total > min && $emit('edit-item')" />
    <!-- 删除 -->
    <span class="iconfont icon-icon-07"
          v-if='showDelete'
          :class="{disable: total < min + 1}"
          @click="total > min && $emit('delete-item')" />

  </div>
</template>

<script>
/**
 * 列表移动换位
 */
export default {
  props: {
    min: {
      default: 0,
    },
    max: {
      default: 999,
    },
    total: {
      default: 0,
    },
    count: {
      default: -1,
    },
    showTop: {
      type: Boolean,
      default: false,
    },
    showBottom: {
      type: Boolean,
      default: false,
    },
    showDelete: {
      type: Boolean,
      default: true,
    },
    showEdit: {
      type: Boolean,
      default: false,
    },
    isCanBeEdit: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.move-bar {
  display: flex;

  .iconfont {
    margin: 5px;
    color: $FONT_COMMON_GRAY;
    margin-top: 0;
    cursor: pointer;

    &.disable {
      color: $BORDER_GRAY;
    }
  }
  .transform-180 {
    transform: rotate(180deg);
    margin-bottom: 5px;
  }
}
</style>
