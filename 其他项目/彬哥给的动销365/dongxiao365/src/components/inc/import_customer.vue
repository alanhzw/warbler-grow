<template>
  <div>
    <div v-if="uploadOK">
      批量导入中
        <el-progress :percentage="percent" stroke-width="15" :text-inside="true"></el-progress>
    </div><br>
    <el-upload
      class="upload-demo"
      drag
      :auto-upload="true"
      action=""
      :headers="headers"
      accept=".xls,.xlsx"
      :on-error="uploadError"
      :file-list="importFiles"
      :before-upload="handleFileBeforeUpload"
      ref="uploadCtrl">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传xls/xlsx文件，且不超过50M。
        <a href="../../../static/tem/import.xls" download="客户导入模版" target="_blank">下载模板</a>
      </div>
    </el-upload>
  </div>
</template>
<script>
  export default {
    name: "import_customer",
    data() {
      const asscessToken = window.localStorage.getItem('access_token');
      const token = this.$util.token();
      return {
        files: [],
        headers: {
          'access-token': asscessToken,
          'State': token,
          'Content-Type': 'multipart/form-data'
        },
        importFiles: [],
        // action: process.env.API_ROOT + '/common/upload/customer/import',
        // action: '',
        uploadOK: false,
        percent: 0
      }
    },
    created() {},
    methods: {
      // exportExcel() {
      //   this.$http.get('/crm/customer/export', this.page, r => {
      //     document.getElementById('downFrame').src = this.$http.root + '/common/download?id=' + r.data + '&fileName=客户资料.xls';
      //   })
      // },
      handleFileBeforeUpload(file) {
        this.importFiles.push(file)

        const fd = new FormData()
        fd.append('file', file)
        this.$http.post('/common/upload/customer/import', fd, r => {
          this.handleImport(r.data)
        })
        return false
      },
      handleImport(file) {
        this.uploadOK = true;
        this.$refs.uploadCtrl.clearFiles();
        this.$http.post('/crm/customer/import', {fileName: file}, r => {
          this.updateProcess(r.data);
        })
      },
      updateProcess(code) {
        const timer = setInterval(() => {
          this.$http.get('/crm/customer/import/process', {code: code}, r => {
            const p = r.data;

            this.percent = p.percent.toFixed(1);
            if (p.percent === 100) {
              clearInterval(timer);
              setTimeout(() => {
                this.uploadOK = false;
              }, 1000);
              const succCount = p.successCount || 0;
              const failCount = p.failCount || 0;
              this.$message({
                message: '恭喜你，导入完成，成功[' + succCount + ']条，失败[' + failCount + ']条',
                type: 'success'
              });
            }
          }, e => {
            clearInterval(timer);
          });
        }, 100);
      }
    }
  }
</script>

<style scoped>

</style>
