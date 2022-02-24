<template>
  <div class="Lz-title">
    <span class="text">{{title !== '' ? title : $route.meta.title}}</span>
    <slot class="slot"></slot>
  </div>
</template>
<script>
export default {
  name: 'LzTitle',
  props: {
    title: {
      default: '',
    },
  },
};
</script>
<style lang="scss">
@import '~lz-crm/style/variables';
.Lz-title {
  background-color: $WHITE;
  margin-bottom: 10px;
  position: relative;
  padding: 0 20px;
  font-size: 14px;
  height: 58px;
  line-height: 58px;
  color: $FONT_MAIN_BLACK;
  display: flex;
  align-items: center;
  text-align: left;
  .icon {
    padding-left: 12px;
    height: 23px;
  }
  .text {
    flex: 1;
  }
}

</style>
