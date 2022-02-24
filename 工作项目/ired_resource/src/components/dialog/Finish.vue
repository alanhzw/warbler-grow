<!--
 * @Author: 一尾流莺
 * @Description: 完善在线简历
 * @Date: 2021-11-16 18:45:25
 * @LastEditTime: 2021-11-24 12:00:57
 * @FilePath: \ired_resource\src\components\dialog\Finish.vue
-->
<template>
  <div class="finish-dialog-content">
    <div class="left">
      <div class="left-top">
        <img src="../assets/logo.png"
             class="logo" />
      </div>
      <div class="left-bottom">
        <img src="../assets/Frame.png">
      </div>
    </div>

    <div class="right">

      <div class="right-top">
        <el-upload class="upload-demo"
                   drag
                   ref="upload"
                   :on-exceed="more"
                   :limit='1'
                   :on-change="handleChange"
                   :auto-upload='false'
                   :show-file-list="true"
                   :on-success='handleClose'
                   :file-list="myFileList"
                   :headers="{
            'X-Access-Token': token,
          }"
                   action="https://ired-resource.api.zhuhuakeji.com/irededu/iredtalents/pc/fileUpload"
                   multiple>
          <div class="el-upload__text">
            <div v-if='myFileList.length === 0'
                 class="first">请上传您的附件简历</div>
            <div class="second">支持DOC、DOCX、PDF、JPG、PNG格式附件</div>
            <div class="third">文件大小不超过15M</div>
          </div>
        </el-upload>
      </div>
      <div class="right-bottom">

        <el-button size="small"
                   class="btn-01"
                   @click="submitUpload"
                   type="primary">立即上传</el-button>

        <el-button type="danger"
                   @click="router.push('/customer/resume/create')"
                   class="btn-02">在线填写</el-button>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, computed, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const router = useRouter();

const emit = defineEmits(['closeDialog']);

const token = computed(() => sessionStorage.getItem('IRED_TOKEN'));

const upload = ref(null);

const myFileList = ref([

]);

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
  emit('closeDialog', 'finish');
  ElMessage({
    message: '上传成功！',
    type: 'success',
  });
};

</script>

<style lang='scss' >
.finish-dialog-content {
  .left {
    width: 404px;
    height: 568px;
    box-sizing: border-box;
    background: #fff9fa;
    position: absolute;
    top: 0;
    left: 0;
    .left-top {
      width: 100%;
      height: 210px;

      .logo {
        width: 151px;
        height: 62px;
        position: absolute;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .left-bottom {
      width: 100%;
      position: absolute;
      top: 210px;
      left: 0;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

    }
  }
  .right {
    width: 414px;
    height: 568px;
    box-sizing: border-box;
    background: #fff;
    position: absolute;
    top: 0;
    right: 0;
    .right-top {
      .el-upload-dragger {
        position: absolute;
        top: 30px;
        right: 30px;
        width: 354px;
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
          top: 75px;
        }
        .second {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          width: 100%;
          text-align: center;
          position: absolute;
          top: 265px;
        }
        .third {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #ed263d;
          width: 100%;
          text-align: center;
          position: absolute;
          top: 300px;
        }
      }
    }
    .right-bottom {
      .btn-01 {
        width: 354px;
        height: 46px;
        background: #ed263d;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        border: 1px solid #ed263d;
        position: absolute;
        bottom: 105px;
        left: 50%;
        transform: translateX(-50%);
      }
      .btn-02 {
        width: 354px;
        height: 46px;
        background: #fff;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        color: #ed263d;
        border: 1px solid #ed263d;
        margin: 0;
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
  .el-upload-list{
    width: 80%;
    margin: 0 auto;
    margin-top: 100px;
  }
  .el-upload-list__item .el-progress{
      span{
        display: none;
      }
  }
}
</style>
