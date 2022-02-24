<template>
  <lz-popover
    class="name-edit-box"
    placement="bottom"
    width="300"
    v-model="visible"
    trigger="click">
    <!-- <img slot="reference" class="icon-edit" src="@/assets/edit.png" alt=''> -->
    <i class="iconfont icon-icon-08"></i>
    <div>
      <lz-input :maxlength="maxLength" v-model="value" size="mini"/>
    </div>
    <div class="name-edit-box" style="text-align: right">
      <lz-button class="btn-confirm" size="mini" type="text" @click="confirm">确定</lz-button>
      <lz-button class="btn-cancel" size="mini" type="text" danger @click="visible=false">取消</lz-button>
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
  .icon-edit {
    vertical-align: text-top;
  }
  .btn-confirm.lz-button--text {
    color: #3399FF;
  }
  .btn-cancel.lz-button--text  {
    color: $FONT_MINOR_GRAY;
  }
}

</style>
