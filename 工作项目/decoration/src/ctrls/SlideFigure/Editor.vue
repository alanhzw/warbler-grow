<template>
  <div class="ctrl-slide-figure-editor">
    <form-block title="图片设置"
                ref="formBlock"
                :model="formData"
                :rules="rules">
      <div v-for="(pic, index) in data.pics"
           :key="`swipe-form-${index}`">
        <input-block class="mt10"
                     :title="`选择图片(${index + 1}/5）：`"
                     :prop="`pic${index}`">
          <move-bar :min="1"
                    :count="index"
                    :total="data.pics.length"
                    @move-up="move(index, -1)"
                    @move-down="move(index, 1)"
                    @delete="delPic(index)" />
          <div class="upload-box"
               @click="showUploadBox(index)">
            <img v-if="typeof pic.pic === 'string' && pic.pic !== ''"
                 class="bg"
                 :src="`${CONST.IMAGE_PREFIX}${pic.pic}`"
                 alt="">
            <span v-else>点击上传</span>
          </div>
        </input-block>
        <input-block :title="`添加链接：`"
                     :prop="`link${index}`">
          <link-input @changeLinkTitle="(link,title)=>{pic.link=link;pic.title=title}"
                      :propsLink='pic.link'
                      :propsTitle='pic.title'></link-input>
        </input-block>
      </div>
      <div class="button-input"
           v-if="data.pics.length < 5">
        <lz-button size="small"
                   @click="addPic">+ 添加图片</lz-button>
      </div>
      <p class="tip">文案：图片宽度为270px，高度为180px，，大小不超过1M图片类型为jpg、png</p>
      <link-tips></link-tips>
    </form-block>
    <MarginBottomSetting :data="data" />
    <lz-dialog title="图片空间"
               class="jd-image-dialog"
               :visible.sync="uploadBoxShowed"
               v-if='uploadBoxShowed'
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
      currentIndex: -1,
    };
  },
  computed: {
    /**
     * 通过计算属性生成可以用于校验的表单数据
     */
    formData() {
      // 将原先tags里面的数组，转化成对象，以便可以使用el-form校验
      const data = {};
      for (let i = 0; i < this.data.pics.length; i++) {
        data[`pic${i}`] = this.data.pics[i].pic;
        data[`link${i}`] = this.data.pics[i].link;
      }
      return data;
    },
    /**
     * 校验规则
     */
    rules() {
      const ruleObject = {};
      for (let i = 0; i < this.data.pics.length; i++) {
        ruleObject[`pic${i}`] = {
          trigger: 'change',
          validator: (rule, value, cb) => this.funs.pic(value, i),
        };
        ruleObject[`link${i}`] = {
          trigger: 'change',
          validator: (rule, value, cb) => this.funs.link(value, i),
        };
      }
      return ruleObject;
    },

  },
  methods: {
    imgValidator(width, height, size, type = '') {
      return new Promise((resolve, reject) => {
        if (height !== 180) {
          reject(new Error('请使用高度为180px的图片'));
        } else if (width !== 270) {
          reject(new Error('请使用宽度为270px的图片'));
        } else if (size > 1000 * 1024) {
          reject(new Error('图片文件大小不可超过1M'));
        } else if (['jpg', 'jpeg', 'png', 'gif', 'image/jpeg'].indexOf(type) === -1) {
          reject(new Error('请使用jpg、png或gif格式的文件'));
        } else {
          resolve();
        }
      });
    },
    showUploadBox(index) {
      this.currentIndex = index;
      this.uploadBoxShowed = true;
    },
    selectImage(url) {
      this.data.pics.splice(this.currentIndex, 1, {
        pic: url,
        link: this.data.pics[this.currentIndex].link,
      });
      this.uploadBoxShowed = false;
    },
    addPic() {
      this.data.pics.push({
        pic: '',
        link: '',
      });
    },
    move(index, offset) {
      // 上移不可以超过顶部
      if (index + offset < 0 || index + offset >= this.data.pics.length) {
        return;
      }
      // 从原先的列表中分离要移动的数据
      const pic = this.data.pics.splice(index, 1)[0];
      // 将数据添加到移动的目标位置
      this.data.pics.splice(index + offset, 0, pic);
    },
    delPic(index) {
      this.data.pics.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.ctrl-slide-figure-editor {
  .upload-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 135px;
    height: 90px;
    font-size: 12px;
    color: $TAG_INFO_BLUE;
    text-align: center;
    border: 1px dashed $BORDER_GRAY;

    .bg {
      width: 135px;
      height: 90px;
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
