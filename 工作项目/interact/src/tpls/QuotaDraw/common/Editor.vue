<!--
 * @Description:
 * @Autor: hanzhiwei
 * @Date: 2021-02-03 09:49:40
 * @LastEditTime: 2021-08-18 11:39:05
 * @FilePath: \interact\src\tpls\QuotaDraw\common\Editor.vue
-->
<template>
  <div class="quota-prize-tpl-editor">
    <lz-form ref="elForm"
             label-width="200px">
      <lz-form-item label="活动主图"
                    prop="mainPic"
                    required>
        <img v-if="options.mainPic"
             class="main-pic"
             :src="`${CONST.IMAGE_PREFIX}${options.mainPic}`">
        <img v-else
             class="main-pic"
             :src="mainPic">
        <p class="tip">注：可上传宽度为750px，高度为540px的图片。图片格式为png、jpg。</p>
        <div v-if="activityInfo.status !=4">
          <lz-button type="primary"
                     @click="openImageDialog(1)">更换主图</lz-button>
          <lz-button plain
                     type="primary"
                     @click="reset(1)">重置</lz-button>
        </div>
      </lz-form-item>
    </lz-form>
    <lz-dialog title="图片空间"
               class="jd-image-dialog"
               :visible.sync="uploadBoxShowed"
               :append-to-body="true"
               width="1150px"
               :close-on-click-modal="false">
      <jd-image-selector @selected="selectImage"
                         :validator="imgValidator" />
    </lz-dialog>
  </div>
</template>
<script>
/**
 * 开卡礼包编辑组件
 */
import JdImageSelector from '@/business/components/common/JdImageSelector';
import mainPic from '@/assets/main-quota-draw.png';
import CONST from '@/utils/constant';

export default {
  name: 'CommonMemberGiftEditor',
  components: {
    JdImageSelector,
  },
  props: {
    options: {
      type: Object,
      default: () => ({
      }),
    },
    activityInfo: {
      type: Object,
      default: () => ({
      }),
    },
  },
  data() {
    return {
      CONST,
      mainPic,
      imgType: 1, // 1-主图，2-按钮
      uploadBoxShowed: false,
    };
  },
  methods: {
    // 打开选择图片弹窗
    openImageDialog(type) {
      this.imgType = type;
      this.uploadBoxShowed = true;
    },
    // 已从弹窗中选择了图片之后的处理
    selectImage(url) {
      const options = { ...this.options };
      if (this.imgType === 1) {
        options.mainPic = url;
      }
      this.$emit('change', options);
      this.uploadBoxShowed = false;
    },
    imgValidator(width, height, size, type) {
      return new Promise((resolve, reject) => {
        if (width !== 750 || height !== 540) {
          reject('上传图片的尺寸为750*540px,请上传对应尺寸图片');
        } else if (type !== 'png' && type !== 'jpeg') {
          reject('请上传png或jpg格式的图片');
        } else {
          resolve();
        }
      });
    },
    reset(type) {
      const options = { ...this.options };
      if (type === 1) {
        options.mainPic = null;
      }
      this.$emit('change', options);
    },
  },
};
</script>
<style lang="scss">
.quota-prize-tpl-editor {
  .main-pic {
    width: 375px;
  }
}
</style>
