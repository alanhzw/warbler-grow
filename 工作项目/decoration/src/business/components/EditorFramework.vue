<template>
  <div class="page-editor-framework">
    <slot name="header"></slot>
    <div class="page-editor-body">
      <div class="left ctrl-panel">
        <!-- <div class="block tpl-block">
        系统默认模版
        <label class="selector-label">选择模版模版</label>
        <lz-select size="small" v-model="info.themeId" placeholder="请选择" @change="$emit('changeTheme')">
            <lz-option v-for="t in themes" :key="`theme-option-${t.themeId}`" :label="t.themeName" :value="t.themeId"></lz-option>
          </lz-select>
      </div> -->
        <div class="ctrl-catalogue">
          <slot name="ctrls"></slot>
        </div>
      </div>
      <div class="middle preview-panel">
        <div class="block phone-width selector-block"
             v-if="!handlerIsOLY()">
          <label class="selector-label">当前装修页面：</label>
          <lz-select size="small"
                     v-model="info.pageId"
                     placeholder="请选择"
                     @change="$emit('changePage')">
            <lz-option v-for="p in pages"
                       :key="`page-option-${p.pageId}`"
                       :label="p.pageName"
                       :value="p.pageId"></lz-option>
          </lz-select>
        </div>
        <div class="preview-phone-box">
          <div class="phone-width phone-screen">
            <slot name="floors" />
          </div>
          <div class="phone-thumbnail">
            <slot name="thumbnail" />
          </div>
        </div>
      </div>
      <div class="right edit-panel">
        <header v-show="floorOnEdit && floorOnEdit.info"
                class="edit-panel-header">
          <span>
            <!-- {{formData.floorName || '未命名楼层'}} -->
            {{ floorOnEdit.info && floorOnEdit.info.label}}
          </span>
          <!-- <lz-rename-pop class="edit-box" :defaultValue="formData.floorName" :maxLength="10" @confirm="rename" /> -->
          <span class="set-floor-name"
                :class="{'no-name':!isChangedFloorName}"
                @click='showChangeFloorName()'>
            <lz-tooltip class="item"
                        effect="dark"
                        content="请填写楼层名称"
                        placement="left-end"
                        :value="isChangedFloorStatus">
              <i class="iconfont icon-yemianzhuangxiuiconshezhi-12"></i>
            </lz-tooltip>
          </span>
        </header>
        <div class="edit-panel-body">
          <slot name="editor"></slot>
        </div>
        <div v-show="floorOnEdit.info"
             class="edit-panel-footer">
          <!-- <lz-button type="danger"
                     @click="$router.back()">关闭</lz-button> -->
          <lz-button type="primary"
                     @click="$emit('saveFloor', floorOnEdit)">保存</lz-button>
        </div>
      </div>
    </div>

    <common-confirm class="common-dialog"
                    title='楼层追踪设置'
                    v-if="dialogVisible"
                    :dialogVisible='dialogVisible'
                    @confirm='submitForm("ruleForm")'
                    @cancle='resetForm("ruleForm")'
                    width='500'>
      <p class="tip">注：用户行为明细追踪为定制业务报表，如有需求请和商务经理联系</p>
      <lz-form :model="formData"
               label-position="right"
               :rules="rules"
               ref="ruleForm"
               label-width='100px'>
        <lz-form-item label="楼层ID：">{{floorOnEdit.extra && floorOnEdit.extra.floorKey}}</lz-form-item>
        <lz-form-item label="楼层名称："
                      prop="floorName">
          <lz-input v-model="formData.floorName"
                    placeholder="请输入楼层名称"
                    maxlength="20"></lz-input>
        </lz-form-item>
      </lz-form>
    </common-confirm>

  </div>
</template>

<script>
import CommonConfirm from '@business/components/CommonConfirm.vue';
import isOLY from '@/utils/oly';


