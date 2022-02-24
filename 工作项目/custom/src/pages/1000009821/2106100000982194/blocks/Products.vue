<template>
  <div class="products">
    <div>
      <header>使用“晶透水滴”<br/>兑换产品</header>
      <div class="swiper-container" ref="swiperRef">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(product, index) in products" :key="`product${index}-title`">
            <div class="img-wrapper" :class="{bag: index === 0}">
              <img :src="product.image" alt="">
            </div>
          </div>
        </div>
      </div>
      <nav>
        <li v-for="i in products.length" :key="`dot${i}`" :class="{active: i-1===activeIndex}"/>
      </nav>
      <div v-for="(product, index) in products" :key="`product${index}-title`"
           v-show="index==activeIndex" class="animate__animated animate__fadeInUp">
        <p class="product-name">{{ product.giftName }}</p>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">{{ product.point }}个“晶透水滴”</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  ref, onMounted, Ref, nextTick,
} from 'vue';
import Swiper from 'swiper';
import { cjwxRequest } from '@/utils/service';

// 展示的商品列表
const products = ref([]);

// 正在展示的商品索引
const activeIndex = ref(0);

const swiperRef: Ref<HTMLElement | null> = ref(null);

const initSwiper = () => {
  const cw = document.body.clientWidth;
  swiperRef.value.style.width = `${cw}px`;
  const mySwiper = new Swiper(swiperRef.value, {
    slidesPerView: 2,
    centeredSlides: true,
    spaceBetween: 300,
    grabCursor: true,
    on: {
      slideChange() {
        activeIndex.value = this.activeIndex;
      },
    },
  });
};

onMounted(() => {
  // console.log('🚀 ~ onMounted ~ mySwiper', mySwiper);
  // 获取礼品列表
  cjwxRequest.post('/wx/skii/memship/giftList', {
    pageSize: 50,
    pageNo: 1,
  }).then((res) => {
    console.log('获取礼品列表：', res);
    // 测试的时候，使用一个默认值
    if (res.result) {
      products.value = res.data.records;
      nextTick(initSwiper);
    }
  });
});

</script>

<style lang="scss" scoped>
$SKII_RED: #EA0429;
.products {
  display: flex;
  align-items: center;
  justify-content: center;

  header {
    font-size: 0.28rem;
    line-height: 0.32rem;
  }

  p {
    margin-top: 0;
    margin-bottom: 0;
  }

  .swiper-container {
    margin: 0.35rem auto 0.25rem;
    min-height: 2.6rem;
    .swiper-slide {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      .img-wrapper {
        border-radius: 100%;
        width: 2.6rem;
        height: 2.6rem;
        background-color: #FAFAFA;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        &.bag {
          background-color: #FAF5F0 !important;
        }

        img {
          max-width: 2rem;
          max-height: 2rem;
          flex-shrink: 0;
        }
      }
    }
  }

  nav {
    display: flex;
    justify-content: center;
    margin: 0.25rem;

    li {
      width: 0.04rem;
      height: 0.04rem;
      border: 0.005rem solid $SKII_RED;
      border-radius: 50%;
      box-sizing: border-box;
      margin: 0.04rem;

      &.active {
        background-color: $SKII_RED;
      }
    }
  }

  .product-name {
    font-size: 0.2rem;
    line-height: 0.22rem;
    margin-bottom: 0.05rem;
  }

  .product-description {
    font-size: 0.14rem;
    line-height: 0.14rem;
    margin-bottom: 0.05rem;
  }

  .product-price {
    font-size: 0.12rem;
    line-height: 0.16rem;
    color: $SKII_RED;
  }
}
</style>
