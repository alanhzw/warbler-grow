<template>
  <div class="banner-list">
    <div id="swiperBanner" class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="container">
            <div class="banner-item banner-item-1">
              <h1>全域消费者增长服务商</h1>
              <p>
                聚焦零售电商消费者运营<br>通过品牌消费者增长，带动品牌生意增长
              </p>
              <img class="banner" src="/images/carousel01.png">
              <img src="/images/hexagon.png" class="hexagon hexagon-1">
              <img src="/images/hexagon.png" class="hexagon hexagon-2">
              <img src="/images/hexagon.png" class="hexagon hexagon-3">
            </div>
          </div>
        </div>
        <!--        <div class="swiper-slide">-->
        <!--          <div class="container">-->
        <!--            <div class="banner-item banner-item-1">-->
        <!--              <h1>消费者增长营销解决方案</h1>-->
        <!--              <p>-->
        <!--                以用户为中心数字化赋能用户增长，以数据做驱动智能化解决营销难题<br>为品牌提供全域、全链路、全场景的营销运营服务-->
        <!--              </p>-->
        <!--              <img class="banner" src="/images/carousel01.png">-->
        <!--              <img src="/images/hexagon.png" class="hexagon hexagon-1">-->
        <!--              <img src="/images/hexagon.png" class="hexagon hexagon-2">-->
        <!--              <img src="/images/hexagon.png" class="hexagon hexagon-3">-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <div class="swiper-slide">-->
        <!--          <div class="container">-->
        <!--            <div class="banner-item banner-item-1">-->
        <!--              <h1>消费者增长营销解决方案</h1>-->
        <!--              <p>-->
        <!--                以用户为中心数字化赋能用户增长，以数据做驱动智能化解决营销难题<br>为品牌提供全域、全链路、全场景的营销运营服务-->
        <!--              </p>-->
        <!--              <img class="banner" src="/images/carousel01.png">-->
        <!--              <img src="/images/hexagon.png" class="hexagon hexagon-1">-->
        <!--              <img src="/images/hexagon.png" class="hexagon hexagon-2">-->
        <!--              <img src="/images/hexagon.png" class="hexagon hexagon-3">-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
      <!--      <div class="swiper-pagination custom-swiper-pagination"></div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'BannerCarousel',
  data () {
    return {
      swiperBanner: null
    }
  },
  mounted () {
    const Swiper = window.Swiper
    /* eslint-disable no-new */
    this.swiperBanner = new Swiper('#swiperBanner', {
      // speed: 4000,
      // autoplay: {
      //   delay: 3000
      // },
      // pagination: {
      //   el: '.swiper-pagination'
      // }
    })
  },
  beforeDestroy () {
    if (this.swiperBanner) {
      this.swiperBanner = null
    }
  }
}
</script>
<style lang="scss" scoped>
.banner-list {

  padding-top: 2.06rem;

  .banner-item {
    text-align: center;
    color: $--color-white;
    width: 17rem;
    height: 11.58rem;

    h1 {
      font-size: .6rem;

    }

    p {
      font-size: .24rem;
      line-height: .42rem;
      height: .65rem;
      margin-top: .5rem;
    }

    .banner {
      margin-top: .62rem;
      width: 10.15rem;
      height: 7.86rem;
    }
  }

  .hexagon-1 {
    position: absolute;
    top: 1.67rem;
    left: 1.41rem;
    width: .38rem;
    height: .45rem;
  }

  .hexagon-2 {
    position: absolute;
    top: 4.38rem;
    left: 3.03rem;
    width: .62rem;
    height: .74rem;
  }

  .hexagon-3 {
    position: absolute;
    top: 3.08rem;
    right: 1.75rem;
    width: .62rem;
    height: .74rem;
  }
}

</style>
<style lang="scss">

.custom-swiper-pagination {
  bottom: .9rem !important;

  .swiper-pagination-bullet {
    width: .10rem;
    height: .10rem;
    background-color: #9ca7b6;
    border-radius: .05rem;
  }

  .swiper-pagination-bullet-active {
    transition: all 300ms linear;
    width: .60rem;
    height: .10rem;
    background-color: $--color-primary;
    border-radius: 0.05rem;
  }
}
</style>
