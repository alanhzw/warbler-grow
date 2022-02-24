<!--
 * @Description:
 * @Date: 2021-04-08 15:25:22
 * @LastEditTime: 2021-04-15 10:19:00
 * @FilePath: \yunluzhuangxiu\src\ctrls\FloatIcon\Result.vue
-->
<template>
  <div v-lz-click='100' v-lz-floor="floorInfo" class="ctrl-float-icon-result" :class="{'float-icon': isMobile}" :style="{
  left: `${pos.x}px`,
  top: `${pos.y}px`
}">
    <img :src="`${CONST.IMAGE_PREFIX}${data.pic}`" @touchstart="touchStart" @touchend="go2Link($event, data.link)">
  </div>
</template>

<script>
import ImageTip from '../components/ImageTip';
import CONST from '@/utils/constant';

const docWidth = document.body.clientWidth;
const elmWidth = document.body.clientWidth / 750 * 210;
let dragFlag = false;

export default {
  name: 'CtrlFloatIconResult',
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
      pos: {
        x: docWidth - elmWidth / 2,
        y: 200,
      },
      isMobile: sessionStorage.getItem('LZ_CRM_CLIENT_TYPE') === '2',
    };
  },
  methods: {
    go2Link(evt, link) {
      if (dragFlag) {
        return;
      }
      if (typeof link === 'string' && link !== '') {
        window.location.href = link;
        // this.beforeLeave(link, evt)
      }
    },

    touchStart(event) {
      dragFlag = false;
      event.preventDefault();
      event.stopPropagation();

      document.ontouchmove = (evt) => {
        dragFlag = true;
        evt.preventDefault();
        evt.stopPropagation();

        const width = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth;
        const height = window.innerHeight || document.body.clientHeight || document.documentElement.clientHeight;

        if (evt.touches[0].clientX < 50) {
          this.pos.x = 50;
        } else if (width - evt.touches[0].clientX < 50) {
          this.pos.x = width - 50;
        } else {
          this.pos.x = evt.touches[0].clientX;
        }
        if (evt.touches[0].clientY < 50) {
          this.pos.y = 50;
        } else if (height - evt.touches[0].clientY < 50) {
          this.pos.y = height - 50;
        } else {
          this.pos.y = evt.touches[0].clientY;
        }
      };

      document.ontouchend = () => {
        document.ontouchmove = null;
        document.ontouchend = null;
        const docWidth = document.body.clientWidth;
        if (this.pos.x / docWidth < 0.5) {
          this.pos.x = elmWidth / 2;
        } else {
          this.pos.x = docWidth - elmWidth / 2;
        }
      };
    },
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';
@import '~lz-crm/style/variables';

.ctrl-float-icon-result {
  &.float-icon {
    position: fixed;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  img {
    width: 2.01rem;
    height: 2.1rem;
  }
}
</style>
