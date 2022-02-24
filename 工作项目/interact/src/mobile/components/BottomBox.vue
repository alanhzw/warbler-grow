<template>
  <div v-if="visible" class="bottom-box" @click="close">
    <div class="content" @click.stop>
      <header class="content-header">
        <span>{{ title }}</span>
        <img class="btn-close" @click="close" src="../../assets/btn-close.png" />
      </header>
      <section class="content-body">
        <slot></slot>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BottomBox',
  props: {
    title: {
      default: '',
    },
    visible: {
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    },
  },
};
</script>
<style lang="scss">
$BORD_RADIUS: 0.2rem;
.bottom-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .content {
    border-top-left-radius: $BORD_RADIUS;
    border-top-right-radius: $BORD_RADIUS;
    max-height: 80%;
    min-height: 40%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    .content-header {
      margin-top: -1px;
      height: 1.13rem;
      line-height: 1.13rem;
      font-size: 0.36rem;
      color: #ffffff;
      width: 100vw;
      background-image: url(../../assets/bg-bottom-box-header.png);
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      vertical-align: top;
      position: relative;
      .btn-close {
        position: absolute;
        height: 0.24rem;
        top: 0.3rem;
        right: 0.3rem;
      }
    }
    .content-body {
      padding: 0.3rem;
      flex: 1;
      overflow: auto;
      max-height: 50vh;
    }
  }
}
</style>
