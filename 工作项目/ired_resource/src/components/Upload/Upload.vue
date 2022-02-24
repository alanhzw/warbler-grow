<!--
 * @Author: 一尾流莺
 * @Description:
 * @Date: 2021-11-16 11:38:48
 * @LastEditTime: 2021-11-21 17:59:19
 * @FilePath: \ired_resource\src\components\Upload\Upload.vue
-->

<template>
  <div class="upload-hr-manager">
    <el-upload class="avatar-uploader"
               action="https://ired-resource.api.zhuhuakeji.com/irededu/iredtalents/pc/imageUpload"
               :show-file-list="false"
               :on-success="handleAvatarSuccess"
               name='image'
               :headers="{
          'X-Access-Token': token,
        }"
               :before-upload="beforeAvatarUpload">
      <div v-if="imageUrl"
           class="is-img">
        <img :src="imageUrl"
             class="avatar" />
      </div>
      <div v-else-if="url"
           class="is-img">
        <img :src="url"
             class="avatar" />
      </div>
      <div v-else
           class="no-img">
        <img src="../assets/icon-upload.png"
             class="avatar" />
      </div>
    </el-upload>
  </div>
</template>

<script lang='ts' setup>
import {
  ref, defineProps, onMounted, computed, defineExpose,
} from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps({
  url: {
    type: String,
    default: () => '',
  },
});

const imageUrl = ref('');

const token = computed(() => sessionStorage.getItem('IRED_TOKEN'));

const handleAvatarSuccess = (res: any, file: any) => {
  imageUrl.value = res.result;
};
const beforeAvatarUpload = (file: any) => {
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG && !isPNG) {
    //
    ElMessage({
      message: '请上传JPG/PNG格式的图片!',
      type: 'error',
    });
    return false;
  }
  if (!isLt2M) {
    //
    // return false;
  }
  return true;
};

defineExpose({
  imageUrl,
});

</script>

<style lang='scss'>
.upload-hr-manager {

  .avatar-uploader .el-upload {
      border: none;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
  .avatar-uploader-icon svg {
    margin-top: 74px; /* (178px - 28px) / 2 - 1px */
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .is-img {
    box-sizing: border-box;

    width: 46px;
    height: 46px;
    border: 1px solid #f8f8f8;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .no-img {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    height: 46px;
    border: 1px solid #f8f8f8;

    img {
      width: 17px;
      height: 17px;
    }
  }

}
</style>
