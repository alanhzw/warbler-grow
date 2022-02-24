<template>
  <div class="ctrl-upgrade-gift-preview">
    <result :data="data"/>
  </div>
</template>
<script>
import Result from './Result';

export default {
  name: 'CtrlUpgradeGiftPreview',
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

.ctrl-upgrade-gift-preview {
}
</style>
