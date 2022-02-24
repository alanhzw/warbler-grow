<template>
<div class="ctrl-tags-preview">
  <result :data="data" />
</div>
</template>

<script>
import Result from './Result';

export default {
  name: 'CtrlTagsPreview',
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

.ctrl-tags-preview {
  .blank-tip {
    height: 60px;
    font-size: 12px;
    color: $FONT_MINOR_GRAY;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
