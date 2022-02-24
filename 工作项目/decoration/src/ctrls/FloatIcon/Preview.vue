<template>
<div class="ctrl-float-icon-preview">
  <result :data="data" />
</div>
</template>

<script>
import Result from './Result';

export default {
  name: 'CtrlFloatIconPreview',
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

.ctrl-float-icon-preview {}
</style>
