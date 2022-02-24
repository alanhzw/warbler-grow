<template>
<div class="ctrl-floor-title-editor">
  <form-block title="标题内容" ref="formBlock" :model="data" :rules="rules">
    <input-block title="编辑文字：" prop="text">
      <lz-input v-model="data.text" placeholder="请填写标题内容" :maxlength="10" show-word-limit />
    </input-block>
  </form-block>
  <MarginBottomSetting :data="data" />
</div>
</template>

<script>
import FormBlock from '../components/FormBlock.vue';
import InputBlock from '../components/InputBlock.vue';
import MarginBottomSetting from '../components/MarginBottomSetting.vue';

export default {
  name: 'CtrlFloorTitleEditor',
  components: {
    FormBlock,
    InputBlock,
    MarginBottomSetting,
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
      },
    };
  },
  methods: {},
};
</script>

<style lang="scss">
.ctrl-floor-title-editor {
  .lz-textarea__inner {
    padding-bottom: 30px;
  }
}
</style>
