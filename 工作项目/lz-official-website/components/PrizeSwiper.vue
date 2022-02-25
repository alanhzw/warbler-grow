<template>
  <div class="prize-quality-swiper">
    <div id="prizeswiper" class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) in swiperList"
          :key="index"
          class="swiper-slide"
        >
          <img :src="item.ImgUrl" alt="">
        </div>
      </div>
      <div id="prizePai" ref="prizep1" class="swiper-pagination"></div>
      <div class="swiper-line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrizeQualitySwiper',
  props: {
    swiperList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      timeIndex: 2,
      slideIndex: 0,
      swiperBanner: null,
      swiperIndex: 0,
      currentIndex: 0,
      isTopShade: false
    }
  },
  mounted () {
    const _this = this
    const Swiper = window.Swiper
    /* eslint-disable no-new */
    this.PrizeSwiper = new Swiper('#prizeswiper', {
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      loop: true,
      observer: true, // 修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, // 修改swiper父元素时，自动初始化swiper
      direction: 'vertical',
      pagination: {
        el: '#prizePai',
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
      },
      on: {
        slideChange () {
          const prizep = document.getElementById('prizePai')
          prizep.onscroll = function () {
            console.log(prizep.scrollTop)
          }
          console.log(this.realIndex)
          if (this.realIndex >= 8) {
            prizep.scrollTop = 280
          } else if (this.realIndex == 0) {
            prizep.scrollTop = 0
          }
        }
      }
    })
  },
  methods: {}
}
</script>
<style lang="scss">
.prize-quality-swiper {
  width: 15rem;
  height: 100%;
  position: relative;

  #prizeswiper {
    width: 100%;
    height: 100%;
    position: relative;
    padding-bottom: 0.1rem;
    .swiper-wrapper {
      margin-left: 9.1rem;
      // padding-bottom: 0.5rem;
      .swiper-slide {
        text-align: center;
        font-size: 18px;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        width: 4.03rem !important;
        height: 100% !important;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        img {
          display: block;
          width: 4.03rem !important;
        }
      }
      .intellSlide {
        height: 4.1rem !important;
      }
    }
    .swiper-pagination {
      left: 1.1rem !important;
      width: 8.1rem;
      z-index: 999 !important;
      height: 3.9rem;
      overflow: auto;
      overflow-y: hidden;
      overflow-x: hidden;
      padding-left: 0.2rem;
      padding-top: 0.1rem;
      -webkit-mask: -webkit-gradient(
        linear,
        50% 0%,
        50% 100%,
        color-stop(0, #ea0429),
        color-stop(0.1, #ea0429),
        color-stop(0.5, #ea0429),
        color-stop(0.89, #ea0429),
        color-stop(1, hsla(0, 0%, 100%, 0))
      );
      -webkit-mask-position: center center;
      -webkit-mask-size: 100% 100%;
      -webkit-mask-repeat: no-repeat;
      .swiper-pagination-bullet {
        width: 0.12rem !important;
        height: 0.12rem !important;
        margin-bottom: 0.38rem;
        font-size: 0.25rem;
        display: flex;
        z-index: 999 !important;
        background-color: #2647c8 !important;
        opacity: 1 !important;
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
        position: relative;
        p {
          color: $--color-primary !important;
        }
      }
    }
    .prizeSlide {
      height: 3.5rem;
    }
    .swiper-line {
      position: absolute;
      top: 1.15rem;
      left: 1.34rem;
      height: 4.1rem;
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
  .shadeBox {
    width: 8rem;
    height: 0.5rem;
    position: absolute;
    bottom: 0.45rem;
    left: 1.3rem;
    background-color: #ffffff;
    z-index: 9999;
    opacity: 0.95;
  }
  .noshade {
    display: none;
  }
}
.intellSwiper {
  height: 4.1rem;
}
#prizePai .swiper-pagination-bullet-active::after {
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
