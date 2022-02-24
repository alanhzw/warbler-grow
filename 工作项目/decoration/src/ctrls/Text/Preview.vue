<template>
<div class="ctrl-text-preview">
  <result v-if="typeof data.text === 'string' && data.text !== ''" :data="data" />
  <div v-else class="blank-tip" :class="{mb15: data.mb15}">
    <img alt='' src="../assets/icon-text.png"><span class="text">请添加文字内容</span>
  </div>
</div>
</template>

<script>
import Result from './Result';

export default {
  name: 'CtrlTextPreview',
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

.ctrl-text-preview {
  .blank-tip {
    @extend .ctrl;
    height: 60px;
    font-size: 12px;
    color: $FONT_DISABLE_GRAY;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 10px;
    }
  }
}
</style>
