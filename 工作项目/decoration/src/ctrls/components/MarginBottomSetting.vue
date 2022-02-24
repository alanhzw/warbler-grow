<!--
 * @Description:
 * @Date: 2021-03-15 11:31:55
 * @LastEditTime: 2021-04-08 16:53:55
 * @FilePath: \yunluzhuangxiu\src\ctrls\components\MarginBottomSetting.vue
-->
<template>
  <div class="editor-floor-bottom-setting">
    <!-- <header class="editor-form-block-header">
      <span class="beacon"/>
      <span>下边距设置</span>
    </header> -->
    <div class="editor-form-block-body">
      <lz-checkbox v-model="data.mb15">显示模块下边距</lz-checkbox>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EditorFormBlock',
  props: {
    data: {
      default: {
        mb15: false,
      },
    },
  },
};
</script>
<style lang="scss">
@import '~lz-crm/style/variables';

.editor-floor-bottom-setting {
  position: relative;
  .editor-form-block-header {
    display: flex;
    font-size: 14px;
    color: $FONT_MAIN_BLACK;
    padding-top: 15px;
    .beacon {
      width: 4px;
      margin-right: 10px;
      background-color: #3399FF;
    }
  }
  .editor-form-block-body {
    margin-top: 15px;
    text-align: left;
    .lz-checkbox__label {
      font-size: 14px;
    }
    // padding: 15px;
  }
}
</style>
