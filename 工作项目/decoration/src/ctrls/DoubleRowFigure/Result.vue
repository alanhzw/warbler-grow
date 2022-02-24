<!--
 * @Description:
 * @Date: 2021-03-15 11:31:54
 * @LastEditTime: 2021-04-13 13:58:50
 * @FilePath: \yunluzhuangxiu\src\ctrls\DoubleRowFigure\Result.vue
-->
<template>
  <div class="ctrl-double-row-figure-result" :class="{mb15: data.mb15}">
    <img class="image-box" v-lz-click='100' v-lz-floor="floorInfo" @click="go2Link($event, data.link1)" :src="`${CONST.IMAGE_PREFIX}${data.pic1}`" alt="">
    <img class="image-box" v-lz-click='100' v-lz-floor="floorInfo" @click="go2Link($event, data.link2)" :src="`${CONST.IMAGE_PREFIX}${data.pic2}`" alt="">
  </div>
</template>

<script>
import CONST from '@/utils/constant';

export default {
  name: 'CtrlDoubleRowFigureResult',
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
    go2Link(evt, link) {
      if (typeof link === 'string' && link !== '') {
        window.location.href = link;
        // this.beforeLeave(link,evt)
      }
    },
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';

.ctrl-double-row-figure-result {
  position: relative;
  display: flex;
  justify-content: space-between;

  .image-box {
    width: 3.7rem;
    height: 2.4rem;
  }
}
</style>
