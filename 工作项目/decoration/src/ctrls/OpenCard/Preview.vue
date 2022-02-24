<template>
  <div class="ctrl-open-card-preview">
    <result :data="data"/>
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

.ctrl-open-card-preview {
}
</style>
