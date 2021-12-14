<!--
 * @Author: 一尾流莺
 * @Description:新增附件简历
 * @Date: 2021-11-16 18:45:25
 * @LastEditTime: 2021-11-24 11:59:08
 * @FilePath: \ired_resource\src\components\dialog\Add.vue
-->
<template>
  <div class="add-dialog-container">
    <el-upload class="upload-demo"
               drag
               ref="upload"
               :on-exceed="more"
               :on-change="handleChange"
               :auto-upload='false'
               :show-file-list="true"
               :on-success='handleClose'
               :file-list="myFileList"
               :before-upload='beforeUpload'
               :limit='1'
               :headers="{
        'X-Access-Token': token,
      }"
               action="https://ired-resource.api.zhuhuakeji.com/irededu/iredtalents/pc/fileUpload"
               multiple>
      <div class="el-upload__text">
        <div class="first"
             v-if='myFileList.length === 0'>拖拽文件到这里</div>
        <div class="second">支持DOC、DOCX、PDF、JPG、PNG格式附件</div>
        <div class="third">文件大小不超过15M</div>
      </div>
    </el-upload>

    <el-button size="small"
               class="btn-01"
               @click="submitUpload"
               type="primary">立即上传</el-button>

  </div>
</template>

<script lang='ts' setup>
import { ref, computed, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';

const emit = defineEmits(['closeDialog']);

const token = computed(() => sessionStorage.getItem('IRED_TOKEN'));

const upload = ref(null);

const myFileList = ref([

]);

const beforeUpload = (file:any) => {
  console.log('🚀🚀~ file:', file);
  return true;
};

// 超出个数
const more = () => {
  ElMessage({
    message: '文件已存在!',
    type: 'error',
  });
};

// 上传到服务器
const submitUpload = () => {
  console.log('🚀🚀~ myFileList:', myFileList.value);
  if (myFileList.value.length === 0) {
    ElMessage({
      message: '请选择上传文件!',
      type: 'error',
    });
    return;
  }
  // @ts-ignore
  upload.value.submit();
};

// 上传回调
const handleChange = (file:any, fileList:any) => {
  myFileList.value = fileList;
};

// 上传成功后
const handleClose = () => {
  emit('closeDialog', 'add');
  ElMessage({
    message: '上传成功！',
    type: 'success',
  });
};

</script>

<style lang='scss'>
.add-dialog-container {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-upload-dragger {
    position: relative;
    width: 748px;
    height: 366px;
  }
  .el-upload__text {
    .first {
      font-size: 24px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      width: 100%;
      text-align: center;
      position: absolute;
      top: 55px;
    }
    .second {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      width: 100%;
      text-align: center;
      position: absolute;
      top: 145px;
    }
    .third {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #ed263d;
      width: 100%;
      text-align: center;
      position: absolute;
      top: 175px;
    }
  }
  .btn-01 {
    width: 354px;
    height: 46px;
    background: #ed263d;
    border-radius: 0px 0px 0px 0px;
    opacity: 1;
    border: 1px solid #ed263d;
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
  }
    .el-upload-list{
    width: 80%;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }
  .el-upload-list__item .el-progress{
      span{
        display: none;
      }
  }
}
</style>
