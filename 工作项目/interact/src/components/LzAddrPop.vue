<template>
  <lz-popover placement="bottom"
              width="340"
              v-model="visible"
              trigger="click">
    <lz-button :disabled="disabled"
               style="margin: 0 5px;"
               slot="reference"
               type="text"
               @click="preview(scope.row)">{{title}}</lz-button>
    <!--<div>
      <lz-input v-model="page.resourceUrl" readonly="" />
    </div>
    <div class="addr-box" style="text-align: right">
      <lz-button class="btn-confirm"  type="text" @click="confirm">复制地址</lz-button>
      <lz-button class="btn-confirm"  type="text" @click="confirm">获取短链接</lz-button>
      <lz-button class="btn-confirm"  type="text" @click="confirm">二维码</lz-button>
      <lz-button class="btn-cancel"  type="text" danger @click="visible=false">取消</lz-button>
    </div>-->
    <div class="addr-box">
      <lz-tabs v-model="activeName">
        <lz-tab-pane label="链接地址"
                     name="link">
          <div class="addr-line">
            <lz-input readonly
                      v-model="page.releaseUrl" />
            <lz-button type="danger"
                       plain
                       @click="copyText(page.releaseUrl)">复制长链接</lz-button>
          </div>
          <div class="addr-line">
            <lz-input readonly
                      v-model="page.shortUrl" />
            <lz-button type="danger"
                       plain
                       @click="copyText(page.shortUrl)">复制短链接</lz-button>
          </div>
        </lz-tab-pane>
        <lz-tab-pane label="二维码"
                     name="qrcode"
                     class="qr-box">
          <img :src="`${CONST.IMAGE_PREFIX}${page.qrcodeUrl}`">
        </lz-tab-pane>
      </lz-tabs>
    </div>
  </lz-popover>
</template>
<script>
import CONST from '@/utils/constant';
import Utils from '@/utils';
import { LzMsg } from '@/utils/UI';

export default {
  name: 'NameEditBox',
  props: {
    page: {
      default: () => ({}),
    },
    title: {
      default: '获取地址',
    },
    defaultTab: {
      default: 'link',
    },
    disabled: {
      type: Boolean,
      defaule: false,
    },
  },
  data() {
    return {
      CONST,
      visible: false,
      activeName: this.defaultTab,
    };
  },
  methods: {
    copyText(text) {
      Utils.copyText(text).then(() => LzMsg.success('链接已经复制到剪切板'));
    },
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
<style lang="scss" scope>
@import '~lz-crm/style/variables';
.addr-box {
  .icon-edit {
    vertical-align: text-top;
  }
  .btn-confirm.el-button--text {
    color: $FONT_HIGHT_LIGHT_RED;
  }
  .btn-cancel.el-button--text  {
    color: $FONT_MINOR_GRAY;
  }
  .addr-line {
    display: flex;
    margin: 10px 0;
    .el-input {
      margin-right: 5px;
    }
  }
  .qr-box {
    text-align: center;
  }
}

</style>
