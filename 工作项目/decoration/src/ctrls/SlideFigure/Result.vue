<!--
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-04-13 14:03:52
 * @FilePath: \yunluzhuangxiu\src\ctrls\SlideFigure\Result.vue
-->
<template>
  <div class="ctrl-slide-figure-result" :class="{mb15: data.mb15}">
    <div class="slide-figure-wrapper" :style="{width: `${data.pics.length * 2.7 + (data.pics.length - 1) * 0.2}rem`}">
      <div class="slide-figure-item" v-for="(pic, index) in data.pics" :key="`slide-item-${index}`" v-lz-click='100' v-lz-floor="floorInfo" @click="go2Link($event, pic.link)">
        <img class="swipe-item-pic" v-if="typeof pic.pic === 'string' && pic.pic !== ''" alt="" :src="`${CONST.IMAGE_PREFIX}${pic.pic}`">
        <image-tip v-else />
      </div>
    </div>
  </div>
</template>

<script>
import ImageTip from '../components/ImageTip';
import CONST from '@/utils/constant';

export default {
  name: 'CtrlSlideFigureResult',
  components: {
    ImageTip,
  },
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
@import '~lz-crm/style/variables';

.ctrl-slide-figure-result {
  overflow-x: auto;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .slide-figure-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 0 0.3rem;
  }

  .slide-figure-item {
    background-color: $WHITE;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2.7rem;
    height: 1.8rem;
    border-radius: 0.06rem;

    .swipe-item-pic {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
