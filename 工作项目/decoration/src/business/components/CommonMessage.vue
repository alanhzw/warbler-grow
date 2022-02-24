<!--
 * @Description:
 * @Date: 2021-03-22 10:42:32
 * @LastEditTime: 2021-04-06 14:43:29
 * @FilePath: \yunluzhuangxiu\src\business\components\CommonMessage.vue
-->
<template>
  <div class="common-message">
    <lz-dialog :title="title" :visible.sync="dialogVisible" :width="width" :top='top' :before-close="handleClose" :close-on-click-modal='false' :modal-append-to-body='false'>
      <slot></slot>
      <span slot="footer" class="dialog-footer" v-if="showFooter">
        <lz-button class="confirm-btn" type="primary" @click="confirmHandler">{{footerTitle}}</lz-button>
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
    footerTitle: {
      type: String,
      default: '确 定',
    },
    width: {
      type: String,
      default: '30%',
    },
    top: {
      type: String,
      default: '30vh',
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    showFooter: {
      type: Boolean,
      default: false,
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
.common-message {
  .lz-dialog__footer {
    // text-align: center;
  }
  .confirm-btn {
    width: 100px;
  }
}
</style>
