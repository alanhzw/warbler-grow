<template>
  <div class="page-content">
    <breadcrumb/>
    <el-alert
      title="温馨提示"
      class="tip" type="warning" :closable="false" show-icon
      description="【VIP企业专享】建议图片上传尺寸135*45，支持格式PNG、JPEG、JPG大小不超过300Kb"
    />
    <div class="company">
    <div class="company-content">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司Logo：" prop="corpLogoUrl">
          <div class="imgLogo">
            <com-avatar v-model="ruleForm.corpLogoUrl"/>
          </div>
          <!-- <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-error="handleAvatarError"
            :on-success="handleAvatarSuccess"
            :on-change="handleAvatarChange"
            :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.corpLogoUrl" :src="ruleForm.corpLogoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload> -->
        </el-form-item>
        <el-form-item label="企业名称：" prop="corpShortName" :maxlength="25">
          <el-input  v-model="ruleForm.corpShortName"></el-input>
        </el-form-item>
        <el-form-item label="企业电话：" prop="corpTel" :maxlength="15">
          <el-input v-model="ruleForm.corpTel"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>
      </div>
    </div>
  </div>
</template>
<script>

import ComAvatar from './inc/avatar'

  export default {
    components: {
      ComAvatar
    },
    data() {
      const util = require('../../util/util')

      return {
        ruleForm: {
          corpLogoUrl: '',
          corpShortName: '',
          corpTel: ''
        }
        // action: this.$http.root + '/sys/corp/edit',
        // axiosHeader: {
        //   'access-token': localStorage.getItem('access_token'),
        //   'State': util.token()
        // }
      }
    },
    created() {
       this.init();
    },
    mounted() {

    },
    methods: {
      // inputFileChange(val) {
      //   console.log('inputFileChange', val)
      // },
      init() {
        this.$http.post('/sys/corp/info', {}, r => {
          this.ruleForm.corpLogoUrl  = r.data.corpLogoUrl;
          this.ruleForm.corpShortName = r.data.corpShortName;
          this.ruleForm.corpTel = r.data.corpTel;
        });
      },

       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post('/sys/corp/edit', this.ruleForm, r => {
              this.$message({
                type: "success",
                message: "保存成功"
              });
            })
          }
        });
      }
      // handleAvatarError(err) {
      //   console.log('handleAvatarError', err)
      // },
//       handleAvatarSuccess(res, file) {
//         // console.log('handleAvatarSuccess', file)
//         console.log('handleAvatarSuccess', res, file, file.url)
//         // this.ruleForm.corpLogoUrl = file.url
//         // this.ruleForm.corpLogoUrl = URL.createObjectURL(file.raw);
//       },
//       handleAvatarChange(res, file) {
//         // console.log('handleAvatarChange', res, file)
// =======
      // handleAvatarSuccess(res, file) {
      //   this.ruleForm.corpLogoUrl = URL.createObjectURL(file.raw);
      // },
      // beforeAvatarUpload(file) {
      //   console.log('beforeAvatarUpload', file)
      //   const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      //   const isLt2M = file.size / 1000 < 300;
      //   if (!isJPG) {
      //     this.$message.error('上传头像图片只能是 JPG 格式!');
      //   }
      //   if (!isLt2M) {
      //     this.$message.error('上传头像图片大小不能超过300kb!');
      //   }
      //   return isJPG && isLt2M;
      // }
    },
    watch: {},
    filters: {}
  }
</script>
<style lang="scss" scoped>
.tip {
    padding: 20px;
  }
.company{
  width: 100%;
}
.company-content{
  width: 30%;
  height: 100%;
  margin-top: 30px;
}
.imgLogo{
  width: 145px;
  height: 50px;
}

.avatar-uploader .el-upload {
    width: 145px;
    height: 50px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 145px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar {
    width: 145px;
    height: 50px;
    display: block;
  }
</style>
