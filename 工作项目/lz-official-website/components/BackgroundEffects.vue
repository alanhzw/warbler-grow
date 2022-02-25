<template>
  <div class="effects">
    <!--    <bubble-effect />-->
    <!--    <rain-line-effect />-->
    <wave-effects />
  </div>
</template>

<script>
import WaveEffects from '@/components/WaveEffect'
// import RainLineEffect from '@/components/RainLineEffect'
// import BubbleEffect from '@/components/BubbleEffect'

export default {
  name: 'BackgroundEffects',
  components: {
    // RainLineEffect,
    // BubbleEffect,
    WaveEffects
  }
}
</script>

<style lang="scss" scoped>
</style>
