<template>
  <div class="ctrl-hotzone-editor">
    <form-block title="图片设置"
                ref="formBlock"
                :model="data"
                :rules="rules">
      <input-block title="选择图片："
                   prop="pic">
        <div class="upload-box"
             @click="uploadBoxShowed = true">
          <img v-if="typeof data.pic === 'string' && data.pic !== ''"
               class="bg"
               :src="`${CONST.IMAGE_PREFIX}${data.pic}`"
               alt="">
          <span v-else>点击上传</span>
        </div>
        <p class="tip"
           slot="tip">注：仅支持宽度为750px，高度不超过1000px，大小不超过500k图片类型为jpg、png</p>
      </input-block>
      <input-block title="图片热区："
                   prop="hotzones"
                   class="mt10">
        <span slot="extras">已添加{{data.hotzones.length}}个热区</span>
        <lz-button class="btn-hotzon-edit"
                   type="primary"
                   plain
                   @click="startHotzoneEdit">编辑热区</lz-button>
        <div v-for="(hz, index) in data.hotzones"
             :key="`hz-editor-addr-${index}`">
          <p class="hotzone-title">热区{{index + 1}}：</p>
          <p class="hotzone-link-box"
             :class="{error: hz.link === '' || !V.isValidLink(hz.link)}">
            <span class="hotzone-link-value"
                  :title="hz.link">{{hz.link}}</span>
            <name-edit-box class="btn-icon"
                           :defaultValue="hz.link"
                           @confirm="link => editLink(link, index)" />
            <delete-tip-box class="btn-icon"
                            @confirm="data.hotzones.splice(index, 1)" />
          </p>
        </div>
        <link-tips></link-tips>
      </input-block>
    </form-block>
    <MarginBottomSetting :data="data" />
    <lz-dialog title="图片空间"
               class="jd-image-dialog"
               v-if='uploadBoxShowed'
               :visible.sync="uploadBoxShowed"
               :append-to-body="true"
               width="1150px">
      <image-selector @selected="selectImage"
                      :validator="imgValidator" />
    </lz-dialog>
    <lz-dialog title="编辑热区"
               class="hotzone-dialog"
               :visible.sync="hotzoneBoxShowed"
               :append-to-body="true"
               :close-on-click-modal="false">
      <hotzone-editor ref="hotzoneEditor"
                      :imgUrl="`${CONST.IMAGE_PREFIX}${data.pic}`"
                      @save="save"
                      @cancel="hotzoneBoxShowed=false" />
    </lz-dialog>
  </div>
</template>

<script>
import HotzoneEditor from '../components/HotzoneEditor';
import MarginBottomSetting from '../components/MarginBottomSetting.vue';
import InputBlock from '../components/InputBlock.vue';
import FormBlock from '../components/FormBlock.vue';
import LinkTips from '../components/LinkTips.vue';
import Service from '@/business/service';
import CONST from '@/utils/constant';
import NameEditBox from '@/business/components/NameEditBox.vue';
import DeleteTipBox from '@/business/components/DeleteTipBox.vue';
import { LzMsg } from '@/utils/UI';
import V from '@/utils/valid';

export default {
  name: 'CtrlHotzoneEditor',
  components: {
    FormBlock,
    InputBlock,
    MarginBottomSetting,
    NameEditBox,
    DeleteTipBox,
    HotzoneEditor,
    LinkTips,
  },
  props: {
    data: {
      default: () => ({}),
    },
    validators: {
      default: () => ({}),
    },
  },
  data() {
    return {
      CONST,
      V,
      uploadBoxShowed: false,
      hotzoneBoxShowed: false,
      rules: {
        pic: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.pic(value),
        },
        hotzones: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.hotzones(value),
        },
      },
    };
  },
  created() { },
  methods: {
    imgValidator(width, height, size, type = '') {
      return new Promise((resolve, reject) => {
        if (height > 1000) {
          reject(new Error('图片高度不大于1000px'));
        } else if (width !== 750) {
          reject(new Error('请使用宽度为750px的图片'));
        } else if (size > 500 * 1024) {
          reject(new Error('图片文件大小不可超过500k'));
        } else if (['jpg', 'jpeg', 'png'].indexOf(type) === -1) {
          reject(new Error('请使用jpg或png格式的文件'));
        } else {
          resolve();
        }
      });
    },
    selectImage(url) {
      if (url !== this.data.pic) {
        this.data.pic = url;
        this.data.hotzones = [];
        this.$refs.formBlock.$refs.elForm.validateField('pic');
      }
      this.uploadBoxShowed = false;
    },
    editLink(link, index) {
      if (link == '') {
        LzMsg.error('热区链接不能为空');
      } else if (!V.isValidLink(link)) {
        LzMsg.error(`链接不符合规范，请使用以http/https开头，${V.getValidDomains().join('、')}域名下的链接`);
      } else {
        this.data.hotzones[index].link = link;
      }
    },
    startHotzoneEdit() {
      if (this.data.pic === '') {
        LzMsg.error('请先选择热区图片');
        return;
      }
      this.hotzoneBoxShowed = true;
      this.$nextTick(() => {
        this.$refs.hotzoneEditor.setHotzones(this.data.hotzones);
      });
    },
    save(hotzones) {
      this.data.hotzones = JSON.parse(JSON.stringify(hotzones));
      this.hotzoneBoxShowed = false;
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.ctrl-hotzone-editor {
  .upload-box {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 135px;
    font-size: 12px;
    color: $TAG_INFO_BLUE;
    text-align: center;
    border: 1px dashed $BORDER_GRAY;

    .bg {
      width: 100%;
      vertical-align: center;
    }
  }

  .tip {
    font-size: 12px;
    margin-bottom: 0;
    color: $FONT_MINOR_GRAY;
  }

  .btn-hotzon-edit {
    width: 100%;
  }

  .hotzone-title {
    margin-top: 20px;
    marign-bottom: 15px;
    font-size: 12px;
    color: $FONT_COMMON_BLACK;
  }

  .hotzone-link-box {
    display: flex;
    border-radius: 2px;
    background-color: $BG_BLOCK_GRAY;
    padding: 10px;

    &.error {
      border: 1px solid #3399FF;
    }

    .hotzone-link-value {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .btn-icon {
      margin-left: 10px;
    }
  }
}

.jd-image-dialog {
  .lz-dialog {
    width: 1135px;
  }
}

.hotzone-dialog {
  .lz-dialog {
    width: 960px;
  }
}
</style>
