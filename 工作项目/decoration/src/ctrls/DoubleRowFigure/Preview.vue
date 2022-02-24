<template>
<div class="ctrl-double-row-figure-preview">
  <div class="blank-tip" :class="{mb15: data.mb15}">
    <img v-if="typeof data.pic1 === 'string' && data.pic1 !== ''" class="image-box" :src="`${CONST.IMAGE_PREFIX}${data.pic1}`" alt="">
    <ImageTip v-else class="image-box blank-box" />
    <img v-if="typeof data.pic2 === 'string' && data.pic2 !== ''" class="image-box" :src="`${CONST.IMAGE_PREFIX}${data.pic2}`" alt="">
    <ImageTip v-else class="image-box blank-box" />
  </div>
</div>
</template>

<script>
import ImageTip from '../components/ImageTip';
import Result from './Result';
import CONST from '@/utils/constant';

export default {
  name: 'CtrlDoubleRowFigurePreview',
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
  data() {
    return {
      CONST,
    };
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';
@import '~lz-crm/style/variables';

.ctrl-double-row-figure-preview {

  .blank-tip {
    display: flex;
    justify-content: space-between;

    .image-box {
      width: 185px;
      height: 120px;
    }

    .blank-box {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $WHITE;
    }
  }
}
</style>
