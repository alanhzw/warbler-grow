<template>
  <div class="images-list wow zoomIn" data-wow-delay="0.3s">
    <div id="swiper1" class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) in imagelist"
          :key="index"
          class="swiper-slide"
        >
          <img :src="item.ImgUrl" alt="">
        </div>
      </div>
      <!-- Add Pagination -->
      <div id="swiper-p1" class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageCarousel',
  props: {
    imagelist: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      timeIndex: 2,
      swiperBanner: null,
      timeLineList: [
        {
          timestamp: '2009年',
          info: 'chengli'
        },
        {
          timestamp: '2018年',
          info: '成为京东服务商'
        },
        {
          timestamp: '2019年',
          info: '成为京东服务商1'
        },
        {
          timestamp: '2020年',
          info: '成为京东服务商2'
        },
        {
          timestamp: '2021年',
          info: '成为京东服务商4'
        },
        {
          timestamp: '2021',
          info: '成为京东服务商4'
        }
      ]
    }
  },
  mounted () {
    const Swiper = window.Swiper
    console.log(this.imagelist)
    /* eslint-disable no-new */
    this.imageCarousel = new Swiper('#swiper1', {
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      loop: true,
      observer: true, // 修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, // 修改swiper父元素时，自动初始化swiper
      spaceBetween: 30,
      pagination: {
        el: '#swiper-p1',
        clickable: true
      }
    })
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.images-list {
  width: 44.5%;
  height: 100%;
  border-radius: 0.1rem;
  .img-item {
    height: 100%;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
    border-radius: 0.05rem;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    width: 7.76rem;
    height: 100%;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    border-radius: 0.05rem;
    overflow: hidden;
    img {
      display: block;
      width: 7.76rem;
      object-fit: cover;
      border-radius: 0.05rem;
    }
  }
}
</style>
