<template>
  <div class="ctrl-countdown-editor">
    <form-block title="活动设置"
                ref="formBlock"
                :model="data"
                :rules="rules">
      <input-block title="生效时间段："
                   prop="range"
                   class="mt10">
        <lz-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                        :picker-options="pickerOptions"
                        size="small"
                        disabledDate=''
                        v-model="data.range"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期" />
      </input-block>
      <input-block title="选择图片："
                   prop="pic"
                   class="mt10">
        <div class="upload-box"
             @click="uploadBoxShowed = true">
          <img v-if="typeof data.pic === 'string' && data.pic !== ''"
               class="bg"
               :src="`${CONST.IMAGE_PREFIX}${data.pic}`"
               alt="">
          <span v-else>点击上传</span>
        </div>
        <p class="tip"
           slot="tip">注：仅支持宽度为750px，高度不超过2000px，大小不超过1M图片类型为jpg、png</p>
      </input-block>
      <input-block title="添加链接："
                   prop="link"
                   class="mt10">
        <link-input @changeLinkTitle="(link,title)=>{data.link=link;data.title=title}"
                    :propsLink='data.link'
                    :propsTitle='data.title'></link-input>
      </input-block>
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
import LinkTips from '../components/LinkTips.vue';
import CONST from '@/utils/constant';

export default {
  name: 'CtrlCountdownEditor',
  components: {
    FormBlock,
    InputBlock,
    MarginBottomSetting,
    LinkInput,
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 3600 * 1000;// 禁止选择以前的时间
        },
      },
      CONST,
      uploadBoxShowed: false,
      page: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      rules: {
        pic: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.pic(value),
        },
        link: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.link(value),
        },
        range: {
          trigger: 'change',
          validator: (rule, value, cb) => this.validators.range(value),
        },
      },
    };
  },
  methods: {
    imgValidator(width, height, size, type = '') {
      return new Promise((resolve, reject) => {
        if (height > 2000) {
          reject(new Error('图片高度不大于2000px'));
        } else if (width !== 750) {
          reject(new Error('请使用宽度为750px的图片'));
        } else if (size > 1000 * 1024) {
          reject(new Error('图片文件大小不可超过1M'));
        } else if (['jpg', 'jpeg', 'png', 'gif', 'image/jpeg'].indexOf(type) === -1) {
          reject(new Error('请使用jpg、png或gif格式的文件'));
        } else {
          resolve();
        }
      });
    },
    selectImage(url) {
      if (url !== this.data.pic) {
        this.data.pic = url;
        this.$refs.formBlock.$refs.elForm.validateField('pic');
      }
      this.uploadBoxShowed = false;
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.ctrl-countdown-editor {
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
    color: $FONT_MINOR_GRAY;
  }

  .lz-textarea__inner {
    padding-bottom: 30px;
  }
}
</style>
