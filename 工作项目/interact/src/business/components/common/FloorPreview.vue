<template>
<div class="floor-preview-wrapper">
  <label class="floor-label" @click.stop.prevent="$emit('click')">{{info.label}}</label>
  <slot></slot>
  <div class="floor-btns" v-if="info.isRequired !== 1">
    <img v-if="!isFirst" alt="" src="@/assets/arrow-up.png" @click="$emit('moveUp')">
    <img v-else alt="" src="@/assets/arrow-up-disable.png">
    <img v-if="!isLast" alt="" src="@/assets/arrow-down.png" @click="$emit('moveDown')">
    <img v-else alt="" src="@/assets/arrow-down-disable.png">
    <img alt="" src="@/assets/delete.png" @click="$emit('remove')">
  </div>

  <div class="drag-tip">请拖入模块</div>
  <div class="cover" @click.stop.prevent="$emit('click')"></div>
</div>
</template>

<script>
export default {
  name: 'FloorPreview',
  props: {
    info: {
      default: () => ({}),
    },
    isFirst: {
      default: false,
    },
    isLast: {
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.floor-preview-wrapper {
  position: relative;

  .floor-label {
    position: absolute;
    padding: 5px 15px;
    text-align: center;
    word-break: keep-all;
    right: 100%;
    top: -1px;
    border-radius: 2px;
    transform: translateX(-5px);
    font-size: 12px;
    color: $FONT_COMMON_BLACK;
    background-color: $WHITE;

    &:after {
      content: ' ';
      position: absolute;
      right: -5px;
      top: 8px;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-left: 5px solid $BG_WHITE;
    }
  }

  .drag-tip {
    display: none;
    height: 30px;
    font-size: 12px;
    color: $FONT_MINOR_GRAY;
    text-align: center;
    line-height: 30px;
    background-color: #ceebff;
  }

  // &:hover .drag-tip {
  //   display: block;
  // }

  .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .floor-btns {
    position: absolute;
    top: -2px;
    left: 100%;
    width: 30px;
    height: 80px;
    border-radius: 2px;
    background-color: $BG_WHITE;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    margin-left: 10px;

    &:before {
      content: ' ';
      position: absolute;
      left: -5px;
      top: 10px;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      border-right: 5px solid $BG_WHITE;
    }

    img {
      vertical-align: top;
      margin-bottom: 1px;
    }
  }

  &.on-edit {
    border: 1px solid $BORDER_BLUE;
    z-index: 10;

    .floor-label {
      background-color: $BG_BLUE;
      color: $WHITE;

      &:after {
        border-left: 5px solid $BG_BLUE;
      }
    }

    .floor-btns {
      display: flex;
    }
  }
}
</style>
