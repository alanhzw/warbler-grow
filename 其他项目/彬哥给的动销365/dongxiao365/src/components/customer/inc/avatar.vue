<template>
  <div class="avatar-uploader" @click="uploadAvatar">
    <img v-if="src" :src="src" class="avatar">
    <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
    <img v-else src="../../../assets/img/default.png"  class="avatar"/>
  </div>
</template>

<script>
  export default {
    name: "avatar",
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        src: ''
      }
    },
    methods: {
      uploadAvatar() {
        const that = this;
        if (DingTalkPC.ua.isDesktop) {
          DingTalkPC.ready(() => {
            DingTalkPC.biz.util.uploadImage({
              multiple: false, // 是否多选，默认false
              onSuccess: function (result) {
                that.src = result[0];
                this.$emit('change', that.src);
              },
              onFail: function (e) {
                this.$emit('change', '');
              }
            })
          })
        } else {
          this.$confirm('此操作需要在钉钉PC端完成，是否立即打开钉钉PC端？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const user = this.$util.getCurrentUser();
            location.href = 'dingtalk://dingtalkclient/action/sendmsg?dingtalk_id=' + user.dingId;
          });
        }
      }
    },
    watch: {
      value() {
        this.src = this.value;
      }
    }
  }
</script>

<style scoped>

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
    text-align: center;
    line-height: 180px;
    height: 180px;
    width: 180px;
    color: #8c939d;
    font-size: 2rem;
  }

  .avatar-uploader:hover {
    border-color: #409EFF;
    color: #409eff;
  }

  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
