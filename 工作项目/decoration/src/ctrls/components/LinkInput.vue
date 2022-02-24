<!--
 * @Description:
 * @Date: 2021-03-23 14:50:08
 * @LastEditTime: 2021-03-26 10:18:02
 * @FilePath: \yunluzhuangxiu\src\ctrls\components\LinkInput.vue
-->
<template>
  <div class="link-input-box">
    <lz-input placeholder="请填写标签链接" size="small" @input='changeLinkTitle' v-model="link" />
    <common-link-title @changeLinkTitle='changeLinkTitle' @changeTitle='changeTitle' :propsLink='propsLink' :propsTitle='propsTitle' />
  </div>
</template>
<script>
import CommonLinkTitle from '../../business/components/CommonLinkTitle.vue';

export default {
  components: { CommonLinkTitle },
  data() {
    return {
      link: '',
      title: '',
    };
  },
  props: {
    propsLink: {
      default: '',
    },
    propsTitle: {
      default: '',
    },
  },
  created() {
    this.link = this.propsLink;
  },
  methods: {
    changeTitle(title) {
      this.title = title;
    },
    changeLinkTitle() {
      this.$emit('changeLinkTitle', this.link, this.title);
    },
  },
  watch: {
    title() {
      this.changeLinkTitle();
    },
    propsLink() {
      this.link = this.propsLink;
    },
  },
};
</script>

<style lang='scss'>
.link-input-box {
  display: flex;
  justify-content: space-around;
}
</style>
