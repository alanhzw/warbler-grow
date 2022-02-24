<template>
  <div class="ctrl-tags-editor">
    <form-block title="标签设置"
                ref="formBlock"
                :model="formData"
                :rules="rules">
      <div v-for="(tag, index) in data.tags"
           :key="`tag-form-${index}`">
        <input-block class="mt10"
                     :title="`标签文字(${index + 1}/${data.tags.length})：`"
                     :prop="`text${index}`">
          <move-bar :min="1"
                    :count="index"
                    :total="data.tags.length"
                    @move-up="move(index, -1)"
                    @move-down="move(index, 1)"
                    @delete="delTag(index)" />
          <lz-input placeholder="请填写标签内容"
                    v-model="tag.text"
                    :maxlength="10"
                    show-word-limit />
        </input-block>
        <input-block :title="`标签链接：`"
                     :prop="`link${index}`">
          <link-input @changeLinkTitle="(link,title)=>{tag.link=link;tag.title=title}"
                      :propsLink='tag.link'
                      :propsTitle='tag.title'></link-input>
        </input-block>
      </div>
      <div class="button-input"
           v-if="data.tags.length < 4">
        <lz-button size="small"
                   @click="addTag">+ 添加标签</lz-button>
      </div>
      <link-tips></link-tips>
    </form-block>
    <MarginBottomSetting :data="data" />
  </div>
</template>

<script>
import CommonLinkTitle from '../../business/components/CommonLinkTitle.vue';
import FormBlock from '../components/FormBlock.vue';
import InputBlock from '../components/InputBlock.vue';
import LinkInput from '../components/LinkInput.vue';
import MarginBottomSetting from '../components/MarginBottomSetting.vue';
import MoveBar from '../components/MoveBar';
import LinkTips from '../components/LinkTips.vue';

export default {
  name: 'CtrlTagsEditor',
  components: {
    FormBlock,
    InputBlock,
    MarginBottomSetting,
    MoveBar,
    CommonLinkTitle,
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
    return {};
  },
  computed: {
    /**
     * 通过计算属性生成可以用于校验的表单数据
     */
    formData() {
      // 将原先tags里面的数组，转化成对象，以便可以使用el-form校验
      const data = {};
      for (let i = 0; i < this.data.tags.length; i++) {
        data[`text${i}`] = this.data.tags[i].text;
        data[`link${i}`] = this.data.tags[i].link;
      }
      return data;
    },
    /**
     * 校验规则
     */
    rules() {
      const ruleObject = {};
      for (let i = 0; i < this.data.tags.length; i++) {
        ruleObject[`text${i}`] = {
          trigger: 'change',
          validator: (rule, value, cb) => this.funs.text(value),
        };
        ruleObject[`link${i}`] = {
          trigger: 'change',
          validator: (rule, value, cb) => this.funs.link(value),
        };
      }

      return ruleObject;
    },
  },
  created() {

  },
  methods: {
    /**
     * 添加新的标签
     */
    addTag() {
      this.data.tags.push({
        text: '',
        link: '',
      });
    },
    move(index, offset) {
      // 上移不可以超过顶部
      if (index + offset < 0 || index + offset >= this.data.tags.length) {
        return;
      }
      // 从原先的列表中分离要移动的数据
      const pic = this.data.tags.splice(index, 1)[0];
      // 将数据添加到移动的目标位置
      this.data.tags.splice(index + offset, 0, pic);
    },
    delTag(index) {
      this.data.tags.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
@import '~lz-crm/style/variables';

.ctrl-tags-editor {
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
    padding: 0;
    background-color: transparent;

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
