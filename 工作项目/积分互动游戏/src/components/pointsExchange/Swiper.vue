<!--
 * @Description:轮播图组件
 * @Autor: hanzhiwei
 * @Date: 2020-12-29 16:58:24
 * @LastEditTime: 2020-12-31 12:52:49
 * @FilePath: \SNActivity\src\components\pointsExchange\Swiper.vue
-->
<template>
  <div class="swpier-box">
    <van-swipe class="swipe" :loop="false" initial-swipe='0' @change="onChange" :width="this.conWidth">
      <van-swipe-item v-for="(item,index) in activityInfo.showPics" :key="item + index">
        <p class="p-swipers">
          <img class="image" :src="item" @error="failImgShow" />
        </p>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{activityInfo.showPics ? activityInfo.showPics.length : 1}}
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    options: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
  },
  data () {
    return {
      conWidth: '', // 轮播图宽度
      current: 0, // 当前轮播索引
    };
  },
  created () {
    this.conWidth = window.screen.width;
  },
  methods: {
    onChange (index) {
      this.current = index;
    },
    // 默认图片
    failImgShow (event) {
      event.currentTarget.src = '//img10.360buyimg.com/imgzone/jfs/t1/112649/17/5556/4678/5eb4f6f2E08d0e9a6/dd86b4e3652f4e44.png';
    }
  }
};
</script>

<style lang="scss">
#app {
  height: 100%;
}
.swpier-box {
  width: 100%;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0.3rem;
  margin-bottom: 0.2rem;

  .van-swipe__track {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .van-swipe {
    .van-swipe-item {
      width: 100%;
    }
  }

  .image {
    width: 100%;
    min-height: 1rem;
  }

  .p-swipers {
    margin: 0;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
    }
  }

  .custom-indicator {
    position: absolute;
    right: 20px;
    bottom: 20px;
    width: 44px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 0.24rem;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 12px;
  }
}
</style>