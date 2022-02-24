<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-06-15 18:14:10
 * @LastEditTime: 2021-08-16 16:38:33
 * @FilePath: \decoration\src\ctrls\Text\Editor.vue
-->
<template>
  <div class="ctrl-text-editor">
    <form-block title="文字活动"
                ref="formBlock"
                :model="data"
                :rules="rules">
      <input-block title="编辑文字："
                   prop="text">
        <lz-input type="textarea"
                  v-model="data.text"
                  :autosize="{minRows: 3}"
                  :maxlength="200"
                  show-word-limit />
      </input-block>
      <input-block title="添加链接："
                   prop="link"
                   class="mt10">
        <link-input @changeLinkTitle="(link,title)=>{data.link=link;data.title=title}"
                    :propsLink='data.link'
                    :propsTitle='data.title'></link-input>
      </input-block>
      <link-tips></link-tips>
    </form-block>
    <MarginBottomSetting :data="data" />
  </div>
</template>

<script>
import FormBlock from '../components/FormBlock.vue';
import InputBlock from '../components/InputBlock.vue';
import MarginBottomSetting from '../components/MarginBottomSetting.vue';
import LinkInput from '../components/LinkInput.vue';
import LinkTips from '../components/LinkTips.vue';

export default {
  name: 'CtrlTextEditor',
  components: {
    FormBlock,
    InputBlock,
    MarginBottomSetting,
    LinkInput,
    LinkTips,
  },
  props: {
    data: {
      default: () => ({}),
    },
    validators: {
      default: () => ({}),
    },
  },
  data() {
    return {
      rules: {
        text: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.text(value),
        },
        link: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.link(value),
        },
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.ctrl-text-editor {
  .lz-textarea__inner {
    padding-bottom: 30px;
  }
}
</style>
