<template>
  <div class="guide">
    <div class="strokes">
      <img class="stroke stroke1" src="../assets/stroke1.png" />
      <img class="stroke stroke2" src="../assets/o.png" />
      <img class="stroke stroke3" src="../assets/stroke3.png" />
      <transition leave-active-class="animate__animated animate__fadeOut">
        <img class="logo" src="../assets/logo@x4.png" v-show="state === 0"/>
      </transition>
    </div>
    <div
      v-show="state > 0"
      class="welcome animate__animated animate__fadeIn"
      ref="welcomeRef"
    >
      <div class="video-wrapper" :class="{ 'full-screen': state > 1 }">
        <video
          ref="videoRef"
          v-show="videoLoaded"
          loop
          muted
          playsinline
          autoplay
          preload="auto"
          x5-video-player-type="h5"
          webkit-playsinline
          class="video"
          src="../assets/video.mp4"
        ></video>
      </div>
      <div class="title">改写您的<br />肌肤命运</div>
      <img
        class="arrow-down"
        :class="{ visiable: videoLoaded }"
        src="../assets/arrow-down.png"
      />
      <button
        v-if="state === 3 && !isOpenCarded"
        class="btn-register bg-skii-red"
        @click="registerPromptShow = true"
      >
        注册
      </button>
    </div>
    <van-popup
      v-model:show="registerPromptShow"
      round
      closeable
      position="bottom"
    >
      <register-agree @reg="onRegClick" />
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import {
  inject, nextTick, onMounted, ref, Ref,
} from 'vue';
import Hammer from 'hammerjs';
import { Popup as VanPopup } from 'vant';
import RegisterAgree from '../components/RegisterAgree.vue';

// 动画状态： 0-页面初始，1-三个笔画画完，2:  3: 视频已全屏
const state: Ref<number> = ref(0);

// 视频文件是否加载完毕
const videoLoaded: Ref<boolean> = ref(true);

// 是否显示注册协议同意勾选pop
const registerPromptShow: Ref<boolean> = ref(false);

// video元素
const videoRef: Ref<HTMLMediaElement | null> = ref(null);

const welcomeRef: Ref<HTMLElement | null> = ref(null);

// 是否开卡表示是否注册
const isOpenCarded = inject('isOpenCard');

const earn = inject('earn');

// 视频放大升->高全屏
const zoomUp = () => {
  videoLoaded.value = true;
};

// 点击注册
const onRegClick = () => {
  console.log('注册按钮点击');
  window.location.href = `https://shopmember.m.jd.com/shopcard?venderId=1000009821&shopId=1000009821&venderType=1&channel=7002&returnUrl=${window.location.href}`;
  registerPromptShow.value = false;
};

const entry = () => {
  const $strokes = document.querySelector('.strokes .stroke3');

  if ($strokes) {
    $strokes.addEventListener('webkitAnimationEnd', (event: any) => {
      state.value = 1;
    }, { passive: false });
  }

  // 页面加载完毕3秒之后，笔画画完，红色铺满全屏
  // setTimeout(() => {
  //   console.log('state.value = 1');
  // }, 4000);

  if (videoRef.value) {
    // 监听视频可播放时展示视频
    // ! 这个事件在ios中不响应。。。
    videoRef.value.oncanplay = zoomUp;
    videoRef.value.onloadeddata = zoomUp;
    videoRef.value.ondurationchange = zoomUp;
  }

  if (welcomeRef.value) {
    const hammer = new Hammer(welcomeRef.value);
    // 允许垂直方向的swipe
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    // 监听上划
    hammer.on('swipeup', () => {
      // 笔画图完，并且视频加载完毕，
      if (state.value === 1 && videoRef.value && videoLoaded.value) {
        // 视频从屏幕底部过度到全屏
        state.value = 2;
        // 开始播放视屏
        videoRef.value.play();
        // 1秒后视频铺满全屏
        setTimeout(() => {
          state.value = 3;
          hammer.get('swipe').set({ enable: false });
          document.body.className = 'unlock';
          // 页面可以滚动
        }, 1500);
      }
    });
  }
};

const scrollToEarn = () => {
  const $app = document.getElementById('app');
  const $earn = document.getElementById('earn');
  if ($app && $earn) {
    const earnTop: number = $earn.offsetTop as number;
    $app.scrollTo(0, earnTop);
  }
};

onMounted(() => {
  if (earn) {
    document.body.className = 'unlock';
    state.value = 3;
    nextTick(scrollToEarn);
  } else {
    document.body.className = 'lock';
    nextTick(entry);
  }
});
</script>

<style lang="scss">

$SKII_RED: #ea0429;
$WHITE: #ffffff;

@keyframes guide-frames {
  to {
    background-color: $SKII_RED;
  }
}

.guide {
  height: 100vh;
  animation: guide-frames 0s linear 2.4s 1 normal forwards;
  animation-duration: 400ms;

  .strokes {
    .stroke {
      position: absolute;
    }

    .stroke1 {
      width: 3.75rem;
      height: 6.325rem;
      animation: stroke1-frames 1s ease 0s 1 normal forwards;
    }

    @keyframes stroke1-frames {
      0% {
        left: 100%;
        top: 0;
      }
      100% {
        left: 0;
        top: -24.27vw;
      }
    }

    .stroke2 {
      width: 10.79rem;
      height: 10.38rem;
      left: -2.13rem;
      animation: stroke2-frames 2s ease 0s 1 normal forwards;
    }

    @keyframes stroke2-frames {
      0% {
        opacity: 0;
      }
      49% {
        opacity: 0;
      }
      50% {
        opacity: 1;
        top: -5.78rem;
        transform: rotate(228.23deg);
      }
      100% {
        opacity: 1;
        top: -4.74rem;
        transform: rotate(148.23deg);
      }
    }

    .stroke3 {
      width: 9.17rem;
      top: 0;
      animation: stroke3-frames 3s ease 0s 1 normal forwards;
    }

    @keyframes stroke3-frames {
      0% {
        opacity: 0;
      }
      67% {
        opacity: 0;
      }
      68% {
        opacity: 1;
        left: 100%;
      }
      100% {
        left: -1.62rem;
        top: -3.38rem;
      }
    }

    .logo {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 1.875rem;
      height: 0.37rem;
    }
  }

  .welcome {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @keyframes video-wrapper-frames {
      0% {
        top: 90vh;
        width: 80vw;
      }
      50% {
        top: 40vh;
        width: 100vw;
      }
      100% {
        top: 0;
        width: 100vw;
      }
    }

    .video-wrapper {
      position: absolute;
      top: 90vh;
      left: 50%;
      width: 80vw;
      transform: translateX(-50%);
      height: 100vh;
      overflow: hidden;
      transition: all 1s ease;
      background: url('../assets/slice-video.jpg') no-repeat center center;
      background-size: cover;

      &.full-screen {
        top: 0;
        width: 100vw;
        animation: video-wrapper-frames 1s linear 0s 1 normal forwards;
      }

      .video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .title {
      color: $WHITE;
      font-size: 0.4rem;
      line-height: 0.44rem;
      z-index: 1;
    }

    .arrow-down {
      z-index: 1;
      width: 0.21rem;
      visibility: hidden;
      transform: translateY(1rem);
      &.visiable {
        visibility: visible;
      }
    }

    .btn-register {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0.72rem;
      background-color: $SKII_RED;
      border: 0;
      font-size: 0.16rem;
      font-weight: 600;
      color: $WHITE;
    }
  }
}
</style>
