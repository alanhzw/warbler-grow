<!--
 * @Description:
 * @Date: 2021-04-30 11:52:23
 * @LastEditTime: 2021-12-08 16:30:16
 * @FilePath: \interact\src\mobile\modules\durex0\Swiper.vue
-->
<template>
  <div class="swiper-box-durex"
       :style="options.style">
    <div class="swiper-content">
      <div v-if="activityInfo.prizeLists.length > 2"
           @click="transform(1)"
           class="last"></div>
      <ul :style="styles"
          class="prize-list">
        <li v-for="(item,index) in activityInfo.prizeLists"
            :key="index"
            class="prize-item">
          <img style="border-radius:4px"
               :src="`${CONST.IMAGE_PREFIX}${item.prizePicture}`" />
          <p style="color:#000;text-align:center;margin:0.4rem 0.2rem 0.2rem 0.2rem;">{{ item.prizeName }}</p>
        </li>
      </ul>
      <div v-if="activityInfo.prizeLists.length > 2"
           @click="transform(-1)"
           class="next"></div>
    </div>
  </div>
</template>

<script>
import CONST from '@/utils/constant';
import areaData from '@/mobile/data/vantArea';
import BottomBox from './BottomBox.vue';


export default {
  data() {
    return {
      offset: -2.2,
      CONST,
      areaData,
      prizeIndex: 0,
      achieveBoxShowed: false,
      prizeDialogShow: false,
      prizeInDialog: {},
      recordId: '',
      gettingFlag: false,
    };
  },
  components: {
    BottomBox,
  },
  props: {
    options: {
      default: () => ({}),
    },
    userInfo: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
    settings: {
      default: () => ({}),
    },
  },
  computed: {
    styles() {
      return {
        left: `${this.offset}rem`,
        width: '100rem',
      };
    },
    prizes() {
      const list = Array.isArray(this.activityInfo.prizeLists) ? this.activityInfo.prizeLists : [];
      if (list.length > 1) {
        list.sort((p1, p2) => p1.prizeIndex - p2.prizeIndex);
      }
      return list;
    },
  },
  mounted() {
    if (this.activityInfo.prizeLists.length == 1) {
      this.offset = 1.1;
    }
    if (this.activityInfo.prizeLists.length == 2) {
      this.offset = 0;
    }
    if (this.activityInfo.prizeLists.length > 2) {
      this.offset = -2.2;
    }
  },
  methods: {
    // 计算偏移量
    transform(param) {
      if (param > 0) {
        const activity = this.activityInfo.prizeLists.shift();
        this.activityInfo.prizeLists.push(activity);
      } else {
        const activity = this.activityInfo.prizeLists.pop();
        this.activityInfo.prizeLists.unshift(activity);
      }
    },
  },
};
</script>

<style lang='scss'>
.swiper-box-durex {
  padding: 0 1rem;
  position: relative;
  margin-top: 1.8rem;

  .swiper-content {
    width: 100%;
    overflow-x: hidden;
    height: 4.5rem;

    .header {
      position: absolute;
      left: 1.5rem;
      top: -1.2rem;
      img {
        width: 4.5rem;
      }
    }
    .prize-item {
      float: left;
      display: block;
      width: 2.5rem;
      height: 2.5rem;
      // background-color: #fff;
      margin: 0 0.4rem;
      font-size: 0.2rem !important;


      img {
        width: 100%;
      }
    }
    .last {
      position: absolute;
      width: 0.8rem;
      height: 0.8rem;
      left: 0.2rem;
      top: 0.9rem;
    }
    .next {
      position: absolute;
      right: 0.2rem;
      top: 0.9rem;
      width: 0.8rem;
      height: 0.8rem;
    }
  }
  .prize-list {
    position: relative;
    transition: all 0.3s;
  }
  .show-prize {
    position: absolute;
    font-weight: 700;
    top: -0.3rem;
    left: 0;
    color: #000;
    width: 100%;
    text-align: center;
    font-size: 0.4rem;
  }

  .van-button--danger {
    background-color: #000;
    border: 1px solid #000;
  }
}
.prize-dialog {
  background-color: transparent;
}
</style>
