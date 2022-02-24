<template>
  <div class="component-share-settings">
    <lz-form ref="elForm"
             label-width="200px"
             :model="form"
             :rules="rules"
             :disabled="settings.disableStatus.includes(activityInfo.status)">
      <lz-form-item label="分享标题："
                    prop="shareText">
        <lz-input v-model="form.shareText"
                  :maxlength="20"
                  placeholder="请输入分享标题"></lz-input>
      </lz-form-item>
      <lz-form-item label="分享图片："
                    prop="sharePic"
                    :class="{'is-can-be-click':calcuStarted || activityInfo.status==4}">
        <img v-if="form.sharePic == ''"
             :src="tipPic"
             @click="uploadBoxShowed = true" />
        <img v-else
             class="share-img"
             :src="`${CONST.IMAGE_PREFIX}${form.sharePic}`"
             @click="uploadBoxShowed = true" />
        <p class="tip">注：可上传尺寸为582*320px，大小不超过500k的图片。图片格式为png、jpg。</p>
      </lz-form-item>
    </lz-form>
    <lz-dialog title="图片空间"
               class="jd-image-dialog"
               :visible.sync="uploadBoxShowed"
               :append-to-body="true"
               width="1150px"
               :close-on-click-modal='false'>
      <jd-image-selector @selected="selectImage"
                         :validator="imgValidator" />
    </lz-dialog>
  </div>
</template>

<script>
import JdImageSelector from '@/business/components/common/JdImageSelector';
import CONST from '@/utils/constant';

export default {
  name: 'ShareSettings',
  components: {
    JdImageSelector,
  },
  props: {
    formData: {
      default: () => ({}),
    },
    activityInfo: {
      default: () => ({}),
    },
    settings: {
      default: () => ({}),
    },
  },
  data() {
    return {
      tipPic: require('@/assets/image-select.png'),
      CONST,
      uploadBoxShowed: false,

      form: {
        shareText: '', // 分享文案
        sharePic: '', // 分享图片
      },
      rules: {
        shareText: [
          {
            required: true,
            message: '请输入分享文案',
            trigger: 'change',
          },
        ],
        sharePic: [
          {
            required: true,
            message: '请选择分享图片',
            trigger: 'change',
          },
        ],
      },
    };
  },
  computed: {
    calcuStarted() {
      // 是否可以修改
      if (this.activityInfo.activityType == 506 || this.activityInfo.activityType == 507) {
        return new Date(this.activityInfo.awardStartTime) < new Date();
      } else if (this.activityInfo.activityType == 503) {
        return false;
      }
      return new Date(this.activityInfo.orderStartTime) < new Date();
    },
  },
  created() {
    this.form = {
      ...this.form,
      ...this.formData,
    };
  },
  methods: {
    selectImage(pic) {
      this.form.sharePic = pic;
      this.$refs.elForm.validateField('sharePic');
      this.uploadBoxShowed = false;
    },
    imgValidator(width, height, size, type) {
      return new Promise((resolve, reject) => {
        if (width !== 582 || height !== 320) {
          reject('上传图片的尺寸为582*320px,请上传对应尺寸图片');
        } else if (type !== 'png' && type !== 'jpeg') {
          reject('请上传png或jpg格式的图片');
        } else {
          resolve();
        }
      });
    },
  },
};
</script>

<style lang="scss">
.component-share-settings {
  .share-img {
    width: 150px;
    height: 80px;
  }
  .is-can-be-click {
    pointer-events: none;
    cursor: not-allowed;
    cursor: no-drop;
  }
  .lz-input{
    width: 600px;
  }
}

.jd-image-dialog {
  .lz-dialog {
    width: 1135px;
  }
}

</style>
