<template>
  <lz-popover placement="bottom"
              v-model="visible"
              trigger="click">
    <img slot="reference"
         class="icon-delete"
         src="@/assets/delete.png"
         alt=''>
    <div class="delete-tip-box">
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
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    /**
     * 点击确认通知父组件
     */
    confirm() {
      this.$emit('confirm');
      this.visible = false;
    },
  },
};
</script>
<style lang="scss">
@import '~lz-crm/style/variables';
.delete-tip-box {
  text-align: center;
  .icon-delete {
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
