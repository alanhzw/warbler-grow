<!--
 * @Description:
 * @Date: 2021-03-15 11:31:54
 * @LastEditTime: 2021-03-24 16:29:52
 * @FilePath: \yunluzhuangxiu\src\ctrls\Countdown\Preview.vue
-->
<template>
  <div class="ctrl-countdown-preview">
    <div class="count-down" v-if="!(typeof data.pic === 'string' && data.pic !== '')">距离活动开始还有 00 天 00 小时 00 分钟</div>
    <result v-if="typeof data.pic === 'string' && data.pic !== ''" :data="data" />
    <ImageTip v-else class="image-box blank-tip" :class="{mb15: data.mb15}" />
  </div>
</template>

<script>
import ImageTip from '../components/ImageTip';
import Result from './Result';

export default {
  name: 'CtrlCountDownPreview',
  components: {
    Result,
    ImageTip,
  },
  props: {
    data: {
      default: () => ({
        pic: '',
        link: '',
        range: '',
      }),
    },
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';
@import '~lz-crm/style/variables';

.ctrl-countdown-preview {
  .blank-tip {
    @extend .ctrl;
    position: relative;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .count-down {
    font-size: 0.28rem;
    display: flex;
    padding: 0 0.3rem;
    margin-bottom: 0.1rem;
    color: $FONT_COMMON_GRAY;
  }
}
</style>
