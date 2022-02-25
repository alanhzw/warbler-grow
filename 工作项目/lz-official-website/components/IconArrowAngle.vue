<template>
  <div class="icon-arrow-angle" :class="arrowClass">
    <img v-show="reverse" src="/images/icons/icon-arrow-angle-right.png" alt="陆泽科技">
    <img v-show="!reverse" src="/images/icons/icon-arrow-angle-right-withe.png" alt="陆泽科技">
  </div>
</template>

<script>
export default {
  name: 'IconArrowAngle',
  props: {
    reverse: {
      type: Boolean,
      default: false
    },
    /*
    top
    down
    left
    right
    * */
    direction: {
      type: String,
      default: ''
    }
  },
  computed: {
    arrowClass () {
      return `icon-arrow-angle-${this.direction}` + (this.reverse ? ' is-reverse' : '') + (this.block ? ' is-block' : '')
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-arrow-angle {
  width: 0.7rem;
  height: 0.7rem;
  position: relative;
  border-radius: 100%;
  background-color: $--color-primary;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 0.17rem;
  }

  &.is-reverse {
    background-color: $--color-white;
  }

  &.icon-arrow-angle-top {
    transform: rotate(-90deg);
  }

  /*default*/
  &.icon-arrow-angle-right {
  }

  &.icon-arrow-angle-down {
    transform: rotate(90deg);
  }

  &.icon-arrow-angle-left {
    transform: rotate(180deg);
  }
}
</style>
