<template>
<lz-form ref="elForm" class="editor-form-block" :model="model" :rules="rules">
  <header class="editor-form-block-header">
    <span class="beacon" />
    <span class="title">{{title}}</span>
    <slot name="header"></slot>
  </header>
  <div class="editor-form-block-body">
    <slot></slot>
  </div>
</lz-form>
</template>

<script>
export default {
  name: 'EditorFormBlock',
  props: {
    title: {
      default: '',
    },
    model: {
      default: () => ({}),
    },
    rules: {
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.editor-form-block {
  position: relative;
  margin-bottom: 15px;

  .editor-form-block-header {
    display: flex;
    font-size: 14px;
    color: $FONT_MAIN_BLACK;
    padding-top: 15px;
    margin-bottom: 30px;
    align-items: center;

    .beacon {
      width: 4px;
      height: 20px;
      margin-right: 10px;
      background-color: #3399FF;
    }

    .title {
      flex: 1;
    }
  }

  .tip {
    font-size: 12px;
    color: $FONT_MINOR_GRAY;
  }

  .editor-form-block-body {
    padding: 10px;
    background-color: $BG_PAGE_GRAY;
  }
}
</style>
