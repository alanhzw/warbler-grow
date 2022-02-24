<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-06-16 10:00:55
 * @LastEditTime: 2021-08-10 16:52:00
 * @FilePath: \interact\src\mobile\modules\dettol\BottomBox.vue
-->
<template>
  <div v-if="visible"
       class="bottom-box-dettol"
       @click="close">
    <div class="content"
         @click.stop>
      <header class="content-header">
        <span class="title">{{ title }}</span>
        <img class="btn-close"
             @click="close"
             src="../../../assets/btn-close.png" />
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
.bottom-box-dettol {
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
    position: relative;
    border-top-left-radius: $BORD_RADIUS;
    border-top-right-radius: $BORD_RADIUS;
    max-height: 80%;
    min-height: 40%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #e1e1e1;
    .content-header {
      margin-top: -1px;
      height: 1.6rem;
      line-height: 1.13rem;
      font-size: 0.51rem;
      width: 100vw;
      background-image: url(../../../assets/dettol-pop-header.png);
      background-size: 100% 100%;
      background-position: center;
      background-repeat: no-repeat;
      vertical-align: top;
      .title {
        color: #42250d;
        margin-top: 0.9rem;
        position: absolute;
        transform: translate(-50%, -50%) rotate(-5deg);
      }

      .btn-close {
        position: absolute;
        height: 0.24rem;
        top: 0.3rem;
        right: 0.3rem;
        background-color: rgba(0,0,0,0.7);
        padding: 0.2rem;
        border-radius: 50%;

      }
    }
    .content-body {
      margin: 0.3rem;
      border-radius: 0.08rem;
      padding: 0.3rem;
      flex: 1;
      overflow: auto;
      max-height: 50vh;
      background-color: #f2f2f2;
    }
  }
}
</style>
