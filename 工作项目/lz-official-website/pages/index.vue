<template>
  <div v-cloak class="page-index">
    <!--轮播图-->
    <div class="carousel-wrapper">
      <background-effects />
      <banner-carousel />
    </div>
    <!--电商品牌如何重构增长，破局2021？-->
    <div class="caught-wrapper">
      <div class="container">
        <index-caught-section />
      </div>
    </div>
    <!--我们的能力-->
    <div class="abilities-wrapper">
      <div class="container">
        <index-abilities-section />
      </div>
    </div>
    <div class="bg">
      <!--我们的解决方案-->
      <div class="solution-wrapper">
        <div class="container">
          <index-solution-section />
          <!--          <index-solution-section2 />-->
        </div>
      </div>
      <!--选择我们的理由-->
      <div class="reason-wrapper">
        <div class="container">
          <index-reason-section />
        </div>
      </div>
      <!--合作伙伴-->
      <div class="partner-wrapper">
        <index-partner-section />
      </div>
    </div>
  </div>
</template>
<script>
import BannerCarousel from '@/components/BannerCarousel'
import IndexCaughtSection from '@/components/IndexCaughtSection'
import IndexAbilitiesSection from '@/components/IndexAbilitiesSection'
import IndexSolutionSection from '@/components/IndexSolutionSection'
import IndexReasonSection from '@/components/IndexReasonSection'
import IndexPartnerSection from '@/components/IndexPartnerSection'
import BackgroundEffects from '@/components/BackgroundEffects'

export default {
  components: {
    BackgroundEffects,
    IndexPartnerSection,
    IndexReasonSection,
    IndexSolutionSection,
    IndexAbilitiesSection,
    IndexCaughtSection,
    BannerCarousel
  },
  data () {
    return {}
  },
  mounted () {

  }
}
</script>
<style lang="scss" scoped>
.page-index {
  background-image: linear-gradient(180deg, #011992 0%, #2647c8 100%);
  background-size: 100% 10.8rem;
  background-repeat: no-repeat;
  min-height: 70rem;
  display: flow-root;

  .carousel-wrapper {
    height: 12.83rem;
    box-sizing: border-box;
    position: relative;
    background-position: left top;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .caught-wrapper {
    background-image: url("/images/bg/bg2.png"), url("/images/bg/bg3.png");
    background-repeat: no-repeat, no-repeat;
    background-size: 1.44rem 5.26rem, 7.51rem 7.89rem;
    background-position: left 1rem, right bottom;
    height: 9.1rem;
    display: flow-root;
    box-sizing: border-box;
    position: relative;
  }

  .abilities-wrapper {
    background-image: url("/images/bg/bg6.png"), url("/images/bg/bg5.png"), url("/images/bg/bg7.png"), url("/images/bg/bg4.png");
    background-repeat: no-repeat;
    background-size: 9.88rem 10.54rem, 10.12rem 10.70rem, 10.62rem 10.28rem, 10.25rem 16.58rem;
    background-position: left 11rem, right .1rem, right bottom, left 6.27rem;
    display: flow-root;
    height: 31.79rem;
    box-sizing: border-box;
    position: relative;
  }

  .bg {
    background-image: url("/images/bg/bg2.png"), url("/images/bg/bg3.png"), linear-gradient(180deg, #004ebf 0%, #3487f2 100%);
    background-repeat: no-repeat;
    background-size: 1.44rem 5.26rem, 7.51rem 7.89rem, 100% 100%;
    background-position: left 7.57rem, right 6.88rem, 0 0;
    padding-bottom: 1rem;
  }

  .solution-wrapper {
  }

  .reason-wrapper {
  }

  .partner-wrapper {
  }
}
</style>
