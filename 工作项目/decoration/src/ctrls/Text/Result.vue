<template>
  <div class="ctrl-text-result" :class="{mb15: data.mb15}" @click="go2Link($event)" v-lz-click='100' v-lz-floor="floorInfo">{{data.text}}</div>
</template>
<script>
export default {
  name: 'CtrlTextResult',
  props: {
    data: {
      default: () => ({}),
    },
    floorInfo: {
      default: () => ({}),
    },

  },
  methods: {
    go2Link(evt) {
      if (typeof this.data.link === 'string' && this.data.link !== '') {
        window.location.href = this.data.link;
        // this.beforeLeave(this.data.link, evt)
      }
    },
  },
};
</script>
<style lang="scss">
@import '../style/common_ctrl';

.ctrl-text-result {
  @extend .ctrl;
  padding: 0.4rem;
  font-size: 0.32rem;
  text-align: left;
  display: flex;
  align-items: center;
  word-break: break-word;
  white-space: pre-line;
}
</style>
