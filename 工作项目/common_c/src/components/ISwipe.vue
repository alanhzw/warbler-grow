<template>
  <!-- 轮播图  -->
  <div class="ISwipe">
    <!-- https://img10.360buyimg.com/imgzone/ -->
    <!-- <van-swipe v-if="swipers.length === 1" class="swipe1" :loop="false" initial-swipe='0' @change="onChange">
      <van-swipe-item v-for="s in swipers" :key="s">
        <p class="p-swipers">
          <img v-if="s.indexOf('img10.360buyimg') < 0" class="image" :src="`https://img10.360buyimg.com/imgzone/` + s" alt='' @error="failImgShow"/>
          <img v-else :src='s' alt='' @error="failImgShow"/>
        </p>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{swipers ? swipers.length : 1}}
        </div>
      </template>
    </van-swipe>
    <van-swipe v-else-if="swipers.length === 2" class="swipe2" :loop="false"  initial-swipe='0' @change="onChange">
      <van-swipe-item v-for="s in swipers" :key="s">
        <p class="p-swipers">
          <img v-if="s.indexOf('img10.360buyimg') < 0" class="image" :src="`https://img10.360buyimg.com/imgzone/` + s" alt='' @error="failImgShow"/>
          <img v-else :src='s' alt='' @error="failImgShow"/>
        </p>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{swipers ? swipers.length : 1}}
        </div>
      </template>
    </van-swipe> -->
    <van-swipe :loop="false" :width="this.conWidth" class="swipe" initial-swipe='0' @change="onChange">
      <van-swipe-item v-for="(s, index) in swipers" :key="s" :class="{'is-active': !index}">
        <p class="p-swipers">
          <img v-if="s.indexOf('img10.360buyimg') < 0" :src="`https://img10.360buyimg.com/imgzone/` + s" alt=''
               class="image" @error="failImgShow"/>
          <img v-else :src='s' alt='' @error="failImgShow"/>
        </p>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{ swipers ? swipers.length : 1 }}
        </div>
      </template>
    </van-swipe>
  </div>
</template>
<script>
export default {
  name: 'ISwipe',
  props: ['swipers'],
  data() {
    return {
      conWidth: '',
      current: 0,
    };
  },
  created() {
    this.conWidth = window.screen.width;
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    // 默认图片
    failImgShow(event) {
      event.currentTarget.src = '//img10.360buyimg.com/imgzone/jfs/t1/112649/17/5556/4678/5eb4f6f2E08d0e9a6/dd86b4e3652f4e44.png';
    },
  },
};
</script>
<style scoped>
.ISwipe {
  position: relative;

}

.ISwipe >>> .van-swipe__track {
  display: flex;
  align-items: center;
  height: 100%;
}

/* .swipe {
  display: flex;
  justify-content: center;
} */
.ISwipe >>> .van-swipe .van-swipe-item {
  width: 100%;
}

.image {
  width: 100%;
  min-height: 1rem;
}

.p-swipers {
  margin: 0;
  width: 100%;
  height: 100%;
}

.p-swipers img {
  width: 100%;
}

/* .ISwipe >>>.swipe .van-swipe__track .van-swipe-item {
  min-height: 1rem;
  font-size: 20px;
  text-align: center;
  height: 100%;
  transform: translateX(100%)!important;
}
.ISwipe >>>.swipe1 .van-swipe__track .van-swipe-item {
  min-height: 1rem;
  font-size: 20px;
  text-align: center;
  height: 100%;
}
.ISwipe >>>.swipe2 .van-swipe__track .van-swipe-item {
  min-height: 1rem;
  font-size: 20px;
  text-align: center;
  height: 100%;
  transform: translateX(0)!important;
} */
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
</style>
