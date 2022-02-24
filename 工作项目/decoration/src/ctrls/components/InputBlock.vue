<template>
<div class="input-block">
  <div class="input-block-content">
    <div class="input-block-title">
      <span class="input-block-title-text">{{title}}</span>
      <span class="input-block-title-extras">
        <slot name="extras"></slot>
      </span>
    </div>
    <lz-form-item :prop="prop">
      <slot></slot>
    </lz-form-item>
  </div>
  <slot name="tip"></slot>
</div>
</template>

<script>
export default {
  name: 'InputBlock',
  props: {
    title: {
      default: '',
    },
    prop: {
      default: '',
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.input-block {
  padding: 10px;
  text-align: left;
  background-color: $WHITE;

  .input-block-title {
    font-size: 12px;
    margin-top: 0;
    margin-bottom: 5px;
    color: $FONT_COMMON_BLACK;
    display: flex;

    .input-block-title-text {
      flex: 1;
    }

    .input-block-title-extras {
      font-size: 12px;
      color: $FONT_MINOR_GRAY;
    }
  }

  .input-block-content {}

  .lz-form-item {
    margin-bottom: 0;
  }

  .lz-form-item__error {
    position: relative;
  }

  .tip {
    font-size: 12px;
    color: $FONT_MINOR_GRAY;
  }

  .lz-date-editor--datetimerange.lz-input,
  .lz-date-editor--datetimerange.lz-input__inner {
    width: 100%;
  }

  &.mt10 {
    margin-top: 10px;
  }
}
</style>
