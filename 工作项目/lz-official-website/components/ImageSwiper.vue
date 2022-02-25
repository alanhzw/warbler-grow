<template>
  <div id="certify" class="wow fadeInUp">
    <div id="imageSwiper" class="swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(item, imgindex) in cultureimages"
          :key="imgindex"
          class="swiper-slide"
        >
          <img :src="item.ImgUrl" alt="">
        </div>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
export default {
  name: 'ImageSwiper',
  props: {
    cultureimages: {
      type: Array
    }
  },
  mounted () {
    const Swiper = window.Swiper
    console.log(this.cultureimages)
    /* eslint-disable no-new */
    this.imageSwiper = new Swiper('#imageSwiper', {
      watchSlidesProgress: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: true,
      loopedSlides: 3,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination'
        // clickable :true,
      },
      on: {
        progress (progress) {
          for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides.eq(i)
            const slideProgress = this.slides[i].progress
            let modify = 1
            if (Math.abs(slideProgress) > 1) {
              modify = (Math.abs(slideProgress) - 1) * 0.3 + 1
            }
            const translate = slideProgress * modify * 150 + 'px'
            const scale = 1 - Math.abs(slideProgress) / 5
            const zIndex = 999 - Math.abs(Math.round(10 * slideProgress))
            slide.transform(
              'translate(' + translate + ') scale(' + scale + ')'
            )
            slide.css('zIndex', zIndex)
            slide.css('opacity', 1)
            if (Math.abs(slideProgress) > 3) {
              slide.css('opacity', 0)
            }
          }
        },
        setTransition (swiper, transition) {
          for (let i = 0; i < this.slides.length; i++) {
            const slide = this.slides.eq(i)
            slide.transition(transition)
          }
        }
      }
    })
  }
}
</script>

<style>
#certify {
  position: relative;
  width: 15rem;
  height: 4.1rem;
  margin: 0 auto;
}

#certify .swiper {
  padding-bottom: 60px;
}

#certify .swiper-slide {
  width: 7.2rem;
  height: 4.07rem;
}
#certify .swiper-slide img {
  width: 100%;
  border-radius: 0.05rem;
}
#certify .swiper-slide p {
  line-height: 98px;
  padding-top: 0;
  text-align: center;
  color: #636363;
  font-size: 1.1em;
  margin: 0;
}

#certify .swiper-pagination {
  width: 100%;
  bottom: 20px;
}

#certify .swiper-pagination-bullets .swiper-pagination-bullet {
  margin: 0 5px;
  border: 3px solid #fff;
  background-color: #d5d5d5;
  width: 10px;
  height: 10px;
  opacity: 1;
}
#certify .swiper-button-prev,
#certify .swiper-button-next {
  top: 53% !important;
  width: 0.38rem !important;
  height: 0.38rem !important;
  background-color: #fff;
  border-radius: 50%;
  overflow: hidden !important;
  text-align: center;
  line-height: 0.38rem;
  border: 0.01rem solid #cccccc;
}
#certify .swiper-button-prev {
  left: -1rem;
}
#certify .swiper-button-next {
  right: -1rem;
}
#certify .swiper-button-prev:after,
#certify .swiper-button-next:after {
  font-size: 0.16rem !important;
  font-weight: 900;
  color: #cccccc;
}
</style>
