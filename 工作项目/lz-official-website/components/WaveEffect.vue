<template>
  <div class="wave-effects">
    <svg
      class="wave"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
      shape-rendering="auto"
    >
      <defs>
        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g class="parallax">
        <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
        <!--          <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />-->
        <!--          <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />-->
        <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'WaveEffects'
}
</script>

<style lang="scss" scoped>

.wave-effects {
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
  height: 3rem;
  transform: translate3d(0, 0, 0);

  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%
  }
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
}

.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 6s;
}

.parallax > use:nth-child(2) {
  animation-delay: -7s;
  animation-duration: 9s;
  animation-direction: reverse;
}

.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}

.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 17s;
  animation-direction: reverse;
}

@keyframes move-forever {
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
}
</style>
