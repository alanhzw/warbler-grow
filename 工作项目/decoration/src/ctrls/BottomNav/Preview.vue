<template>
<div class="ctrl-bottom-nav-preview">
  <result v-if="data.navs.length > 0" :data="data" />
  <div v-else class="blank-tip">
    <img alt='' src="../assets/icon-text.png"><span class="text">请添加导航菜单</span>
  </div>
</div>
</template>

<script>
import Result from './Result';

export default {
  name: 'CtrlBottomNavPreview',
  components: {
    Result,
  },
  props: {
    data: {
      default: () => ({
        navs: [],
      }),
    },
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';

.ctrl-bottom-nav-preview {
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