export default {
  name: 'EditorFramework',
  components: { CommonConfirm },
  props: {
    info: {
      default: () => ({}),
    },
    themes: {
      default: () => ([]),
    },
    pages: {
      default: () => ([]),
    },
    pageOnEdit: {
      default: () => ({}),
    },
    floorOnEdit: {
      default: () => ({}),
    },
    formData: {
      default: () => ({}),
    },
    loaded: {
      default: true,
    },
    isChangedFloorName: {
      default: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      oldFloorName: '',
      rules: {
        floorName: [
          { required: true, message: '请填写楼层名称', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    isChangedFloorStatus() {
      return !this.isChangedFloorName;
    },
    pageSelectorShow() {
      return window.location.host.indexOf('loreal') === -1;
    },
  },
  methods: {
    handlerIsOLY() {
      return isOLY();
    },
    showChangeFloorName() {
      this.oldFloorName = this.formData.floorName;
      this.dialogVisible = true;
    },
    rename(name) {
      this.formData.floorName = name;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('changeIsChangedFloorName', true);
          this.dialogVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.dialogVisible = false;
      setTimeout(() => {
        this.formData.floorName = this.oldFloorName;
      }, 500);
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables.scss';

$HEADER_HEIGHT: 60px;
$TITLE_HEIGHT: 70px;
$LEFT_WIDTH: 358px;
$RIGHT_WIDTH: 430px;
$PHONE_WIDTH: 375px;

.page-editor-framework {
  display: flex;
  flex-direction: column;

  .common-dialog {
    .flex-box {
      display: flex;
      justify-content: space-around;
    }
    .tip {
      font-size: 12px;
      line-height: 15px;
      margin-top: 5px;
      margin-bottom: 5px;
      color: #c3cbd6;
    }
  }

  .offset {
    flex: 1;
  }

  .wrapper {
    box-sizing: border-box;
  }

  .left {
    @extend .wrapper;
    width: $LEFT_WIDTH;
  }

  .middle {
    @extend .wrapper;
    flex: 1;

    .phone-width {
      width: $PHONE_WIDTH;
      margin: auto;
      box-sizing: border-box;
    }
  }

  .right {
    @extend .wrapper;
    width: $RIGHT_WIDTH;
  }

  .block {
    background-color: $WHITE;
  }

  .page-editor-body {
    margin-top: 20px;

    display: flex;
    box-sizing: border-box;

    flex: 1;
    overflow: hidden;
    display: flex;

    .set-floor-name {
      cursor: pointer;
      color: #39f;
    }

    .no-name {
      color: red;
    }
    .tpl-block {
      font-size: 16px;
      padding: 0 15px;
      line-height: 50px;
      border-bottom: solid 1px $BORDER_GRAY;
    }

    .selector-block {
      display: flex;
      height: $TITLE_HEIGHT;
      align-items: center;
      align-content: center;
      margin-bottom: 10px;
      padding: 15px;
      text-align: left;

      .selector-label {
        font-size: 12px;
        color: $FONT_COMMON_BLACK;
      }

      .lz-select {
        width: 200px;
      }
    }

    .ctrl-panel {
      display: flex;
      flex-direction: column;

      .ctrl-catalogue {
        flex: 1;
        overflow-y: auto;
      }
    }

    .preview-panel {
      display: flex;
      flex-direction: column;

      .phone-header {
        position: relative;

        .phone-header-image {
          vertical-align: top;
        }

        .page-name {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          color: $WHITE;
          line-height: 90px;
          font-size: 32px;
          text-align: center;
        }
      }

      .preview-phone-box {
        position: relative;
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;

        &::-webkit-scrollbar {
          width: 0;
        }

        .phone-screen {
          min-height: 627px;
          box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.05);
        }

        .phone-thumbnail {
          position: fixed;
          top: 160px;
          left: 50%;
          margin-left: $PHONE_WIDTH / 2 + 20px;
        }
      }
    }

    .edit-panel {
      background-color: $WHITE;
      display: flex;
      flex-direction: column;

      .edit-panel-header {
        padding: 0 15px;
        font-size: 16px;
        color: $FONT_MAIN_BLACK;
        line-height: 50px;
        border-bottom: 1px solid $BORDER_GRAY;
        text-align: left;
        display: flex;
        justify-content: space-between;
      }

      .edit-panel-body {
        flex: 1;
        padding: 15px;
        overflow-x: hidden;
        overflow-y: auto;

        &::-webkit-scrollbar {
      position: absolute;
      right: 30px;
      /*滚动条整体样式*/
      width: 7px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 5px;
      }

      &::-webkit-scrollbar-thumb {
          /*滚动条里面小方块*/
          background-color: #D7DDE4;
          border-radius: 10px;
      }

      &::-webkit-scrollbar-track {
          /*滚动条里面轨道*/
          /* 阴影 */
          -webkit-box-shadow: inset 0 0 5px #fff;
          background: #fff;
      }
      }

      .edit-panel-footer {
        height: 70px;
        padding: 0 30px;
        text-align: left;
        border-top: 1px solid $BORDER_GRAY;
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .lz-button {
          width: 88px;
        }
      }
    }
  }
}

@media screen and (max-width: 1650px) {
  .phone-thumbnail {
    display: none;
  }
}
</style>
