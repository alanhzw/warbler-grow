<template>
<div class="ctrl-swipe-preview">
  <result :data="data" />
  <!-- <div v-else class="blank-tip" :class="{mb15: data.mb15}">请添加文字内容</div> -->
</div>
</template>

<script>
import Result from './Result';

export default {
  name: 'CtrlSwipePreview',
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

.ctrl-swipe-preview {}
</style>
