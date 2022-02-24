<template>
  <div class="ctrl-double-row-figure-editor">
    <form-block title="图片设置"
                ref="formBlock"
                :model="data"
                :rules="rules">
      <input-block title="选择左侧图片："
                   prop="pic1">
        <move-bar :count='0'
                  :total='100'
                  :min='5'
                  @move-up="moveUp(1)"
                  @move-down="moveDown(1)"
                  @delete="delPic(1)" />
        <div class="upload-box"
             @click="openSelector(1)">
          <img v-if="typeof data.pic1 === 'string' && data.pic1 !== ''"
               class="bg"
               :src="`${CONST.IMAGE_PREFIX}${data.pic1}`"
               alt="">
          <span v-else>点击上传</span>
        </div>
      </input-block>
      <input-block title="添加左侧图片链接："
                   prop="link1">
        <link-input @changeLinkTitle="(link,title)=>{data.link1=link;data.title1=title}"
                    :propsLink='data.link1'
                    :propsTitle='data.title1'></link-input>
        <!-- <lz-input size="small" v-model="data.link1" /> -->
      </input-block>
      <input-block class="mt10"
                   title="选择右侧图片："
                   prop="pic2">
        <move-bar :total='31'
                  :count='30'
                  :min='5'
                  :show-bottom='false'
                  :show-top='false'
                  @move-up="moveUp(2)"
                  @move-down="moveDown(2)"
                  @delete="delPic(2)" />
        <div class="upload-box"
             @click="openSelector(2)">
          <img v-if="typeof data.pic2 === 'string' && data.pic2 !== ''"
               class="bg"
               :src="`${CONST.IMAGE_PREFIX}${data.pic2}`"
               alt="">
          <span v-else>点击上传</span>
        </div>
      </input-block>
      <input-block title="添加右侧图片链接："
                   prop="link2">
        <link-input @changeLinkTitle="(link,title)=>{data.link2=link;data.title2=title}"
                    :propsLink='data.link2'
                    :propsTitle='data.title2'></link-input>
        <!-- <lz-input size="small" v-model="data.link2" /> -->
      </input-block>
      <p class="tip">注：图片宽度为370px，高度为240px，大小不超过1M图片类型为jpg、png</p>
      <link-tips></link-tips>
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
  </div>
</template>

<script>
import FormBlock from '../components/FormBlock.vue';
import InputBlock from '../components/InputBlock.vue';
import MarginBottomSetting from '../components/MarginBottomSetting.vue';
import LinkInput from '../components/LinkInput.vue';
import MoveBar from '../components/MoveBar';
import LinkTips from '../components/LinkTips.vue';
import CONST from '@/utils/constant';

export default {
  name: 'CtrlDoubleRowFigureEditor',
  components: {
    FormBlock,
    InputBlock,
    MarginBottomSetting,
    LinkInput,
    MoveBar,
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
      currentPic: 1,
      uploadBoxShowed: false,
      rules: {
        pic1: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.pic1(value),
        },
        link1: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.link1(value),
        },
        pic2: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.pic2(value),
        },
        link2: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.link2(value),
        },
      },
    };
  },
  methods: {
    openSelector(index) {
      this.currentPic = index;
      this.uploadBoxShowed = true;
    },
    imgValidator(width, height, size, type = '') {
      return new Promise((resolve, reject) => {
        if (height !== 240) {
          reject(new Error('请使用高度为240px的图片'));
        } else if (width !== 370) {
          reject(new Error('请使用宽度为370px的图片'));
        } else if (size > 500 * 1024) {
          reject(new Error('图片文件大小不可超过500k'));
        } else if (['jpg', 'jpeg', 'png', 'gif', 'image/png', 'image/jpeg', 'image/jpg', 'image/gif'].indexOf(type) === -1) {
          reject(new Error('请使用jpg、png或gif格式的文件'));
        } else {
          resolve();
        }
      });
    },
    selectImage(url) {
      if (url !== this.data[`pic${this.currentPic}`]) {
        this.data[`pic${this.currentPic}`] = url;
        this.$refs.formBlock.$refs.elForm.validateField(`pic${this.currentPic}`);
      }
      this.uploadBoxShowed = false;
    },
    moveUp(index) {
      // 上移不可以超过顶部
      if (index === 1) {
        return;
      }
      console.log('up:', index);

      let flagPic = '';
      flagPic = this.data.pic1;
      this.data.pic1 = this.data.pic2;
      this.data.pic2 = flagPic;
      let flagLink = '';
      flagLink = this.data.link1;
      this.data.link1 = this.data.link2;
      this.data.link2 = flagLink;
      let flagTitle = '';
      flagTitle = this.data.title1;
      this.data.title1 = this.data.title2;
      this.data.title2 = flagTitle;
    },
    moveDown(index) {
      // 下移不可以超过底部
      if (index === 2) {
        return;
      }
      console.log('down:', index);
      let flagPic = '';
      flagPic = this.data.pic1;
      this.data.pic1 = this.data.pic2;
      this.data.pic2 = flagPic;
      let flagLink = '';
      flagLink = this.data.link1;
      this.data.link1 = this.data.link2;
      this.data.link2 = flagLink;
      let flagTitle = '';
      flagTitle = this.data.title1;
      this.data.title1 = this.data.title2;
      this.data.title2 = flagTitle;
    },
    delPic(index) {
      this.data[`pic${index}`] = '';
      this.data[`link${index}`] = '';
      this.data[`title${index}`] = '';
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.ctrl-double-row-figure-editor {
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

  .move-bar {
    position: absolute;
    right: 0;
    top: -30px;
  }
  .tip {
    font-size: 12px;
    margin-bottom: 0;
    color: $FONT_MINOR_GRAY;

    .red {
      color: #3399FF;
    }
  }

  .lz-textarea__inner {
    padding-bottom: 30px;
  }
}
</style>
