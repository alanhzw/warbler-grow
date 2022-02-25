<template>
  <div class="partner-section">
    <div class="scroll-wrapper">
      <vue-seamless-scroll
        :data="list"
        class="warp"
        :class-option="classOption1"
      >
        <ul class="ul-item">
          <li v-for="(item, index) in list" :key="index" class="li-item">
            <img :src="`/images/partner/logo${index+1}.png`">
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
    <div class="scroll-wrapper">
      <vue-seamless-scroll
        :data="list"
        class="warp"
        :class-option="classOption2"
      >
        <ul class="ul-item">
          <li v-for="(item, index) in list" :key="index" class="li-item">
            <img :src="`/images/partner/logo${index+1}.png`">
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PartnerSection',
  data () {
    return {
      list: [...Array(30).keys()],
      classOption1: {
        step: 0.5,
        direction: 2,
        hoverStop: false
      },
      classOption2: {
        step: 0.5,
        direction: 3,
        hoverStop: false
      }
    }
  },
  mounted () {

  },
  beforeDestroy () {

  }
}
</script>

<style lang="scss" scoped>
.partner-section {
  transform: translate3d(0, 0, 0);

  .scroll-wrapper {
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;

    &.ul-item {
      display: flex;

      .li-item {
        width: 120px;
        height: 120px;
        margin-right: 10px;
        background-color: $--color-white;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          max-height: 90%;
          max-width: 90%;
        }
      }
    }
  }

  .warp {
    width: 100%;
    height: 120px;
    margin: 0 auto;
    overflow: hidden;

  }
}
</style>
