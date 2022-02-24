<template>
<div class="ctrl-Floor-title-preview">
  <result v-if="typeof data.text === 'string' && data.text !== ''" :data="data" />
  <div v-else class="blank-tip" :class="{mb15: data.mb15}"><span class="title">楼层标题</span></div>
</div>
</template>

<script>
import Result from './Result';

export default {
  name: 'CtrlFloorTitlePreview',
  components: {
    Result,
  },
  props: {
    data: {
      default: () => ({
        text: '',
      }),
    },
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';

.ctrl-Floor-title-preview {
  .blank-tip {
    font-size: 21px;
    color: $FONT_MINOR_GRAY;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .title {
      padding: 0 10px;
    }

    &:before,
    &:after {
      content: '';
      flex: 1;
      border-bottom: 1px solid $BORDER_GRAY;
      margin: 0 0.2rem;
    }
  }
}
</style>
