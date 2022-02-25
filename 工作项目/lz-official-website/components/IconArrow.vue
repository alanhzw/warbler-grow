<template>
  <div class="icon-arrow " :class="arrowClass">
    <div class="point point-1"></div>
    <div class="point point-2"></div>
    <div class="point point-3"></div>
    <div class="point point-4"></div>
    <div class="point point-5"></div>
    <div class="point point-6"></div>
    <div class="point point-7"></div>
    <div class="point point-8"></div>
    <div class="point point-9"></div>
  </div>
</template>

<script>
export default {
  name: 'IconArrow',
  props: {
    /*
    top
    down
    left
    right
    * */
    direction: {
      type: String,
      default: ''
    },
    reverse: Boolean,
    block: Boolean
  },
  computed: {
    arrowClass () {
      return `icon-arrow-${this.direction}` + (this.reverse ? ' is-reverse' : '') + (this.block ? ' is-block' : '')
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-arrow {
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  vertical-align: middle;

  .point {
    width: 0.06rem;
    height: 0.06rem;
  }

  width: .18rem;
  height: .18rem;

  &.is-block {
    display: grid;
    margin: auto;
  }
}

.icon-arrow-left {
  .point-2, .point-4, .point-8 {
    background-color: $--color-primary;
  }

  &.is-reverse {
    .point-2, .point-4, .point-8 {
      background-color: $--color-white;
    }
  }
}

.icon-arrow-right {
  .point-2, .point-6, .point-8 {
    background-color: $--color-primary;
  }

  &.is-reverse {
    .point-2, .point-6, .point-8 {
      background-color: $--color-white;
    }
  }
}

.icon-arrow-top {
  .point-2, .point-4, .point-6 {
    background-color: $--color-primary;
  }

  &.is-reverse {
    .point-2, .point-4, .point-6 {
      background-color: $--color-white;
    }
  }
}

.icon-arrow-down {
  .point-1, .point-3, .point-5 {
    background-color: $--color-primary;
  }

  &.is-reverse {
    .point-1, .point-3, .point-5 {
      background-color: $--color-white;
    }
  }
}
</style>
