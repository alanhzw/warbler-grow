<template>
  <div id="scrollName" class="num-wrapper" :class="{zero: value===0, in: earn}" v-scrollIn>
    <div
        class="word"
        v-for="(digit, index) in digits"
        :key="`digit${index}`"
        :style="{fontSize: fontSize}"
        :class="{'animate-end': value===0}"
      >
      <div class="wheel" :class="'scrolling-'+digit">
        <template v-for="g in 2">
          <div class="num" :key="g*i" v-for="i in 10">{{ i - 1 }}</div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {
  computed, defineComponent, inject, nextTick, onMounted,
} from 'vue';

export default defineComponent({
  props: {
    value: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const earn = inject('earn');
    const digits = computed(() => props.value.toString().split(''));
    // console.log('digits.length', digits.value.length);
    const fontSize = computed(() => {
      let f = 3.8 / digits.value.length;
      if (f > 0.8) {
        f = 0.8;
      }
      return `${f}rem`;
    });

    onMounted(() => {
      nextTick(() => {
        const $scrollName = document.getElementById('scrollName');
        if ($scrollName) {
          $scrollName.addEventListener('webkitAnimationEnd', (event: any) => {
            // eslint-disable-next-line no-param-reassign
            event.target.parentElement.classList.add('animate-end');
          }, { passive: false });
        }
      });
    });

    return {
      digits,
      fontSize,
      earn,
    };
  },
});
</script>

<style lang="scss" scoped>
$number-speed: 10;
$number-height: 0.8rem;
$animation-duration: 5000ms;
$skii-color: #EA0429;
$font-size: 0.814321rem;
$webkit-mask-image: -webkit-gradient(linear,
  50% 20%, 50% 80%,
  color-stop(0, rgba(255, 255, 255, 0)),
  color-stop(0.5, #EA0429),
  color-stop(1, rgba(255, 255, 255, 0))
);

.num-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &.in {
    .word {
      display: block;
      -webkit-mask: $webkit-mask-image;
      -webkit-mask-position: center center;
      -webkit-mask-size: 100% 100%;
      -webkit-mask-repeat: no-repeat;
    }
  }

  .animate-end {
    -webkit-mask: -webkit-gradient(linear, 50% 0%, 50% 100%,
      color-stop(0, rgba(255, 255, 255, 0)),
      color-stop(10%, rgba(255, 255, 255, 0)),
      color-stop(20%, rgba(255, 255, 255, 0)),
      color-stop(30%, rgba(255, 255, 255, 1)),
      color-stop(40%, rgba(255, 255, 255, 1)),
      color-stop(50%, #000000),
      color-stop(60%, rgba(255, 255, 255, 1)),
      color-stop(70%, rgba(255, 255, 255, 1)),
      color-stop(80%, rgba(255, 255, 255, 0)),
      color-stop(90%, rgba(255, 255, 255, 0)),
      color-stop(100%, rgba(255, 255, 255, 0))
    ) !important;
    -webkit-mask-position: center center  !important;
    -webkit-mask-size: 100% 100% !important;
    -webkit-mask-repeat: no-repeat !important;
  }

  .word {
    display: none;
    height: $number-height + 0.6rem;
    overflow: hidden;
    color: $skii-color;
    // font-size: $font-size;
    width: min-content;
    letter-spacing: -0.017963rem;
    position: relative;

    .wheel {
      width: min-content;
      font: inherit;
      word-break: break-all;
      text-align: center;
      word-wrap: anywhere;
      transform: translateY(0);
      letter-spacing: inherit;
      line-height: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 0.3rem;

      .num {
        height: $number-height;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
    }
  }

  &.zero{
    .word:first-child {
      .scrolling-0 {
        animation:none !important;
      }
    }
  }

  @for $i from 0 to 10 {
    .word:nth-child(#{$i}) .wheel {
      animation-delay: (9 - $i) * 100ms;
      animation-duration: $animation-duration - (500ms * $i);
    }
    .word .scrolling-#{$i} {
      animation-fill-mode: both;
      animation-timing-function: ease-in-out;
      animation-name: scrolling-#{$i};
    }

    @keyframes scrolling-#{$i} {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(0 - ($number-height * ($number-speed + $i)));
      }
    }
  }
}
</style>
