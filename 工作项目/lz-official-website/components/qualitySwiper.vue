<template>
  <div class="quality-swiper">
    <div id="qualityswiper" class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) in swiperList"
          :key="index"
          class="swiper-slide"
        >
          <img :src="item.ImgUrl" alt="">
        </div>
      </div>
      <div id="quality-swiper-p1" class="swiper-pagination"></div>
      <div class="swiper-line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QualitySwiper',
  props: {
    swiperList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      timeIndex: 2,
      swiperBanner: null,
      swiperIndex: 0,
      currentIndex: 0
    }
  },
  mounted () {
    const _this = this
    console.log(_this.swiperList)
    const Swiper = window.Swiper
    /* eslint-disable no-new */
    this.qualitySwiper = new Swiper('#qualityswiper', {
      // on: {
      //   slideChange () {
      //     const prizep = document.getElementById('quality-swiper-p1')
      //     prizep.onscroll = function () {
      //       console.log(prizep.scrollTop)
      //     }
      //     if (this.realIndex >= 7) {
      //       prizep.scrollTop = 160
      //     } else if (this.realIndex == 0) {
      //       prizep.scrollTop = 0
      //     }
      //   }
      // },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      loop: true,
      observer: true, // 修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, // 修改swiper父元素时，自动初始化swiper
      direction: 'vertical',
      pagination: {
        el: '#quality-swiper-p1',
        clickable: true,
        renderBullet (index, className) {
          return (
            '<span class="' +
            className +
            '">' +
            '<p>' +
            _this.swiperList[index].Desc +
            '</p>' +
            '</span>'
          )
        }
      }
    })
  },
  methods: {}
}
</script>
<style lang="scss">
.quality-swiper {
  width: 15rem;
  height: 100%;

  #qualityswiper {
    width: 100%;
    height: 100%;
    position: relative;
    padding-bottom: 0.1rem;
    .swiper-wrapper {
      margin-left: 8.5rem;
      padding-bottom: 0.5rem;
      .swiper-slide {
        text-align: center;
        font-size: 18px;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        width: 5.9rem !important;
        height: 100% !important;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        overflow: hidden;
        img {
          display: block;
          height: 5.9rem !important;
        }
      }
      .intellSlide {
        height: 4.1rem !important;
      }
    }
    #quality-swiper-p1 {
      left: 1.1rem !important;
      width: 8.1rem;
      z-index: 999 !important;
      height: 3.5rem;
      padding-left: 0.2rem;
      overflow: auto;
      overflow-y: hidden;
      overflow-x: hidden;
      padding-top: 0.2rem;
      .swiper-pagination-bullet {
        width: 0.12rem !important;
        height: 0.12rem !important;
        margin-bottom: 0.38rem;
        font-size: 0.25rem;
        display: flex;
        z-index: 999 !important;
        background-color: #2647c8 !important;
        opacity: 1 !important;
        position: relative;
        p {
          position: absolute;
          width: 8rem;
          display: inline-block;
          text-align: left;
          margin-left: 0.5rem;
          margin-top: -0.1rem;
          color: #222222 !important;
          font-size: 0.24rem;
        }
      }
      .swiper-pagination-bullet-active {
        width: 0.12rem !important;
        height: 0.12rem !important;
        background-color: #2647c8 !important;
        p {
          color: $--color-primary !important;
        }
      }
    }
    .swiper-line {
      position: absolute;
      top: 0.32rem;
      left: 1.34rem;
      height: 3.5rem;
      width: 0.04rem;
      background-color: $--color-primary;
    }
    .intellDesc {
      top: 0.62rem;
    }
    .active {
      color: $--color-primary;
    }
  }
}
.intellSwiper {
  height: 4.1rem;
}
#quality-swiper-p1 .swiper-pagination-bullet-active::after {
  content: '';
  position: absolute;
  top: -0.11rem;
  left: -0.12rem;
  width: 0.35rem;
  height: 0.35rem;
  background-color: #1457fe;
  border-radius: 50%;
  opacity: 0.4;
  z-index: -99;
}
</style>
