<!--
 * @Description:
 * @Date: 2021-03-22 10:42:32
 * @LastEditTime: 2021-04-06 14:43:36
 * @FilePath: \yunluzhuangxiu\src\business\components\CommonConfirm.vue
-->
<template>
  <div class="common-confirm">
    <lz-dialog :title="title" :visible.sync="dialogVisible" :top='top' :width="width" :before-close="handleClose" :close-on-click-modal='false' :modal-append-to-body='false'>
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <lz-button type="primary" @click="confirmHandler">确 定</lz-button>
        <lz-button @click="handleClose">取 消</lz-button>
      </span>
    </lz-dialog>
  </div>
</template>

<script>
export default {
  name: 'CommonConfirm',
  props: {
    title: {
      type: String,
      default: '提示',
    },
    width: {
      type: String,
      default: '30%',
    },
    dialogVisible: {
      type: Boolean,
      default: false,
      required: true,
    },
    top: {
      type: String,
      default: '30vh',
    },
  },

  data() {
    return {

    };
  },
  methods: {
    confirmHandler() {
      this.$emit('confirm');
    },
    handleClose() {
      this.$emit('cancle');
    },
  },
};

</script>

<style lang='scss'>
.common-confirm {
}
</style>
