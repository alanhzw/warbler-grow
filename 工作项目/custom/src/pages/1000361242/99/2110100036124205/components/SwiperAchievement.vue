<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in achievementGiftArr" :key="index">
        <img :src="item" style="width: 6.73rem"/>
        <div class="draw-btn" :style="[index === 0?'color:#4c6711':index ===1?'color:#6f3f18':'color:#1f5465']"
             style="top:3.2rem" @click="toDraw(0)"
             :class="giftArr[0].status === 3 && myLevel === activeIndex? '':'gray'">
          去领取
        </div>
        <div class="draw-btn" :style="[index === 0?'color:#4c6711':index ===1?'color:#6f3f18':'color:#1f5465']"
             style="top:5.9rem" @click="toDraw(1)"
             :class="giftArr[1].status === 3 && myLevel === activeIndex? '':'gray'">
          去领取
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Swiper from 'swiper';
import { Toast } from 'vant';
import { defineEmits, defineProps, nextTick, onMounted, ref, watch } from 'vue';
import { achievementGiftArr } from '../assets/ts/imgUrl';

const props = defineProps({ stateIndex: Number, myLevel: Number, giftArr: Array });
const emit = defineEmits(['switchStateIndex', 'toDrawGift']);

const mySwiper = ref();
const activeIndex = ref(0);

const initSwiper = () => {
  mySwiper.value = new Swiper('.swiper-container', {
    spaceBetween: 0,
    on: {
      slideChange() {
        emit('switchStateIndex', this.activeIndex);
        activeIndex.value = this.activeIndex;
      },
    },
  });
};

// 点击去领取
const toDraw = (index: number) => {
  const data = props.giftArr[index];
  // 点击的当前等级等于swiper当前页
  if (props.myLevel === activeIndex.value) {
    if (data.status === 3) {
      emit('toDrawGift', data);
    } else if (data.status === 1) {
      Toast('您已领取过奖品！');
    } else if (data.status === 2) {
      Toast('奖品已被领光了！');
    } else {
      Toast('您不符合条件！');
    }
  } else {
    Toast('您不符合领取等级！');
  }
};

watch(() => props.stateIndex, (newValue, oldValue) => {
  nextTick(() => {
    mySwiper.value.slideToLoop(props.stateIndex);
  });
});

onMounted(() => {
  initSwiper();
  mySwiper.value.slideToLoop(props.stateIndex);
});

</script>

<style lang='scss' scoped>
.swiper-container {
  margin-top: .3rem;

  .swiper-slide {
    text-align: center;
    position: relative;

    .draw-btn {
      width: 1.73rem;
      height: .52rem;
      line-height: .52rem;
      background: url("../assets/img/draw-btn-bg.png") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      font-size: .3rem;
      left: .9rem
    }
  }
}
</style>
