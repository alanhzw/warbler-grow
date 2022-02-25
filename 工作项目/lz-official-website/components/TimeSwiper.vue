<template>
  <div class="time-swiper">
    <div id="time-swiper-container" class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) in timeAxis"
          :key="index"
          class="swiper-slide"
        >
          <p class="year">{{ item.year }}</p>
          <div class="content-right">
            <p>{{ item.content }}</p>
            <p class="content2">{{ item.content2 }}</p>
            <p class="content3">{{ item.content3 }}</p>
          </div>
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div id="time-pagination" class="swiper-pagination"></div>
      <div class="swiper-line">
        <ul class="swiper-point">
          <li>
            <p class="swiper-year wow fadeInUp" data-wow-delay="0.3s">2009</p>
            <div class="my_timeline_node" @click="changeActive(1)"></div>
          </li>
          <li>
            <p class="swiper-year wow fadeInUp" data-wow-delay="0.7s">2016</p>
            <div class="my_timeline_node" @click="changeActive(2)"></div>
          </li>
          <li>
            <p class="swiper-year wow fadeInUp" data-wow-delay="0.9s">2018</p>
            <div class="my_timeline_node" @click="changeActive(3)"></div>
          </li>
          <li>
            <p class="swiper-year wow fadeInUp" data-wow-delay="1.2s">2019</p>
            <div class="my_timeline_node" @click="changeActive(4)"></div>
          </li>
          <li>
            <p class="swiper-year wow fadeInUp" data-wow-delay="1.5s">2020</p>
            <div class="my_timeline_node" @click="changeActive(5)"></div>
          </li>
          <li>
            <p class="swiper-year wow fadeInUp" data-wow-delay="1.8s">2021</p>
            <div class="my_timeline_node" @click="changeActive(6)"></div>
          </li>
        </ul>
        <div class="another-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimeSwiper',
  props: {
    timeAxis: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      lineIndex: 0,
      swiperBanner: null,
      timeLineList: [
        {
          timestamp: '2009'
        },
        {
          timestamp: '2016'
        },
        {
          timestamp: '2018'
        },
        {
          timestamp: '2019'
        },
        {
          timestamp: '2020'
        },
        {
          timestamp: '2021'
        }
      ]
    }
  },
  mounted () {
    const _this = this
    const Swiper = window.Swiper
    /* eslint-disable no-new */
    this.timeSwiper = new Swiper('#time-swiper-container', {
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      loop: true,
      observer: true, // 修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, // 修改swiper父元素时，自动初始化swiper
      pagination: {
        el: '#time-pagination',
        type: 'progressbar',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      on: {
        slideChange () {
          _this.lineIndex = this.realIndex
        }
      }
    })
  },
  methods: {
    changeActive (index) {
      this.timeSwiper.slideTo(index)
    }
  }
}
</script>
<style lang="scss">
.time_swiper {
}
.swiper {
  width: 16.49rem;
  height: 3rem;
  margin: 0 auto;
  margin-top: -0.7rem;
  overflow: hidden;
  border-radius: 0.1rem;
  .swiper-slide {
    position: relative;
    text-align: center;
    font-size: 0.32rem;
    border-radius: 0.1rem;
    background-color: #fff;
    color: #6f747c;
    width: 100% !important;
    height: 100% !important;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    .year {
      color: #2647c8;
      font-size: 1.45rem;
      font-weight: bold;
      opacity: 0.1;
      margin-right: 0.3rem;
    }
    .content-right {
      text-align: left;
      p {
        font-size: 0.32rem;
        color: #6f747c;
        margin-bottom: 0.1rem;
      }
    }
  }
  .swiper-pagination {
    margin-top: 4.32rem;
    margin-left: 0.58rem;
    width: 14rem !important;
    height: 0.1rem !important;
    background-color: #fff !important;
    border-radius: 0.05rem;
    overflow: hidden;
  }
  .swiper-line {
    position: absolute;
    top: 3.4rem;
    left: 2.7rem;
    z-index: 99;
    ul {
      display: flex;
      z-index: 66;
      :last-child {
      }
      .my_timeline_node {
        width: 0.2rem;
        height: 0.2rem;
        background-color: #5b79ef;
        border: 0.04rem solid #ffffff;
        border-radius: 50%;
        margin-right: 2.05rem;
        cursor: pointer;
      }
      p {
        font-size: 0.48rem;
        color: #eef3fd;
        margin-bottom: 0.47rem;
        margin-left: -0.3rem;
      }
    }
    .another-line {
      position: absolute;
      top: 0.92rem;
      right: -0.04rem;
      width: 2.16rem;
      height: 0.1rem;
      background-color: #ffffff;
      border-radius: 0 0.05rem 0.05rem 0;
      z-index: -999;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    top: 53% !important;
    width: 0.38rem !important;
    height: 0.38rem !important;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden !important;
    text-align: center;
    line-height: 0.38rem;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    object-fit: cover;
  }
}
.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 0.16rem !important;
  font-weight: 900;
}
.swiper-pagination-progressbar .swiper-pagination-progressbar-fill {
  background: #c8d3fd !important;
}
</style>
