<!--
 * @Description:
 * @Date: 2021-03-15 11:31:56
 * @LastEditTime: 2021-04-13 14:04:22
 * @FilePath: \yunluzhuangxiu\src\ctrls\Tags\Result.vue
-->
<template>
  <div class="ctrl-tags-result" :class="{mb15: data.mb15}">
    <span class="tag" :class="{'blank-tag': tag.text === ''}" v-for="(tag, index) in data.tags" :key="`tag-${index}`" v-lz-click='100' v-lz-floor="floorInfo" @click="go2Link($event, tag.link)">
      {{tag.text === '' ? '请输入标签文字' : tag.text}}
    </span>
  </div>
</template>

<script>
export default {
  name: 'CtrlTagsResult',
  props: {
    data: {
      default: () => ({}),
    },
    floorInfo: {
      default: () => ({}),
    },
  },
  methods: {
    go2Link(evt, link) {
      if (typeof link === 'string' && link !== '') {
        window.location.href = link;
        // this.beforeLeave(link,evt)
      }
    },
  },
};
</script>

<style lang="scss">
@import '../style/common_ctrl';
@import '~lz-crm/style/variables';

.ctrl-tags-result {
  padding: 0.1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  .tag {
    background-color: $WHITE;
    color: $FONT_COMMON_GRAY;
    padding: 0.1rem 0.4rem;
    border-radius: 0.21rem;
    margin: 0.1rem;
    line-height: 0.32rem;
    font-size: 0.24rem;

    &.blank-tag {
      color: $FONT_DISABLE_GRAY;
    }
  }
}
</style>
