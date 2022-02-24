<!--
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-04-13 14:00:04
 * @FilePath: \yunluzhuangxiu\src\ctrls\FloorTitle\Result.vue
-->
<template>
  <div class="ctrl-floor-title-result" :class="{mb15: data.mb15}" v-lz-click='100' v-lz-floor="floorInfo">
    <span class="title">{{data.text}}</span>
  </div>
</template>

<script>
export default {
  name: 'CtrlFloorTitleResult',
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
@import '~lz-crm/style/variables';

.ctrl-floor-title-result {
  text-align: center;
  font-size: 0.42rem;
  display: flex;
  align-items: center;
  word-break: break-word;
  color: $FONT_COMMON_GRAY;

  .title {
    padding: 0 0.1rem;
  }

  &:before,
  &:after {
    content: '';
    flex: 1;
    border-bottom: 1px solid $BORDER_GRAY;
    margin: 0 0.2rem;
  }
}
</style>
