<template>
  <lz-popover class="name-edit-box"
              placement="bottom"
              width="300"
              v-model="visible"
              trigger="click">
    <span slot="reference"
          class="iconfont icon-icon-08"></span>
    <div>
      <lz-input :maxlength="maxLength"
                v-model="value" />
    </div>
    <div class="name-edit-box"
         style="text-align: right">
      <lz-button class="btn-confirm"
                 type="text"
                 @click="confirm">确定</lz-button>
      <lz-button class="btn-cancel"
                 type="text"
                 danger
                 @click="visible=false">取消</lz-button>
    </div>
  </lz-popover>
</template>
<script>
export default {
  name: 'NameEditBox',
  props: {
    defaultValue: {
      default: 'name',
    },
    maxLength: {
      default: 200,
    },
  },
  data() {
    return {
      value: this.defaultValue,
      visible: false,
    };
  },
  watch: {
    visible() {
      this.value = this.defaultValue;
    },
  },
  methods: {
    /**
     * 点击确认通知父组件
     */
    confirm() {
      this.$emit('confirm', this.value);
      this.visible = false;
    },
  },
};
</script>
<style lang="scss">
@import '~lz-crm/style/variables';
.name-edit-box {
  .iconfont {
    font-size: inherit;
  }
  .icon-edit {
    vertical-align: text-top;
  }
  .btn-confirm.el-button--text {
    color: $FONT_HIGHT_LIGHT_RED;
  }
  .btn-cancel.el-button--text  {
    color: $FONT_MINOR_GRAY;
  }
}

</style>
