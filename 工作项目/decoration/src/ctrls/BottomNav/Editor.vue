<template>
  <div class="ctrl-slide-figure-editor">
    <form-block title="图片设置"
                ref="formBlock"
                :model="formData"
                :rules="rules">
      <div v-for="(nav, index) in data.navs"
           :key="`swipe-form-${index}`">
        <input-block class="mt10"
                     :title="`设置菜单(${index + 1}/5）：`"
                     :prop="`pic${index}`">
          <move-bar :min="1"
                    :count="index"
                    :total="data.navs.length"
                    @move-up="move(index, -1)"
                    @move-down="move(index, 1)"
                    @delete-item="delPic(index)" />
          <div class="upload-box"
               @click="showUploadBox(index)">
            <img v-if="typeof nav.icon === 'string' && nav.icon !== ''"
                 class="bg"
                 :src="`${CONST.IMAGE_PREFIX}${nav.icon}`"
                 alt="">
            <span v-else>点击上传</span>
          </div>
        </input-block>

        <input-block :title="`菜单类型：`"
                     :prop="`link${index}`">
          <lz-select v-model="nav.targetType">
            <lz-option :value="2" label="首页" />
            <lz-option :value="3" label="积分商城" />
            <lz-option :value="4" label="个人中心" />
            <lz-option :value="1" label="自定义页面" />
          </lz-select>
        </input-block>
        <input-block :title="`菜单名称：`"
                     :prop="`link${index}`">
          <lz-input v-model="nav.label" :maxlength="4" show-word-limit />
        </input-block>
        <input-block v-if="nav.targetType==1" :title="`添加链接：`"
                     :prop="`link${index}`">
          <link-input @changeLinkTitle="(link,title)=>{nav.url=link;nav.title=title}"
                      :propsLink='nav.url'
                      :propsTitle='nav.title'></link-input>
        </input-block>
      </div>
      <div class="button-input"
           v-if="data.navs.length < 5">
        <lz-button size="small"
                   @click="addPic">+ 添加菜单</lz-button>
      </div>
      <p class="tip">
        注：可添加<span class="red">1-5</span>个菜单，图标图片尺寸为<span class="red">44px ✕ 44px</span>，图片类型为<span class="red">jpg、png、gif</span><br />
        链接需符合，以http/https开头，{{V.getValidDomains().join('、')}}域名下的链接
        <lz-popover placement="top"
                    width="350"
                    trigger="hover">
          <!-- <a slot="reference">《海报及广告链接规范》</a>
          <p>1. 链接须包含 .isvjcloud.com，.isvjd.com或.jd.com</p>
          <p>2. 只能以http://,https://开头</p> -->
        </lz-popover>
      </p>
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
      for (let i = 0; i < this.data.navs.length; i++) {
        data[`icon${i}`] = this.data.navs[i].icon;
        data[`label${i}`] = this.data.navs[i].label;
      }
      return data;
    },
    /**
     * 校验规则
     */
    rules() {
      const ruleObject = {};
      for (let i = 0; i < this.data.navs.length; i++) {
        ruleObject[`icon${i}`] = {
          trigger: 'change',
          validator: (rule, value, cb) => this.funs.icon(value, i),
        };
        ruleObject[`label${i}`] = {
          trigger: 'change',
          validator: (rule, value, cb) => this.funs.label(value, i),
        };
      }
      return ruleObject;
    },

  },
  methods: {
    imgValidator(width, height, size, type = '') {
      return new Promise((resolve, reject) => {
        if (height !== 44) {
          reject(new Error('请使用高度为44px的图片'));
        } else if (width !== 44) {
          reject(new Error('请使用宽度为44px的图片'));
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
      this.data.navs.splice(this.currentIndex, 1, {
        ...this.data.navs[this.currentIndex],
        icon: url,
      });
      this.uploadBoxShowed = false;
    },
    addPic() {
      this.data.navs.push({
        label: '自定义',
        icon: '',
        targetType: 1,
        url: '',
      });
    },
    move(index, offset) {
      // 上移不可以超过顶部
      if (index + offset < 0 || index + offset >= this.data.navs.length) {
        return;
      }
      // 从原先的列表中分离要移动的数据
      const nav = this.data.navs.splice(index, 1)[0];
      // 将数据添加到移动的目标位置
      this.data.navs.splice(index + offset, 0, nav);
    },
    delPic(index) {
      this.data.navs.splice(index, 1);
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
    width: 88px;
    height: 88px;
    font-size: 12px;
    color: $TAG_INFO_BLUE;
    text-align: center;
    border: 1px dashed $BORDER_GRAY;

    .bg {
      width: 88px;
      height: 88px;
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
