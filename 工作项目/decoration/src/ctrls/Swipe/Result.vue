<!--
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-04-13 14:04:13
 * @FilePath: \yunluzhuangxiu\src\ctrls\Swipe\Result.vue
-->
<template>
  <div class="ctrl-swipe-result">
    <van-swipe :autoplay="3000" indicator-color="white" :class="{mb15: data.mb15}">
      <van-swipe-item v-for="(pic, index) in data.pics" :key="`swipe-item-${index}`" v-lz-click='100' v-lz-floor="floorInfo" @click="go2Link($event, pic.link)">
        <img class="swipe-item-pic" :style="{height: data.height / 100 + 'rem'}" v-if="typeof pic.pic === 'string' && pic.pic !== ''" alt="" :src="`${CONST.IMAGE_PREFIX}${pic.pic}`">
        <image-tip :style="{height: data.height / 100 + 'rem'}" class="blank-item" v-else />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
/**
 * 轮播图C端组件
 */
import ImageTip from '../components/ImageTip';
import CONST from '@/utils/constant';

export default {
  name: 'CtrlSwipeResult',
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

.ctrl-swipe-result {
  padding: 0 0.3rem;

  .van-swipe-item {
    .swipe-item-pic {
      width: 100%;
      // height: 2.4rem;
    }

    .blank-item {
      min-height: 1.2rem;
    }
  }
}
</style>
