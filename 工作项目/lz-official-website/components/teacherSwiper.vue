<template>
  <div class="teacherSwiper">
    <div id="teacher-swiper" class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) in constructList"
          :key="index"
          class="swiper-slide"
          :class="{ analyseteacher: index == 4 || index == 5 }"
        >
          <div class="desc-hover">
            <p>{{ item.desc }}</p>
          </div>
          <img :src="item.profile" alt="" class="teacher-profile">
          <p class="teacher-name">{{ item.name }}</p>
          <img :src="item.identific" alt="" class="teacher-identific">
          <p class="teacher-position">{{ item.position }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeacherSwiper',
  props: {
    constructList: {
      type: Array,
      required: true
    },
    analystList: {
      type: Array,
      required: true
    }
  },
  mounted () {
    const Swiper = window.Swiper
    console.log(this.constructList)
    /* eslint-disable no-new */
    this.teacherSwiper = new Swiper('#teacher-swiper', {
      slidesPerView: 6,
      spaceBetween: 30,
      autoplay: {},
      loop: true,
      loopFillGroupWithBlank: true
    })
  }
}
</script>

<style lang="scss">
.teacherSwiper {
  width: 16.4rem;
  height: 4.4rem;
  overflow: hidden;
  padding-top: 0.7rem;
  padding-left: 0.8rem;
  #teacher-swiper {
    width: 100%;
    height: 100%;
    position: relative;
    .swiper-slide {
      display: block !important;
      text-align: center;
      font-size: 18px;
      background-color: #f5f4f9;
      width: 2.58rem !important;
      height: 100% !important;
      padding: 0.28rem 0.37rem 0 0.41rem;
      box-sizing: border-box;
      position: relative;
      border-radius: 0.05rem;
      &:hover {
        // box-shadow: 0 0.06rem 0.28rem 0 rgba(21, 22, 25, 0.09);
        background-color: #2040bf;
        opacity: 0.95;
        .desc-hover {
          opacity: 1;
        }
        .teacher-profile {
          opacity: 0.05;
        }
        .teacher-name,
        .teacher-identific,
        .teacher-position {
          opacity: 0;
        }
      }
      p,
      img {
        display: block;
      }
      .teacher-profile {
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 50%;
      }
      .teacher-name {
        margin: 0.24rem 0;
        color: #2647c8;
      }
      .teacher-identific {
        height: 0.28rem;
        width: 1.52rem;
        margin: 0 auto 0.21rem;
      }
      .teacher-position {
        line-height: 0.32rem;
      }
      .desc-hover {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        text-align: center;
        height: 4.5rem;
        line-height: 4.5rem;
        padding: 1.16rem 0.16rem 1.23rem 0.18rem;
        box-sizing: border-box;
        p {
          line-height: 0.24rem;
          font-size: 0.19rem;
          color: #ffffff;
          text-align: left;
          font-weight: 500;
        }
      }
    }
    .analyseteacher {
      position: relative;
      .teacher-identific {
        position: absolute;
        bottom: 1.2rem;
        left: 0.1rem;
        height: 0.26rem;
        width: 2.36rem;
        margin: 0 auto 0.21rem;
      }
      .teacher-position {
        margin-top: 0.7rem;
      }
    }

    .swiper-slide img {
      display: block;
      width: 100%;
      object-fit: cover;
    }
  }
}
</style>
