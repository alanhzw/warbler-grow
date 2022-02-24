<!--
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-04-13 14:00:35
 * @FilePath: \yunluzhuangxiu\src\ctrls\Hotzone\Result.vue
-->
<template>
  <div class="ctrl-hotzone-result" :class="{mb15: data.mb15}">
    <img class="bg" :src="`${CONST.IMAGE_PREFIX}${data.pic}`" alt="">
    <div v-lz-click='100' v-lz-floor="floorInfo" v-for="(hz, hIndex) in data.hotzones" class="hotzone" :key="`hz-${hIndex}`" :style="{
        top: hz.y * 100 + '%',
        left: hz.x * 100 + '%',
        width: hz.w * 100 + '%',
        height:hz.h * 100 + '%'
      }" @click="go2Link($event, hz.link)" />
  </div>
</template>

<script>
/**
 * 热区组件 可以使用img usemap map area 实现，
 * 觉着还是div简单直接
 */
import CONST from '@/utils/constant';

export default {
  name: 'CtrlHotzoneResult',
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
        // this.beforeLeave(link, evt)
      }
    },
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';

.ctrl-hotzone-result {
  @extend .ctrl;
  position: relative;

  .bg {
    width: 100%;
    vertical-align: top;
  }

  .hotzone {
    position: absolute;
  }
}
</style>
