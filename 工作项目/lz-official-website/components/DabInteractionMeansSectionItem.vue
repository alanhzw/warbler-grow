<template>
  <div :id="`productBSwiper${this.id}`" class="swiper-container swiper-container-inner">
    <div class="swiper-wrapper">
      <div
        v-for="(item,index) in items"
        :key="index"
        class="swiper-slide"
      >
        <div class="dab-item" :class="mediaPosition">
          <div class="media-body">
            <h3 class="title" v-text="item.title"></h3>
            <h4 class="targetTitle" v-text="item.targetTitle"></h4>
            <p class="targetContent" v-text="item.targetContent"></p>
            <h4 class="pointTitle" v-text="item.pointTitle"></h4>
            <p class="pointContent" v-text="item.pointContent"></p>
            <h4 class="methodTitle" v-text="item.methodTitle"></h4>
            <p class="methodContents">
              {{ item.methodContent|join }}
            </p>
          </div>
          <div class="media-image">
            <div v-for="(src,index) in item.images" :key="index" class="phone-container">
              <img :src="src">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Add Pagination -->
    <div
      id="dabSwiperPagination1"
      class="dab-swiper-pagination-inner swiper-pagination"
      :class="mediaPosition"
    ></div>
    <!-- Add Arrows -->
    <div class="swiper-button-next dab-swiper-swiper-button-next" :class="mediaPosition"></div>
    <div class="swiper-button-prev dab-swiper-swiper-button-prev" :class="mediaPosition"></div>
  </div>
</template>

<script>
export default {
  name: 'DabInteractionMeansSectionItem',
  filters: {
    join (val) {
      return val.join('，')
    }
  },
  props: {
    id: String,
    items: {
      type: Array,
      default () {
        return []
      }
    },
    mediaPosition: {
      type: String,
      default: 'right'
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(this.init, 1000)
    })
  },
  methods: {
    init () {
      this.swiper1 = new window.Swiper(`#productBSwiper${this.id}`, {
        navigation: {
          nextEl: `#productBSwiper${this.id} .swiper-button-next`,
          prevEl: `#productBSwiper${this.id} .swiper-button-prev`
        },
        pagination: {
          el: `#productBSwiper${this.id} .dab-swiper-pagination-inner`,
          clickable: true,
          renderBullet (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>'
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dab-item {
  width: 17rem;
  height: 7rem;
  font-size: 0.1rem;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  box-sizing: border-box;

  .media-body {
    width: 7rem;

    h3 {
      width: 3.8rem;
      font-size: 0.3rem;
      line-height: 0.48rem;
      color: $--color-primary;
      margin-bottom: 0.5rem;
    }

    h4 {
      font-size: 0.24rem;
      color: $--color-title;
      margin-bottom: 0.1rem;
      font-weight: 500;
    }

    p {
      font-size: 0.18rem;
      line-height: 0.36rem;
      color: $--color-text;
      margin-bottom: 0.3rem;
    }

    .methodContents {
      .methodContent {
      }
    }
  }

  .media-image {
    width: 6.23rem;
    height: 6rem;
    display: flex;
    align-items: stretch;
    justify-content: space-between;

    .phone-container {
      width: 3rem;
      background-image: url("/images/phone-bg.png");
      background-position: center center;
      background-size: 100% 100%;
      padding: 0.42rem 0.15rem 0.48rem 0.15rem;
      box-sizing: border-box;

      img {
        width: 100%;
        height: 100%;
        object-position: center top;
        object-fit: cover;
      }
    }
  }

  &.left {
    flex-direction: row-reverse;
  }

}
</style>

<style lang="scss">
.dab-swiper-pagination-inner {
  font-size: 0.32rem;
  position: absolute;
  bottom: 0.74rem !important;
  left: 0.94rem !important;
  right: 0.94rem !important;
  width: auto !important;
  text-align: left;

  &.left {
    text-align: right;
  }

  .swiper-pagination-bullet {
    width: 0.5rem;
    height: 0.5rem;
    color: $--color-primary;
    border: solid 0.03rem $--color-primary;
    font-size: 0.32rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    opacity: 1;
  }

  .swiper-pagination-bullet-active {
    background-color: $--color-primary;
    color: $--color-white;
    opacity: 1;
  }
}

.dab-swiper-swiper-button-next {
  color: #cccccc;

  &.left {
    right: unset !important;
    left: 7.5rem;
  }

  &.right {
    right: 0.38rem !important;
  }
}

.dab-swiper-swiper-button-prev {
  color: #cccccc;

  &.left {
    left: 0.38rem !important;
  }

  &.right {
    left: 9.15rem !important;
  }
}
</style>
