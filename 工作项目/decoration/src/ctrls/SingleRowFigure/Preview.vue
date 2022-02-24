<template>
<div class="ctrl-single-row-figure-preview">
  <result v-if="typeof data.pic === 'string' && data.pic !== ''" :data="data" />
  <ImageTip v-else class="image-box blank-tip" :class="{mb15: data.mb15}" />
</div>
</template>

<script>
import ImageTip from '../components/ImageTip';
import Result from './Result';

export default {
  name: 'CtrlSingleRowFigurePreview',
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
@import '~lz-crm/style/variables';

.ctrl-single-row-figure-preview {
  .blank-tip {
    @extend .ctrl;
    position: relative;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
