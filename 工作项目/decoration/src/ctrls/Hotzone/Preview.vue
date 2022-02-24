<template>
<div class="ctrl-hotzone-preview">
  <result v-if="typeof data.pic === 'string' && data.pic !== ''" :data="data" />
  <ImageTip v-else class="image-box blank-tip" :class="{mb15: data.mb15}" />
</div>
</template>

<script>
import ImageTip from '../components/ImageTip';
import Result from './Result';

export default {
  name: 'CtrlHotzonePreview',
  components: {
    Result,
    ImageTip,
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

.ctrl-hotzone-preview {
  .blank-tip {
    @extend .ctrl;
    font-size: 12px;
    color: $FONT_MINOR_GRAY;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
