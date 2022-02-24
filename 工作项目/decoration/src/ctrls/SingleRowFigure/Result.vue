<!--
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-04-13 14:03:29
 * @FilePath: \yunluzhuangxiu\src\ctrls\SingleRowFigure\Result.vue
-->
<template>
  <div class="ctrl-signle-row-figure-result" :class="{mb15: data.mb15}" v-lz-click='100' v-lz-floor="floorInfo" @click="go2Link($event)">
    <img class="bg" :src="`${CONST.IMAGE_PREFIX}${data.pic}`" alt="">
  </div>
</template>

<script>
import CONST from '@/utils/constant';

export default {
  name: 'CtrlTextResult',
  props: {
    data: {
      default: () => ({}),
    },
    floorInfo: {
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
    };
  },
  methods: {
    go2Link(evt) {
      if (typeof this.data.link === 'string' && this.data.link !== '') {
        window.location.href = this.data.link;
        // this.beforeLeave(this.data.link, evt)
      }
    },
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';

.ctrl-signle-row-figure-result {
  position: relative;

  .bg {
    width: 100%;
    vertical-align: top;
  }
}
</style>
