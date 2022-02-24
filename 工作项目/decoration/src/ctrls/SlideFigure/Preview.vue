<template>
<div class="ctrl-slide-figure-preview">
  <result :data="data" />
</div>
</template>

<script>
import Result from './Result';

export default {
  name: 'CtrlSlideFigurePreview',
  components: {
    Result,
  },
  props: {
    data: {
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';

.ctrl-slide-figure-preview {}
</style>
