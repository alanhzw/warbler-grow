<!--
 * @Author: YC
 * @Date: 2020-12-01 14:31:33
 * @LastEditors: YC
 * @LastEditTime: 2020-12-28 00:17:20
 * @Description:
-->
<template>
  <lz-popover
    placement="bottom"
    v-model="visible"
    trigger="click">
    <!-- <img slot="reference" class="icon-delete" src="@/assets/delete.png" alt=''> -->

    <i slot="reference" class="icon-delete iconfont icon-icon-07"></i>
    <div class="delete-tip-box" >
      <lz-button class="btn-confirm" size="mini" type="text" @click="confirm">确定</lz-button>
      <lz-button class="btn-cancel" size="mini" type="text" danger @click="visible=false">取消</lz-button>
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
  .btn-confirm.lz-button--text {
    color: #3399FF;
  }
  .btn-cancel.lz-button--text  {
    color: $FONT_MINOR_GRAY;
  }
}

</style>
