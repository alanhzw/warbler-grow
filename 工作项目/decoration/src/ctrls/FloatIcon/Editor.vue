<template>
  <div class="ctrl-float-icon-editor">
    <form-block title="上传图标"
                ref="data"
                :model="data"
                :rules="rules">
      <input-block title="选择图片："
                   prop="pic">
        <div class="upload-box"
             @click="showUploadBox()">
          <img v-if="typeof data.pic === 'string' && data.pic !== ''"
               class="bg"
               :src="`${CONST.IMAGE_PREFIX}${data.pic}`"
               alt="">
          <span v-else>点击上传</span>
        </div>
      </input-block>
      <input-block title="添加链接："
                   prop="link">
        <link-input @changeLinkTitle="(link,title)=>{data.link=link;data.title=title}"
                    :propsLink='data.link'
                    :propsTitle='data.title'></link-input>
      </input-block>
      <p class="tip">注：图片宽度为210px，高度为210px，大小不超过1M图片类型为jpg、png</p>

      <link-tips></link-tips>
    </form-block>
    <lz-dialog title="图片空间"
               class="jd-image-dialog"
               v-if='uploadBoxShowed'
               :visible.sync="uploadBoxShowed"
               :append-to-body="true"
               width="1150px">
      <image-selector @selected="selectImage"
                      :validator="imgValidator" />
    </lz-dialog>
  </div>
</template>

<script>
import FormBlock from '../components/FormBlock';
import InputBlock from '../components/InputBlock';
import MarginBottomSetting from '../components/MarginBottomSetting';
import MoveBar from '../components/MoveBar';
import LinkInput from '../components/LinkInput.vue';
import LinkTips from '../components/LinkTips.vue';
import V from '@/utils/valid';
import CONST from '@/utils/constant';

export default {
  name: 'CtrlSlideFigureEditor',
  components: {
    FormBlock,
    InputBlock,
    MarginBottomSetting,
    MoveBar,
    LinkInput,
    LinkTips,
  },
  props: {
    data: {
      default: () => ({}),
    },
    funs: {
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
      rules: {
        pic: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.pic(value),
        },
        link: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.link(value),
        },
      },
    };
  },
  methods: {
    imgValidator(width, height, size, type = '') {
      return new Promise((resolve, reject) => {
        if (height !== 210) {
          reject(new Error('请使用高度为210px的图片'));
        } else if (width !== 210) {
          reject(new Error('请使用宽度为210px的图片'));
        } else if (size > 1000 * 1024) {
          reject(new Error('图片文件大小不可超过1M'));
        } else if (['jpg', 'jpeg', 'png', 'gif', 'image/jpeg'].indexOf(type) === -1) {
          reject(new Error('请使用jpg、png或gif格式的文件'));
        } else {
          resolve();
        }
      });
    },
    showUploadBox() {
      this.uploadBoxShowed = true;
    },
    selectImage(url) {
      this.data.pic = url;
      this.uploadBoxShowed = false;
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.ctrl-float-icon-editor {
  .upload-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 210px;
    height: 210px;
    font-size: 12px;
    color: $TAG_INFO_BLUE;
    text-align: center;
    border: 1px dashed $BORDER_GRAY;

    .bg {
      width: 210px;
      height: 210px;
      vertical-align: center;
    }
  }

  .tip {
    font-size: 12px;
    color: $FONT_MINOR_GRAY;
  }

  .lz-textarea__inner {
    padding-bottom: 30px;
  }

  .move-bar {
    position: absolute;
    right: 0;
    top: -30px;
  }

  .button-input {
    margin-top: 10px;

    .lz-button {
      width: 100%;
    }
  }

  .tip {
    font-size: 12px;
    margin-bottom: 0;
    color: $FONT_MINOR_GRAY;

    .red {
      color: #3399FF;
    }
  }
}
</style>
